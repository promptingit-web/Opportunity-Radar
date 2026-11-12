import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile, AcademicYear, OpportunityCategory, WorkMode } from '../types';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Code2, 
  Heart, 
  Briefcase, 
  Bookmark, 
  Save, 
  Plus, 
  X, 
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { profile, updateProfile, savedOpportunityIds, applications, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const allCategories: { label: string; value: OpportunityCategory }[] = [
    { label: 'Internships', value: 'internship' },
    { label: 'Hackathons', value: 'hackathon' },
    { label: 'Scholarships', value: 'scholarship' },
    { label: 'Research', value: 'research' },
    { label: 'Fellowships', value: 'fellowship' },
    { label: 'Competitions', value: 'competition' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Startups', value: 'startup' },
  ];

  const allWorkModes: { label: string; value: WorkMode }[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-site', value: 'on-site' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const addSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const addInterest = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interestToRemove)
    }));
  };

  const toggleCategoryPreference = (cat: OpportunityCategory) => {
    const exists = formData.preferredCategories.includes(cat);
    const updated = exists 
      ? formData.preferredCategories.filter(c => c !== cat)
      : [...formData.preferredCategories, cat];
    setFormData(prev => ({ ...prev, preferredCategories: updated }));
  };

  const toggleWorkModePreference = (mode: WorkMode) => {
    const exists = formData.preferredWorkModes.includes(mode);
    const updated = exists 
      ? formData.preferredWorkModes.filter(m => m !== mode)
      : [...formData.preferredWorkModes, mode];
    setFormData(prev => ({ ...prev, preferredWorkModes: updated }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Profile Header Box */}
      <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-8 shadow-subtle mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E9EAE7]">
          
          <div className="flex items-center gap-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-[#416FAD]/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-xl sm:text-2xl text-[#202B3C]">
                  {profile.name}
                </h1>
                <span className="px-2 py-0.5 bg-[#E6EEF8] text-[#416FAD] text-[11px] font-semibold rounded-full">
                  Verified Student
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7C8490] mt-0.5">
                {profile.degree} in {profile.branch} • {profile.currentYear} Year
              </p>
              <p className="text-xs text-[#7C8490] flex items-center gap-1 mt-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#416FAD]" />
                {profile.university} (Class of {profile.graduationYear})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(true);
                }}
                className="px-4 py-2 bg-[#416FAD] hover:bg-[#34598c] text-white text-xs font-semibold rounded-radar transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white border border-[#E9EAE7] text-[#7C8490] hover:text-[#202B3C] text-xs font-semibold rounded-radar"
              >
                Cancel
              </button>
            )}
          </div>

        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs text-center">
          <div className="p-3 bg-[#F7F7F4] rounded-radar">
            <span className="text-[#7C8490] block text-[11px]">Saved Opportunities</span>
            <span className="font-heading font-bold text-lg text-[#202B3C] mt-0.5 block">
              {savedOpportunityIds.length}
            </span>
          </div>

          <div className="p-3 bg-[#F7F7F4] rounded-radar">
            <span className="text-[#7C8490] block text-[11px]">Tracked Applications</span>
            <span className="font-heading font-bold text-lg text-[#202B3C] mt-0.5 block">
              {applications.length}
            </span>
          </div>

          <div className="p-3 bg-[#F7F7F4] rounded-radar">
            <span className="text-[#7C8490] block text-[11px]">Verified Skills</span>
            <span className="font-heading font-bold text-lg text-[#416FAD] mt-0.5 block">
              {profile.skills.length}
            </span>
          </div>

          <div className="p-3 bg-[#F7F7F4] rounded-radar">
            <span className="text-[#7C8490] block text-[11px]">Reported GPA</span>
            <span className="font-heading font-bold text-lg text-[#54765A] mt-0.5 block">
              {profile.gpa || '3.80 / 4.0'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Form / View */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-8 shadow-subtle space-y-6 text-xs">
          <h2 className="font-heading font-bold text-base text-[#202B3C] pb-3 border-b border-[#E9EAE7]">
            Edit Academic & Opportunity Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none focus:border-[#416FAD]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">University / College</label>
              <input
                type="text"
                required
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none focus:border-[#416FAD]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">Degree Program</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none focus:border-[#416FAD]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">Major / Branch</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none focus:border-[#416FAD]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">Current Academic Year</label>
              <select
                value={formData.currentYear}
                onChange={(e) => setFormData({ ...formData, currentYear: e.target.value as AcademicYear })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none"
              >
                <option value="1st">1st Year (Freshman)</option>
                <option value="2nd">2nd Year (Sophomore)</option>
                <option value="3rd">3rd Year (Junior)</option>
                <option value="4th">4th Year (Senior / Final)</option>
                <option value="graduate">Graduate / Master</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#202B3C] block mb-1">Expected Graduation Year</label>
              <input
                type="text"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none focus:border-[#416FAD]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#202B3C] block mb-1">About / Bio</label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none"
            />
          </div>

          {/* Skills Management */}
          <div>
            <label className="font-semibold text-[#202B3C] block mb-1.5">Technical & Academic Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type skill and press Enter (e.g. PyTorch, Rust, Docker)"
                className="flex-1 px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-[#E6EEF8] text-[#416FAD] font-semibold rounded-radar text-xs"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E6EEF8] text-[#416FAD] rounded-md font-mono text-[11px]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests Management */}
          <div>
            <label className="font-semibold text-[#202B3C] block mb-1.5">Areas of Interest</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={addInterest}
                placeholder="Type interest (e.g. Distributed Systems, Robotics)"
                className="flex-1 px-3 py-2 bg-[#F7F7F4] border border-[#E9EAE7] rounded-radar text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-[#F7F7F4] text-[#202B3C] font-semibold rounded-radar text-xs border border-[#E9EAE7]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.interests.map(interest => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md text-[#202B3C] text-[11px]"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Target Categories */}
          <div>
            <label className="font-semibold text-[#202B3C] block mb-2">Preferred Opportunity Categories</label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => {
                const isSelected = formData.preferredCategories.includes(cat.value);
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleCategoryPreference(cat.value)}
                    className={`px-3 py-1.5 rounded-radar text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-[#416FAD] text-white border-[#416FAD]'
                        : 'bg-[#F7F7F4] text-[#7C8490] border-[#E9EAE7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Work Modes */}
          <div>
            <label className="font-semibold text-[#202B3C] block mb-2">Preferred Work Arrangements</label>
            <div className="flex flex-wrap gap-2">
              {allWorkModes.map(mode => {
                const isSelected = formData.preferredWorkModes.includes(mode.value);
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => toggleWorkModePreference(mode.value)}
                    className={`px-3 py-1.5 rounded-radar text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-[#416FAD] text-white border-[#416FAD]'
                        : 'bg-[#F7F7F4] text-[#7C8490] border-[#E9EAE7]'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E9EAE7] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-[#E9EAE7] rounded-radar text-[#7C8490] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#416FAD] text-white font-semibold rounded-radar hover:bg-[#34598c]"
            >
              Save Profile
            </button>
          </div>
        </form>
      ) : (
        /* Profile Read Only View */
        <div className="bg-white border border-[#E9EAE7] rounded-radar-lg p-6 sm:p-8 shadow-subtle space-y-6 text-xs">
          
          <div>
            <h3 className="font-heading font-semibold text-sm text-[#202B3C] mb-2">
              Background & Focus
            </h3>
            <p className="text-xs sm:text-sm text-[#202B3C] leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E9EAE7]">
            <h3 className="font-heading font-semibold text-sm text-[#202B3C] mb-2.5">
              Verified Skills ({profile.skills.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-[#E6EEF8] text-[#416FAD] rounded-md font-mono text-[11px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E9EAE7]">
            <h3 className="font-heading font-semibold text-sm text-[#202B3C] mb-2.5">
              Interests & Domains ({profile.interests.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E9EAE7] rounded-md text-[#202B3C] text-[11px]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E9EAE7] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-[#202B3C] block mb-2">Preferred Categories</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.preferredCategories.map(cat => (
                  <span key={cat} className="px-2.5 py-1 bg-[#F7F7F4] rounded text-[#202B3C] text-[11px] capitalize">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-[#202B3C] block mb-2">Preferred Work Arrangement</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.preferredWorkModes.map(mode => (
                  <span key={mode} className="px-2.5 py-1 bg-[#F7F7F4] rounded text-[#202B3C] text-[11px] capitalize">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
