export interface NewsSummary {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl: string | null;
  imageAlt: string;
  category: string;
}

export interface NewsArticle extends NewsSummary {
  updatedAt: string;
  content: string;
  author: string;
}