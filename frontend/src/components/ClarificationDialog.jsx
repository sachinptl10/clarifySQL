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
    <div className="w-full space-y-8">
      <div className="border-b border-[#141C2B]/15 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[#2C4A8F]">
          <HelpCircle className="w-5 h-5" />
          <h3 className="font-serif text-2xl font-medium tracking-tight text-[#141C2B]">
            Ambiguity Detected — <em className="italic text-[#2C4A8F]">Clarification Required</em>
          </h3>
        </div>
        <span className="text-[12px] uppercase font-mono tracking-[0.1em] text-[#767E8C]">
          {Object.keys(answers).length} of {clarification.questions.length} resolved
        </span>
      </div>
      
      <div className="space-y-6">
        {clarification.questions.map((q, idx) => (
          <div key={q.id} className="space-y-4 bg-[#EFE9DD] p-6 border border-[#141C2B]/15">
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-serif text-[19px] font-medium text-[#141C2B] leading-snug">
                <span className="text-[#2C4A8F] font-mono text-[15px] mr-2.5">0{idx + 1}.</span>
                {q.question}
              </h4>
              <span className="text-[11px] uppercase font-mono tracking-[0.1em] px-2.5 py-1 border border-[#141C2B]/20 text-[#767E8C]">
                {q.ambiguity_type.replace('_', ' ')}
              </span>
            </div>
            {q.context && (
              <p className="text-[13px] font-mono text-[#767E8C] italic">
                Context: {q.context}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`p-4 text-left font-mono text-[14px] border transition-all ${
                      isSelected 
                        ? 'border-[#2C4A8F] bg-[#E5DED0] text-[#2C4A8F] font-bold shadow-sm' 
                        : 'border-[#141C2B]/20 bg-[#EFE9DD] text-[#4A5364] hover:border-[#141C2B] hover:text-[#141C2B]'
                    }`}
                  >
                    <span className="inline-block w-4 text-[12px] text-[#767E8C] mr-2">
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
        <p className="text-[13px] font-mono text-[#767E8C]">
          Answers will compose the definitive structured QueryIntent.
        </p>
        <button 
          onClick={handleSubmit}
          disabled={!isComplete}
          className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#141C2B] hover:bg-[#2C4A8F] text-[#EFE9DD] font-mono text-[12px] uppercase tracking-[0.12em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm & Generate SQL
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
