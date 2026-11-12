import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ApplicationItem, ApplicationStatus, OpportunityCategory } from '../types';
import { OpportunityRow } from '../components/opportunities/OpportunityRow';
import { formatFriendlyDate, getDeadlineUrgency } from '../utils/date';
import { 
  Bookmark, 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Columns3, 
  ListFilter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X, 
  MessageSquare,
  Search
} from 'lucide-react';

const STATUS_COLUMNS: { status: ApplicationStatus; label: string; bg: string; text: string; border: string }[] = [
  { status: 'interested', label: 'Interested', bg: 'bg-[#F0F2F5]', text: 'text-[#516275]', border: 'border-[#E9EAE7]' },
  { status: 'applied', label: 'Applied', bg: 'bg-[#E6EEF8]', text: 'text-[#416FAD]', border: 'border-[#416FAD]/30' },
  { status: 'assessment', label: 'Assessment', bg: 'bg-[#FDF4EB]', text: 'text-[#C97835]', border: 'border-[#E9A66B]/30' },
  { status: 'interview', label: 'Interview', bg: 'bg-[#E9E2F1]', text: 'text-[#644783]', border: 'border-[#644783]/30' },
  { status: 'shortlisted', label: 'Shortlisted', bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', border: 'border-[#2E7D32]/30' },
  { status: 'selected', label: 'Selected / Offer', bg: 'bg-[#DCE9DD]', text: 'text-[#54765A]', border: 'border-[#54765A]/40' },
  { status: 'rejected', label: 'Archived / Rejected', bg: 'bg-[#F7F7F4]', text: 'text-[#7C8490]', border: 'border-[#E9EAE7]' },
];

export const MyOpportunities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'saved' ? 'saved' : 'tracker';
  
  const { 
    opportunities, 
    savedOpportunityIds, 
    applications, 
    updateApplicationStatus, 
    updateApplication, 
    deleteApplication,
    addApplication 
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [trackerSearch, setTrackerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modal states for adding custom application
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<ApplicationItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    organisation: '',
    category: 'internship' as OpportunityCategory,
    status: 'interested' as ApplicationStatus,
    deadline: '',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
    nextStep: '',
    interviewDate: '',
    location: 'Remote',
    stipendOrPrize: ''
  });

  // Saved Opportunities list
  const savedOpportunities = useMemo(() => {
    return opportunities.filter(o => savedOpportunityIds.includes(o.id));
  }, [opportunities, savedOpportunityIds]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (trackerSearch) {
        const q = trackerSearch.toLowerCase();
        return (
          app.title.toLowerCase().includes(q) ||
          app.organisation.toLowerCase().includes(q) ||
          (app.notes && app.notes.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [applications, trackerSearch, statusFilter]);

  const handleOpenAdd = () => {
    setEditingApp(null);
    setFormData({
      title: '',
      organisation: '',
      category: 'internship',
      status: 'interested',
      deadline: '2026-11-30',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: '',
      nextStep: '',
      interviewDate: '',
      location: 'Remote',
      stipendOrPrize: ''
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (app: ApplicationItem) => {
    setEditingApp(app);
    setFormData({
      title: app.title,
      organisation: app.organisation,
      category: app.category,
      status: app.status,
      deadline: app.deadline,
      appliedDate: app.appliedDate,
      notes: app.notes || '',
      nextStep: app.nextStep || '',
      interviewDate: app.interviewDate || '',
      location: app.location || '',
      stipendOrPrize: app.stipendOrPrize || ''
    });
    setShowAddModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organisation) return;

    if (editingApp) {
      updateApplication(editingApp.id, formData);
    } else {
      addApplication({
        opportunityId: 'custom-' + Date.now(),
        ...formData
      });
    }
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Top Header & Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9EAE7] mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#202B3C] tracking-tight">
            My Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-[#7C8490] mt-0.5">
            Manage your bookmarked listings and track ongoing applications in one workspace.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E9EAE7] rounded-radar-lg shadow-subtle">
          <button
            onClick={() => setSearchParams({ tab: 'tracker' })}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-radar text-xs font-semibold transition-all ${
              activeTab === 'tracker'
                ? 'bg-[#202B3C] text-white shadow-sm'
                : 'text-[#7C8490] hover:text-[#202B3C]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Application Tracker ({applications.length})
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'saved' })}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-radar text-xs font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#202B3C] text-white shadow-sm'
                : 'text-[#7C8490] hover:text-[#202B3C]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Saved Listings ({savedOpportunities.length})
          </button>
        </div>
      </div>

      {/* TAB 1: SAVED OPPORTUNITIES */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7C8490] px-1">
            <span>You have bookmarked {savedOpportunities.length} opportunities for quick review</span>
            <Link to="/explore" className="text-[#416FAD] hover:underline font-medium">
              Browse more opportunities →
            </Link>
          </div>

          {savedOpportunities.length === 0 ? (
            <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-12 text-center">
              <Bookmark className="w-8 h-8 text-[#7C8490] mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-base text-[#202B3C]">
                No saved opportunities yet
              </h3>
              <p className="text-xs text-[#7C8490] mt-1 max-w-sm mx-auto">
                Click the bookmark icon on any opportunity row to save it for later review.
              </p>
              <Link
                to="/explore"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#416FAD] text-white text-xs font-semibold rounded-radar"
              >
                Explore opportunities
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {savedOpportunities.map(opp => (
                <OpportunityRow key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: APPLICATION TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Add, View Toggle */}
          <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#7C8490] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackerSearch}
                  onChange={(e) => setTrackerSearch(e.target.value)}
                  placeholder="Filter applications..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] placeholder-[#7C8490] focus:outline-none focus:border-[#416FAD]"
                />
              </div>

              {/* Status quick filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar px-3 py-1.5 text-xs text-[#202B3C] font-medium focus:outline-none"
              >
                <option value="all">All Stages</option>
                {STATUS_COLUMNS.map(col => (
                  <option key={col.status} value={col.status}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              {/* View Toggle (Kanban vs List) */}
              <div className="flex items-center p-0.5 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                    viewMode === 'kanban' ? 'bg-white text-[#202B3C] font-semibold shadow-sm' : 'text-[#7C8490]'
                  }`}
                  title="Kanban Board view"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kanban</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                    viewMode === 'list' ? 'bg-white text-[#202B3C] font-semibold shadow-sm' : 'text-[#7C8490]'
                  }`}
                  title="Table / List view"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>

              {/* Add Custom Application Button */}
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Application
              </button>
            </div>

          </div>

          {/* VIEW A: KANBAN BOARD VIEW */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 items-start overflow-x-auto pb-4">
              {STATUS_COLUMNS.map(column => {
                const columnApps = filteredApplications.filter(a => a.status === column.status);
                
                return (
                  <div
                    key={column.status}
                    className="bg-[#FFFFFF] border border-[#E9EAE7] rounded-radar-lg p-3 min-w-[220px] flex flex-col min-h-[350px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E9EAE7]">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${column.bg} ${column.text}`}>
                        {column.label}
                      </span>
                      <span className="text-[11px] font-mono text-[#7C8490]">
                        {columnApps.length}
                      </span>
                    </div>

                    {/* Column Cards */}
                    <div className="space-y-2.5 flex-1">
                      {columnApps.length === 0 ? (
                        <div className="h-24 border border-dashed border-[#E9EAE7] rounded-md flex items-center justify-center text-[11px] text-[#7C8490]">
                          Empty
                        </div>
                      ) : (
                        columnApps.map(app => (
                          <div
                            key={app.id}
                            className="bg-[#F7F7F4] hover:bg-white border border-[#E9EAE7] hover:border-[#416FAD]/40 rounded-radar p-3 text-xs shadow-subtle transition-all group"
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span className="font-semibold text-[#202B3C] line-clamp-2 leading-snug">
                                {app.title}
                              </span>
                              <button
                                onClick={() => handleOpenEdit(app)}
                                className="text-[#7C8490] hover:text-[#416FAD] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Edit"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>

                            <p className="text-[11px] text-[#7C8490] font-medium">
                              {app.organisation}
                            </p>

                            {/* Status mover select */}
                            <div className="mt-2.5 pt-2 border-t border-[#E9EAE7] flex items-center justify-between text-[10px]">
                              <span className="text-[#7C8490]">Move:</span>
                              <select
                                value={app.status}
                                onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                                className="bg-white border border-[#E9EAE7] rounded px-1.5 py-0.5 text-[10px] text-[#202B3C] focus:outline-none"
                              >
                                {STATUS_COLUMNS.map(col => (
                                  <option key={col.status} value={col.status}>
                                    {col.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Notes excerpt if any */}
                            {app.notes && (
                              <p className="mt-2 text-[10px] text-[#7C8490] bg-white p-1.5 rounded border border-[#E9EAE7]/70 line-clamp-2 italic">
                                "{app.notes}"
                              </p>
                            )}

                            {app.interviewDate && (
                              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#644783] font-semibold bg-[#E9E2F1]/50 p-1 rounded">
                                <Calendar className="w-3 h-3" />
                                <span>Interview: {app.interviewDate}</span>
                              </div>
                            )}

                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW B: TABLE / LIST VIEW */}
          {viewMode === 'list' && (
            <div className="bg-white border border-[#E9EAE7] rounded-radar-lg shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7F4] border-b border-[#E9EAE7] text-[#7C8490] font-semibold">
                    <tr>
                      <th className="px-4 py-3">Opportunity & Company</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Stage / Status</th>
                      <th className="px-4 py-3">Date Applied</th>
                      <th className="px-4 py-3">Deadline</th>
                      <th className="px-4 py-3">Notes & Next Steps</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9EAE7]">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-[#7C8490]">
                          No applications found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map(app => (
                        <tr key={app.id} className="hover:bg-[#F7F7F4] transition-colors">
                          <td className="px-4 py-3 font-medium text-[#202B3C]">
                            <p className="font-semibold">{app.title}</p>
                            <p className="text-[11px] text-[#7C8490]">{app.organisation}</p>
                          </td>
                          <td className="px-4 py-3 capitalize text-[#7C8490]">
                            {app.category}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                              className="bg-white border border-[#E9EAE7] rounded-md px-2 py-1 text-xs font-medium text-[#202B3C] focus:outline-none"
                            >
                              {STATUS_COLUMNS.map(col => (
                                <option key={col.status} value={col.status}>
                                  {col.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-[#7C8490] font-mono text-[11px]">
                            {app.appliedDate || '—'}
                          </td>
                          <td className="px-4 py-3 text-[#7C8490] font-mono text-[11px]">
                            {app.deadline || '—'}
                          </td>
                          <td className="px-4 py-3 max-w-xs text-[#7C8490] truncate">
                            {app.notes || app.nextStep || '—'}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(app)}
                                className="p-1 text-[#7C8490] hover:text-[#416FAD] transition-colors"
                                title="Edit notes"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteApplication(app.id)}
                                className="p-1 text-[#7C8490] hover:text-red-500 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Add / Edit Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#202B3C]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9EAE7] rounded-radar-lg shadow-modal max-w-md w-full p-6 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9EAE7] mb-4">
              <h3 className="font-heading font-semibold text-base text-[#202B3C]">
                {editingApp ? 'Update Application Details' : 'Track New Opportunity'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#7C8490] hover:text-[#202B3C]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div>
                <label className="font-semibold text-[#202B3C] block mb-1">Opportunity / Role Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Summer Systems Engineering Intern"
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none focus:border-[#416FAD]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#202B3C] block mb-1">Company / Host Organisation *</label>
                <input
                  type="text"
                  required
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  placeholder="e.g. Anthropic, Google, MIT"
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none focus:border-[#416FAD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#202B3C] block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                  >
                    <option value="internship">Internship</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="research">Research</option>
                    <option value="fellowship">Fellowship</option>
                    <option value="competition">Competition</option>
                    <option value="workshop">Workshop</option>
                    <option value="startup">Startup</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#202B3C] block mb-1">Current Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                  >
                    {STATUS_COLUMNS.map(col => (
                      <option key={col.status} value={col.status}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#202B3C] block mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#202B3C] block mb-1">Applied Date</label>
                  <input
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#202B3C] block mb-1">Next Step or Interview Schedule</label>
                <input
                  type="text"
                  value={formData.nextStep}
                  onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                  placeholder="e.g. Virtual technical interview on Nov 4 at 10 AM"
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#202B3C] block mb-1">Personal Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add recruiter contact, referral info, interview reflections, or prep questions..."
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E9EAE7] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#E9EAE7] rounded-radar text-xs font-semibold text-[#7C8490] hover:text-[#202B3C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar"
                >
                  {editingApp ? 'Save Changes' : 'Create Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
