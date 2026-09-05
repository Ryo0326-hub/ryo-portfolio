import React, { useState } from 'react';
import { 
  ArrowDown, 
  Mail, 
  MapPin, 
  Code, 
  Link, 
  Link2,
  AtSign, 
  GraduationCap, 
  ArrowUpRight, 
  ArrowRight
} from 'lucide-react';
import { ContactModal } from './ContactModal';

interface OverviewViewProps {
  onNavigateToProjects: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateToProjects }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div id="overview-screen" className="w-full flex-1 flex flex-col justify-center">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ========================================================================= */}
      {/* MOBILE OVERVIEW (md:hidden) */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col relative w-full pt-4 pb-28 bg-[#131315] min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col w-full px-4 py-2 gap-6">
          {/* Profile Card Presentation */}
          <div className="flex flex-col items-center w-full">
            <div className="relative p-1.5 rounded-xl bg-[#1c1b1d] shadow-xl">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg overflow-hidden bg-[#1a1b20] border border-[#27282e] relative flex items-center justify-center">
                {!imgError ? (
                  <img
                    alt="Ryo Kitano"
                    className="w-full h-full object-cover object-center contrast-[1.02]"
                    src="/profile.jpg"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#131b24] border border-[#1e3a4f] flex items-center justify-center font-mono text-xl font-bold text-[#4cd7f6]">
                      RK
                    </div>
                    <span className="font-mono text-xs text-zinc-400 font-medium">Ryo Kitano</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[#bcc9cd] font-mono text-[11px] px-2 py-1 rounded bg-[#0e0e10]/85 backdrop-blur-sm pointer-events-none">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4cd7f6]" />
                    Waterloo, ON
                  </span>
                  <span className="text-[#4edea3] font-medium">Remote OK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio / Identity Header */}
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-[28px] leading-[34px] tracking-[-0.03em] text-[#e5e1e4] font-bold font-sans">
              Ryo Kitano
            </h1>
            <p className="font-mono text-[13px] leading-[20px] text-[#4cd7f6] font-medium px-2 leading-snug">
              AI / ML Engineer <span className="text-[#bcc9cd] font-normal">|</span> Combinatorics &amp; Optimization @ UWaterloo
            </p>
            <p className="text-xs sm:text-sm text-[#bcc9cd] leading-relaxed max-w-md font-sans px-2 pt-0.5">
              My interests span machine learning, cryptography, and mathematical optimization. I have hands-on experience developing computer vision systems, LLM-powered applications, model-routing architectures, and data-driven products. I particularly enjoy translating research ideas and mathematical concepts into tools that solve real-world problems.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full pt-1">
            <button
              onClick={onNavigateToProjects}
              className="w-full sm:w-auto flex-1 max-w-xs flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#4cd7f6] text-[#003640] font-mono text-xs font-semibold shadow-[0_0_16px_-3px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto flex-1 max-w-xs flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] font-mono text-xs font-medium active:scale-[0.98] transition-all hover:bg-[#39393b] cursor-pointer"
            >
              <Mail className="w-[18px] h-[18px] text-[#4cd7f6]" />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Terminal Telemetry / Fast Facts Panel */}
          <div className="w-full flex flex-col rounded-xl bg-[#1c1b1d] p-4 shadow-md mt-1 border border-[#232428]">
            <div className="flex items-center justify-between pb-2 mb-2 bg-[#353437]/20 px-2 py-1.5 rounded">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#353437]"></span>
                <span className="w-2 h-2 rounded-full bg-[#353437]"></span>
                <span className="w-2 h-2 rounded-full bg-[#353437]"></span>
                <span className="font-mono text-[11px] text-[#bcc9cd] ml-1 tracking-wider">PROFILE_META.sh</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 font-mono text-[13px]">
              {/* Academic Line */}
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-[18px] h-[18px] text-[#4cd7f6] mt-0.5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[#bcc9cd] uppercase font-mono tracking-wider">Education</span>
                  <span className="text-[#e5e1e4] font-medium">University of Waterloo</span>
                  <span className="text-[12px] text-[#4cd7f6]">Bachelor of Mathematics, Honours (Co-op)</span>
                  <span className="text-[11px] text-[#34d399] mt-0.5">★ President’s Scholarship (2025)</span>
                  <span className="text-[11px] text-[#bcc9cd] mt-1">Coursework: Optimization, Probability, Statistics, Linear Algebra II, Combinatorics, Graph Theory, Network Flow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connect / Hyperlinks Grid */}
          <div className="w-full flex flex-col gap-2 pb-4">
            <span className="font-mono text-[11px] text-[#bcc9cd] uppercase tracking-wider px-1">Network &amp; Indices</span>
            <div className="grid grid-cols-1 gap-2">
              {/* GitHub */}
              <a
                className="flex items-center justify-between p-3 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] transition-colors text-[#e5e1e4] group"
                href="https://github.com/Ryo0326-hub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-[#353437] text-[#4cd7f6]">
                    <Code className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs text-[#e5e1e4] font-medium">github.com</span>
                  </div>
                </div>
                <ArrowUpRight className="w-[18px] h-[18px] text-[#bcc9cd] group-hover:text-[#4cd7f6] transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* LinkedIn */}
              <a
                className="flex items-center justify-between p-3 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] transition-colors text-[#e5e1e4] group"
                href="https://linkedin.com/in/ryo-kitano"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-[#353437] text-[#4edea3]">
                    <Link2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs text-[#e5e1e4] font-medium">linkedin.com/in/ryo-kitano</span>
                  </div>
                </div>
                <ArrowUpRight className="w-[18px] h-[18px] text-[#bcc9cd] group-hover:text-[#4edea3] transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Direct Mail */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center justify-between p-3 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] transition-colors text-[#e5e1e4] group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-[#353437] text-[#ddb7ff]">
                    <AtSign className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs text-[#e5e1e4] font-medium">Email Dispatch</span>
                  </div>
                </div>
                <ArrowRight className="w-[18px] h-[18px] text-[#bcc9cd] group-hover:text-[#ddb7ff] transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP OVERVIEW (hidden md:flex) - 100% PRESERVED AS BEFORE */}
      {/* ========================================================================= */}
      <div className="hidden md:flex w-full flex-1 flex-col justify-center bg-[#0c0d10]">
        <div className="w-full py-12 sm:py-16 lg:py-24">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Portrait & Location */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                <div
                  id="profile-portrait-card"
                  className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#16171a] border border-[#27282d] relative shadow-2xl flex items-center justify-center"
                >
                  {!imgError ? (
                    <img
                      id="profile-portrait-image"
                      alt="Ryo Kitano"
                      className="w-full h-full object-cover select-none contrast-[1.02]"
                      src="/profile.jpg"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-[#131b24] border border-[#1e3a4f] flex items-center justify-center font-mono text-2xl font-bold text-[#4cd7f6] shadow-inner">
                        RK
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold text-white">Ryo Kitano</span>
                        <span className="font-mono text-[11px] text-zinc-400">AI / ML Engineer</span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  id="profile-location-badge"
                  className="mt-4 flex items-center gap-2 text-[#9ca3af] font-mono text-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#6b7280]" />
                  <span>Waterloo, ON · Remote</span>
                </div>
              </div>

              {/* Right Column: Text, CTAs & Social Links */}
              <div className="lg:col-span-8 flex flex-col items-start text-left">
                {/* Availability Badge */}
                <div
                  id="badge-winter-coop"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13221c] border border-[#1d3d30] mb-6 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
                  <span className="font-mono text-xs text-[#34d399] font-medium tracking-wide">
                    Available for Winter 2026 Co-op
                  </span>
                </div>

                {/* Headline */}
                <h1
                  id="profile-name"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans"
                >
                  Ryo Kitano
                </h1>

                {/* Subheadline */}
                <p
                  id="profile-headline"
                  className="mt-3 text-lg sm:text-xl text-[#38bdf8] font-medium tracking-tight font-sans"
                >
                  AI / ML Engineer | Combinatorics &amp; Optimization @ UWaterloo
                </p>

                {/* Bio Summary */}
                <p
                  id="profile-bio"
                  className="mt-5 text-base sm:text-lg text-[#9ca3af] leading-relaxed max-w-2xl font-normal font-sans"
                >
                  My interests span machine learning, cryptography, and mathematical optimization. I have hands-on experience developing computer vision systems, LLM-powered applications, model-routing architectures, and data-driven products. I particularly enjoy translating research ideas and mathematical concepts into tools that solve real-world problems.
                </p>

                {/* Academic & Scholarship Highlight */}
                <div className="mt-4 p-3 rounded-lg bg-[#141519] border border-[#232428] text-xs font-mono max-w-2xl space-y-1.5">
                  <div className="flex items-center justify-between text-[#38bdf8]">
                    <span className="font-semibold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#4cd7f6]" />
                      University of Waterloo · Bachelor of Mathematics, Honours (Co-op)
                    </span>
                    <span className="text-[#34d399] font-medium">★ President’s Scholarship (2025)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <span className="text-zinc-500">Coursework:</span> Optimization, Probability, Statistics, Linear Algebra II, Combinatorics, Graph Theory, Network Flow Theory, Algorithm Design
                  </div>
                </div>

                {/* Action Buttons */}
                <div id="profile-action-buttons" className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    id="btn-view-projects"
                    onClick={onNavigateToProjects}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-[#090d16] font-mono text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span>View Projects</span>
                  </button>

                  <button
                    id="btn-get-in-touch"
                    onClick={() => setIsContactOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#242429] text-[#e5e7eb] border border-[#34343b] font-mono text-xs font-medium hover:bg-[#2c2c33] transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#e5e7eb]" />
                    <span>Get in Touch</span>
                  </button>
                </div>

                {/* Bottom Social & School Telemetry */}
                <div
                  id="profile-footer-bar"
                  className="mt-10 pt-8 w-full border-t border-[#1f2026] flex flex-col gap-3 text-xs font-mono text-[#9ca3af]"
                >
                  <div className="flex items-center gap-6">
                    <a
                      id="link-github"
                      href="https://github.com/Ryo0326-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#6b7280] font-semibold">&lt;/&gt;</span>
                      <span>github.com</span>
                    </a>

                    <a
                      id="link-linkedin"
                      href="https://linkedin.com/in/ryo-kitano"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Link className="w-3.5 h-3.5 text-[#6b7280]" />
                      <span>linkedin.com/in/ryo-kitano</span>
                    </a>

                    <button
                      id="btn-email-link"
                      onClick={() => setIsContactOpen(true)}
                      className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <AtSign className="w-3.5 h-3.5 text-[#6b7280]" />
                      <span>Email</span>
                    </button>
                  </div>

                  <div className="text-[#6b7280] text-xs">
                    UWaterloo Math '29 · Combinatorics &amp; Optimization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
