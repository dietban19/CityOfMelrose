import { HttpService } from '@nestjs/axios';
export interface PostSummary {
    id: number;
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    imageUrl: string | null;
    imageAlt: string;
    category: string;
}
export interface Post extends PostSummary {
    updatedAt: string;
    content: string;
    author: string;
}
export interface HomePage {
    id: number;
    slug: string;
    title: string;
    content: string;
    heroTitle: string;
    heroDescription: string;
    heroImageUrl: string | null;
    heroImageAlt: string;
    heroButtonText: string | null;
    heroButtonUrl: string | null;
}
export declare class AppService {
    private readonly httpService;
    private readonly wordpressApiUrl;
    constructor(httpService: HttpService);
    getPosts(): Promise<PostSummary[]>;
    getPostBySlug(slug: string): Promise<Post>;
    getHomePage(): Promise<HomePage>;
    private mapPostSummary;
    private mapPost;
    private cleanExcerpt;
    private decodeHtmlEntities;
    private getWordPressMedia;
}
