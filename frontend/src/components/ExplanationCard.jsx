export default function ExplanationCard({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="border border-[#2C4A8F]/30 bg-[#E8E2D5] p-5">
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2C4A8F] font-bold">
          Summary & Insight
        </span>
      </div>
      <p className="font-serif text-[18px] leading-[1.6] text-[#141C2B]">
        {explanation}
      </p>
    </div>
  );
}
