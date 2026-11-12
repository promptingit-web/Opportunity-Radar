import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Opportunity, 
  StudentProfile, 
  ApplicationItem, 
  InAppNotification, 
  ApplicationStatus 
} from '../types';
import { 
  INITIAL_OPPORTUNITIES, 
  INITIAL_PROFILE, 
  INITIAL_APPLICATIONS, 
  INITIAL_NOTIFICATIONS 
} from '../data/opportunities';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  applications: ApplicationItem[];
  profile: StudentProfile;
  notifications: InAppNotification[];
  toasts: ToastMessage[];
  
  // Actions
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addApplication: (item: Omit<ApplicationItem, 'id'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  updateApplication: (id: string, updates: Partial<ApplicationItem>) => void;
  deleteApplication: (id: string) => void;
  trackOpportunity: (opp: Opportunity, status?: ApplicationStatus) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetDemoData: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  OPPORTUNITIES: 'oppradar_opportunities_v1',
  SAVED: 'oppradar_saved_ids_v1',
  APPLICATIONS: 'oppradar_applications_v1',
  PROFILE: 'oppradar_profile_v1',
  NOTIFICATIONS: 'oppradar_notifications_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Opportunities
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  // Bookmarks
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
    return saved ? JSON.parse(saved) : ['opp-1', 'opp-3', 'opp-7'];
  });

  // Applications
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Student Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Notifications
  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast Queue
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedOpportunityIds));
  }, [savedOpportunityIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
  }, [opportunities]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleBookmark = (id: string) => {
    const exists = savedOpportunityIds.includes(id);
    const opp = opportunities.find(o => o.id === id);
    const oppTitle = opp ? opp.title : 'Opportunity';

    if (exists) {
      setSavedOpportunityIds(prev => prev.filter(item => item !== id));
      showToast(`Removed "${oppTitle.slice(0, 30)}..." from saved list`, 'info');
    } else {
      setSavedOpportunityIds(prev => [...prev, id]);
      showToast(`Saved "${oppTitle.slice(0, 30)}..." to your opportunities`, 'success');
    }
  };

  const isBookmarked = (id: string) => savedOpportunityIds.includes(id);

  const addApplication = (item: Omit<ApplicationItem, 'id'>) => {
    const id = 'app-' + Date.now();
    const newApp: ApplicationItem = { ...item, id };
    setApplications(prev => [newApp, ...prev]);
    showToast(`Added "${newApp.title.slice(0, 30)}" to application tracker`, 'success');
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status };
      }
      return app;
    }));
    showToast(`Updated application status to ${status.toUpperCase()}`, 'info');
  };

  const updateApplication = (id: string, updates: Partial<ApplicationItem>) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, ...updates };
      }
      return app;
    }));
    showToast('Application details updated', 'success');
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    showToast('Application removed from tracker', 'info');
  };

  const trackOpportunity = (opp: Opportunity, status: ApplicationStatus = 'interested') => {
    const existing = applications.find(a => a.opportunityId === opp.id);
    if (existing) {
      updateApplicationStatus(existing.id, status);
      return;
    }

    const newApp: ApplicationItem = {
      id: 'app-' + Date.now(),
      opportunityId: opp.id,
      title: opp.title,
      organisation: opp.organisation,
      category: opp.category,
      status,
      appliedDate: new Date().toISOString().split('T')[0],
      deadline: opp.deadline,
      workMode: opp.workMode,
      location: opp.location,
      stipendOrPrize: opp.stipend || opp.prizePool || opp.awardAmount,
      sourceUrl: opp.sourceUrl,
      applicationUrl: opp.applicationUrl
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Added to Application Tracker (${status.toUpperCase()})`, 'success');
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.OPPORTUNITIES);
    localStorage.removeItem(STORAGE_KEYS.SAVED);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);

    setOpportunities(INITIAL_OPPORTUNITIES);
    setSavedOpportunityIds(['opp-1', 'opp-3', 'opp-7']);
    setApplications(INITIAL_APPLICATIONS);
    setProfile(INITIAL_PROFILE);
    setNotifications(INITIAL_NOTIFICATIONS);

    showToast('Demo data and settings reset to defaults', 'info');
  };

  return (
    <AppContext.Provider value={{
      opportunities,
      savedOpportunityIds,
      applications,
      profile,
      notifications,
      toasts,
      toggleBookmark,
      isBookmarked,
      addApplication,
      updateApplicationStatus,
      updateApplication,
      deleteApplication,
      trackOpportunity,
      updateProfile,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      resetDemoData,
      showToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

