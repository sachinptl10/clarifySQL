import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ResultTable({ result }) {
  const [page, setPage] = useState(0);
  const pageSize = 15;

  if (!result || !result.columns || !result.rows) return null;

  const totalPages = Math.ceil(result.rows.length / pageSize);
  const paginatedRows = result.rows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="border border-[#141C2B]/20 bg-[#EFE9DD]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#141C2B]/15 bg-[#EAE3D5]">
        <div className="flex items-center gap-3">
          <span className="font-serif text-[17px] font-medium text-[#141C2B]">
            Query Output
          </span>
          <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#767E8C]">
            {result.row_count} row{result.row_count === 1 ? '' : 's'} returned
          </span>
        </div>
        <div className="text-[10px] font-mono text-[#767E8C] uppercase tracking-[0.08em]">
          Execution Time: <span className="text-[#141C2B] font-bold">{result.execution_time_ms}ms</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-[12px] border-collapse">
          <thead>
            <tr className="border-b border-[#141C2B]/20 bg-[#E5DED0] text-[10px] uppercase tracking-[0.12em] text-[#4A5364]">
              {result.columns.map((col, i) => (
                <th key={i} className="px-4 py-2.5 font-bold whitespace-nowrap border-r border-[#141C2B]/10 last:border-r-0">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141C2B]/10">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={result.columns.length} className="px-4 py-8 text-center text-[#767E8C] italic">
                  No records found
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, i) => (
                <tr key={i} className="hover:bg-[#EAE3D5] transition-colors">
                  {result.columns.map((col, j) => (
                    <td key={j} className="px-4 py-2 whitespace-nowrap text-[#141C2B] border-r border-[#141C2B]/10 last:border-r-0">
                      {row[col] !== null ? String(row[col]) : <span className="text-[#767E8C] italic">null</span>}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#141C2B]/15 bg-[#EAE3D5] text-[11px] font-mono">
          <div className="text-[#767E8C]">
            Page {page + 1} of {totalPages} ({result.rows.length} total)
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2 py-1 bg-[#EFE9DD] border border-[#141C2B]/20 hover:border-[#141C2B] text-[#141C2B] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-2 py-1 bg-[#EFE9DD] border border-[#141C2B]/20 hover:border-[#141C2B] text-[#141C2B] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
