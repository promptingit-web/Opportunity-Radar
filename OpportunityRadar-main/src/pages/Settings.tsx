import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCcw, 
  ShieldCheck, 
  Bell, 
  Download, 
  Database, 
  CheckCircle2, 
  Trash2,
  SlidersHorizontal 
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { resetDemoData, opportunities, savedOpportunityIds, applications, profile, showToast } = useApp();

  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);

  const handleExportData = () => {
    const exportData = {
      profile,
      savedOpportunityIds,
      applications,
      exportTimestamp: new Date().toISOString(),
      platform: 'OpportunityRadar'
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opportunityradar-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Student data exported to JSON file', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      <div className="pb-6 border-b border-[#E9EAE7] mb-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#202B3C] tracking-tight">
          Settings & Local Data Controls
        </h1>
        <p className="text-xs sm:text-sm text-[#7C8490] mt-0.5">
          OpportunityRadar stores your profile, bookmarks, and tracker history entirely in your local browser sandbox.
        </p>
      </div>

      <div className="space-y-6 text-xs">
        
        {/* Local Storage & Reset Demo Section */}
        <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#416FAD]" />
            <h2 className="font-heading font-semibold text-base text-[#202B3C]">
              Demo Catalog & Storage Management
            </h2>
          </div>

          <p className="text-[#7C8490] leading-relaxed">
            If you customized your application tracker or student profile and want to restore the initial rich demo state with sample applications and bookmarks, you can reset at any time.
          </p>

          <div className="p-3.5 bg-[#F7F7F4] rounded-md border border-[#E9EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-[#202B3C] block">Reset to Default Demo State</span>
              <span className="text-[11px] text-[#7C8490]">
                Restores original sample opportunities, notifications, and demo tracker records.
              </span>
            </div>

            <button
              onClick={resetDemoData}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#FDF4EB] border border-[#E9EAE7] hover:border-[#E9A66B] text-[#C97835] font-semibold rounded-radar transition-colors flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>

          <div className="p-3.5 bg-[#F7F7F4] rounded-md border border-[#E9EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-[#202B3C] block">Export Workspace Data</span>
              <span className="text-[11px] text-[#7C8490]">
                Download a clean JSON backup of your tracked applications and student profile.
              </span>
            </div>

            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#E6EEF8] border border-[#E9EAE7] hover:border-[#416FAD] text-[#416FAD] font-semibold rounded-radar transition-colors flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#416FAD]" />
            <h2 className="font-heading font-semibold text-base text-[#202B3C]">
              In-App Notification Preferences
            </h2>
          </div>

          <div className="space-y-3 divide-y divide-[#E9EAE7]">
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-[#202B3C] block">Deadline Radar Alerts</span>
                <span className="text-[11px] text-[#7C8490]">
                  Surface notifications when bookmarked opportunities have fewer than 7 days remaining.
                </span>
              </div>
              <input
                type="checkbox"
                checked={deadlineAlerts}
                onChange={(e) => {
                  setDeadlineAlerts(e.target.checked);
                  showToast('Notification preferences updated', 'info');
                }}
                className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-[#202B3C] block">High Compatibility Match Notifications</span>
                <span className="text-[11px] text-[#7C8490]">
                  Notify when a new opportunity scores &gt; 80% with your student profile.
                </span>
              </div>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => {
                  setMatchAlerts(e.target.checked);
                  showToast('Notification preferences updated', 'info');
                }}
                className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Architecture Principles */}
        <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 shadow-subtle space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#54765A]" />
            <h2 className="font-heading font-semibold text-base text-[#202B3C]">
              Privacy & Editorial Integrity Policy
            </h2>
          </div>

          <p className="text-[#7C8490] leading-relaxed">
            OpportunityRadar does not track personal telemetry or transmit your student profile data to external servers. All information remains on your local machine using standard browser storage APIs.
          </p>

          <ul className="space-y-1.5 text-[#202B3C] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#54765A]" />
              No third-party trackers or ad network scripts.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#54765A]" />
              Official verified opportunities link directly to genuine institutional domains.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#54765A]" />
              Deterministic, transparent rule matching without black-box opacity.
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
