import { Controller, Get } from '@nestjs/common';

import { AppService, HomePage, Post } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  getPosts(): Promise<Post[]> {
    return this.appService.getPosts();
  }
  @Get('pages/home')
  getHomePage(): Promise<HomePage> {
    return this.appService.getHomePage();
  }
}