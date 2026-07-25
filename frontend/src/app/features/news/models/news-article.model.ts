export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl: string | null;
  imageAlt: string;
  category: string;
  author?: string;
}