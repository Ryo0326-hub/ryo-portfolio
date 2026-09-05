import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Database, 
  Cloud, 
  Terminal,
  Github
} from 'lucide-react';
import { PROJECTS, CERTIFICATIONS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ContactModal } from './ContactModal';

export const ProjectsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [mobileCategory, setMobileCategory] = useState<'all' | 'agentic' | 'systems'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const desktopFilters = [
    { id: 'all', label: 'All (4)' },
    { id: 'agentic', label: 'Agentic & FinTech (3)' },
    { id: 'systems', label: 'Systems & RAG (1)' }
  ];

  const filteredDesktopProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.filterCategory === activeFilter);

  const mobileProjects = [
    {
      id: 'thetatrap',
      projectRef: PROJECTS.find((p) => p.id === 'thetatrap'),
      category: 'agentic' as const,
      hasImage: true,
      image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/agent-apple',
      tagBadge: 'AGENTIC & FINTECH',
      subtitleTag: 'Alpaca MCP',
      actionText: 'GitHub ↗',
      actionUrl: 'https://github.com/Ryo0326-hub/agent-apple',
      githubUrl: 'https://github.com/Ryo0326-hub/agent-apple',
      title: 'ThetaTrap',
      description: 'MCP-native paper-options agent with deterministic Python controls locking candidates, strikes, sizing, and loss ceilings before LLM tool execution. Passed 191 unit & replay tests.',
      tags: ['Python', 'Qwen', 'Alpaca MCP', 'SQLite', 'Options Greeks']
    },
    {
      id: 'kraken-knight',
      projectRef: PROJECTS.find((p) => p.id === 'kraken-knight'),
      category: 'agentic' as const,
      hasImage: true,
      image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/kraken-knight',
      tagBadge: 'QUANT & FINTECH',
      subtitleTag: 'Live Trading',
      actionText: 'GitHub ↗',
      actionUrl: 'https://github.com/Ryo0326-hub/kraken-knight',
      githubUrl: 'https://github.com/Ryo0326-hub/kraken-knight',
      title: 'Kraken Knight',
      description: 'Deterministic BTC/CAD trading strategy backtested on 4.63M historical Kraken trades and deployed live with authenticated orders, fill reconciliation, and fail-closed risk controls.',
      tags: ['Python', 'Kraken API', 'SQLite', 'systemd', 'Risk Controls']
    },
    {
      id: 'hybrid-token-routing',
      projectRef: PROJECTS.find((p) => p.id === 'hybrid-token-routing'),
      category: 'agentic' as const,
      hasImage: true,
      image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/GP-AI-agent',
      tagBadge: 'LLM ROUTING',
      subtitleTag: 'AMD Hackathon',
      actionText: 'GitHub ↗',
      actionUrl: 'https://github.com/Ryo0326-hub/GP-AI-agent',
      githubUrl: 'https://github.com/Ryo0326-hub/GP-AI-agent',
      title: 'Hybrid Token-Efficient Routing Agent',
      description: 'Dual-tier router trained on 360 task outcomes to route between quantized Qwen2.5-1.5B and hosted LLMs under a strict 2-vCPU / 4-GB budget. Cut token use by 24.6% with 95% accuracy on hard sets.',
      tags: ['Python', 'Qwen', 'Fireworks', 'Docker', 'Adaptive Routing']
    },
    {
      id: 'ken-memorial',
      projectRef: PROJECTS.find((p) => p.id === 'ken-memorial'),
      category: 'systems' as const,
      hasImage: true,
      image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/ken_memorial',
      tagBadge: 'PRODUCTION RAG',
      subtitleTag: 'Live Site',
      actionText: 'GitHub ↗',
      actionUrl: 'https://github.com/Ryo0326-hub/ken_memorial',
      githubUrl: 'https://github.com/Ryo0326-hub/ken_memorial',
      title: 'KenMemory',
      description: 'Privacy-aware RAG product embedding consented memories in PostgreSQL/pgvector with HNSW vector search and streaming grounded answers, verified by 63 backend tests.',
      tags: ['OpenAI API', 'FastAPI', 'React', 'PostgreSQL/pgvector', 'HNSW']
    }
  ];

  const filteredMobileProjects = mobileCategory === 'all'
    ? mobileProjects
    : mobileProjects.filter((p) => p.category === mobileCategory);

  return (
    <div id="projects-screen" className="w-full bg-[#0c0d10] min-h-screen">
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ========================================================================= */}
      {/* MOBILE PROJECTS VIEW (md:hidden) - Exact implementation as provided */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col w-full px-4 pt-4 pb-28 space-y-8 bg-[#131315]">
        {/* Section 1: Featured Projects */}
        <section className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#4cd7f6] tracking-widest uppercase">
                $ cd ~/projects &amp;&amp; ls -la
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            </div>
            <h2 className="text-[28px] leading-[34px] tracking-tight text-[#e5e1e4] font-semibold font-sans">
              Featured Projects
            </h2>
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" id="categoryFilterRow">
            <button
              onClick={() => setMobileCategory('all')}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                mobileCategory === 'all'
                  ? 'bg-[#4cd7f6] text-[#001f26] font-semibold shadow-sm'
                  : 'bg-[#201f22] text-[#bcc9cd] hover:text-[#e5e1e4]'
              }`}
            >
              All (4)
            </button>
            <button
              onClick={() => setMobileCategory('agentic')}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                mobileCategory === 'agentic'
                  ? 'bg-[#4cd7f6] text-[#001f26] font-semibold shadow-sm'
                  : 'bg-[#201f22] text-[#bcc9cd] hover:text-[#e5e1e4]'
              }`}
            >
              Agentic &amp; FinTech (3)
            </button>
            <button
              onClick={() => setMobileCategory('systems')}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                mobileCategory === 'systems'
                  ? 'bg-[#4cd7f6] text-[#001f26] font-semibold shadow-sm'
                  : 'bg-[#201f22] text-[#bcc9cd] hover:text-[#e5e1e4]'
              }`}
            >
              Systems &amp; RAG (1)
            </button>
          </div>

          {/* Mobile Projects Container */}
          <div className="flex flex-col space-y-4" id="projectsContainer">
            {filteredMobileProjects.map((card) => (
              <article
                key={card.id}
                onClick={() => card.projectRef && setSelectedProject(card.projectRef)}
                className="flex flex-col p-4 rounded-xl bg-[#1c1b1d] shadow-sm transition-all duration-200 border border-[#27282e]/40 cursor-pointer"
              >
                {/* Hero Image if present */}
                {card.hasImage && (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden mb-3 bg-[#201f22]">
                    <img
                      className="w-full h-full object-cover"
                      alt={card.title}
                      src={card.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-[#0e0e10]/20 to-transparent"></div>
                  </div>
                )}

                {/* Header Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#2a2a2c] font-mono text-[11px] text-[#4cd7f6] uppercase font-medium">
                      {card.tagBadge}
                    </span>
                    {card.subtitleTag && (
                      <>
                        <span className="text-[#869397] text-[12px]">•</span>
                        <span className="font-mono text-[11px] text-[#bcc9cd]">
                          {card.subtitleTag}
                        </span>
                      </>
                    )}
                  </div>

                  {card.actionUrl && card.actionUrl !== '#' ? (
                    <a
                      href={card.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#4cd7f6] hover:text-[#acedff] transition-colors"
                    >
                      {card.actionText}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#4edea3]">
                      {card.actionText}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[18px] leading-[24px] text-[#e5e1e4] font-semibold mb-1 font-sans">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[22px] text-[#bcc9cd] mb-3 font-sans">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#201f22] font-mono text-[12px] text-[#bcc9cd]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 2: Certifications & Continuous Learning */}
        <section className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#4cd7f6] tracking-widest uppercase">
                <span className="text-[#4edea3] font-semibold mr-1">$</span>
                cat ./accreditations_in_flight.log
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            </div>
            <h2 className="text-[28px] leading-[34px] tracking-tight text-[#e5e1e4] font-semibold font-sans">
              Certifications &amp; Continuous Learning
            </h2>
          </div>

          <div className="flex flex-col space-y-2">
            {CERTIFICATIONS.map((cert) => {
              const statusClass =
                cert.status === 'Completed'
                  ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/30'
                  : cert.status === 'In Progress'
                  ? 'bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6]/30'
                  : 'bg-[#201f22] text-[#bcc9cd] border border-[#27282e]';

              return (
                <div
                  key={cert.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1c1b1d] shadow-sm border border-[#27282e]/40"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase text-[#bcc9cd]">
                      {cert.issuer}
                    </span>
                    <h4 className="text-[15px] leading-[20px] text-[#e5e1e4] font-medium truncate font-sans">
                      {cert.title}
                    </h4>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full font-mono text-[11px] whitespace-nowrap shrink-0 ${statusClass}`}
                  >
                    {cert.status || 'In Progress'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Co-op Opportunity Card */}
        <aside className="flex flex-col p-6 rounded-xl bg-[#2a2a2c] shadow-md relative overflow-hidden border border-[#353437]">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#4cd7f6]/10 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span className="font-mono text-[11px] text-[#4edea3] uppercase tracking-widest">
              Co-op Opportunity
            </span>
          </div>
          <p className="text-[18px] leading-[24px] text-[#e5e1e4] font-medium mb-4 font-sans">
            Interested in collaborating or discussing Winter 2026 co-op roles?
          </p>
          <div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#4cd7f6] text-[#001f26] font-mono text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <span>Get in Touch ↗</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP PROJECTS VIEW (hidden md:block) - 100% PRESERVED AS BEFORE */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24 sm:pb-32 space-y-16">
        {/* Featured Projects Section */}
        <section id="section-architecture-artifacts" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div id="projects-terminal-command" className="flex items-center gap-2 font-mono text-xs text-[#38bdf8]">
                <span className="text-[#34d399] select-none font-semibold">$</span>
                <span>cd ~/projects &amp;&amp; ls -la</span>
              </div>

              <h1 id="featured-projects-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
                Featured Projects
              </h1>
            </div>

            {/* Filter Pills */}
            <div id="projects-filter-bar" className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar self-start sm:self-auto">
              {desktopFilters.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    id={`filter-pill-${f.id}`}
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1e1f24] text-white border border-[#2e3038] font-medium'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects 3-Column Responsive Grid */}
          <div id="featured-projects-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDesktopProjects.map((project) => {
              const isLive = project.badges.organization === 'Live';
              const isModelEval = project.badges.organization === 'Competition';

              return (
                <div
                  id={`card-project-${project.id}`}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group rounded-xl border border-[#232428] bg-[#16171a] p-5 hover:border-[#2f3036] transition-all cursor-pointer flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3">
                    {/* GitHub Repo Image Banner */}
                    {project.image && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2 bg-[#121316] border border-[#232428]">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={project.title}
                          src={project.image}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#16171a] via-transparent to-transparent opacity-80"></div>
                      </div>
                    )}

                    {/* Top Header Badge Row */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#181a20] border border-[#272b35] text-zinc-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                        {project.badges.event}
                      </span>
                      <span className={`font-mono text-[11px] ${isLive ? 'text-[#34d399] font-medium' : 'text-zinc-500'}`}>
                        {project.badges.organization}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 id={`title-project-${project.id}`} className="text-base font-semibold text-zinc-100 font-sans tracking-tight group-hover:text-[#38bdf8] transition-colors">
                      {project.title}
                    </h2>

                    {/* Tagline / Description */}
                    <p id={`desc-project-${project.id}`} className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tags and Action row */}
                  <div className="space-y-3 pt-4">
                    <div id={`tags-project-${project.id}`} className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-[#1c1d22] border border-[#27282e] text-[11px] font-mono text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-[#232428]/60">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[11px] font-mono"
                        >
                          <Github className="w-3.5 h-3.5 text-[#38bdf8]" />
                          <span>GitHub ↗</span>
                        </a>
                      ) : (
                        <span />
                      )}
                      <span className="text-[#38bdf8] group-hover:underline flex items-center gap-1 font-medium">
                        {project.badges.actionText}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="section-verified-pedigree" className="space-y-6 pt-6">
          <div className="space-y-2">
            <div id="certifications-terminal-command" className="flex items-center gap-2 font-mono text-xs text-[#38bdf8]">
              <span className="text-[#34d399] select-none font-semibold">$</span>
              <span>cat ./accreditations_in_flight.log</span>
            </div>

            <h2 id="certifications-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Certifications &amp; Continuous Learning
            </h2>
          </div>

          <div id="certifications-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => {
              const isFullWidth = cert.id === 'github-foundations';
              const statusClass = 
                cert.status === 'Completed'
                  ? 'bg-[#132c21] text-[#34d399] border border-[#204c38]'
                  : cert.status === 'In Progress'
                  ? 'bg-[#13232c] text-[#38bdf8] border border-[#203c4c]'
                  : 'bg-[#27282e] text-zinc-400 border border-[#35363e]';

              return (
                <div
                  id={`card-cert-${cert.id}`}
                  key={cert.id}
                  className={`rounded-xl border border-[#232428] bg-[#16171a] p-5 flex flex-col justify-between shadow-lg ${
                    isFullWidth ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                        {cert.issuer}
                      </span>
                      <span
                        id={`cert-status-${cert.id}`}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${statusClass}`}
                      >
                        {cert.status || 'In Progress'}
                      </span>
                    </div>

                    <div id={`cert-title-${cert.id}`} className="text-sm font-semibold font-sans text-zinc-100 pt-1">
                      {cert.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Opportunity Card */}
        <section id="section-coop-opportunity" className="rounded-xl border border-[#232428] bg-[#16171a] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <h3 id="coop-opportunity-pitch" className="text-base sm:text-lg font-semibold text-white font-sans">
              Interested in collaborating or discussing Winter 2026 co-op roles?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Open to AI Engineering, Quantitative Research, and Systems Software positions.
            </p>
          </div>

          <button
            id="btn-coop-get-in-touch"
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-2.5 rounded-md bg-[#00c5e0] hover:bg-[#00c5e0]/90 text-[#003640] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </div>
    </div>
  );
};

