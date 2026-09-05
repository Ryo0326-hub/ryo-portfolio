import React from 'react';
import { TabType } from '../types';
import { Terminal, Briefcase, LayoutGrid, Award } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Terminal className="w-4 h-4" />
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <LayoutGrid className="w-4 h-4" />
    },
    {
      id: 'certifications',
      label: 'Certs',
      icon: <Award className="w-4 h-4" />
    }
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-[#0c0d10]/95 backdrop-blur-xl border-t border-[#202126] shadow-2xl"
    >
      <div className="grid grid-cols-4 items-center h-14 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              id={`nav-tab-${item.id}`}
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 h-11 rounded-lg transition-all cursor-pointer select-none ${
                isActive
                  ? 'text-[#4cd7f6] bg-[#171b22] font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-[#4cd7f6]"></span>
              )}
              <span className="shrink-0">{item.icon}</span>
              <span className="font-mono text-[10px] tracking-wide uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

