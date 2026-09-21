export default function IntentDisplay({ intent }) {
  if (!intent) return null;

  return (
    <div className="border border-[#141C2B]/15 bg-[#E5DED0]">
      <div className="px-5 py-2.5 border-b border-[#141C2B]/15 bg-[#EAE3D5] flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2C4A8F] font-bold">
          Structured QueryIntent
        </span>
        <span className="font-mono text-[10px] text-[#767E8C]">
          Validated against Schema
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#141C2B]/15">
        {Object.entries(intent).map(([key, value]) => {
          if (typeof value === 'object' || Array.isArray(value)) return null;
          return (
            <div key={key} className="p-3 bg-[#EFE9DD]">
              <div className="text-[#767E8C] font-mono text-[10px] uppercase tracking-[0.08em] mb-1">
                {key.replace(/_/g, ' ')}
              </div>
              <div className="text-[#141C2B] font-mono text-[12px] font-bold truncate" title={String(value)}>
                {String(value) || '—'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
