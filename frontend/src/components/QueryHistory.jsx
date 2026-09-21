export default function QueryHistory({ history, loading, onSelect }) {
  if (loading) return <div className="p-5 text-[#767E8C] font-mono text-[13px]">Loading query log...</div>;

  return (
    <div className="h-full flex flex-col font-mono text-[13px]">
      <div className="p-4 border-b border-[#141C2B]/10 text-[11px] uppercase tracking-[0.12em] text-[#767E8C] bg-[#EAE3D5]">
        Execution Log
      </div>
      <div className="flex-1 overflow-y-auto p-3 divide-y divide-[#141C2B]/10">
        {!history || history.length === 0 ? (
          <div className="p-5 text-center text-[#767E8C] text-[13px] italic">No historical queries recorded</div>
        ) : (
          history.map(item => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full text-left p-3 hover:bg-[#EAE3D5] transition-colors group flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] uppercase tracking-[0.12em] font-bold ${
                  item.status === 'success' ? 'text-[#2C4A8F]' : 'text-red-800'
                }`}>
                  {item.status === 'success' ? '● OK' : '✕ ERR'}
                </span>
                <span className="text-[#767E8C] text-[11px]">
                  {new Date(item.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="text-[#141C2B] font-medium text-[13px] line-clamp-2">
                {item.question}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
