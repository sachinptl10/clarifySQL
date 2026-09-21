import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function SchemaExplorer({ tables, loading }) {
  const [expandedTables, setExpandedTables] = useState({});

  const toggleTable = (tableName) => {
    setExpandedTables(prev => ({ ...prev, [tableName]: !prev[tableName] }));
  };

  if (loading) return <div className="p-4 text-[#767E8C] font-mono text-[11px]">Introspecting database schema...</div>;
  if (!tables || tables.length === 0) return <div className="p-4 text-[#767E8C] font-mono text-[11px]">No tables discovered</div>;

  return (
    <div className="h-full flex flex-col font-mono text-[11px]">
      <div className="p-3 border-b border-[#141C2B]/10 text-[10px] uppercase tracking-[0.1em] text-[#767E8C] bg-[#EAE3D5]">
        {tables.length} Tables Registered
      </div>
      <div className="flex-1 overflow-y-auto p-2 divide-y divide-[#141C2B]/10">
        {tables.map(table => {
          const tableName = table.name || table.table_name;
          const isExpanded = !!expandedTables[tableName];
          return (
            <div key={tableName} className="py-1">
              <button 
                onClick={() => toggleTable(tableName)}
                className="w-full flex items-center justify-between p-2 hover:bg-[#EAE3D5] text-[#141C2B] text-left transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#2C4A8F] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#767E8C] shrink-0" />
                  )}
                  <span className="font-bold text-[12px] truncate">{tableName}</span>
                </div>
                <span className="text-[10px] text-[#767E8C] font-mono">
                  {table.columns?.length || 0} cols
                </span>
              </button>
              
              {isExpanded && (
                <div className="ml-6 mr-1 my-1 p-2 bg-[#EFE9DD] border border-[#141C2B]/10 space-y-1">
                  {table.columns?.map(col => (
                    <div key={col.name} className="flex items-center justify-between py-1 px-1 border-b border-[#141C2B]/5 last:border-b-0 text-[10px]">
                      <span className="text-[#141C2B] truncate">{col.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {col.primary_key && (
                          <span className="px-1 bg-[#141C2B] text-[#EFE9DD] text-[8px] uppercase tracking-wider font-bold">PK</span>
                        )}
                        {col.foreign_key && (
                          <span className="px-1 border border-[#2C4A8F] text-[#2C4A8F] text-[8px] uppercase tracking-wider font-bold">FK</span>
                        )}
                        <span className="text-[#767E8C] text-[9px] uppercase">{col.type}</span>
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
