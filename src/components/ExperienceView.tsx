import React from 'react';
import { Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

// Helper to render bold text marked with **
function renderFormattedBullet(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export const ExperienceView: React.FC = () => {
  return (
    <div id="experience-screen" className="w-full bg-transparent min-h-screen">
      {/* ========================================================================= */}
      {/* MOBILE EXPERIENCE VIEW (md:hidden) - Exact implementation as provided */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col w-full pt-4 pb-28 bg-transparent">
        {/* Mobile Header */}
        <div className="px-4 pt-2 pb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1 font-mono text-[11px] text-[#4cd7f6] tracking-widest">
            <span className="text-[#4edea3] font-semibold">$</span>
            <span>cat ./work_experience.log</span>
          </div>
          <h1 className="text-[28px] leading-[34px] text-[#e5e1e4] font-semibold tracking-tight font-sans">
            Work Experience
          </h1>
        </div>

        {/* Mobile Cards List */}
        <div className="px-4 flex flex-col gap-6 pb-6">
          {EXPERIENCES.map((job) => {
            const isInternship = job.type === 'INTERNSHIP';
            const badgeBg = isInternship ? 'bg-[#00a572]/20 text-[#4edea3]' : 'bg-[#c78dff]/20 text-[#ddb7ff]';
            const iconColor = isInternship ? 'text-[#4cd7f6]' : 'text-[#ddb7ff]';

            return (
              <article
                key={job.id}
                className="bg-[#201f22] rounded-xl p-4 shadow-md transition-all duration-200 hover:bg-[#2a2a2c] flex flex-col gap-3 border border-[#27282e]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-[18px] leading-[24px] text-[#e5e1e4] font-semibold font-sans">
                        {job.title}
                      </h2>
                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] uppercase tracking-wider font-medium ${badgeBg}`}>
                        {job.type}
                      </span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-[#bcc9cd] mt-1 font-sans">
                      {job.company} · {job.location} · {job.workMode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded bg-[#0e0e10] text-[#bcc9cd]">
                    <Calendar className={`w-3.5 h-3.5 ${iconColor}`} />
                    <span className="font-mono text-[11px]">{job.period}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-[#353437] my-0.5"></div>

                <p className="text-[13px] leading-[20px] text-[#bcc9cd] font-sans py-0.5">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-[#0e0e10] text-[#4cd7f6] font-mono text-[12px] leading-[18px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP EXPERIENCE VIEW (hidden md:block) - 100% PRESERVED AS BEFORE */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative w-full max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24 sm:pb-32">
        {/* Section Header */}
        <div id="experience-header-section" className="mb-8 sm:mb-10">
          <div
            id="experience-terminal-command"
            className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] mb-2"
          >
            <span className="text-[#34d399] select-none font-semibold">$</span>
            <span>cat ./work_experience.log</span>
            <span className="inline-block w-1.5 h-3.5 bg-[#38bdf8] animate-pulse"></span>
          </div>

          <h1
            id="experience-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans"
          >
            Work Experience
          </h1>
        </div>

        {/* Experience Cards Stream */}
        <div id="experience-list" className="flex flex-col gap-6">
          {EXPERIENCES.map((job) => {
            const isInternship = job.type === 'INTERNSHIP';
            const accentColor = isInternship ? '#38bdf8' : '#34d399';

            return (
              <article
                id={`role-${job.id}`}
                key={job.id}
                className="bg-[#16171a] border border-[#232428] rounded-xl p-6 sm:p-8 transition-all duration-200 hover:border-[#2f3036] shadow-xl"
              >
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2
                        id={`job-title-${job.id}`}
                        className="text-xl text-white font-semibold font-sans tracking-tight"
                      >
                        {job.title}
                      </h2>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase font-semibold ${
                          isInternship
                            ? 'bg-[#122430] text-[#38bdf8] border border-[#1e3e52]'
                            : 'bg-[#132c21] text-[#34d399] border border-[#204c38]'
                        }`}
                      >
                        {isInternship ? 'INTERNSHIP' : 'FOUNDING'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-sm font-sans">
                      <span className={`font-medium ${isInternship ? 'text-[#38bdf8]' : 'text-[#34d399]'}`}>
                        {job.company}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-400">{job.location} · {job.workMode}</span>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-zinc-400 self-start sm:self-auto sm:text-right pt-0.5">
                    {job.period}
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="py-2">
                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed font-sans"
                      >
                        <span
                          className="mt-0.5 select-none font-mono text-base leading-none font-bold"
                          style={{ color: accentColor }}
                        >
                          ›
                        </span>
                        <span>{renderFormattedBullet(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap items-center gap-2 pt-4 mt-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-[#1c1d22] font-mono text-xs text-zinc-300 border border-[#27282e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
