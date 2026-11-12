import React from 'react';
import { Link } from 'react-router-dom';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { getDeadlineUrgency } from '../../utils/date';
import { 
  Bookmark, 
  MapPin, 
  Clock, 
  Calendar, 
  Trophy, 
  Coins, 
  GraduationCap, 
  FlaskConical, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

interface OpportunityRowProps {
  opportunity: Opportunity;
  showMatchReason?: string;
  isCompact?: boolean;
}

export const OpportunityRow: React.FC<OpportunityRowProps> = ({ 
  opportunity, 
  showMatchReason,
  isCompact = false 
}) => {
  const { toggleBookmark, isBookmarked, trackOpportunity } = useApp();
  const bookmarked = isBookmarked(opportunity.id);
  const urgency = getDeadlineUrgency(opportunity.deadline);

  // Category specific icon & badge style
  const getCategoryBadge = () => {
    switch (opportunity.category) {
      case 'internship':
        return { label: 'Internship', bg: 'bg-[#E6EEF8]', text: 'text-[#416FAD]' };
      case 'hackathon':
        return { label: 'Hackathon', bg: 'bg-[#FDF4EB]', text: 'text-[#C97835]' };
      case 'scholarship':
        return { label: 'Scholarship', bg: 'bg-[#DCE9DD]', text: 'text-[#54765A]' };
      case 'research':
        return { label: 'Research', bg: 'bg-[#E9E2F1]', text: 'text-[#644783]' };
      case 'fellowship':
        return { label: 'Fellowship', bg: 'bg-[#F3EFE6]', text: 'text-[#8A6D3B]' };
      case 'competition':
        return { label: 'Competition', bg: 'bg-[#EBF3F5]', text: 'text-[#3D7A89]' };
      case 'workshop':
        return { label: 'Workshop', bg: 'bg-[#F0F2F5]', text: 'text-[#516275]' };
      case 'startup':
        return { label: 'Startup Program', bg: 'bg-[#F7EBE8]', text: 'text-[#9E4738]' };
      default:
        return { label: opportunity.category, bg: 'bg-[#F0F2F5]', text: 'text-[#516275]' };
    }
  };

  const cat = getCategoryBadge();

  return (
    <div className="group bg-white hover:bg-[#FAFAF8] border border-[#E9EAE7] hover:border-[#D8DAD5] rounded-radar-lg p-4 sm:p-5 transition-all shadow-subtle hover:shadow-elevated relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Logo + Core Information */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Org Logo / Monogram */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-radar border border-[#E9EAE7] bg-[#F7F7F4] flex items-center justify-center text-sm font-heading font-semibold text-[#202B3C] flex-shrink-0 group-hover:border-[#416FAD]/30 transition-colors overflow-hidden">
            {opportunity.organisation.slice(0, 2).toUpperCase()}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            {/* Header tags: Category, verification, match */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${cat.bg} ${cat.text}`}>
                {cat.label}
              </span>

              {opportunity.verificationStatus === 'verified_official' && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#54765A] font-medium" title="Verified with official employer portal">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#54765A]" />
                  Verified
                </span>
              )}

              {opportunity.verificationStatus === 'demo_sample' && (
                <span className="inline-flex items-center text-[10px] text-[#7C8490] font-mono px-1.5 py-0.2 bg-[#F7F7F4] border border-[#E9EAE7] rounded">
                  Demo Sample
                </span>
              )}

              {opportunity.editorsPick && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-[#FDF4EB] text-[#E9A66B] text-[10px] font-semibold rounded">
                  <Sparkles className="w-3 h-3" />
                  Editor’s Pick
                </span>
              )}

              {showMatchReason && (
                <span className="text-[11px] text-[#416FAD] font-medium hidden md:inline-block">
                  • {showMatchReason}
                </span>
              )}
            </div>

            {/* Title & Organisation */}
            <Link 
              to={`/opportunity/${opportunity.id}`}
              className="block group/title"
            >
              <h3 className="font-heading font-semibold text-[15px] sm:text-[16px] text-[#202B3C] group-hover/title:text-[#416FAD] transition-colors leading-snug line-clamp-1">
                {opportunity.title}
              </h3>
            </Link>

            <p className="text-xs text-[#7C8490] font-medium mt-0.5">
              {opportunity.organisation}
            </p>

            {/* Category-Specific Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-[#7C8490]">
              
              {/* Work mode & Location */}
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#7C8490]" />
                <span className="capitalize">{opportunity.workMode}</span>
                {opportunity.location && opportunity.workMode !== 'remote' && (
                  <span className="text-[#7C8490]/70 truncate max-w-[140px]">
                    ({opportunity.location.split(',')[0]})
                  </span>
                )}
              </span>

              {/* Internships: Stipend & Duration */}
              {opportunity.category === 'internship' && (
                <>
                  {opportunity.duration && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {opportunity.duration}
                    </span>
                  )}
                  {opportunity.stipend && (
                    <span className="font-semibold text-[#202B3C]">
                      {opportunity.stipend}
                    </span>
                  )}
                </>
              )}

              {/* Hackathons: Prize Pool, Event Dates, Team Size */}
              {opportunity.category === 'hackathon' && (
                <>
                  {opportunity.prizePool && (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#202B3C]">
                      <Trophy className="w-3.5 h-3.5 text-[#E9A66B]" />
                      {opportunity.prizePool}
                    </span>
                  )}
                  {opportunity.teamSize && (
                    <span className="inline-flex items-center gap-1 hidden sm:inline-flex">
                      <Users className="w-3.5 h-3.5" />
                      {opportunity.teamSize}
                    </span>
                  )}
                  {opportunity.eventDate && (
                    <span className="inline-flex items-center gap-1 hidden md:inline-flex">
                      <Calendar className="w-3.5 h-3.5" />
                      {opportunity.eventDate}
                    </span>
                  )}
                </>
              )}

              {/* Scholarships: Award Amount & Eligibility */}
              {opportunity.category === 'scholarship' && (
                <>
                  {opportunity.awardAmount && (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#54765A]">
                      <Coins className="w-3.5 h-3.5 text-[#54765A]" />
                      {opportunity.awardAmount}
                    </span>
                  )}
                  <span className="truncate max-w-[200px] hidden sm:inline-block">
                    {opportunity.eligibility}
                  </span>
                </>
              )}

              {/* Research: Research Domain & Duration */}
              {opportunity.category === 'research' && (
                <>
                  {opportunity.researchDomain && (
                    <span className="inline-flex items-center gap-1 text-[#644783] font-medium">
                      <FlaskConical className="w-3.5 h-3.5" />
                      {opportunity.researchDomain}
                    </span>
                  )}
                  {opportunity.duration && (
                    <span className="inline-flex items-center gap-1 hidden sm:inline-flex">
                      <Clock className="w-3.5 h-3.5" />
                      {opportunity.duration}
                    </span>
                  )}
                </>
              )}

              {/* Competitions / Fellowships / Startups general */}
              {['fellowship', 'competition', 'workshop', 'startup'].includes(opportunity.category) && (
                <>
                  {(opportunity.stipend || opportunity.prizePool || opportunity.awardAmount) && (
                    <span className="font-semibold text-[#202B3C]">
                      {opportunity.stipend || opportunity.prizePool || opportunity.awardAmount}
                    </span>
                  )}
                  {opportunity.duration && (
                    <span className="inline-flex items-center gap-1 hidden sm:inline-flex">
                      <Clock className="w-3.5 h-3.5" />
                      {opportunity.duration}
                    </span>
                  )}
                </>
              )}

            </div>

            {/* Skills Pills */}
            {!isCompact && opportunity.requiredSkills.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {opportunity.requiredSkills.slice(0, 4).map(skill => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[11px] font-mono text-[#202B3C]/80 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {opportunity.requiredSkills.length > 4 && (
                  <span className="text-[10px] text-[#7C8490] font-mono">
                    +{opportunity.requiredSkills.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Deadline Indicator & Action Buttons */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E9EAE7] flex-shrink-0">
          
          {/* Deadline Badge */}
          <div className="text-left sm:text-right">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
              urgency.isCritical 
                ? 'bg-[#FDF4EB] text-[#C97835] font-semibold border border-[#E9A66B]/30' 
                : urgency.isUrgent
                ? 'bg-[#FDF4EB] text-[#C97835]'
                : urgency.isPastDeadline
                ? 'bg-[#F0F2F5] text-[#7C8490]'
                : 'text-[#7C8490] bg-[#F7F7F4]'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>
                {urgency.isUrgent ? urgency.label : `Deadline: ${urgency.label}`}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Quick Track Button */}
            <button
              onClick={() => trackOpportunity(opportunity, 'interested')}
              className="p-1.5 text-[#7C8490] hover:text-[#416FAD] hover:bg-[#E6EEF8] rounded-radar transition-colors"
              title="Add to application tracker"
              aria-label="Track opportunity"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(opportunity.id)}
              className={`p-1.5 rounded-radar transition-colors ${
                bookmarked
                  ? 'text-[#416FAD] bg-[#E6EEF8]'
                  : 'text-[#7C8490] hover:text-[#202B3C] hover:bg-[#F7F7F4]'
              }`}
              title={bookmarked ? 'Remove from saved' : 'Save opportunity'}
              aria-label="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* View Details button */}
            <Link
              to={`/opportunity/${opportunity.id}`}
              className="px-3 py-1.5 bg-white hover:bg-[#F7F7F4] border border-[#E9EAE7] hover:border-[#416FAD]/40 text-xs font-semibold text-[#202B3C] hover:text-[#416FAD] rounded-radar transition-all shadow-sm"
            >
              View Details
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

