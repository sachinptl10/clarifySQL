import { useState } from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function ClarificationDialog({ clarification, onSubmit }) {
  const [answers, setAnswers] = useState({});

  if (!clarification || !clarification.questions) return null;

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const isComplete = Object.keys(answers).length === clarification.questions.length;

  return (
    <div className="w-full space-y-6">
      <div className="border-b border-[#141C2B]/15 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#2C4A8F]">
          <HelpCircle className="w-4 h-4" />
          <h3 className="font-serif text-xl font-medium tracking-tight text-[#141C2B]">
            Ambiguity Detected — <em className="italic text-[#2C4A8F]">Clarification Required</em>
          </h3>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#767E8C]">
          {Object.keys(answers).length} of {clarification.questions.length} resolved
        </span>
      </div>
      
      <div className="space-y-6">
        {clarification.questions.map((q, idx) => (
          <div key={q.id} className="space-y-3 bg-[#EFE9DD] p-4 border border-[#141C2B]/15">
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-serif text-[16px] font-medium text-[#141C2B] leading-snug">
                <span className="text-[#2C4A8F] font-mono text-[13px] mr-2">0{idx + 1}.</span>
                {q.question}
              </h4>
              <span className="text-[9px] uppercase font-mono tracking-[0.1em] px-2 py-0.5 border border-[#141C2B]/20 text-[#767E8C]">
                {q.ambiguity_type.replace('_', ' ')}
              </span>
            </div>
            {q.context && (
              <p className="text-[11px] font-mono text-[#767E8C] italic">
                Context: {q.context}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`p-3 text-left font-mono text-[12px] border transition-all ${
                      isSelected 
                        ? 'border-[#2C4A8F] bg-[#E5DED0] text-[#2C4A8F] font-bold shadow-sm' 
                        : 'border-[#141C2B]/20 bg-[#EFE9DD] text-[#4A5364] hover:border-[#141C2B] hover:text-[#141C2B]'
                    }`}
                  >
                    <span className="inline-block w-4 text-[10px] text-[#767E8C] mr-1">
                      {isSelected ? '●' : '○'}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 flex items-center justify-between">
        <p className="text-[11px] font-mono text-[#767E8C]">
          Answers will compose the definitive structured QueryIntent.
        </p>
        <button 
          onClick={handleSubmit}
          disabled={!isComplete}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#141C2B] hover:bg-[#2C4A8F] text-[#EFE9DD] font-mono text-[11px] uppercase tracking-[0.1em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm & Generate SQL
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
