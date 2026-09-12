/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { ExperienceView } from './components/ExperienceView';
import { ProjectsView } from './components/ProjectsView';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-[#060f19] text-[#e5e1e4] flex flex-col items-center selection:bg-[#4cd7f6]/20 selection:text-[#4cd7f6]">
      {/* Contact modal accessible globally */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Resume modal with preview & download */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Ambient ASCII Art Background (Basketball court blueprint: desktop & mobile variants) */}
      <div 
        id="ascii-background-layer"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#060f19]"
        aria-hidden="true"
      >
        {/* Desktop ASCII Court Blueprint */}
        <img
          src="/bg5-desk.png"
          alt="Basketball court ASCII art blueprint desktop"
          className="hidden md:block w-full h-full object-cover object-center opacity-95 transition-opacity duration-300"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes('background4-desk.png')) {
              img.src = '/background4-desk.png';
            }
          }}
        />

        {/* Mobile ASCII Court Blueprint */}
        <img
          src="/bg5-mob.png"
          alt="Basketball court ASCII art blueprint mobile"
          className="block md:hidden w-full h-full object-cover object-center opacity-95 transition-opacity duration-300"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes('background4-mob.png')) {
              img.src = '/background4-mob.png';
            }
          }}
        />

        {/* Subtle vignette framing to keep foreground cards comfortable to read while court lines shine */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(6, 15, 25, 0.45) 100%)'
          }}
        />
      </div>

      {/* Subtle technical dot texture for layered depth */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main viewport shell (optimized for mobile-first precision and responsive desktop framing) */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Sticky Top Header */}
        <Header 
          currentTab={currentTab} 
          onSelectTab={setCurrentTab} 
          onOpenContact={() => setIsContactOpen(true)} 
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Tab View Container with Smooth Motion Transitions */}
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            {currentTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <OverviewView 
                  onNavigateToProjects={() => setCurrentTab('projects')} 
                  onOpenResume={() => setIsResumeOpen(true)}
                />
              </motion.div>
            )}

            {currentTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <ExperienceView />
              </motion.div>
            )}

            {currentTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <ProjectsView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
      </div>
    </div>
  );
}
