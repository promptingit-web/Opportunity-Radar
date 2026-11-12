import React from 'react';
import { FilterState, OpportunityCategory, WorkMode, ExperienceLevel, CompensationType, AcademicYear } from '../../types';
import { RotateCcw, X, Check, ShieldCheck } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  resultCount
}) => {
  const categories: { label: string; value: OpportunityCategory }[] = [
    { label: 'Internships', value: 'internship' },
    { label: 'Hackathons', value: 'hackathon' },
    { label: 'Scholarships', value: 'scholarship' },
    { label: 'Research', value: 'research' },
    { label: 'Fellowships', value: 'fellowship' },
    { label: 'Competitions', value: 'competition' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Startup Programs', value: 'startup' },
  ];

  const workModes: { label: string; value: WorkMode }[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-site', value: 'on-site' },
  ];

  const experienceLevels: { label: string; value: ExperienceLevel }[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Open to All', value: 'all' },
  ];

  const compensationTypes: { label: string; value: CompensationType }[] = [
    { label: 'Paid Stipend', value: 'paid' },
    { label: 'Prize-Based', value: 'prize' },
    { label: 'Fully Funded', value: 'funded' },
    { label: 'Unpaid / Free', value: 'unpaid' },
  ];

  const academicYears: { label: string; value: AcademicYear }[] = [
    { label: '1st Year', value: '1st' },
    { label: '2nd Year', value: '2nd' },
    { label: '3rd Year', value: '3rd' },
    { label: '4th / Final Year', value: '4th' },
    { label: 'Graduate', value: 'graduate' },
  ];

  const popularSkills = [
    'Python', 'React', 'TypeScript', 'Rust', 'Go', 'Machine Learning', 
    'Distributed Systems', 'Data Science', 'Cybersecurity', 'UI/UX', 'Linux', 'C++'
  ];

  const deadlineOptions = [
    { label: 'All Deadlines', value: 'all' },
    { label: 'Closing This Week', value: 'week' },
    { label: 'Closing This Month', value: 'month' },
    { label: 'Flexible / Next Year', value: 'flexible' },
  ];

  // Helper toggle functions
  const toggleCategory = (cat: OpportunityCategory) => {
    onChange({
      ...filters,
      category: filters.category === cat ? 'all' : cat
    });
  };

  const toggleArrayFilter = <T extends string>(
    list: T[], 
    item: T, 
    key: keyof FilterState
  ) => {
    const exists = list.includes(item);
    const updated = exists ? list.filter(i => i !== item) : [...list, item];
    onChange({ ...filters, [key]: updated });
  };

  const isAnyFilterActive = 
    filters.category !== 'all' ||
    filters.workModes.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.compensationTypes.length > 0 ||
    filters.eligibleYears.length > 0 ||
    filters.skills.length > 0 ||
    filters.deadlineRange !== 'all' ||
    filters.verifiedOnly;

  return (
    <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-5 divide-y divide-[#E9EAE7] text-xs">
      
      {/* Top Header: Count & Reset */}
      <div className="pb-4 flex items-center justify-between">
        <div>
          <span className="font-heading font-semibold text-sm text-[#202B3C] block">
            Filters
          </span>
          <span className="text-[11px] text-[#7C8490]">
            {resultCount} {resultCount === 1 ? 'opportunity' : 'opportunities'} found
          </span>
        </div>

        {isAnyFilterActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#416FAD] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Verified Only Toggle */}
      <div className="py-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
          />
          <span className="font-medium text-[#202B3C] inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#54765A]" />
            Official Verified sources only
          </span>
        </label>
      </div>

      {/* Deadline Radar Filter */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Application Deadline
        </span>
        <div className="space-y-1.5">
          {deadlineOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="deadlineFilter"
                checked={filters.deadlineRange === opt.value}
                onChange={() => onChange({ ...filters, deadlineRange: opt.value as any })}
                className="text-[#416FAD] focus:ring-0"
              />
              <span className={`text-[12px] ${filters.deadlineRange === opt.value ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Program Type
        </span>
        <div className="space-y-1.5">
          {categories.map(cat => {
            const isSelected = filters.category === cat.value;
            return (
              <label key={cat.value} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCategory(cat.value)}
                  className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
                />
                <span className={`text-[12px] ${isSelected ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Work Mode */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Work Arrangement
        </span>
        <div className="space-y-1.5">
          {workModes.map(mode => {
            const isSelected = filters.workModes.includes(mode.value);
            return (
              <label key={mode.value} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter(filters.workModes, mode.value, 'workModes')}
                  className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
                />
                <span className={`text-[12px] ${isSelected ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                  {mode.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Eligibility / Academic Year */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Academic Standing
        </span>
        <div className="space-y-1.5">
          {academicYears.map(year => {
            const isSelected = filters.eligibleYears.includes(year.value);
            return (
              <label key={year.value} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter(filters.eligibleYears, year.value, 'eligibleYears')}
                  className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
                />
                <span className={`text-[12px] ${isSelected ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                  {year.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Compensation Type */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Compensation & Awards
        </span>
        <div className="space-y-1.5">
          {compensationTypes.map(comp => {
            const isSelected = filters.compensationTypes.includes(comp.value);
            return (
              <label key={comp.value} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter(filters.compensationTypes, comp.value, 'compensationTypes')}
                  className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
                />
                <span className={`text-[12px] ${isSelected ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                  {comp.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="py-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Experience Level
        </span>
        <div className="space-y-1.5">
          {experienceLevels.map(exp => {
            const isSelected = filters.experienceLevels.includes(exp.value);
            return (
              <label key={exp.value} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter(filters.experienceLevels, exp.value, 'experienceLevels')}
                  className="rounded border-[#E9EAE7] text-[#416FAD] focus:ring-0"
                />
                <span className={`text-[12px] ${isSelected ? 'font-semibold text-[#202B3C]' : 'text-[#7C8490]'}`}>
                  {exp.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Skills cloud */}
      <div className="pt-4">
        <span className="font-semibold text-[#202B3C] block mb-2.5">
          Required Skills
        </span>
        <div className="flex flex-wrap gap-1.5">
          {popularSkills.map(skill => {
            const isSelected = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleArrayFilter(filters.skills, skill, 'skills')}
                className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all border ${
                  isSelected
                    ? 'bg-[#416FAD] text-white border-[#416FAD]'
                    : 'bg-[#F7F7F4] text-[#202B3C] border-[#E9EAE7] hover:border-[#7C8490]'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

