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
    </footer>
  );
};
