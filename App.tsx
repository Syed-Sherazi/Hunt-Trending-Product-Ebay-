
import React, { useState, useEffect } from 'react';
import { TrendFinder } from './components/TrendFinder';
import { SEOOptimizer } from './components/SEOOptimizer';
import { View } from './types';
import { 
  TrendingUp, 
  Search, 
  BarChart2, 
  LayoutDashboard,
  Zap,
  Phone
} from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('trends');
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'active' | 'missing'>('checking');

  useEffect(() => {
    // Simple check for API key
    if (process.env.API_KEY) {
      setApiKeyStatus('active');
    } else {
      setApiKeyStatus('missing');
    }
  }, []);

  const SidebarItem: React.FC<{ 
    view: View; 
    icon: React.ReactNode; 
    label: string 
  }> = ({ view, icon, label }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
        activeView === view 
          ? 'bg-blue-600 text-white' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 hidden md:flex">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <TrendingUp size={24} />
          </div>
          <span className="font-bold text-xl text-slate-900">eBayPulse</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem view="trends" icon={<TrendingUp size={18} />} label="Trend Finder" />
          <SidebarItem view="seo" icon={<Zap size={18} />} label="SEO Optimizer" />
          <SidebarItem view="dashboard" icon={<LayoutDashboard size={18} />} label="Analytics Hub" />
        </nav>

        {/* Developer Credit Section */}
        <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Credits</span>
            <div className="text-slate-800 text-sm font-bold">
              created by Sherazi
            </div>
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
              <Phone size={14} className="shrink-0" />
              <span className="text-sm font-semibold tracking-tight">03445914647</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${apiKeyStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Status</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              {apiKeyStatus === 'active' ? 'Gemini AI Ready' : 'API Key Missing'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeView === 'trends' ? 'US Trend Discovery' : activeView === 'seo' ? 'SEO Optimization Studio' : 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Quick lookup..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-slate-50"
                />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeView === 'trends' && <TrendFinder onSelectProduct={(p) => setActiveView('seo')} />}
          {activeView === 'seo' && <SEOOptimizer />}
          {activeView === 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <BarChart2 size={48} className="mb-4" />
              <p className="text-xl font-medium">Coming Soon</p>
              <p>Personalized sales data tracking and insights.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
