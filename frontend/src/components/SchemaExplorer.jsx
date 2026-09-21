import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function SchemaExplorer({ tables, loading }) {
  const [expandedTables, setExpandedTables] = useState({});

  const toggleTable = (tableName) => {
    setExpandedTables(prev => ({ ...prev, [tableName]: !prev[tableName] }));
  };

  if (loading) return <div className="p-5 text-[#767E8C] font-mono text-[13px]">Introspecting database schema...</div>;
  if (!tables || tables.length === 0) return <div className="p-5 text-[#767E8C] font-mono text-[13px]">No tables discovered</div>;

  return (
    <div className="h-full flex flex-col font-mono text-[13px]">
      <div className="p-4 border-b border-[#141C2B]/10 text-[11px] uppercase tracking-[0.12em] text-[#767E8C] bg-[#EAE3D5]">
        {tables.length} Tables Registered
      </div>
      <div className="flex-1 overflow-y-auto p-3 divide-y divide-[#141C2B]/10">
        {tables.map(table => {
          const tableName = table.name || table.table_name;
          const isExpanded = !!expandedTables[tableName];
          return (
            <div key={tableName} className="py-1.5">
              <button 
                onClick={() => toggleTable(tableName)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-[#EAE3D5] text-[#141C2B] text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#2C4A8F] shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#767E8C] shrink-0" />
                  )}
                  <span className="font-bold text-[14px] truncate">{tableName}</span>
                </div>
                <span className="text-[11px] text-[#767E8C] font-mono">
                  {table.columns?.length || 0} cols
                </span>
              </button>
              
              {isExpanded && (
                <div className="ml-7 mr-1 my-1.5 p-3 bg-[#EFE9DD] border border-[#141C2B]/10 space-y-1.5">
                  {table.columns?.map(col => (
                    <div key={col.name} className="flex items-center justify-between py-1 px-1.5 border-b border-[#141C2B]/5 last:border-b-0 text-[12px]">
                      <span className="text-[#141C2B] truncate">{col.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {col.primary_key && (
                          <span className="px-1.5 bg-[#141C2B] text-[#EFE9DD] text-[9px] uppercase tracking-wider font-bold">PK</span>
                        )}
                        {col.foreign_key && (
                          <span className="px-1.5 border border-[#2C4A8F] text-[#2C4A8F] text-[9px] uppercase tracking-wider font-bold">FK</span>
                        )}
                        <span className="text-[#767E8C] text-[10px] uppercase">{col.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
