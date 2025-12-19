
import React, { useState } from 'react';
import { generateSEOContent } from '../services/geminiService';
import { SEOResult } from '../types';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Type as TypeIcon, 
  AlignLeft, 
  Tag, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const SEOOptimizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await generateSEOContent(input);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Input Section */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Sparkles size={18} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Analyze Product</h3>
        </div>
        <p className="text-slate-500 mb-6">
          Enter product name, category, or features. Our AI will craft the perfect eBay listing.
        </p>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Vintage Nike Air Jordan 1 Red/White, 1985 Edition, Size 10..."
            className="w-full h-32 p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none text-slate-700"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate SEO
              </>
            )}
          </button>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Title & Keywords */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <TypeIcon size={20} className="text-blue-500" />
                  Optimized Title
                </div>
                <button 
                  onClick={() => copyToClipboard(result.title, 'title')}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {copied === 'title' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-medium text-lg leading-snug">
                {result.title}
              </div>
              <div className="mt-2 text-xs text-slate-400 text-right">
                {result.title.length}/80 characters
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Tag size={20} className="text-indigo-500" />
                  Target Keywords
                </div>
                <button 
                  onClick={() => copyToClipboard(result.keywords.join(', '), 'keywords')}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {copied === 'keywords' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold">
                  <Share2 size={20} />
                  Affiliate Marketing Hook
                </div>
                <button 
                  onClick={() => copyToClipboard(result.affiliateHook, 'hook')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {copied === 'hook' ? <Check size={18} className="text-green-300" /> : <Copy size={18} />}
                </button>
              </div>
              <p className="italic text-blue-50 leading-relaxed">
                "{result.affiliateHook}"
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <AlignLeft size={20} className="text-emerald-500" />
                HTML Description
              </div>
              <button 
                onClick={() => copyToClipboard(result.description, 'desc')}
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                {copied === 'desc' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <div 
              className="flex-1 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm overflow-y-auto max-h-[600px] prose prose-slate"
              dangerouslySetInnerHTML={{ __html: result.description }}
            />
          </div>

        </div>
      )}

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
           <AlertCircle size={48} className="mb-4" />
           <p className="text-lg">Enter product details above to start optimizing.</p>
        </div>
      )}
    </div>
  );
};
