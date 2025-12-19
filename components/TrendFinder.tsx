
import React, { useState, useEffect } from 'react';
import { fetchTrendingProducts } from '../services/geminiService';
import { Product } from '../types';
import { 
  Filter, 
  ChevronDown, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Star,
  RefreshCcw,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface Props {
  onSelectProduct: (p: Product) => void;
}

export const TrendFinder: React.FC<Props> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Electronics');

  const categories = [
    'Electronics', 'Home & Garden', 'Fashion', 'Toys & Hobbies', 'Collectibles', 'Auto Parts', 'Health & Beauty'
  ];

  const loadTrends = async () => {
    setLoading(true);
    try {
      const results = await fetchTrendingProducts(category);
      setProducts(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrends();
  }, [category]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-blue-600" />
            <span className="font-semibold text-slate-700">Category:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat 
                  ? 'bg-blue-100 text-blue-700 border-blue-200 ring-2 ring-blue-500 ring-offset-1' 
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={loadTrends}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Analyzing Trends...' : 'Refresh Trends'}
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-2xl border border-slate-200 h-96" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                  Trending Now
                </div>
              </div>
              
              <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="font-bold text-slate-800 text-lg line-clamp-2 mb-3 h-14">{product.title}</h3>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-600 mb-6">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600">
                    <DollarSign size={16} />
                    {product.price}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShoppingCart size={16} className="text-slate-400" />
                    {product.soldCount} Sold
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} className="text-slate-400" />
                    {product.watchers} Watchers
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-amber-500" />
                    {product.sellerRating} Rating
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => onSelectProduct(product)}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Optimize SEO
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
          <p className="text-lg">No products found for this category.</p>
          <button onClick={loadTrends} className="text-blue-600 underline mt-2">Try again</button>
        </div>
      )}
    </div>
  );
};
