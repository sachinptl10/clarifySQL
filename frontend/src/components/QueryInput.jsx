import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function QueryInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (text.trim() && !isLoading) onSubmit(text);
    }
  };

  const examples = [
    "Show me Apple's sales",
    "Top 5 customers by total spend",
    "Monthly order revenue for 2024"
  ];

  return (
    <div className="w-full space-y-5">
      <div className="relative border border-[#141C2B]/30 bg-[#EFE9DD] focus-within:border-[#2C4A8F] transition-colors">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your database in natural language... (Ctrl+Enter to submit)"
          className="w-full h-36 p-5 bg-transparent text-[#141C2B] placeholder-[#767E8C] font-mono text-[15px] sm:text-[16px] leading-relaxed resize-none focus:outline-none"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-5 py-3 bg-[#E5DED0] border-t border-[#141C2B]/15">
          <span className="text-[12px] uppercase tracking-[0.1em] text-[#767E8C]">
            Ctrl + Enter to Submit
          </span>
          <button
            onClick={() => text.trim() && !isLoading && onSubmit(text)}
            disabled={isLoading || !text.trim()}
            className="inline-flex items-center gap-2.5 px-5 py-2 bg-[#141C2B] hover:bg-[#2C4A8F] text-[#EFE9DD] font-mono text-[12px] uppercase tracking-[0.12em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Run Query'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 text-[12px] font-mono pt-1">
        <span className="text-[#767E8C] uppercase tracking-[0.08em]">Example Prompts:</span>
        {examples.map((ex, i) => (
          <button 
            key={i} 
            onClick={() => setText(ex)} 
            className="px-3 py-1.5 bg-[#EFE9DD] hover:bg-[#EAE3D5] text-[#141C2B] border border-[#141C2B]/20 transition-colors text-[13px]"
          >
            "{ex}"
          </button>
        ))}
      </div>
    </div>
  );
}
