import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Copy,
  Layers,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'document' | 'embed'>('embed');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/Ryo_Kitano_AI_ML_Resume.pdf`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 145));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 75));
  const resetZoom = () => setZoomLevel(100);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl h-[92vh] flex flex-col bg-[#111215] border border-[#26272e] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#15161b] border-b border-[#23242b] shrink-0">
            {/* Left title & meta */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#1a232c] border border-[#27485f] flex items-center justify-center text-[#38bdf8] shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-white truncate">
                    Ryo_Kitano_Resume.pdf
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1d2d24] text-[#34d399] border border-[#244e39]">
                    Official PDF
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 truncate">
                  Mathematics &amp; ML Engineer • Updated Sep 2026
                </span>
              </div>
            </div>

            {/* View Mode Toggle & Zoom Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center bg-[#1b1c22] border border-[#2c2d36] rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('document')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                    viewMode === 'document'
                      ? 'bg-[#292a34] text-[#38bdf8] shadow-xs font-medium'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Interactive Document Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setViewMode('embed')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                    viewMode === 'embed'
                      ? 'bg-[#292a34] text-[#38bdf8] shadow-xs font-medium'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Native PDF Viewer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>PDF Viewer</span>
                </button>
              </div>

              {/* Zoom Buttons (only for Document view) */}
              {viewMode === 'document' && (
                <div className="hidden md:flex items-center bg-[#1b1c22] border border-[#2c2d36] rounded-lg p-0.5 text-zinc-400">
                  <button
                    onClick={zoomOut}
                    disabled={zoomLevel <= 75}
                    className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] px-1.5 select-none text-zinc-300">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={zoomIn}
                    disabled={zoomLevel >= 145}
                    className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  {zoomLevel !== 100 && (
                    <button
                      onClick={resetZoom}
                      className="p-1 hover:text-white border-l border-[#2c2d36] ml-0.5 pl-1 cursor-pointer"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Copy Direct Link */}
              <button
                onClick={handleCopyLink}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-[#1c1d24] border border-[#2c2d36] text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
                title="Copy direct PDF URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Link'}</span>
              </button>

              {/* Open in New Tab */}
              <a
                href="/Ryo_Kitano_AI_ML_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-[#1c1d24] border border-[#2c2d36] text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                title="Open PDF directly in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px]">Open Tab</span>
              </a>

              {/* Download PDF */}
              <a
                href="/Ryo_Kitano_AI_ML_Resume.pdf"
                download="Ryo_Kitano_AI_ML_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#00c5e0] text-[#003640] hover:bg-[#34e2fb] transition-colors shadow-xs"
                title="Download Ryo_Kitano_AI_ML_Resume.pdf"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#1b1c22] border border-[#2b2c34] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors ml-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Preview Container */}
          <div className="flex-1 w-full overflow-auto bg-[#0a0a0c] p-3 sm:p-6 flex justify-center">
            {viewMode === 'embed' ? (
              <div className="w-full h-full min-h-[500px] rounded-lg overflow-hidden bg-[#16171b] border border-[#27282e] flex flex-col">
                <iframe
                  src="/Ryo_Kitano_AI_ML_Resume.pdf#toolbar=1"
                  title="Ryo Kitano Resume"
                  className="w-full flex-1 min-h-[600px] border-0 bg-white"
                />
              </div>
            ) : (
              /* High-Fidelity Document Preview (Paper Layout) */
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="w-full max-w-[780px] bg-[#ffffff] text-[#111827] rounded-sm shadow-2xl p-6 sm:p-10 md:p-12 font-serif select-text my-auto shrink-0 leading-normal"
              >
                {/* Header */}
                <div className="text-center pb-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-serif">
                    Ryo Kitano
                  </h1>
                  <div className="mt-1 text-[11px] sm:text-[12px] text-zinc-700 flex flex-wrap items-center justify-center gap-1.5 font-serif">
                    <span>548-384-6021</span>
                    <span className="text-zinc-400">|</span>
                    <a
                      href="mailto:rkitano@uwaterloo.ca"
                      className="text-zinc-800 hover:text-blue-700 hover:underline"
                    >
                      rkitano@uwaterloo.ca
                    </a>
                    <span className="text-zinc-400">|</span>
                    <a
                      href="https://linkedin.com/in/ryo-kitano"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 hover:text-blue-700 hover:underline"
                    >
                      linkedin.com/in/ryo-kitano
                    </a>
                    <span className="text-zinc-400">|</span>
                    <a
                      href="https://github.com/Ryo0326-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 hover:text-blue-700 hover:underline"
                    >
                      github.com/Ryo0326-hub
                    </a>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="mt-3">
                  <div className="border-b border-black pb-0.5 mb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider text-black font-serif">
                      EDUCATION
                    </h2>
                  </div>
                  <div className="flex justify-between items-baseline text-[11.5px] font-serif">
                    <span className="font-bold text-black">University of Waterloo</span>
                    <span className="text-zinc-800">Waterloo, ON</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] text-zinc-800 italic font-serif">
                    <span>Bachelor of Mathematics, Honours, Co-operative Program</span>
                    <span className="not-italic">Sep. 2024 – May 2029</span>
                  </div>
                  <ul className="mt-1 space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                    <li>
                      <span className="font-semibold text-black">Award:</span> President’s Scholarship (2024)
                    </li>
                    <li>
                      <span className="font-semibold text-black">Coursework:</span> Optimization, Probability, Statistics, Linear Algebra II, Combinatorics, Graph Theory, Network Flow Theory, Algorithm Design &amp; Data Abstraction
                    </li>
                  </ul>
                </div>

                {/* EXPERIENCE */}
                <div className="mt-3.5">
                  <div className="border-b border-black pb-0.5 mb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider text-black font-serif">
                      EXPERIENCE
                    </h2>
                  </div>

                  {/* Role 1 */}
                  <div className="mb-2.5">
                    <div className="flex justify-between items-baseline text-[11.5px] font-serif">
                      <span className="font-bold text-black">Co-Founder &amp; Technical Lead</span>
                      <span className="text-zinc-800">Mar. 2026 – Present</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-zinc-800 italic font-serif mb-0.5">
                      <span>Neural Point Analytica (NPA)</span>
                      <span>Remote / Japan</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Co-founded a 3-person software company and lead engineering for an NDA-protected enterprise workflow platform; secured its first recurring client contract worth <strong className="font-semibold text-black">US$1.5K/month</strong>
                      </li>
                      <li>
                        Lead architecture and delivery of auditable RFQ intake, quotation, reconciliation, and reporting workflows using <strong className="font-semibold text-black">Next.js, TypeScript, PostgreSQL, and AWS</strong>; turn client feedback into staged releases with Docker and GitHub Actions
                      </li>
                    </ul>
                  </div>

                  {/* Role 2 */}
                  <div>
                    <div className="flex justify-between items-baseline text-[11.5px] font-serif">
                      <span className="font-bold text-black">Java Backend &amp; Computer Vision Engineer Intern</span>
                      <span className="text-zinc-800">May 2026 – Sep. 2026</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-zinc-800 italic font-serif mb-0.5">
                      <span>AISTGroup LLC</span>
                      <span>Remote / Baku, Azerbaijan</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Delivered Spring Boot REST APIs for invoice, receipt, and file workflows in a 5-engineer team, spanning JPA entities, validation, localization, Liquibase migrations, and JUnit tests
                      </li>
                      <li>
                        Implemented encrypted SMTP configuration and a transactional outbox that decoupled receipt delivery from API requests and enabled retryable asynchronous processing; hardened behavior through code review and tests
                      </li>
                      <li>
                        Owned data preparation, training, and evaluation for a YOLO26-s + EfficientNet-B0 pipeline using 41.9K images and 180K annotated signs; achieved <strong className="font-semibold text-black">0.871 mAP@50</strong> detection and <strong className="font-semibold text-black">89.0% Top-1</strong> classification across 154 sign classes
                      </li>
                    </ul>
                  </div>
                </div>

                {/* PROJECTS */}
                <div className="mt-3.5">
                  <div className="border-b border-black pb-0.5 mb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider text-black font-serif">
                      PROJECTS
                    </h2>
                  </div>

                  {/* Project 1 */}
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline text-[11px] font-serif">
                      <div>
                        <span className="font-bold text-black">Hybrid Token-Efficient Routing Agent</span>
                        <span className="text-zinc-800 italic"> | Python, Qwen, Fireworks, Docker</span>
                      </div>
                      <span className="text-zinc-800 text-[10.5px]">Jul. 2026</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Trained a hashed n-gram logistic router on 360 measured task outcomes to route between quantized Qwen2.5-1.5B and a hosted LLM under a 2-vCPU / 4-GB budget; added deterministic verification and failover
                      </li>
                      <li>
                        Passed 80/80 mixed-task evaluations using 9,745 tokens; on a 20-case hard set, optimized escalation prompting raised accuracy from 85% to 95% while cutting token use by 24.6%
                      </li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline text-[11px] font-serif">
                      <div>
                        <span className="font-bold text-black">KenMemory</span>
                        <span className="text-zinc-800 italic"> | Live Site | OpenAI API, FastAPI, React, PostgreSQL/pgvector</span>
                      </div>
                      <span className="text-zinc-800 text-[10.5px]">Mar. 2026 – Aug. 2026</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Independently built and deployed a privacy-aware RAG product; embedded only consented memories in PostgreSQL/pgvector, used HNSW vector search for semantic retrieval, and streamed grounded answers, verified by 63 backend tests
                      </li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline text-[11px] font-serif">
                      <div>
                        <span className="font-bold text-black">ThetaTrap</span>
                        <span className="text-zinc-800 italic"> | Python, Qwen, Alpaca MCP, SQLite</span>
                      </div>
                      <span className="text-zinc-800 text-[10.5px]">Aug. 2026 – Sep. 2026</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Independently built and deployed an MCP-native paper-options agent with deterministic Python controls that locked candidates, strikes, sizing, and max loss before LLM tool use; passed 191 tests and 5/5 mutation-free replays
                      </li>
                    </ul>
                  </div>

                  {/* Project 4 */}
                  <div>
                    <div className="flex justify-between items-baseline text-[11px] font-serif">
                      <div>
                        <span className="font-bold text-black">Kraken Knight</span>
                        <span className="text-zinc-800 italic"> | Python, Kraken API, SQLite, systemd</span>
                      </div>
                      <span className="text-zinc-800 text-[10.5px]">Aug. 2026 – Sep. 2026</span>
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] leading-relaxed text-zinc-900 pl-4 list-disc font-serif">
                      <li>
                        Backtested a deterministic BTC/CAD strategy on 4.63M historical Kraken trades, validated it through shadow trading, then deployed live execution with authenticated orders, fill reconciliation, idempotent audit logs, and fail-closed risk controls
                      </li>
                    </ul>
                  </div>
                </div>

                {/* TECHNICAL SKILLS */}
                <div className="mt-3.5">
                  <div className="border-b border-black pb-0.5 mb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider text-black font-serif">
                      TECHNICAL SKILLS
                    </h2>
                  </div>
                  <div className="space-y-1 text-[10.5px] leading-relaxed font-serif text-zinc-900">
                    <div>
                      <strong className="font-bold text-black">Languages:</strong> Python, Java, SQL; C, TypeScript, JavaScript (working knowledge)
                    </div>
                    <div>
                      <strong className="font-bold text-black">AI/ML:</strong> Machine/deep learning, PyTorch, scikit-learn, Hugging Face Transformers, LLMs, RAG/vector search, prompt engineering, agentic/multi-agent systems, MCP/tool calling, computer vision, responsible AI, LLM evaluation
                    </div>
                    <div>
                      <strong className="font-bold text-black">Frameworks &amp; Data:</strong> TensorFlow/Keras, OpenAI API, FastAPI, React, Next.js, PostgreSQL/pgvector, Pinecone, pandas, NumPy, Matplotlib, Jupyter, REST APIs
                    </div>
                    <div>
                      <strong className="font-bold text-black">MLOps &amp; Developer Tools:</strong> Docker, GitHub Actions (CI/CD), AWS, Vercel, Render, Linux, Git/GitHub; Azure, GCP, Kubernetes (working knowledge)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
