import React, { useState, useEffect } from 'react';
import { Activity, Cpu, TrendingUp } from 'lucide-react';

interface GraphicProps {
  type: 'thetatrap' | 'amd-rocm' | 'gradient-map';
}

export const ProjectHeroGraphic: React.FC<GraphicProps> = ({ type }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  if (type === 'thetatrap') {
    return (
      <div className="relative w-full h-48 sm:h-56 bg-[#07090e] rounded-t-lg overflow-hidden border-b border-[#27272a] select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Neon SVG chart */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#4edea3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="60" y1="40" x2="60" y2="200" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="40" x2="160" y2="200" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="260" y1="40" x2="260" y2="200" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="360" y1="40" x2="360" y2="200" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="170" x2="460" y2="170" stroke="#1f2937" strokeWidth="1" />

          {/* Area fill under curve */}
          <path
            d="M 60 170 Q 150 160 210 120 T 320 65 T 440 45 L 440 170 Z"
            fill="url(#areaGradient)"
          />

          {/* Dynamic Volatility Strike Curve */}
          <path
            d="M 60 170 Q 150 160 210 120 T 320 65 T 440 45"
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
            filter="url(#cyanGlow)"
          />

          {/* Secondary Delta curve */}
          <path
            d="M 60 165 Q 180 155 270 95 T 440 85"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.8"
          />

          {/* Tangent Strike point marker */}
          <circle cx="320" cy="65" r="4.5" fill="#4cd7f6" filter="url(#cyanGlow)" />
          <circle cx="320" cy="65" r="9" fill="none" stroke="#4cd7f6" strokeWidth="1" opacity="0.6" />

          {/* Target strike vertical ray */}
          <line x1="320" y1="40" x2="320" y2="170" stroke="#4cd7f6" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <text x="325" y="55" fill="#4cd7f6" fontSize="10" fontFamily="JetBrains Mono">STRIKE: $145.00</text>
        </svg>

        {/* Real-time Telemetry Data Box (matching image) */}
        <div className="absolute top-3 left-4 text-[10px] font-mono text-zinc-400 bg-[#090b10]/85 backdrop-blur-xs border border-zinc-800/80 rounded px-2.5 py-1.5 leading-tight space-y-0.5">
          <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            OPEN POSITIONS: 4
          </div>
          <div className="grid grid-cols-2 gap-x-3 text-[9px] pt-0.5">
            <span className="text-zinc-400">DELTA: <span className="text-cyan-300 font-mono">+14,560</span></span>
            <span className="text-zinc-400">GAMMA: <span className="text-emerald-300 font-mono">+890</span></span>
            <span className="text-zinc-400">VEGA: <span className="text-zinc-300 font-mono">+3,120</span></span>
            <span className="text-zinc-400">THETA: <span className="text-rose-400 font-mono">-980</span></span>
          </div>
        </div>

        {/* Right side order book simulation */}
        <div className="absolute top-3 right-3 sm:right-4 text-[8px] sm:text-[9px] font-mono text-zinc-500 bg-[#090b10]/90 border border-zinc-800/80 rounded px-2 py-1.5 space-y-0.5 shadow-md">
          <div className="text-zinc-400 text-[8.5px] sm:text-[10px] font-medium">ORDER BOOK</div>
          <div className="text-emerald-400">BID: 144.95 x 120</div>
          <div className="text-rose-400">ASK: 145.05 x 85</div>
          <div className="text-zinc-500 text-[7.5px] sm:text-[9px]">Depth: 00:45:32</div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center gap-1.5 bg-[#090e12]/90 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 font-mono text-[10.5px] px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE EXECUTION ENGINE
          </span>
        </div>
      </div>
    );
  }

  if (type === 'amd-rocm') {
    return (
      <div className="relative w-full h-48 sm:h-56 bg-[#060811] rounded-t-lg overflow-hidden border-b border-[#27272a] select-none">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-cyan-950/40 via-transparent to-transparent opacity-80" />
        
        {/* Neural Network / Token Routing Topology SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240">
          <defs>
            <linearGradient id="rocmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="blueGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connecting Topology Lines */}
          <g stroke="#0ea5e9" strokeWidth="1.5" opacity="0.6" filter="url(#blueGlow)">
            <line x1="80" y1="120" x2="180" y2="70" />
            <line x1="80" y1="120" x2="180" y2="160" />
            <line x1="180" y1="70" x2="280" y2="60" />
            <line x1="180" y1="70" x2="280" y2="120" />
            <line x1="180" y1="160" x2="280" y2="120" />
            <line x1="180" y1="160" x2="280" y2="180" />
            <line x1="280" y1="60" x2="380" y2="90" />
            <line x1="280" y1="120" x2="380" y2="90" />
            <line x1="280" y1="180" x2="380" y2="150" />
            <line x1="380" y1="90" x2="450" y2="120" />
            <line x1="380" y1="150" x2="450" y2="120" />
          </g>

          {/* Animated Token Pulses */}
          <circle cx={80 + ((pulse * 4) % 370)} cy="100" r="3" fill="#4cd7f6" filter="url(#blueGlow)" />
          <circle cx={140 + (((pulse + 30) * 3) % 240)} cy="140" r="2.5" fill="#a855f7" />

          {/* Nodes */}
          {[
            { x: 80, y: 120, label: 'INPUT', color: '#06b6d4' },
            { x: 180, y: 70, label: 'SLM 3B', color: '#38bdf8' },
            { x: 180, y: 160, label: 'ROCm', color: '#06b6d4' },
            { x: 280, y: 60, label: 'ATTN', color: '#818cf8' },
            { x: 280, y: 120, label: 'CACHE', color: '#38bdf8' },
            { x: 280, y: 180, label: 'TENSOR', color: '#06b6d4' },
            { x: 380, y: 90, label: 'ROUTER', color: '#a855f7' },
            { x: 380, y: 150, label: 'FRONTIER', color: '#38bdf8' },
            { x: 450, y: 120, label: 'OUTPUT', color: '#4edea3' },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="8" fill="#090d1a" stroke={n.color} strokeWidth="2" filter="url(#blueGlow)" />
              <circle cx={n.x} cy={n.y} r="3" fill={n.color} />
              <text x={n.x} y={n.y - 12} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Device Preview overlay on right */}
        <div className="absolute top-3 right-3 sm:right-4 w-24 sm:w-28 h-32 sm:h-36 bg-[#090b14]/95 border border-cyan-500/35 rounded-lg p-1.5 sm:p-2 shadow-2xl flex flex-col justify-between text-[7.5px] sm:text-[8px] font-mono text-cyan-300 backdrop-blur-xs">
          <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1 text-[7px] sm:text-[7.5px] text-zinc-400">
            <span>AMD ROCm Node</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          <div className="space-y-1 my-0.5">
            <div className="bg-cyan-950/40 p-1 rounded border border-cyan-800/40 text-[6.5px] sm:text-[7px] text-zinc-300">
              Prompt Tokens: <span className="text-cyan-400 font-bold">1,024</span>
            </div>
            <div className="bg-cyan-950/40 p-1 rounded border border-cyan-800/40 text-[6.5px] sm:text-[7px] text-zinc-300">
              ROCm Latency: <span className="text-emerald-400 font-bold">4.2ms</span>
            </div>
          </div>
          <div className="text-[6.5px] sm:text-[7px] text-zinc-500 text-center">Heterogeneous Routing</div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center gap-1.5 bg-[#090e18]/90 backdrop-blur-sm border border-cyan-500/40 text-cyan-300 font-mono text-[10.5px] px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Cpu className="w-3 h-3 text-cyan-400" />
            AMD ROCM PARALLELIZED
          </span>
        </div>
      </div>
    );
  }

  if (type === 'gradient-map') {
    return (
      <div className="relative w-full h-48 sm:h-56 bg-[#07070b] rounded-t-lg overflow-hidden border-b border-[#27272a] select-none">
        {/* 3D Topographic Wireframe / Surface Convergence Graph */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240">
          <defs>
            <linearGradient id="terrainGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#4338ca" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#4edea3" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="peakLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Top Label */}
          <text x="250" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="JetBrains Mono" fontWeight="500">
            Stochastic Gradient Convergence Map
          </text>

          {/* Grid coordinates */}
          <g stroke="#27272a" strokeWidth="0.8" opacity="0.4">
            <line x1="50" y1="40" x2="450" y2="40" />
            <line x1="50" y1="180" x2="450" y2="180" />
            <line x1="100" y1="35" x2="100" y2="185" strokeDasharray="3 3" />
            <line x1="250" y1="35" x2="250" y2="185" strokeDasharray="3 3" />
            <line x1="400" y1="35" x2="400" y2="185" strokeDasharray="3 3" />
          </g>

          {/* 3D Wireframe Surface Ridges */}
          <g fill="none" strokeWidth="1.2">
            {/* Back ridge */}
            <path d="M 60 140 Q 150 110 200 90 T 320 110 T 440 135" stroke="#312e81" opacity="0.5" />
            
            {/* Mid ridge */}
            <path d="M 60 150 Q 160 100 230 75 T 350 95 T 440 145" stroke="#4338ca" opacity="0.7" />
            
            {/* Peak 3D Surface */}
            <path
              d="M 60 165 C 130 140 170 80 230 60 C 290 40 330 110 390 120 C 420 125 440 155 450 165 L 450 180 L 50 180 Z"
              fill="url(#terrainGrad)"
              stroke="url(#peakLine)"
              strokeWidth="2"
            />

            {/* Foreground intersecting flow lines */}
            <path d="M 90 170 C 160 130 220 85 270 95 C 330 105 380 140 430 170" stroke="#4cd7f6" strokeWidth="1.5" />
            <path d="M 120 175 C 180 150 240 120 290 125 C 340 130 380 160 410 175" stroke="#10b981" strokeWidth="1.2" opacity="0.8" />
          </g>

          {/* Optimum Minima marker */}
          <circle cx="230" cy="60" r="4" fill="#4edea3" />
          <circle cx="230" cy="60" r="8" fill="none" stroke="#4edea3" strokeWidth="1" strokeDasharray="2 2" />
          <text x="235" y="52" fill="#4edea3" fontSize="9" fontFamily="JetBrains Mono">GLOBAL MINIMA (loss=0.014)</text>
        </svg>

        {/* Bottom Badge */}
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center gap-1.5 bg-[#090e14]/90 backdrop-blur-sm border border-emerald-500/40 text-emerald-300 font-mono text-[10.5px] px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            HIGH FREQUENCY PIPELINE
          </span>
        </div>
      </div>
    );
  }

  return null;
};
