import { useQuery } from '../hooks/useQuery';
import QueryInput from '../components/QueryInput';
import ClarificationDialog from '../components/ClarificationDialog';
import IntentDisplay from '../components/IntentDisplay';
import SQLDisplay from '../components/SQLDisplay';
import ResultTable from '../components/ResultTable';
import ChartView from '../components/ChartView';
import ExplanationCard from '../components/ExplanationCard';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { 
    step, error, 
    clarification, intent, sqlResult, validation, queryResult,
    askQuestion, submitClarification, executeSQL
  } = useQuery();

  const isLoading = step === 'asking' || step === 'generating' || step === 'executing';

  return (
    <div className="min-h-full flex flex-col p-8 max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* Hero Header Area */}
      <div className="space-y-4 pt-4 pb-2 border-b border-[#141C2B]/15">
        <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#767E8C]">
          System Status: Ready · Database Live · 6 Tables Available
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#141C2B] leading-[1.15]">
          Ask your data anything.<br />
          We'll <em className="italic text-[#2C4A8F] font-serif">clarify</em> before we query.
        </h1>
        <p className="text-[#4A5364] text-[13px] leading-[1.8] max-w-2xl font-mono">
          Enter natural language questions below. If your request contains ambiguous metrics, 
          missing entities, or unbounded date filters, the Clarification Engine will guide you 
          prior to executing verified SQL.
        </p>
      </div>

      {/* Query Input Box */}
      <div className="bg-[#E5DED0] border border-[#141C2B]/20 p-6 shadow-sm">
        <QueryInput onSubmit={askQuestion} isLoading={isLoading} />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-[#FAF2EE] border-l-4 border-red-700 p-5 flex gap-4 text-[#141C2B]">
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-red-800">Pipeline Notice</h4>
            <p className="font-mono text-[#4A5364]">{error}</p>
          </div>
        </div>
      )}

      {/* Clarification Step */}
      {step === 'clarifying' && (
        <div className="border border-[#2C4A8F]/40 bg-[#E8E2D5] p-6 shadow-sm">
          <ClarificationDialog 
            clarification={clarification} 
            onSubmit={submitClarification} 
          />
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && step !== 'asking' && (
        <div className="border border-[#141C2B]/20 bg-[#E5DED0] p-8 text-center space-y-3">
          <div className="inline-block w-6 h-6 border-2 border-[#2C4A8F] border-t-transparent animate-spin"></div>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#141C2B]">
            {step === 'generating' && 'Analyzing clarification answers & composing SQL...'}
            {step === 'executing' && 'Executing read-only SQL in safe transaction...'}
          </p>
        </div>
      )}

      {/* Results Workspace */}
      {(step === 'done' || sqlResult) && (
        <div className="space-y-8">
          
          {/* Explanation Card */}
          {queryResult && <ExplanationCard explanation={queryResult.explanation} />}
          
          {/* Parsed Intent */}
          <IntentDisplay intent={intent} />
          
          {/* SQL Display & Execution controls */}
          <SQLDisplay 
            sqlResult={sqlResult} 
            validation={validation} 
            onExecute={executeSQL}
            isExecuting={step === 'executing'}
          />
          
          {/* Results: Chart & Table */}
          {queryResult && (
            <div className="space-y-8">
              <ChartView result={queryResult} />
              <ResultTable result={queryResult} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
