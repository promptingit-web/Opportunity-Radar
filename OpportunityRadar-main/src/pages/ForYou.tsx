import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getPersonalizedRecommendations } from '../utils/matching';
import { OpportunityRow } from '../components/opportunities/OpportunityRow';
import { 
  Sparkles, 
  User, 
  Settings2, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  SlidersHorizontal,
  Compass,
  GraduationCap,
  Code2
} from 'lucide-react';

export const ForYou: React.FC = () => {
  const { opportunities, profile } = useApp();

  const recommendations = useMemo(() => {
    return getPersonalizedRecommendations(opportunities, profile);
  }, [opportunities, profile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Top Editorial Banner */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-8 shadow-subtle mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6EEF8] text-[#416FAD] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Transparent Rule-Based Matching Engine
            </div>

            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#202B3C] tracking-tight">
              Curated for {profile.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#7C8490] leading-relaxed">
              We score opportunities by comparing your declared academic standing ({profile.currentYear} Year, {profile.degree}), verified skills ({profile.skills.slice(0, 4).join(', ')}), and target categories against published program requirements.
            </p>
          </div>

          {/* Quick Profile Summary Badge & Edit Button */}
          <div className="flex items-center gap-3 bg-[#F7F7F4] p-3.5 rounded-radar border border-[#E9EAE7] flex-shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-11 h-11 rounded-full object-cover ring-1 ring-[#E9EAE7]"
            />
            <div className="text-xs">
              <p className="font-semibold text-[#202B3C]">{profile.name}</p>
              <p className="text-[11px] text-[#7C8490]">{profile.university.split(' ')[0]} • {profile.currentYear} Year</p>
              <Link
                to="/profile"
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#416FAD] hover:underline"
              >
                <Settings2 className="w-3 h-3" />
                Tune preferences
              </Link>
            </div>
          </div>

        </div>

        {/* Profile criteria badges */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-[#E9EAE7] text-xs">
          <span className="text-[#7C8490] font-medium mr-1">Matching against:</span>
          
          <span className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md text-[#202B3C] font-mono text-[11px]">
            🎓 {profile.currentYear} Year Standing
          </span>

          <span className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md text-[#202B3C] font-mono text-[11px]">
            💻 {profile.preferredWorkModes.join(' / ')}
          </span>

          <span className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md text-[#202B3C] font-mono text-[11px]">
            🎯 {profile.preferredCategories.slice(0, 3).join(', ')}
          </span>

          {profile.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-[#E6EEF8] text-[#416FAD] rounded-md font-mono text-[11px]">
              {skill}
            </span>
          ))}

          <Link to="/profile" className="text-[11px] text-[#416FAD] hover:underline ml-1">
            + edit {profile.skills.length - 3} more skills
          </Link>
        </div>
      </div>

      {/* Recommended Opportunities List */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between text-xs text-[#7C8490] px-1">
          <span>
            Displaying {recommendations.length} opportunities ranked by match compatibility
          </span>
          <span className="text-[#54765A] font-medium inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Deterministic match
          </span>
        </div>

        <div className="space-y-3">
          {recommendations.map(({ opportunity, score, matchReasons }) => (
            <div key={opportunity.id} className="relative">
              
              {/* Distinct Match Reasoning Banner above row */}
              <div className="bg-[#F7F7F4] border-t border-l border-r border-[#E9EAE7] rounded-t-radar-lg px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#416FAD] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {score}% Match
                  </span>
                  <span className="text-[#E9EAE7]">•</span>
                  <div className="flex flex-wrap items-center gap-2 text-[#7C8490]">
                    {matchReasons.map((reason, i) => (
                      <span key={i} className="inline-flex items-center gap-1">
                        <span className="text-[#54765A]">✓</span>
                        <span>{reason}</span>
                        {i < matchReasons.length - 1 && <span className="text-[#E9EAE7] ml-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/opportunity/${opportunity.id}`}
                  className="text-[11px] font-semibold text-[#416FAD] hover:underline hidden sm:inline"
                >
                  Inspect Match Breakdown →
                </Link>
              </div>

              {/* Opportunity Listing Row */}
              <div className="-mt-1">
                <OpportunityRow opportunity={opportunity} />
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
