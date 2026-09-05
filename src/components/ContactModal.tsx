import React, { useState } from 'react';
import { Mail, Copy, Check, X, ShieldCheck, Send, ExternalLink } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [subject, setSubject] = useState('Winter 2026 Co-op Opportunity');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPgp = () => {
    const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://openpgpjs.org

xjMEY3...[Ryo Kitano <rkitano0326@gmail.com> PGP Fingerprint: 4E9B 81C2 A8D3]...
-----END PGP PUBLIC KEY BLOCK-----`;
    navigator.clipboard.writeText(pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const mailtoLink = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div id="modal-contact-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="modal-contact-container"
        className="w-full max-w-lg bg-[#0d0e12] border border-[#27272a] rounded-lg shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div id="modal-contact-header" className="px-4 py-3 bg-[#131315] border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-zinc-400 font-mono">dispatch_contact.sh</span>
          </div>
          <button
            id="btn-close-contact-modal"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 p-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          {/* Target Direct Address */}
          <div id="contact-email-address-card" className="bg-[#18181b] border border-[#27272a] rounded p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#09090b] border border-cyan-500/30 flex items-center justify-center text-[#4cd7f6]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Primary University Email</div>
                  <div id="contact-email-text" className="font-mono text-xs text-zinc-100 font-medium select-all">
                    {PROFILE_INFO.email}
                  </div>
                </div>
              </div>
              <button
                id="btn-copy-contact-email"
                onClick={handleCopyEmail}
                className="px-2.5 py-1.5 rounded bg-[#27272a] hover:bg-[#3f3f46] text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-[#27272a]/60">
              <span>Phone: <span className="text-zinc-200">{PROFILE_INFO.phone}</span></span>
              <span>Alt: <span className="text-zinc-300">{PROFILE_INFO.emailSecondary}</span></span>
            </div>
          </div>

          {/* Quick Mail Composition Form */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <label htmlFor="contact-subject-select" className="block text-[11px] text-zinc-400 mb-1">SUBJECT PROTOCOL</label>
              <select
                id="contact-subject-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-2 text-zinc-200 text-xs focus:border-[#4cd7f6] focus:outline-none"
              >
                <option value="Winter 2026 Co-op Opportunity">Winter 2026 Co-op Opportunity</option>
                <option value="AI / ML Research Collaboration">AI / ML Research Collaboration</option>
                <option value="Quant / Optimization Inquiry">Quant / Optimization Inquiry</option>
                <option value="General Engineering Discussion">General Engineering Discussion</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message-textarea" className="block text-[11px] text-zinc-400 mb-1">MESSAGE PAYLOAD</label>
              <textarea
                id="contact-message-textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Brief introduction or inquiry for Ryo..."
                className="w-full bg-[#18181b] border border-[#27272a] rounded p-3 text-zinc-200 text-xs focus:border-[#4cd7f6] focus:outline-none placeholder:text-zinc-600 resize-none font-sans"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              id="btn-launch-default-mailer"
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded bg-[#4cd7f6] hover:bg-[#22d3ee] text-[#09090b] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(76,215,246,0.25)]"
            >
              <Send className="w-3.5 h-3.5" />
              Launch Default Mailer
            </a>
            
            <button
              id="btn-copy-pgp-key"
              onClick={handleCopyPgp}
              className="py-2.5 px-3 rounded bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-zinc-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
              title="Copy public PGP key"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              {copiedPgp ? 'PGP Copied' : 'PGP Key'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div id="modal-contact-footer" className="px-5 py-2.5 bg-[#131315] border-t border-[#27272a] text-[10.5px] font-mono text-zinc-400 flex items-center justify-between">
          <span>Waterloo, ON (UTC-5)</span>
          <span className="text-emerald-400">● Status: Available Winter 2026</span>
        </div>
      </div>
    </div>
  );
};
