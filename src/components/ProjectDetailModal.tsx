import React from 'react';
import { X, ExternalLink, Github, ArrowUpRight, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { ProjectHeroGraphic } from './ProjectHeroGraphics';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenContact
}) => {
  if (!project) return null;

  return (
    <div id="modal-project-detail-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        id="modal-project-detail-container"
        className="w-full max-w-xl max-h-[90vh] bg-[#0e0e12] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div id="modal-project-header" className="px-4 py-3 bg-[#131316] border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span id="modal-project-artifact-title" className="ml-2 text-zinc-400 font-mono">artifact://{project.id}.telemetry</span>
          </div>
          <button
            id="btn-close-project-modal"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 p-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div id="modal-project-body" className="p-5 overflow-y-auto space-y-5 text-zinc-200">
          {/* Hero graphic / GitHub OpenGraph image */}
          {project.image ? (
            <div id="modal-project-graphic-frame" className="rounded-lg overflow-hidden border border-[#27272a] bg-[#111215]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
          ) : project.graphicType && project.graphicType !== 'none' ? (
            <div id="modal-project-graphic-frame" className="rounded-lg overflow-hidden border border-[#27272a]">
              <ProjectHeroGraphic type={project.graphicType} />
            </div>
          ) : null}

          {/* Title & Category */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span id="modal-project-category-badge" className="px-2 py-0.5 rounded bg-cyan-950/60 text-[#4cd7f6] border border-cyan-500/30 text-[10px] font-mono uppercase font-semibold">
                {project.category}
              </span>
              {project.period && (
                <span className="font-mono text-xs text-zinc-400">
                  {project.period}
                </span>
              )}
            </div>

            <h2 id="modal-project-title" className="text-2xl font-serif font-bold text-white tracking-tight">
              {project.title}
            </h2>

            <p id="modal-project-tagline" className="text-sm font-sans text-zinc-300 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Key Metrics Grid if present */}
          {project.metrics && project.metrics.length > 0 && (
            <div id="modal-project-metrics-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {project.metrics.map((m, i) => (
                <div key={i} id={`modal-metric-${i}`} className="p-2.5 rounded bg-[#141418] border border-[#27272a] space-y-0.5">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">{m.label}</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#4cd7f6]">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Details */}
          {project.details && project.details.length > 0 && (
            <div id="modal-project-architecture-section" className="space-y-2">
              <h3 className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
                SYSTEM ARCHITECTURE & BENCHMARKS
              </h3>
              <ul className="space-y-2 text-xs font-sans text-zinc-300 leading-relaxed">
                {project.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#10b981] mt-0.5 font-mono">✔</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div id="modal-project-tags-section" className="space-y-1.5">
            <h3 className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              STACK & TOOLCHAIN
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-[11px] font-mono text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div id="modal-project-footer" className="p-4 bg-[#131316] border-t border-[#27272a] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                id="btn-view-github-repo"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#1f2127] hover:bg-[#282b33] border border-[#2e313b] text-xs font-mono text-zinc-100 flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>View on GitHub ↗</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                id="btn-view-live-demo"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#102a20] hover:bg-[#16382b] border border-[#1b4e3a] text-xs font-mono text-[#34d399] flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Site ↗</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-close-project-modal-bottom"
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#18181b] hover:bg-[#27272a] text-xs font-mono text-zinc-300 transition-colors"
            >
              Close
            </button>

            <button
              id="btn-inquire-project-modal"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-4 py-2 rounded bg-[#4cd7f6] hover:bg-[#22d3ee] text-[#09090b] font-mono font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(76,215,246,0.3)]"
            >
              Inquire
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
