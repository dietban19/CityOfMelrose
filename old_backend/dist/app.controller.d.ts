import { AppService, HomePage, Post, PostSummary } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getPosts(): Promise<PostSummary[]>;
    getPostBySlug(slug: string): Promise<Post>;
    getHomePage(): Promise<HomePage>;
}
