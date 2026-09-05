import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Database, 
  Layers, 
  Cloud, 
  CloudSun, 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';
import { ContactModal } from './ContactModal';

export const CertificationsView: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const renderCertIcon = (type: CertificationItem['iconType']) => {
    switch (type) {
      case 'deeplearning':
        return <BrainCircuit className="w-5 h-5 text-[#4cd7f6]" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-[#4cd7f6]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#4cd7f6]" />;
      case 'azure':
        return <Layers className="w-5 h-5 text-[#4cd7f6]" />;
      case 'aws':
        return <Cloud className="w-5 h-5 text-[#4cd7f6]" />;
      case 'gcp':
        return <CloudSun className="w-5 h-5 text-[#4cd7f6]" />;
      case 'github':
        return <GitBranch className="w-5 h-5 text-[#4cd7f6]" />;
      default:
        return <Terminal className="w-5 h-5 text-[#4cd7f6]" />;
    }
  };

  return (
    <div id="certifications-screen" className="w-full bg-[#131315] min-h-screen">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <div className="relative w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-32">
        {/* Section Header */}
        <div id="certifications-header-section" className="mb-8 sm:mb-10">
          <div
            id="certifications-terminal-command"
            className="flex items-center gap-2 font-mono text-xs text-[#4cd7f6] mb-2"
          >
            <span className="text-[#4edea3] select-none font-semibold">$</span>
            <span>cat ./certifications.log</span>
            <span className="inline-block w-1.5 h-3.5 bg-[#4cd7f6] animate-pulse"></span>
          </div>

          <h1
            id="certifications-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#e5e1e4] tracking-tight font-sans"
          >
            Certifications &amp; Continuous Learning
          </h1>
        </div>

        {/* Certifications Grid */}
        <div id="certifications-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CERTIFICATIONS.map((cert) => {
            const getStatusBadgeStyle = (status: string) => {
              switch (status) {
                case 'Completed':
                  return {
                    container: 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30',
                    dot: 'bg-[#4edea3]',
                  };
                case 'In Progress':
                  return {
                    container: 'bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6]/30',
                    dot: 'bg-[#4cd7f6] animate-pulse',
                  };
                case 'Not Started':
                default:
                  return {
                    container: 'bg-[#869397]/10 text-[#bcc9cd] border border-[#869397]/30',
                    dot: 'bg-[#869397]',
                  };
              }
            };

            const badgeStyle = getStatusBadgeStyle(cert.status);

            return (
              <div
                id={`card-cert-${cert.id}`}
                key={cert.id}
                className="rounded-xl border border-[#3d494c]/30 bg-[#1c1b1d] p-5 space-y-4 hover:border-[#3d494c]/60 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#201f22] border border-[#3d494c]/30 flex items-center justify-center shrink-0">
                      {renderCertIcon(cert.iconType)}
                    </div>
                    <span
                      id={`cert-status-${cert.id}`}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium ${badgeStyle.container}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}></span>
                      {cert.status}
                    </span>
                  </div>

                  <div>
                    <h3
                      id={`cert-title-${cert.id}`}
                      className="text-base font-sans font-semibold text-[#e5e1e4] leading-snug"
                    >
                      {cert.title}
                    </h3>
                    <p
                      id={`cert-issuer-${cert.id}`}
                      className="text-xs font-mono text-[#869397] mt-1"
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-[#bcc9cd] font-sans leading-relaxed pt-1">
                      {cert.description}
                    </p>
                  )}
                </div>

                {cert.statusText && (
                  <div className="pt-2 border-t border-[#3d494c]/20 text-[11px] font-mono text-[#869397]">
                    {cert.statusText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Opportunity Card */}
        <div className="mt-12 rounded-xl border border-[#3d494c]/40 bg-[#1c1b1d] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span>Available for Co-op</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#e5e1e4]">
              Interested in discussing research or technical roles?
            </h3>
            <p className="text-sm text-[#bcc9cd] font-sans">
              Currently open to Winter 2026 Machine Learning &amp; AI Engineering co-op opportunities.
            </p>
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-3 rounded-md bg-[#4cd7f6] hover:bg-[#4cd7f6]/90 text-[#003640] font-mono text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer shrink-0"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};
