import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';
import { formatFriendlyDate, getDeadlineUrgency } from '../utils/date';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay, 
  parseISO,
  isToday
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ExternalLink, 
  X, 
  Bookmark, 
  Plus, 
  Sparkles 
} from 'lucide-react';

export const DeadlineCalendar: React.FC = () => {
  const { opportunities, applications, isBookmarked, toggleBookmark, trackOpportunity } = useApp();

  // Reference calendar state: initialized to November 2026 where deadlines reside
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-11-01T00:00:00'));
  const [viewType, setViewType] = useState<'month' | 'week'>('month');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Month navigation
  const prevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const nextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
  const resetToCurrent = () => setCurrentDate(new Date('2026-11-01T00:00:00'));

  // Calendar dates generation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  // Color mapping helper
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'internship':
        return 'bg-[#E6EEF8] text-[#416FAD] border-[#416FAD]/30';
      case 'hackathon':
        return 'bg-[#FDF4EB] text-[#C97835] border-[#E9A66B]/40';
      case 'scholarship':
        return 'bg-[#DCE9DD] text-[#54765A] border-[#54765A]/30';
      case 'research':
        return 'bg-[#E9E2F1] text-[#644783] border-[#644783]/30';
      case 'fellowship':
        return 'bg-[#F3EFE6] text-[#8A6D3B] border-[#8A6D3B]/30';
      default:
        return 'bg-[#F0F2F5] text-[#516275] border-[#E9EAE7]';
    }
  };

  // Group opportunities by deadline string (YYYY-MM-DD)
  const opportunitiesByDate = useMemo(() => {
    const map = new Map<string, Opportunity[]>();
    opportunities.forEach(opp => {
      const dateKey = opp.deadline;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(opp);
    });
    return map;
  }, [opportunities]);

  // Upcoming deadlines in order
  const upcomingDeadlines = useMemo(() => {
    return [...opportunities]
      .filter(o => new Date(o.deadline).getTime() >= new Date('2026-10-31').getTime())
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 8);
  }, [opportunities]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9EAE7] mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#202B3C] tracking-tight">
            Deadline Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#7C8490] mt-0.5">
            Track program registration deadlines, application milestones, and tournament launch dates.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E6EEF8] text-[#416FAD]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#416FAD]" /> Internship
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FDF4EB] text-[#C97835]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9A66B]" /> Hackathon
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#DCE9DD] text-[#54765A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#54765A]" /> Scholarship
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E9E2F1] text-[#644783]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#644783]" /> Research
          </span>
        </div>
      </div>

      {/* Main Grid: Calendar Interface + Upcoming Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Calendar (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E9EAE7] rounded-radar-lg shadow-subtle p-5 sm:p-6">
          
          {/* Calendar Toolbar */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#E9EAE7]">
            <div className="flex items-center gap-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#202B3C]">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={resetToCurrent}
                className="px-2.5 py-1 bg-[#F7F7F4] hover:bg-[#E9EAE7] text-[#202B3C] text-xs font-semibold rounded-md border border-[#E9EAE7] transition-colors"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevMonth}
                className="p-1.5 text-[#7C8490] hover:text-[#202B3C] hover:bg-[#F7F7F4] rounded-radar transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 text-[#7C8490] hover:text-[#202B3C] hover:bg-[#F7F7F4] rounded-radar transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center font-heading font-semibold text-xs text-[#7C8490] pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarDays.map((day, idx) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(day, currentDate);
              const dayOpps = opportunitiesByDate.get(dateStr) || [];
              const isTodayCell = dateStr === '2026-10-31';

              return (
                <div
                  key={idx}
                  className={`min-h-[85px] sm:min-h-[105px] p-1.5 sm:p-2 rounded-radar border transition-all flex flex-col justify-between ${
                    isCurrentMonth 
                      ? 'bg-[#FFFFFF] border-[#E9EAE7]' 
                      : 'bg-[#F7F7F4]/50 border-transparent text-[#7C8490]/40'
                  } ${isTodayCell ? 'ring-2 ring-[#416FAD] bg-[#E6EEF8]/20' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold font-mono ${
                      isTodayCell ? 'text-[#416FAD] font-bold' : isCurrentMonth ? 'text-[#202B3C]' : 'text-[#7C8490]/50'
                    }`}>
                      {format(day, 'd')}
                    </span>
                    {dayOpps.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E9A66B]" />
                    )}
                  </div>

                  {/* Opportunities on this date */}
                  <div className="space-y-1 mt-1 flex-1 overflow-y-auto max-h-[70px]">
                    {dayOpps.map(opp => {
                      const colorClass = getCategoryColor(opp.category);
                      return (
                        <button
                          key={opp.id}
                          onClick={() => setSelectedOpportunity(opp)}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate block border transition-transform hover:scale-[1.02] ${colorClass}`}
                          title={`${opp.title} (${opp.organisation})`}
                        >
                          {opp.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Upcoming Deadlines List (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E9EAE7] rounded-radar-lg shadow-subtle p-5 text-xs">
            
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#E9EAE7]">
              <Clock className="w-4 h-4 text-[#E9A66B]" />
              <h3 className="font-heading font-semibold text-sm text-[#202B3C]">
                Upcoming Deadlines
              </h3>
            </div>

            <div className="divide-y divide-[#E9EAE7] max-h-[620px] overflow-y-auto">
              {upcomingDeadlines.map(opp => {
                const urgency = getDeadlineUrgency(opp.deadline);
                return (
                  <div
                    key={opp.id}
                    onClick={() => setSelectedOpportunity(opp)}
                    className="py-3 hover:bg-[#F7F7F4] -mx-2 px-2 rounded cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className={`font-semibold ${urgency.isUrgent ? 'text-[#C97835]' : 'text-[#416FAD]'}`}>
                        {urgency.label}
                      </span>
                      <span className="text-[#7C8490] capitalize">
                        {opp.category}
                      </span>
                    </div>

                    <h4 className="font-semibold text-[#202B3C] group-hover:text-[#416FAD] transition-colors leading-snug line-clamp-1">
                      {opp.title}
                    </h4>

                    <p className="text-[#7C8490] mt-0.5">
                      {opp.organisation} • {opp.stipend || opp.prizePool || opp.awardAmount || 'Open'}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </aside>

      </div>

      {/* Opportunity Detail Drawer Modal when clicked from Calendar */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-[#202B3C]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9EAE7] rounded-radar-lg shadow-modal max-w-lg w-full p-6 text-xs animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E9EAE7] mb-4">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#E6EEF8] text-[#416FAD] uppercase">
                  {selectedOpportunity.category}
                </span>
                <h3 className="font-heading font-bold text-base text-[#202B3C] mt-1.5 leading-snug">
                  {selectedOpportunity.title}
                </h3>
                <p className="text-[#7C8490] text-xs font-medium">
                  {selectedOpportunity.organisation} • {selectedOpportunity.location}
                </p>
              </div>

              <button
                onClick={() => setSelectedOpportunity(null)}
                className="text-[#7C8490] hover:text-[#202B3C] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-[#202B3C] leading-relaxed">
                {selectedOpportunity.description}
              </p>

              <div className="p-3 bg-[#F7F7F4] rounded-md grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#7C8490] block text-[11px]">Application Deadline:</span>
                  <span className="font-semibold text-[#C97835]">
                    {formatFriendlyDate(selectedOpportunity.deadline)}
                  </span>
                </div>
                <div>
                  <span className="text-[#7C8490] block text-[11px]">Compensation / Award:</span>
                  <span className="font-semibold text-[#202B3C]">
                    {selectedOpportunity.stipend || selectedOpportunity.prizePool || selectedOpportunity.awardAmount || '—'}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#202B3C] block mb-1.5">Required Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedOpportunity.requiredSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-white border border-[#E9EAE7] rounded text-[11px] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-[#E9EAE7] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  trackOpportunity(selectedOpportunity, 'interested');
                  setSelectedOpportunity(null);
                }}
                className="px-3.5 py-2 bg-white border border-[#E9EAE7] hover:bg-[#F7F7F4] text-[#202B3C] font-semibold rounded-radar flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Tracker
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/opportunity/${selectedOpportunity.id}`}
                  onClick={() => setSelectedOpportunity(null)}
                  className="px-4 py-2 bg-[#E6EEF8] hover:bg-[#d5e5f7] text-[#416FAD] font-semibold rounded-radar"
                >
                  View Details
                </Link>

                <a
                  href={selectedOpportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#416FAD] hover:bg-[#34598c] text-white font-semibold rounded-radar flex items-center gap-1"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
