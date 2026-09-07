import React, { useState } from 'react';
import { TabType } from '../types';
import { FileText, Mail } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenContact, onOpenResume }) => {
  const [avatarSrc, setAvatarSrc] = useState(PROFILE_INFO.profileImage);
  const [avatarError, setAvatarError] = useState(false);
  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-[#0c0d10]/95 backdrop-blur-xl border-b border-[#202126]">
      {/* Mobile Top Header */}
      <div className="flex md:hidden h-14 w-full px-3.5 items-center justify-between">
        <div 
          id="mobile-header-brand"
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => onSelectTab('overview')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#16171b] border border-[#27282e] group-hover:border-[#4cd7f6]/60 flex items-center justify-center font-mono text-xs font-bold text-[#4cd7f6] shadow-sm transition-colors shrink-0">
            RK
          </div>
          <span className="font-mono text-sm text-[#e5e1e4] font-semibold tracking-tight">ryo.kitano</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Resume Link */}
          <a
            id="mobile-header-resume-btn"
            href={PROFILE_INFO.resumeUrl}
            onClick={(e) => {
              if (onOpenResume) {
                e.preventDefault();
                onOpenResume();
              }
            }}
            className="h-8 px-2.5 rounded-lg bg-[#16171b] hover:bg-[#202127] active:scale-95 border border-[#27282e] text-zinc-200 hover:text-white font-mono text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            aria-label="View Resume"
          >
            <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Resume</span>
          </a>

          {onOpenContact && (
            <button
              id="mobile-header-contact-btn"
              onClick={onOpenContact}
              className="h-8 px-2.5 rounded-lg bg-[#1a1b20] hover:bg-[#22232a] active:scale-95 border border-[#27282e] text-zinc-200 hover:text-white font-mono text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              aria-label="Contact"
            >
              <Mail className="w-3.5 h-3.5 text-[#4cd7f6]" />
              <span className="hidden xs:inline">Contact</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Header Container */}
      <div className="hidden md:flex h-16 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between gap-4">
        {/* Left identity */}
        <div className="flex items-center gap-3">
          <button
            id="header-brand-button"
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2.5 text-[#e5e1e4] hover:text-[#4cd7f6] transition-colors group cursor-pointer text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[#161f26] border border-[#203c4c] flex items-center justify-center font-mono text-xs font-semibold text-[#38bdf8] group-hover:border-[#38bdf8]/70 transition-colors">
              RK
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-[#e5e1e4]">ryo.kitano</span>
          </button>
        </div>

        {/* Center-left Status pill on wide desktop - visible on Experience, Projects, Certifications tabs */}
        {currentTab !== 'overview' && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#13221c] border border-[#1d3d30]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#34d399] font-medium">
              Seeking Winter 2026 Co-op
            </span>
          </div>
        )}

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            id="desktop-nav-overview"
            onClick={() => onSelectTab('overview')}
            className={`px-3.5 py-1.5 font-mono text-xs rounded-md transition-all cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-[#222328] text-white font-medium border border-[#34353d]'
                : 'text-zinc-400 hover:text-white hover:bg-[#16171b]'
            }`}
          >
            Overview
          </button>
          <button
            id="desktop-nav-experience"
            onClick={() => onSelectTab('experience')}
            className={`px-3.5 py-1.5 font-mono text-xs rounded-md transition-all cursor-pointer ${
              currentTab === 'experience'
                ? 'bg-[#00c5e0] text-[#003640] font-semibold shadow-[0_0_12px_rgba(0,197,224,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-[#16171b]'
            }`}
          >
            Experience
          </button>
          <button
            id="desktop-nav-projects"
            onClick={() => onSelectTab('projects')}
            className={`px-3.5 py-1.5 font-mono text-xs rounded-md transition-all cursor-pointer ${
              currentTab === 'projects'
                ? 'bg-[#15232d] text-[#38bdf8] font-medium border border-[#204052]'
                : 'text-zinc-400 hover:text-white hover:bg-[#16171b]'
            }`}
          >
            Projects
          </button>
          <button
            id="desktop-nav-contact"
            onClick={onOpenContact}
            className="px-3.5 py-1.5 font-mono text-xs text-zinc-400 hover:text-white hover:bg-[#16171b] rounded-md transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right action items */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Resume button */}
          <a
            id="header-resume-link"
            href={PROFILE_INFO.resumeUrl}
            onClick={(e) => {
              if (onOpenResume) {
                e.preventDefault();
                onOpenResume();
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer ${
              currentTab === 'experience'
                ? 'bg-[#00c5e0] text-[#003640] font-semibold'
                : 'border border-[#2d2e35] bg-[#16171b] text-zinc-200 hover:border-[#38bdf8] hover:text-[#38bdf8]'
            }`}
            title="Preview & Download Resume.pdf"
          >
            <FileText className={`w-3.5 h-3.5 ${currentTab === 'experience' ? 'text-[#003640]' : 'text-[#4cd7f6]'}`} />
            <span>Resume.pdf</span>
          </a>

          {/* Profile thumbnail - shown on Experience, Projects, Certifications tabs */}
          {currentTab !== 'overview' && (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2d2e35] ring-1 ring-white/5 bg-[#16171b] flex items-center justify-center shrink-0 shadow-sm">
              {!avatarError ? (
                <img
                  id="header-profile-avatar"
                  alt="Ryo Kitano avatar"
                  className="w-full h-full object-cover object-[center_20%]"
                  src={avatarSrc}
                  onError={() => {
                    if (avatarSrc !== PROFILE_INFO.profileImageFallback) {
                      setAvatarSrc(PROFILE_INFO.profileImageFallback);
                    } else {
                      setAvatarError(true);
                    }
                  }}
                />
              ) : (
                <span className="font-mono text-[11px] font-bold text-[#4cd7f6]">RK</span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
