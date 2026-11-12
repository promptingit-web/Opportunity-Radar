import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#E9EAE7] bg-[#FFFFFF] text-[#202B3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#E6EEF8] border border-[#416FAD]/20 flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="#416FAD" strokeWidth="2" strokeOpacity="0.25"/>
                  <circle cx="16" cy="16" r="8" stroke="#416FAD" strokeWidth="2" strokeOpacity="0.5"/>
                  <circle cx="16" cy="16" r="3" fill="#416FAD"/>
                  <path d="M16 16L24.5 7.5" stroke="#416FAD" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-heading font-semibold text-base text-[#202B3C] tracking-tight">
                Opportunity<span className="text-[#416FAD]">Radar</span>
              </span>
            </div>
            <p className="text-xs text-[#7C8490] leading-relaxed">
              A centralised discovery platform for university students. Discover, filter, and track verified internships, hackathons, scholarships, and research.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DCE9DD]/60 text-[#54765A] text-[11px] font-medium rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified & Curated Sources
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C8490] mb-3">
              Explore Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore?category=internship" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Engineering & Design Internships
                </Link>
              </li>
              <li>
                <Link to="/explore?category=hackathon" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Global Hackathons & Challenges
                </Link>
              </li>
              <li>
                <Link to="/explore?category=scholarship" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Undergraduate & Diversity Scholarships
                </Link>
              </li>
              <li>
                <Link to="/explore?category=research" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  University Research Appointments
                </Link>
              </li>
              <li>
                <Link to="/explore?category=fellowship" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Open Source & Policy Fellowships
                </Link>
              </li>
            </ul>
          </div>

          {/* Student tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C8490] mb-3">
              Student Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/for-you" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Personalised For You
                </Link>
              </li>
              <li>
                <Link to="/my-opportunities" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Application Tracker (Kanban / List)
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Interactive Deadline Calendar
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Profile & Skill Matcher
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-[#202B3C] hover:text-[#416FAD] transition-colors">
                  Settings & Data Controls
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C8490]">
              Product Principles
            </h4>
            <p className="text-xs text-[#7C8490] leading-relaxed">
              We never fabricate opportunities or dead-end links. Every application URL points directly to official employer portals, universities, or verified partners.
            </p>
            <p className="text-[11px] text-[#7C8490]/80">
              © {new Date().getFullYear()} OpportunityRadar. Designed with clarity and precision for ambitious students.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

