import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OpportunityRow } from '../components/opportunities/OpportunityRow';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { FilterState, OpportunityCategory, WorkMode, CompensationType } from '../types';
import { getDeadlineUrgency } from '../utils/date';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const Explore: React.FC = () => {
  const { opportunities } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('q') || '',
    category: (searchParams.get('category') as OpportunityCategory) || 'all',
    workModes: searchParams.get('workMode') ? [searchParams.get('workMode') as WorkMode] : [],
    experienceLevels: [],
    compensationTypes: searchParams.get('compensationType') ? [searchParams.get('compensationType') as CompensationType] : [],
    eligibleYears: [],
    skills: searchParams.get('skill') ? [searchParams.get('skill')!] : [],
    deadlineRange: 'all',
    sortBy: 'recommended',
    verifiedOnly: searchParams.get('verified') === 'true',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const cat = searchParams.get('category') as OpportunityCategory;
    if (cat && cat !== filters.category) {
      setFilters(prev => ({ ...prev, category: cat }));
    }
  }, [searchParams]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Query
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
      // default: recommended
      if (a.editorsPick && !b.editorsPick) return -1;
      if (!a.editorsPick && b.editorsPick) return 1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [opportunities, filters]);

  // Remove individual active filter chip
  const removeFilterChip = (type: string, value?: string) => {
    if (type === 'category') setFilters(prev => ({ ...prev, category: 'all' }));
    if (type === 'search') setFilters(prev => ({ ...prev, search: '' }));
    if (type === 'deadline') setFilters(prev => ({ ...prev, deadlineRange: 'all' }));
    if (type === 'verified') setFilters(prev => ({ ...prev, verifiedOnly: false }));
    if (type === 'workMode' && value) {
      setFilters(prev => ({ ...prev, workModes: prev.workModes.filter(m => m !== value) }));
    }
    if (type === 'skill' && value) {
      setFilters(prev => ({ ...prev, skills: prev.skills.filter(s => s !== value) }));
    }
    if (type === 'year' && value) {
      setFilters(prev => ({ ...prev, eligibleYears: prev.eligibleYears.filter(y => y !== value) }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
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
    });
  };

  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (filters.search) {
    activeChips.push({ label: `"${filters.search}"`, onRemove: () => removeFilterChip('search') });
  }
  if (filters.category !== 'all') {
    activeChips.push({ label: `Category: ${filters.category}`, onRemove: () => removeFilterChip('category') });
  }
  if (filters.deadlineRange !== 'all') {
    activeChips.push({ label: `Deadline: ${filters.deadlineRange}`, onRemove: () => removeFilterChip('deadline') });
  }
  if (filters.verifiedOnly) {
    activeChips.push({ label: 'Verified Sources Only', onRemove: () => removeFilterChip('verified') });
  }
  filters.workModes.forEach(m => {
    activeChips.push({ label: `Mode: ${m}`, onRemove: () => removeFilterChip('workMode', m) });
  });
  filters.skills.forEach(s => {
    activeChips.push({ label: `Skill: ${s}`, onRemove: () => removeFilterChip('skill', s) });
  });
  filters.eligibleYears.forEach(y => {
    activeChips.push({ label: `Year: ${y}`, onRemove: () => removeFilterChip('year', y) });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Search Header Bar */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-4 sm:p-5 shadow-subtle mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7C8490] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search across 28+ verified student opportunities..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] placeholder-[#7C8490] focus:outline-none focus:border-[#416FAD] transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8490] hover:text-[#202B3C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] text-xs font-medium text-[#202B3C] rounded-radar flex-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C8490]" />
              Filters ({activeChips.length})
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7C8490] hidden sm:inline">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs text-[#202B3C] font-medium focus:outline-none focus:border-[#416FAD]"
              >
                <option value="recommended">Recommended</option>
                <option value="deadline-soon">Nearest Deadline</option>
                <option value="recently-added">Recently Added</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#E9EAE7]">
            <span className="text-[11px] text-[#7C8490] font-medium">Active filters:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#E6EEF8] text-[#416FAD] text-xs font-medium rounded-full"
              >
                {chip.label}
                <button
                  onClick={chip.onRemove}
                  className="hover:text-[#202B3C] ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-[#7C8490] hover:text-[#202B3C] underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Desktop Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={clearAllFilters}
            resultCount={filteredOpportunities.length}
          />
        </div>

        {/* Mobile Filter Sheet */}
        {mobileFilterOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#202B3C]/50 flex justify-end">
            <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9EAE7] mb-4">
                <span className="font-heading font-semibold text-sm text-[#202B3C]">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-xs text-[#7C8490]">
                  Done
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={clearAllFilters}
                resultCount={filteredOpportunities.length}
              />
            </div>
          </div>
        )}

        {/* Right Listings Column */}
        <div className="md:col-span-8 lg:col-span-9 space-y-3">
          
          <div className="flex items-center justify-between text-xs text-[#7C8490] px-1 pb-1">
            <span>Showing {filteredOpportunities.length} matching results</span>
            <span>All verified student listings</span>
          </div>

          {filteredOpportunities.length === 0 ? (
            <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-12 text-center">
              <Layers className="w-8 h-8 text-[#7C8490] mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-base text-[#202B3C]">
                No matching opportunities found
              </h3>
              <p className="text-xs text-[#7C8490] mt-1 max-w-sm mx-auto">
                Try widening your search terms or clearing one or more active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 bg-[#E6EEF8] text-[#416FAD] text-xs font-semibold rounded-radar hover:bg-[#d6e4f5] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredOpportunities.map(opp => (
              <OpportunityRow key={opp.id} opportunity={opp} />
            ))
          )}
        </div>

      </div>

    </div>
  );
};
