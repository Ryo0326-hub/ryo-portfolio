import React from 'react';
import { Link, GraduationCap, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="app-footer" className="w-full border-t border-[#222328] bg-[#0c0d10] py-8 text-xs font-mono text-[#71717a]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Left identity & University */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-zinc-300 font-medium">
            Ryo Kitano <span className="text-[#3f3f46]">·</span> Combinatorics &amp; Optimization
          </div>
          <div className="text-[#52525b]">
            Faculty of Mathematics, University of Waterloo
          </div>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-6 text-zinc-400">
          <a
            href="https://github.com/Ryo0326-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-zinc-500 font-semibold">&lt;/&gt;</span>
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/ryo-kitano"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Link className="w-3.5 h-3.5 text-zinc-500" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://scholar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
            <span>Scholar</span>
          </a>

          <a
            href="mailto:contact@ryokitano.com"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span>SSH</span>
          </a>
        </div>

        {/* Right copyright */}
        <div className="text-[#52525b] text-center md:text-right">
          © 2026 Ryo Kitano. All systems nominal.
        </div>
      </div>

      {/* Background ASCII Art Citation */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-5 border-t border-[#222328]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717a] font-mono">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8] shrink-0"></span>
          <span>
            Background ASCII art: Photo by{' '}
            <a
              href="https://unsplash.com/@firedorange717?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-[#38bdf8] underline decoration-zinc-600 transition-colors"
            >
              Joshua Kantarges
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/photos/basketball-court-markings-with-shadows-N_7Kb4hpaoU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-[#38bdf8] underline decoration-zinc-600 transition-colors"
            >
              Unsplash
            </a>{' '}
            (edited into ASCII form by me)
          </span>
        </div>
        <div className="text-[#52525b] text-[10px] uppercase tracking-wider">
          Basketball court markings with shadows
        </div>
      </div>
    </footer>
  );
};
