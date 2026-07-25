import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface WordPressRenderedText {
  rendered: string;
}

interface WordPressFeaturedMedia {
  source_url: string;
  alt_text: string;
}
interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
}
interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  title: WordPressRenderedText;
  excerpt: WordPressRenderedText;
  content: WordPressRenderedText;
  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
  };
}
interface WordPressPage {
  id: number;
  slug: string;
  title: WordPressRenderedText;
  content: WordPressRenderedText;

  acf?: {
    hero_title?: string;
    hero_description?: string;

    // ACF currently returns the attachment ID.
    hero_image?: number;

    hero_button_text?: string;
    hero_button_url?: string;
  };

  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
  };
}
export interface Post {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
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
@Injectable()
export class AppService {
  private readonly wordpressApiUrl = 'http://melrose.local/wp-json/wp/v2';

  constructor(private readonly httpService: HttpService) {}

  async getPosts(): Promise<Post[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressPost[]>(
          `${this.wordpressApiUrl}/posts?_embed`,
        ),
      );

      return response.data.map((post) => ({
        id: post.id,
        slug: post.slug,
        date: post.date,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
      }));
    } catch (error) {
      console.error('Failed to fetch WordPress posts:', error);

      throw new InternalServerErrorException(
        'Could not retrieve WordPress posts.',
      );
    }
  }

  async getHomePage(): Promise<HomePage> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressPage[]>(
          `${this.wordpressApiUrl}/pages?slug=home&_embed`,
        ),
      );

      const page = response.data[0];

      if (!page) {
        throw new NotFoundException('The WordPress home page was not found.');
      }

      const heroMedia = page.acf?.hero_image
        ? await this.getWordPressMedia(page.acf.hero_image)
        : null;

      return {
        id: page.id,
        slug: page.slug,
        title: page.title.rendered,
        content: page.content.rendered,

        heroTitle: page.acf?.hero_title ?? page.title.rendered,

        heroDescription: page.acf?.hero_description ?? '',

        heroImageUrl:
          heroMedia?.source_url ??
          page._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
          null,

        heroImageAlt:
          heroMedia?.alt_text ??
          page._embedded?.['wp:featuredmedia']?.[0]?.alt_text ??
          '',

        heroButtonText: page.acf?.hero_button_text ?? null,

        heroButtonUrl: page.acf?.hero_button_url ?? null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Failed to fetch the WordPress home page:', error);

      throw new InternalServerErrorException(
        'Could not retrieve the WordPress home page.',
      );
    }
  }

  private async getWordPressMedia(
    mediaId: number,
  ): Promise<WordPressMedia | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressMedia>(
          `${this.wordpressApiUrl}/media/${mediaId}`,
        ),
      );

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch WordPress media ${mediaId}:`, error);

      return null;
    }
  }
}