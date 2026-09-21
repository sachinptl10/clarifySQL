export default function ExplanationCard({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="border border-[#2C4A8F]/30 bg-[#E8E2D5] p-6">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#2C4A8F] font-bold">
          Summary & Insight
        </span>
      </div>
      <p className="font-serif text-[21px] sm:text-[22px] leading-[1.6] text-[#141C2B]">
        {explanation}
      </p>
    </div>
  );
}
