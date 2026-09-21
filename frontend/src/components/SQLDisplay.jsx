import { useState } from 'react';
import { Play, Check, Copy, AlertTriangle } from 'lucide-react';

export default function SQLDisplay({ sqlResult, validation, onExecute, isExecuting }) {
  const [copied, setCopied] = useState(false);

  if (!sqlResult) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlResult.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#141C2B]/20 bg-[#E5DED0]">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#141C2B]/15 bg-[#EAE3D5]">
        <div className="flex items-center gap-3.5">
          <span className="font-serif text-[20px] font-medium text-[#141C2B]">
            Generated SQL Statement
          </span>
          {sqlResult.confidence && (
            <span className="px-2.5 py-1 border border-[#141C2B]/20 text-[11px] uppercase font-mono tracking-[0.08em] text-[#4A5364]">
              Confidence: {(sqlResult.confidence * 100).toFixed(0)}%
            </span>
          )}
          {validation && validation.is_read_only && (
            <span className="px-2.5 py-1 border border-[#2C4A8F]/40 text-[11px] uppercase font-mono tracking-[0.08em] text-[#2C4A8F] font-bold">
              Read-Only
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleCopy}
            className="px-3.5 py-1.5 text-[12px] font-mono uppercase tracking-[0.08em] border border-[#141C2B]/20 hover:border-[#141C2B] text-[#141C2B] bg-[#EFE9DD] transition-colors"
            title="Copy SQL"
          >
            {copied ? 'Copied' : 'Copy SQL'}
          </button>
          <button 
            onClick={() => onExecute(sqlResult.sql)}
            disabled={isExecuting || (validation && !validation.is_valid)}
            className="inline-flex items-center gap-2 px-5 py-1.5 text-[12px] font-mono uppercase tracking-[0.1em] bg-[#141C2B] hover:bg-[#2C4A8F] text-[#EFE9DD] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isExecuting ? 'Executing...' : 'Execute Query'}
          </button>
        </div>
      </div>
      
      {/* SQL Code Block in high contrast ink */}
      <div className="p-6 bg-[#141C2B] text-[#EFE9DD] font-mono text-[15px] leading-relaxed overflow-x-auto selection:bg-[#2C4A8F]">
        <pre className="m-0 font-mono whitespace-pre-wrap">{sqlResult.sql}</pre>
      </div>

      {/* Explanatory note from generator */}
      {sqlResult.explanation && (
        <div className="px-6 py-4 border-t border-[#141C2B]/15 bg-[#EFE9DD] text-[14px] font-mono text-[#4A5364]">
          <strong className="text-[#141C2B] uppercase tracking-[0.08em] text-[12px] mr-2">Rationale:</strong>
          {sqlResult.explanation}
        </div>
      )}

      {/* Validation Warnings / Errors */}
      {validation && !validation.is_valid && (
        <div className="px-6 py-4 bg-[#FAF2EE] border-t border-red-700/30 flex gap-3 text-red-900 text-[13px] font-mono">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-700 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider block mb-1">Validation Errors:</span>
            <ul className="list-disc list-inside space-y-1">
              {validation.errors?.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
