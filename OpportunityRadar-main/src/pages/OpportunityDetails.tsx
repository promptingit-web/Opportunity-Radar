import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { checkEligibility, computeSkillGap } from '../utils/matching';
import { getDeadlineUrgency, formatFriendlyDate } from '../utils/date';
import { OpportunityRow } from '../components/opportunities/OpportunityRow';
import { 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Briefcase, 
  Sparkles, 
  Plus, 
  Check, 
  Layers, 
  GraduationCap
} from 'lucide-react';

export const OpportunityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    opportunities, 
    profile, 
    isBookmarked, 
    toggleBookmark, 
    trackOpportunity, 
    applications,
    showToast 
  } = useApp();

  const opportunity = useMemo(() => {
    return opportunities.find(o => o.id === id);
  }, [opportunities, id]);

  const bookmarked = opportunity ? isBookmarked(opportunity.id) : false;
  const existingApp = opportunity ? applications.find(a => a.opportunityId === opportunity.id) : undefined;

  const eligibility = useMemo(() => {
    if (!opportunity) return null;
    return checkEligibility(opportunity, profile);
  }, [opportunity, profile]);

  const skillGap = useMemo(() => {
    if (!opportunity) return null;
    return computeSkillGap(opportunity, profile);
  }, [opportunity, profile]);

  // Related opportunities in the same category
  const relatedOpportunities = useMemo(() => {
    if (!opportunity) return [];
    return opportunities
      .filter(o => o.id !== opportunity.id && (o.category === opportunity.category || o.workMode === opportunity.workMode))
      .slice(0, 3);
  }, [opportunities, opportunity]);

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-heading font-semibold text-[#202B3C]">
          Opportunity not found
        </h2>
        <p className="text-xs text-[#7C8490] mt-1">
          The opportunity you are looking for may have expired or was removed.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#416FAD] text-white text-xs font-semibold rounded-radar"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Discover
        </Link>
      </div>
    );
  }

  const urgency = getDeadlineUrgency(opportunity.deadline);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${opportunity.title} — ${opportunity.organisation}`,
        text: opportunity.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C8490] hover:text-[#202B3C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to previous
        </button>
      </div>

      {/* Editorial Header Section */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-8 shadow-subtle mb-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E9EAE7]">
          
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-radar bg-[#F7F7F4] border border-[#E9EAE7] flex items-center justify-center font-heading font-bold text-xl text-[#202B3C] flex-shrink-0">
              {opportunity.organisation.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-[#E6EEF8] text-[#416FAD] capitalize">
                  {opportunity.category}
                </span>

                {opportunity.verificationStatus === 'verified_official' ? (
                  <span className="inline-flex items-center gap-1 text-xs text-[#54765A] font-medium bg-[#DCE9DD]/50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Official Source
                  </span>
                ) : opportunity.verificationStatus === 'demo_sample' ? (
                  <span className="text-[11px] text-[#7C8490] font-mono px-2 py-0.5 bg-[#F7F7F4] border border-[#E9EAE7] rounded">
                    Demo Listing
                  </span>
                ) : (
                  <span className="text-xs text-[#7C8490] px-2 py-0.5 bg-[#F7F7F4] rounded">
                    Community Curated
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs text-[#7C8490]">
                  <MapPin className="w-3.5 h-3.5" />
                  {opportunity.location} ({opportunity.workMode})
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#202B3C] leading-snug">
                {opportunity.title}
              </h1>

              <p className="text-sm font-medium text-[#7C8490] mt-1 flex items-center gap-2">
                <span>{opportunity.organisation}</span>
                {opportunity.organisationWebsite && (
                  <a
                    href={opportunity.organisationWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#416FAD] hover:underline inline-flex items-center gap-0.5 text-xs"
                  >
                    Visit website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            
            <button
              onClick={() => toggleBookmark(opportunity.id)}
              className={`p-2.5 rounded-radar border transition-all ${
                bookmarked
                  ? 'bg-[#E6EEF8] text-[#416FAD] border-[#416FAD]/30'
                  : 'bg-white text-[#7C8490] hover:text-[#202B3C] border-[#E9EAE7]'
              }`}
              title={bookmarked ? 'Saved' : 'Save opportunity'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 bg-white text-[#7C8490] hover:text-[#202B3C] border border-[#E9EAE7] rounded-radar transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {existingApp ? (
              <Link
                to="/my-opportunities"
                className="px-4 py-2.5 bg-[#DCE9DD] text-[#54765A] text-xs font-semibold rounded-radar flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Tracked: {existingApp.status.toUpperCase()}
              </Link>
            ) : (
              <button
                onClick={() => trackOpportunity(opportunity, 'interested')}
                className="px-4 py-2.5 bg-white hover:bg-[#F7F7F4] border border-[#E9EAE7] text-[#202B3C] text-xs font-semibold rounded-radar transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Tracker
              </button>
            )}

            {/* Apply Now (Direct to genuine destination) */}
            <a
              href={opportunity.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-all flex items-center gap-2 shadow-sm"
            >
              Apply Now
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div>
            <span className="text-[#7C8490] block">Compensation / Award</span>
            <span className="font-semibold text-[#202B3C] text-sm mt-0.5 block">
              {opportunity.stipend || opportunity.prizePool || opportunity.awardAmount || 'Unpaid / Open'}
            </span>
          </div>

          <div>
            <span className="text-[#7C8490] block">Application Deadline</span>
            <span className={`font-semibold text-sm mt-0.5 block ${urgency.isUrgent ? 'text-[#C97835]' : 'text-[#202B3C]'}`}>
              {formatFriendlyDate(opportunity.deadline)} ({urgency.label})
            </span>
          </div>

          <div>
            <span className="text-[#7C8490] block">Duration / Schedule</span>
            <span className="font-semibold text-[#202B3C] text-sm mt-0.5 block">
              {opportunity.duration || opportunity.eventDate || 'Flexible Timeline'}
            </span>
          </div>

          <div>
            <span className="text-[#7C8490] block">Experience Level</span>
            <span className="font-semibold text-[#202B3C] text-sm mt-0.5 block capitalize">
              {opportunity.experienceLevel}
            </span>
          </div>
        </div>

      </div>

      {/* Main Content Layout (2 Columns: Information Content + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SPECIAL FEATURE B & C: ELIGIBILITY & SKILL GAP RADAR */}
          <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-5 shadow-subtle space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E9EAE7]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#416FAD]" />
                <h3 className="font-heading font-semibold text-sm text-[#202B3C]">
                  Your Profile Match & Eligibility Assessment
                </h3>
              </div>

              {eligibility && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  eligibility.status === 'likely_eligible'
                    ? 'bg-[#DCE9DD] text-[#54765A]'
                    : eligibility.status === 'check_requirements'
                    ? 'bg-[#FDF4EB] text-[#C97835]'
                    : 'bg-[#F0F2F5] text-[#7C8490]'
                }`}>
                  {eligibility.status === 'likely_eligible' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {eligibility.status === 'check_requirements' && <AlertCircle className="w-3.5 h-3.5" />}
                  {eligibility.status === 'not_eligible' && <HelpCircle className="w-3.5 h-3.5" />}
                  {eligibility.label}
                </span>
              )}
            </div>

            {/* Eligibility transparent reasons */}
            {eligibility && (
              <div className="text-xs space-y-1.5 bg-[#F7F7F4] p-3.5 rounded-md">
                <span className="font-semibold text-[#202B3C] block mb-1">
                  Eligibility Breakdown for {profile.name} ({profile.currentYear} Year, {profile.degree}):
                </span>
                {eligibility.reasons.map((reason, idx) => (
                  <p key={idx} className="text-[#7C8490] flex items-start gap-2">
                    <span className="text-[#416FAD] mt-0.5">•</span>
                    <span>{reason}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Skill Gap Analysis */}
            {skillGap && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#202B3C]">
                    Skill Alignment ({skillGap.matchPercentage}% match)
                  </span>
                  <span className="text-[11px] text-[#7C8490]">
                    {skillGap.matchedSkills.length} matched / {skillGap.missingSkills.length} missing
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#E9EAE7] rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-[#416FAD] rounded-full transition-all duration-500" 
                    style={{ width: `${skillGap.matchPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Matched */}
                  <div className="p-3 bg-[#DCE9DD]/30 border border-[#DCE9DD] rounded-md">
                    <span className="font-semibold text-[#54765A] block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Skills You Have ({skillGap.matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {skillGap.matchedSkills.length > 0 ? (
                        skillGap.matchedSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-white text-[#54765A] text-[11px] font-mono rounded border border-[#DCE9DD]">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-[#7C8490]">No direct skill matches found in profile.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="p-3 bg-[#FDF4EB]/50 border border-[#FDF4EB] rounded-md">
                    <span className="font-semibold text-[#C97835] block mb-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Skills to Review ({skillGap.missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {skillGap.missingSkills.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-white text-[#C97835] text-[11px] font-mono rounded border border-[#FDF4EB]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#7C8490] mt-2 italic">
                  * Skill gap analysis is an informational guide to help tailor your resume and preparation, not an automated disqualifier.
                </p>
              </div>
            )}

          </section>

          {/* Section: About Opportunity */}
          <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-7 shadow-subtle">
            <h2 className="font-heading font-semibold text-lg text-[#202B3C] mb-3">
              About the Opportunity
            </h2>
            <p className="text-xs sm:text-sm text-[#202B3C] leading-relaxed whitespace-pre-line">
              {opportunity.fullDescription || opportunity.description}
            </p>
          </section>

          {/* Section: Key Responsibilities */}
          {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
            <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-7 shadow-subtle">
              <h2 className="font-heading font-semibold text-lg text-[#202B3C] mb-3">
                Responsibilities & Work Scope
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#202B3C]">
                {opportunity.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#416FAD] mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section: Eligibility & Requirements */}
          <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-7 shadow-subtle">
            <h2 className="font-heading font-semibold text-lg text-[#202B3C] mb-3">
              Eligibility & Academic Criteria
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <p className="text-[#202B3C] leading-relaxed">
                {opportunity.eligibility}
              </p>

              <div>
                <span className="font-semibold text-[#202B3C] block mb-2">
                  Eligible Academic Years:
                </span>
                <div className="flex flex-wrap gap-2">
                  {opportunity.eligibleYears.map(yr => (
                    <span key={yr} className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md font-mono text-xs text-[#202B3C]">
                      {yr === 'all' ? 'All Academic Standings' : `${yr} Year`}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#202B3C] block mb-2">
                  Required & Preferred Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {opportunity.requiredSkills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-[#E6EEF8] text-[#416FAD] text-xs font-mono font-medium rounded-md">
                      {skill}
                    </span>
                  ))}
                  {opportunity.preferredSkills?.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-[#F7F7F4] text-[#7C8490] text-xs font-mono rounded-md border border-[#E9EAE7]">
                      {skill} (preferred)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Benefits & Perks */}
          {opportunity.benefits && opportunity.benefits.length > 0 && (
            <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-7 shadow-subtle">
              <h2 className="font-heading font-semibold text-lg text-[#202B3C] mb-3">
                Benefits, Perks & Support
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#202B3C]">
                {opportunity.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#54765A] mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section: Application Process */}
          {opportunity.applicationProcess && opportunity.applicationProcess.length > 0 && (
            <section className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-7 shadow-subtle">
              <h2 className="font-heading font-semibold text-lg text-[#202B3C] mb-3">
                Application & Selection Process
              </h2>
              <div className="space-y-3">
                {opportunity.applicationProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#E6EEF8] text-[#416FAD] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-[#202B3C] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Sidebar: Key Facts & Metadata (4 cols) */}
        <aside className="lg:col-span-4 space-y-6 sticky top-20">
          
          <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-5 shadow-subtle text-xs space-y-4">
            <h3 className="font-heading font-semibold text-sm text-[#202B3C] pb-2 border-b border-[#E9EAE7]">
              Program Overview
            </h3>

            <div className="space-y-3 divide-y divide-[#E9EAE7]/70">
              
              <div className="pt-2">
                <span className="text-[#7C8490] block">Host Organisation</span>
                <span className="font-semibold text-[#202B3C] mt-0.5 block">
                  {opportunity.organisation}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[#7C8490] block">Application Deadline</span>
                <span className={`font-semibold mt-0.5 block ${urgency.isUrgent ? 'text-[#C97835]' : 'text-[#202B3C]'}`}>
                  {formatFriendlyDate(opportunity.deadline)}
                </span>
                <span className="text-[11px] text-[#7C8490]">
                  {urgency.label}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[#7C8490] block">Program Category</span>
                <span className="font-semibold text-[#202B3C] capitalize mt-0.5 block">
                  {opportunity.category}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[#7C8490] block">Location & Mode</span>
                <span className="font-semibold text-[#202B3C] mt-0.5 block">
                  {opportunity.location} ({opportunity.workMode})
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[#7C8490] block">Verification Source</span>
                <div className="mt-1">
                  <a
                    href={opportunity.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#416FAD] hover:underline font-medium"
                  >
                    <span>{opportunity.sourceName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[#7C8490] block">Catalog Entry Added</span>
                <span className="text-[#7C8490] mt-0.5 block font-mono text-[11px]">
                  {formatFriendlyDate(opportunity.dateAdded)}
                </span>
              </div>

            </div>

            {/* Bottom Direct CTA */}
            <div className="pt-3 border-t border-[#E9EAE7]">
              <a
                href={opportunity.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-colors flex items-center justify-center gap-2"
              >
                Apply on Official Site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-center text-[#7C8490] mt-2">
                OpportunityRadar redirects directly to the official employer or institution application page.
              </p>
            </div>

          </div>

          {/* Related Opportunities */}
          {relatedOpportunities.length > 0 && (
            <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-5 shadow-subtle">
              <h3 className="font-heading font-semibold text-sm text-[#202B3C] mb-3">
                Related Opportunities
              </h3>
              <div className="divide-y divide-[#E9EAE7]">
                {relatedOpportunities.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/opportunity/${rel.id}`}
                    className="py-3 block hover:bg-[#F7F7F4] -mx-2 px-2 rounded transition-colors group"
                  >
                    <p className="text-xs font-semibold text-[#202B3C] group-hover:text-[#416FAD] transition-colors line-clamp-1">
                      {rel.title}
                    </p>
                    <p className="text-[11px] text-[#7C8490] mt-0.5">
                      {rel.organisation} • {rel.location}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>

      </div>

    </div>
  );
};
