
import { GoogleGenAI, Type } from "@google/genai";
import { Product, SEOResult } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchTrendingProducts = async (category: string = "all"): Promise<Product[]> => {
  const ai = getAI();
  const prompt = `Search for currently trending high-demand products on eBay.com (USA market) in the "${category}" category. 
  Find real-world examples of items that are selling fast right now. 
  Return exactly 6 products in JSON format.
  Each product should include: title, current price, approximate sold quantity, watchers, seller rating, a high-quality placeholder image URL (use https://picsum.photos/400/300?random=[id]), the source ebay URL (if possible, or a simulated one), and a short snippet.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            price: { type: Type.STRING },
            soldCount: { type: Type.STRING },
            watchers: { type: Type.STRING },
            sellerRating: { type: Type.STRING },
            category: { type: Type.STRING },
            imageUrl: { type: Type.STRING },
            url: { type: Type.STRING },
            descriptionSnippet: { type: Type.STRING },
          },
          required: ["id", "title", "price", "soldCount", "watchers", "sellerRating", "category", "imageUrl", "url", "descriptionSnippet"],
        },
      },
    },
  });

  try {
    const data = JSON.parse(response.text || "[]");
    return data;
  } catch (e) {
    console.error("Failed to parse trending products", e);
    return [];
  }
};

export const generateSEOContent = async (productData: string): Promise<SEOResult> => {
  const ai = getAI();
  const prompt = `Act as an expert eBay SEO Strategist. 
  Analyze the following product details and generate:
  1. An optimized eBay title (max 80 chars, using high-traffic keywords).
  2. A professional HTML-formatted product description including key features, technical specs, and a 'Why Buy From Us' section.
  3. A list of 15 high-relevance SEO keywords for eBay search.
  4. A catchy affiliate marketing hook for social media.

  Product Data: ${productData}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          affiliateHook: { type: Type.STRING },
        },
        required: ["title", "description", "keywords", "affiliateHook"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse SEO content", e);
    throw new Error("SEO generation failed");
  }
};
