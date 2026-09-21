import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SchemaExplorer from './components/SchemaExplorer';
import QueryHistory from './components/QueryHistory';
import { useSchema } from './hooks/useSchema';
import { useHistory } from './hooks/useHistory';

export default function App() {
  const { tables, loading: schemaLoading } = useSchema();
  const { history, loading: historyLoading } = useHistory();
  const [sidebarTab, setSidebarTab] = useState('schema');

  return (
    <div className="flex h-screen w-full bg-[#EFE9DD] text-[#141C2B] overflow-hidden font-mono text-[12px]">
      
      {/* Left Sidebar - Warm Stationery Ground */}
      <div className="w-80 flex-shrink-0 bg-[#E5DED0] border-r border-[#141C2B]/15 flex flex-col z-10">
        
        {/* Navigation / Brand Header */}
        <div className="h-[58px] px-5 border-b border-[#141C2B]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[19px] font-medium tracking-tight text-[#141C2B]">
              ClarifySQL<span className="text-[#2C4A8F]">.</span>
            </span>
          </div>
          <a
            href="/landing.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.1em] text-[#767E8C] hover:text-[#2C4A8F] transition-colors border border-[#141C2B]/20 px-2 py-1"
          >
            Overview ↗
          </a>
        </div>
        
        {/* Tab Toggle */}
        <div className="flex border-b border-[#141C2B]/15 text-[11px] uppercase tracking-[0.1em]">
          <button 
            onClick={() => setSidebarTab('schema')}
            className={`flex-1 py-3 font-mono transition-colors border-r border-[#141C2B]/15 ${
              sidebarTab === 'schema' 
                ? 'bg-[#EFE9DD] text-[#141C2B] font-bold border-b-2 border-b-[#2C4A8F]' 
                : 'text-[#767E8C] hover:text-[#141C2B] hover:bg-[#EAE3D5]'
            }`}
          >
            Schema
          </button>
          <button 
            onClick={() => setSidebarTab('history')}
            className={`flex-1 py-3 font-mono transition-colors ${
              sidebarTab === 'history' 
                ? 'bg-[#EFE9DD] text-[#141C2B] font-bold border-b-2 border-b-[#2C4A8F]' 
                : 'text-[#767E8C] hover:text-[#141C2B] hover:bg-[#EAE3D5]'
            }`}
          >
            History
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-hidden relative bg-[#E5DED0]">
          <div className={`absolute inset-0 transition-opacity duration-200 ${sidebarTab === 'schema' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <SchemaExplorer tables={tables} loading={schemaLoading} />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-200 ${sidebarTab === 'history' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <QueryHistory history={history} loading={historyLoading} onSelect={() => {}} />
          </div>
        </div>

        {/* Specs Foot */}
        <div className="p-3 border-t border-[#141C2B]/15 text-[10px] uppercase tracking-[0.12em] text-[#767E8C] flex justify-between">
          <span>Read-Only</span>
          <span className="text-[#2C4A8F]">PostgreSQL</span>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#EFE9DD] relative overflow-hidden">
        {/* Top bar */}
        <header className="h-[58px] px-8 border-b border-[#141C2B]/15 flex items-center justify-between bg-[#EFE9DD]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#767E8C]">Pipeline:</span>
            <span className="text-[11px] font-mono text-[#141C2B] border-b border-[#2C4A8F]">Query Understanding → Clarification Engine → Safe SQL</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] tracking-[0.08em] text-[#767E8C]">
            <span>Model: <strong className="text-[#141C2B] font-mono">Gemini 3 Flash</strong></span>
            <span>·</span>
            <span>Safety: <strong className="text-[#2C4A8F] font-mono">Enforced</strong></span>
          </div>
        </header>

        {/* Dashboard Viewport */}
        <div className="flex-1 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
