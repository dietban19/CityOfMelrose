import { Controller, Get, Param } from '@nestjs/common';

import {
  AppService,
  HomePage,
  Post,
  PostSummary,
} from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /api/posts
   */
  @Get('posts')
  getPosts(): Promise<PostSummary[]> {
    return this.appService.getPosts();
  }

  /**
   * GET /api/posts/downtown-street-improvements
   */
  @Get('posts/:slug')
  getPostBySlug(
    @Param('slug') slug: string,
  ): Promise<Post> {
    return this.appService.getPostBySlug(slug);
  }

  /**
   * GET /api/pages/home
   */
  @Get('pages/home')
  getHomePage(): Promise<HomePage> {
    return this.appService.getHomePage();
  }
}