import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getPersonalizedRecommendations } from '../../utils/matching';
import { getDeadlineUrgency } from '../../utils/date';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Briefcase, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const PersonalizedDiscoveryPanel: React.FC = () => {
  const { profile, opportunities, applications } = useApp();
  
  // Top 3 personalized matches
  const topRecommendations = getPersonalizedRecommendations(opportunities, profile).slice(0, 3);

  // Closing soon opportunities (deadline <= 7 days)
  const closingSoonOpps = opportunities
    .filter(opp => {
      const urgency = getDeadlineUrgency(opp.deadline);
      return urgency.isUrgent && !urgency.isPastDeadline;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Status counts from applications
  const interviewCount = applications.filter(a => a.status === 'interview').length;
  const activeCount = applications.filter(a => ['applied', 'assessment', 'interview', 'shortlisted'].includes(a.status)).length;

  return (
    <aside className="space-y-5">
      
      {/* Student Profile Snapshot Widget */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E9EAE7]"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#202B3C] truncate">
              {profile.name}
            </h4>
            <p className="text-[11px] text-[#7C8490] truncate">
              {profile.currentYear} Year • {profile.university.split(' ')[0]}
            </p>
          </div>
          <Link
            to="/profile"
            className="text-[11px] font-semibold text-[#416FAD] hover:underline"
          >
            Edit
          </Link>
        </div>

        {/* Application Tracker Progress Bar */}
        <div className="mt-3.5 pt-3 border-t border-[#E9EAE7] flex items-center justify-between text-xs">
          <span className="text-[#7C8490] flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#416FAD]" />
            Active Applications
          </span>
          <div className="flex items-center gap-2">
            {interviewCount > 0 && (
              <span className="px-2 py-0.5 bg-[#FDF4EB] text-[#E9A66B] text-[10px] font-bold rounded-full">
                {interviewCount} Interview
              </span>
            )}
            <span className="font-semibold text-[#202B3C]">
              {activeCount}
            </span>
          </div>
        </div>
      </div>

      {/* Deadline Radar (Closing Soon) */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#E9A66B]" />
            <h4 className="font-heading font-semibold text-xs text-[#202B3C]">
              Deadline Radar
            </h4>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#FDF4EB] text-[#E9A66B] font-bold rounded">
            Closing Soon
          </span>
        </div>

        <div className="divide-y divide-[#E9EAE7]">
          {closingSoonOpps.map(opp => {
            const urgency = getDeadlineUrgency(opp.deadline);
            return (
              <Link
                key={opp.id}
                to={`/opportunity/${opp.id}`}
                className="py-2.5 block hover:bg-[#F7F7F4] -mx-2 px-2 rounded transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#202B3C] group-hover:text-[#416FAD] truncate transition-colors">
                      {opp.title}
                    </p>
                    <p className="text-[11px] text-[#7C8490]">
                      {opp.organisation}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C97835] whitespace-nowrap">
                    {urgency.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/calendar"
          className="mt-3 block text-center py-1.5 text-[11px] font-medium text-[#416FAD] hover:underline"
        >
          View all deadlines in Calendar →
        </Link>
      </div>

      {/* Curated Collections */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 shadow-subtle">
        <div className="flex items-center gap-1.5 mb-3">
          <Layers className="w-4 h-4 text-[#416FAD]" />
          <h4 className="font-heading font-semibold text-xs text-[#202B3C]">
            Curated Collections
          </h4>
        </div>

        <div className="space-y-1.5">
          <Link
            to="/explore?category=internship&workMode=remote"
            className="flex items-center justify-between p-2 rounded hover:bg-[#F7F7F4] text-xs text-[#202B3C] transition-colors"
          >
            <span>Remote Software Internships</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7C8490]" />
          </Link>
          <Link
            to="/explore?category=hackathon"
            className="flex items-center justify-between p-2 rounded hover:bg-[#F7F7F4] text-xs text-[#202B3C] transition-colors"
          >
            <span>High-Prize Hackathons 2026/27</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7C8490]" />
          </Link>
          <Link
            to="/explore?category=research"
            className="flex items-center justify-between p-2 rounded hover:bg-[#F7F7F4] text-xs text-[#202B3C] transition-colors"
          >
            <span>Undergraduate Lab Fellowships</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7C8490]" />
          </Link>
          <Link
            to="/explore?compensationType=funded"
            className="flex items-center justify-between p-2 rounded hover:bg-[#F7F7F4] text-xs text-[#202B3C] transition-colors"
          >
            <span>Fully Funded Programs</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7C8490]" />
          </Link>
        </div>
      </div>

      {/* Top Matches Preview */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#416FAD]" />
            <h4 className="font-heading font-semibold text-xs text-[#202B3C]">
              Matched For You
            </h4>
          </div>
          <Link to="/for-you" className="text-[11px] text-[#416FAD] hover:underline font-medium">
            See all
          </Link>
        </div>

        <div className="space-y-3">
          {topRecommendations.map(({ opportunity, matchReasons }) => (
            <div key={opportunity.id} className="p-2.5 bg-[#F7F7F4] rounded-md border border-[#E9EAE7]/80">
              <Link to={`/opportunity/${opportunity.id}`} className="group">
                <p className="text-xs font-semibold text-[#202B3C] group-hover:text-[#416FAD] transition-colors line-clamp-1">
                  {opportunity.title}
                </p>
                <p className="text-[11px] text-[#7C8490] mt-0.5">
                  {opportunity.organisation}
                </p>
              </Link>
              {matchReasons[0] && (
                <p className="text-[10px] text-[#416FAD] mt-1.5 font-medium leading-tight">
                  ✓ {matchReasons[0]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};

