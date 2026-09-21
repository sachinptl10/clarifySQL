export default function IntentDisplay({ intent }) {
  if (!intent) return null;

  return (
    <div className="border border-[#141C2B]/15 bg-[#E5DED0]">
      <div className="px-6 py-3 border-b border-[#141C2B]/15 bg-[#EAE3D5] flex items-center justify-between">
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#2C4A8F] font-bold">
          Structured QueryIntent
        </span>
        <span className="font-mono text-[12px] text-[#767E8C]">
          Validated against Schema
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#141C2B]/15">
        {Object.entries(intent).map(([key, value]) => {
          if (typeof value === 'object' || Array.isArray(value)) return null;
          return (
            <div key={key} className="p-4 bg-[#EFE9DD]">
              <div className="text-[#767E8C] font-mono text-[11px] uppercase tracking-[0.1em] mb-1.5">
                {key.replace(/_/g, ' ')}
              </div>
              <div className="text-[#141C2B] font-mono text-[14px] font-bold truncate" title={String(value)}>
                {String(value) || '—'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
