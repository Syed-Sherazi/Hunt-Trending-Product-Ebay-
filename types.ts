
export interface Product {
  id: string;
  title: string;
  price: string;
  soldCount: string;
  watchers: string;
  sellerRating: string;
  category: string;
  imageUrl: string;
  url: string;
  descriptionSnippet: string;
}

export interface SEOResult {
  title: string;
  description: string;
  keywords: string[];
  affiliateHook: string;
}

export type View = 'trends' | 'seo' | 'dashboard';
