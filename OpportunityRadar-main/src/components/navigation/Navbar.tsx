import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Search, 
  Bookmark, 
  Calendar, 
  User, 
  SlidersHorizontal, 
  Sparkles, 
  Compass, 
  CheckCheck, 
  Briefcase,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { profile, notifications, markNotificationAsRead, markAllNotificationsAsRead, savedOpportunityIds } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Discover', to: '/' },
    { label: 'Explore', to: '/explore' },
    { label: 'For You', to: '/for-you' },
    { label: 'My Opportunities', to: '/my-opportunities' },
    { label: 'Calendar', to: '/calendar' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E9EAE7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#E6EEF8] border border-[#416FAD]/20 flex items-center justify-center transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="#416FAD" strokeWidth="2" strokeOpacity="0.25"/>
                  <circle cx="16" cy="16" r="9.5" stroke="#416FAD" strokeWidth="2" strokeOpacity="0.5"/>
                  <circle cx="16" cy="16" r="5" stroke="#416FAD" strokeWidth="2"/>
                  <circle cx="16" cy="16" r="2.2" fill="#416FAD"/>
                  <path d="M16 16L24.5 7.5" stroke="#416FAD" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24.5" cy="7.5" r="1.5" fill="#E9A66B"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-[17px] text-[#202B3C] tracking-tight leading-none group-hover:text-[#416FAD] transition-colors">
                  Opportunity<span className="font-bold text-[#416FAD]">Radar</span>
                </span>
                <span className="text-[10px] text-[#7C8490] font-medium tracking-wide leading-none mt-0.5 hidden sm:inline-block">
                  Never miss an opportunity.
                </span>
              </div>
            </Link>

            {/* Centre Navigation (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    px-3.5 py-1.5 rounded-radar text-[13px] font-medium transition-all
                    ${isActive 
                      ? 'bg-[#E6EEF8] text-[#416FAD] font-semibold' 
                      : 'text-[#202B3C]/80 hover:text-[#202B3C] hover:bg-[#F7F7F4]'}
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            
            {/* Quick Search Shortcut */}
            <button
              onClick={() => navigate('/explore')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F7F7F4] hover:bg-[#E9EAE7]/70 text-[#7C8490] hover:text-[#202B3C] rounded-radar border border-[#E9EAE7] text-xs transition-colors"
              title="Search opportunities"
            >
              <Search className="w-3.5 h-3.5 text-[#7C8490]" />
              <span>Search roles, skills...</span>
              <kbd className="ml-1.5 px-1.5 py-0.5 bg-white text-[10px] font-mono text-[#7C8490] rounded border border-[#E9EAE7]">
                /
              </kbd>
            </button>

            {/* Bookmarks quick count pill */}
            <Link
              to="/my-opportunities?tab=saved"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#7C8490] hover:text-[#202B3C] hover:bg-[#F7F7F4] rounded-radar transition-colors"
              title="Saved opportunities"
            >
              <Bookmark className="w-4 h-4 text-[#7C8490]" />
              <span className="hidden sm:inline-block">Saved</span>
              {savedOpportunityIds.length > 0 && (
                <span className="px-1.5 py-0.2 bg-[#E6EEF8] text-[#416FAD] text-[11px] font-semibold rounded-full">
                  {savedOpportunityIds.length}
                </span>
              )}
            </Link>

            {/* Notification Menu */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(prev => !prev)}
                className={`relative p-2 rounded-radar transition-colors ${
                  showNotifications ? 'bg-[#E6EEF8] text-[#416FAD]' : 'text-[#7C8490] hover:text-[#202B3C] hover:bg-[#F7F7F4]'
                }`}
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E9A66B] ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E9EAE7] rounded-radar-lg shadow-elevated py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[#E9EAE7]">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-sm text-[#202B3C]">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#E6EEF8] text-[#416FAD] rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-[#416FAD] hover:underline flex items-center gap-1 font-medium"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E9EAE7]">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-xs text-[#7C8490]">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.link) {
                              setShowNotifications(false);
                              navigate(notif.link);
                            }
                          }}
                          className={`p-3.5 hover:bg-[#F7F7F4] cursor-pointer transition-colors flex items-start gap-3 ${
                            !notif.read ? 'bg-[#FDF9F5]/60' : ''
                          }`}
                        >
                          <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                            !notif.read ? 'bg-[#E9A66B]' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[#202B3C] leading-snug">
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-[#7C8490] mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-[#7C8490]/80 mt-1 block font-mono">
                              {notif.timestamp}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(prev => !prev)}
                className="flex items-center gap-2 p-1 rounded-radar hover:bg-[#F7F7F4] transition-colors"
                aria-label="User profile menu"
              >
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[#E9EAE7]"
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E9EAE7] rounded-radar-lg shadow-elevated py-1.5 z-50">
                  <div className="px-3.5 py-2.5 border-b border-[#E9EAE7]">
                    <p className="text-xs font-semibold text-[#202B3C] truncate">{profile.name}</p>
                    <p className="text-[11px] text-[#7C8490] truncate">{profile.email}</p>
                    <div className="mt-1.5 inline-flex items-center px-2 py-0.5 bg-[#E6EEF8] text-[#416FAD] text-[10px] font-medium rounded-full">
                      {profile.currentYear} Year • {profile.branch.split(' ')[0]}
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#202B3C] hover:bg-[#F7F7F4] font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-[#7C8490]" />
                    Student Profile
                  </Link>

                  <Link
                    to="/my-opportunities"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#202B3C] hover:bg-[#F7F7F4] font-medium"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#7C8490]" />
                    Application Tracker
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#202B3C] hover:bg-[#F7F7F4] font-medium"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C8490]" />
                    Settings & Reset Demo
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setShowMobileMenu(prev => !prev)}
              className="md:hidden p-2 text-[#7C8490] hover:text-[#202B3C] rounded-radar hover:bg-[#F7F7F4]"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-[#E9EAE7] py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) => `
                  block px-3 py-2 rounded-radar text-sm font-medium
                  ${isActive ? 'bg-[#E6EEF8] text-[#416FAD] font-semibold' : 'text-[#202B3C] hover:bg-[#F7F7F4]'}
                `}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-[#E9EAE7] flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="px-3 py-2 text-sm text-[#202B3C] hover:bg-[#F7F7F4] rounded-radar"
              >
                Profile ({profile.name})
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowMobileMenu(false)}
                className="px-3 py-2 text-sm text-[#202B3C] hover:bg-[#F7F7F4] rounded-radar"
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

