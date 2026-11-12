import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OpportunityRow } from '../components/opportunities/OpportunityRow';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { PersonalizedDiscoveryPanel } from '../components/discovery/PersonalizedDiscoveryPanel';
import { FilterState, OpportunityCategory } from '../types';
import { getDeadlineUrgency } from '../utils/date';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  ShieldCheck, 
  SlidersHorizontal,
  GraduationCap,
  Trophy,
  Briefcase,
  FlaskConical,
  BookOpen,
  Building,
  ChevronRight
} from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  search: '',
  category: 'all',
  workModes: [],
  experienceLevels: [],
  compensationTypes: [],
  eligibleYears: [],
  skills: [],
  deadlineRange: 'all',
  sortBy: 'recommended',
  verifiedOnly: false,
};

export const Discover: React.FC = () => {
  const { opportunities, isBookmarked, toggleBookmark } = useApp();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Popular search tags
  const popularSearches = [
    'Software Engineering',
    'AI / Machine Learning',
    'Web Development',
    'Cybersecurity',
    'Research Internships',
    'Hackathons'
  ];

  // Category quick shortcuts
  const categoryShortcuts = [
    { label: 'Internships', category: 'internship' as OpportunityCategory, icon: Briefcase, count: opportunities.filter(o => o.category === 'internship').length },
    { label: 'Hackathons', category: 'hackathon' as OpportunityCategory, icon: Trophy, count: opportunities.filter(o => o.category === 'hackathon').length },
    { label: 'Scholarships', category: 'scholarship' as OpportunityCategory, icon: GraduationCap, count: opportunities.filter(o => o.category === 'scholarship').length },
    { label: 'Research', category: 'research' as OpportunityCategory, icon: FlaskConical, count: opportunities.filter(o => o.category === 'research').length },
    { label: 'Fellowships', category: 'fellowship' as OpportunityCategory, icon: BookOpen, count: opportunities.filter(o => o.category === 'fellowship').length },
    { label: 'Startups', category: 'startup' as OpportunityCategory, icon: Building, count: opportunities.filter(o => o.category === 'startup').length },
  ];

  // Editorial Featured Picks (Diverse layouts)
  const mainFeatured = useMemo(() => {
    return opportunities.find(o => o.id === 'opp-1') || opportunities[0];
  }, [opportunities]);

  const secondaryFeatured = useMemo(() => {
    return opportunities.filter(o => ['opp-2', 'opp-3'].includes(o.id));
  }, [opportunities]);

  // Main Discovery Section Filtering
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Search term
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch = 
          opp.title.toLowerCase().includes(query) ||
          opp.organisation.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          opp.requiredSkills.some(s => s.toLowerCase().includes(query)) ||
          (opp.researchDomain && opp.researchDomain.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category
      if (filters.category !== 'all' && opp.category !== filters.category) {
        return false;
      }

      // Work Mode
      if (filters.workModes.length > 0 && !filters.workModes.includes(opp.workMode)) {
        return false;
      }

      // Experience Level
      if (filters.experienceLevels.length > 0 && !filters.experienceLevels.includes(opp.experienceLevel) && opp.experienceLevel !== 'all') {
        return false;
      }

      // Compensation Type
      if (filters.compensationTypes.length > 0 && !filters.compensationTypes.includes(opp.compensationType)) {
        return false;
      }

      // Eligible Years
      if (filters.eligibleYears.length > 0) {
        const matchesYear = opp.eligibleYears.includes('all') || opp.eligibleYears.some(y => filters.eligibleYears.includes(y));
        if (!matchesYear) return false;
      }

      // Skills
      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some(fSkill => 
          opp.requiredSkills.some(rSkill => rSkill.toLowerCase().includes(fSkill.toLowerCase()))
        );
        if (!hasSkill) return false;
      }

      // Deadline range
      if (filters.deadlineRange !== 'all') {
        const urgency = getDeadlineUrgency(opp.deadline);
        if (filters.deadlineRange === 'week' && (!urgency.isUrgent || urgency.isPastDeadline)) return false;
        if (filters.deadlineRange === 'month' && (urgency.daysRemaining > 30 || urgency.isPastDeadline)) return false;
        if (filters.deadlineRange === 'flexible' && urgency.daysRemaining <= 30) return false;
      }

      // Verified Only
      if (filters.verifiedOnly && opp.verificationStatus !== 'verified_official') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'deadline-soon') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (filters.sortBy === 'recently-added') {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      // default: recommended (editorsPick first, then nearest deadline)
      if (a.editorsPick && !b.editorsPick) return -1;
      if (!a.editorsPick && b.editorsPick) return 1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [opportunities, filters]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters(prev => ({ ...prev, search: searchInput }));
      // Scroll smoothly to discovery section
      const section = document.getElementById('discovery-feed');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchInput(tag);
    setFilters(prev => ({ ...prev, search: tag }));
    const section = document.getElementById('discovery-feed');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (category: OpportunityCategory | 'all') => {
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <div className="min-h-screen">
      
      {/* SECTION B: HERO / SEARCH SECTION */}
      <section className="bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F7F7F4] border-b border-[#E9EAE7] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6EEF8] border border-[#416FAD]/20 rounded-full text-xs font-semibold text-[#416FAD] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#416FAD] animate-pulse" />
            Active 2026/2027 Student Opportunities
          </div>

          {/* Editorial Main Heading */}
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#202B3C] tracking-tight max-w-3xl mx-auto leading-[1.15]">
            Your next big opportunity is out there.
          </h1>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base text-[#7C8490] max-w-2xl mx-auto leading-relaxed">
            Discover internships, hackathons, scholarships and experiences that move your ambitions forward.
          </p>

          {/* Search Bar Interface */}
          <form onSubmit={handleHeroSearch} className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white border border-[#E9EAE7] rounded-radar-lg shadow-elevated p-2 focus-within:border-[#416FAD] transition-all">
              <Search className="w-5 h-5 text-[#7C8490] ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search roles, hackathons, scholarships, skills..."
                className="w-full px-3 py-2 bg-transparent text-sm text-[#202B3C] placeholder-[#7C8490] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-colors flex-shrink-0"
              >
                Explore opportunities
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#7C8490] font-medium mr-1">Popular:</span>
            {popularSearches.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 bg-white hover:bg-[#E6EEF8] text-[#202B3C] hover:text-[#416FAD] border border-[#E9EAE7] rounded-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Category Shortcuts */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {categoryShortcuts.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.category}
                  onClick={() => {
                    handleTabClick(item.category);
                    const section = document.getElementById('discovery-feed');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-white hover:bg-[#F7F7F4] border border-[#E9EAE7] hover:border-[#416FAD]/40 rounded-radar-lg transition-all group text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F7F7F4] group-hover:bg-[#E6EEF8] flex items-center justify-center mb-2 transition-colors">
                    <Icon className="w-4 h-4 text-[#7C8490] group-hover:text-[#416FAD]" />
                  </div>
                  <span className="text-xs font-semibold text-[#202B3C] group-hover:text-[#416FAD]">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#7C8490] mt-0.5">
                    {item.count} open
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION C: EDITORIAL FEATURED / EDITOR'S PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E9A66B]" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#202B3C] tracking-tight">
                Editor’s Picks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#7C8490] mt-1">
              Opportunities worth your attention.
            </p>
          </div>
          <Link
            to="/explore?editorsPick=true"
            className="text-xs font-semibold text-[#416FAD] hover:underline flex items-center gap-1"
          >
            View all curated <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Varied Featured Layout (1 Prominent Horizontal + 2 Compact Side Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Prominent Featured Opportunity (7 Cols) */}
          {mainFeatured && (
            <div className="lg:col-span-7 bg-white border border-[#E9EAE7] hover:border-[#416FAD]/40 rounded-radar-lg p-6 sm:p-7 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-[#E6EEF8] text-[#416FAD]">
                      Featured Internship
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#54765A] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FDF4EB] text-[#C97835] text-xs font-semibold rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    Closing in 5 days
                  </div>
                </div>

                <div className="flex items-start gap-4 mt-2">
                  <div className="w-14 h-14 rounded-radar bg-[#F7F7F4] border border-[#E9EAE7] flex items-center justify-center font-heading font-bold text-base text-[#202B3C] flex-shrink-0">
                    {mainFeatured.organisation.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#202B3C] group-hover:text-[#416FAD] transition-colors leading-snug">
                      <Link to={`/opportunity/${mainFeatured.id}`}>
                        {mainFeatured.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#7C8490] font-medium mt-0.5">
                      {mainFeatured.organisation} • {mainFeatured.location} ({mainFeatured.workMode})
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#7C8490] leading-relaxed line-clamp-3">
                  {mainFeatured.description}
                </p>

                {mainFeatured.editorialNote && (
                  <div className="mt-3.5 p-3 bg-[#F7F7F4] rounded-md border-l-2 border-[#416FAD] text-xs text-[#202B3C] italic">
                    "{mainFeatured.editorialNote}"
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9EAE7] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#7C8490] block">Stipend</span>
                  <span className="font-semibold text-sm text-[#202B3C]">
                    {mainFeatured.stipend}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(mainFeatured.id)}
                    className="p-2 text-[#7C8490] hover:text-[#416FAD] hover:bg-[#E6EEF8] rounded-radar transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked(mainFeatured.id) ? 'fill-current text-[#416FAD]' : ''}`} />
                  </button>
                  <Link
                    to={`/opportunity/${mainFeatured.id}`}
                    className="px-4 py-2 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-colors"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Two Smaller Complementary Featured Opportunities (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {secondaryFeatured.map(opp => {
              const urgency = getDeadlineUrgency(opp.deadline);
              return (
                <div
                  key={opp.id}
                  className="bg-white border border-[#E9EAE7] hover:border-[#416FAD]/40 rounded-radar-lg p-5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group flex-1"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-[#FDF4EB] text-[#C97835]">
                        {opp.category.toUpperCase()}
                      </span>
                      <span className="text-[#7C8490] font-medium text-[11px]">
                        Deadline: {urgency.label}
                      </span>
                    </div>

                    <Link to={`/opportunity/${opp.id}`}>
                      <h4 className="font-heading font-semibold text-base text-[#202B3C] group-hover:text-[#416FAD] transition-colors leading-snug line-clamp-2">
                        {opp.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#7C8490] mt-0.5">
                      {opp.organisation} • {opp.location}
                    </p>

                    <p className="text-xs text-[#7C8490] mt-2 line-clamp-2">
                      {opp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E9EAE7] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#202B3C]">
                      {opp.prizePool || opp.awardAmount || opp.stipend}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        className="p-1.5 text-[#7C8490] hover:text-[#416FAD] rounded transition-colors"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(opp.id) ? 'fill-current text-[#416FAD]' : ''}`} />
                      </button>
                      <Link
                        to={`/opportunity/${opp.id}`}
                        className="font-semibold text-[#416FAD] hover:underline flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION D: EXPLORE OPPORTUNITIES (THREE-COLUMN DISCOVERY SECTION) */}
      <section id="discovery-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9EAE7]">
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#202B3C] tracking-tight">
              Explore opportunities
            </h2>
            <p className="text-xs text-[#7C8490] mt-0.5">
              Showing {filteredOpportunities.length} opportunities matching your criteria
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(prev => !prev)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E9EAE7] text-xs font-semibold text-[#202B3C] rounded-radar"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#7C8490] hidden sm:inline-block">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-white border border-[#E9EAE7] rounded-radar px-3 py-1.5 text-xs text-[#202B3C] font-medium focus:outline-none focus:border-[#416FAD]"
              >
                <option value="recommended">Recommended</option>
                <option value="deadline-soon">Deadline Soon</option>
                <option value="recently-added">Recently Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none border-b border-[#E9EAE7] mb-6">
          {[
            { label: 'All', value: 'all' },
            { label: 'Internships', value: 'internship' },
            { label: 'Hackathons', value: 'hackathon' },
            { label: 'Scholarships', value: 'scholarship' },
            { label: 'Research', value: 'research' },
            { label: 'Fellowships', value: 'fellowship' },
            { label: 'Competitions', value: 'competition' },
            { label: 'Workshops', value: 'workshop' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value as any)}
              className={`px-3 py-1.5 rounded-radar text-xs font-medium whitespace-nowrap transition-colors ${
                filters.category === tab.value
                  ? 'bg-[#202B3C] text-white font-semibold'
                  : 'bg-white text-[#7C8490] hover:text-[#202B3C] border border-[#E9EAE7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* THREE-COLUMN DISCOVERY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: FILTER SIDEBAR (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(INITIAL_FILTERS)}
              resultCount={filteredOpportunities.length}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-[#202B3C]/50 flex justify-end">
              <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-base text-[#202B3C]">Filters</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-[#7C8490]">
                    ✕ Close
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onChange={setFilters}
                  onReset={() => setFilters(INITIAL_FILTERS)}
                  resultCount={filteredOpportunities.length}
                />
              </div>
            </div>
          )}

          {/* CENTRE COLUMN: OPPORTUNITY LISTINGS (6 cols) */}
          <main className="lg:col-span-6 space-y-3">
            {filteredOpportunities.length === 0 ? (
              <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-12 text-center">
                <Search className="w-8 h-8 text-[#7C8490] mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-base text-[#202B3C]">
                  No opportunities match your filter
                </h3>
                <p className="text-xs text-[#7C8490] mt-1 max-w-sm mx-auto">
                  Try adjusting your keywords, broadening academic standing, or clearing category restrictions.
                </p>
                <button
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  className="mt-4 px-4 py-2 bg-[#E6EEF8] text-[#416FAD] text-xs font-semibold rounded-radar hover:bg-[#d6e4f5] transition-colors"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredOpportunities.map(opp => (
                <OpportunityRow key={opp.id} opportunity={opp} />
              ))
            )}
          </main>

          {/* RIGHT COLUMN: PERSONALISED DISCOVERY PANEL (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <PersonalizedDiscoveryPanel />
          </div>

        </div>

      </section>

    </div>
  );
};
