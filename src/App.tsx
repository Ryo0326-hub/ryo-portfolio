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
import { CertificationsView } from './components/CertificationsView';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col items-center selection:bg-[#4cd7f6]/20 selection:text-[#4cd7f6]">
      {/* Contact modal accessible globally */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Background technical grid texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
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
                <OverviewView onNavigateToProjects={() => setCurrentTab('projects')} />
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

            {currentTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <CertificationsView />
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
