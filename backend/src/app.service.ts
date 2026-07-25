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

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
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
  modified: string;

  title: WordPressRenderedText;
  excerpt: WordPressRenderedText;
  content: WordPressRenderedText;

  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
    'wp:term'?: WordPressCategory[][];
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
    hero_image?: number;
    hero_button_text?: string;
    hero_button_url?: string;
  };

  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
  };
}

/**
 * Smaller object used by the homepage news section.
 */
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

/**
 * Full object used by the individual article page.
 */
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

@Injectable()
export class AppService {
  private readonly wordpressApiUrl =
    'http://melrose.local/wp-json/wp/v2';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves a list of published WordPress posts.
   *
   * Used by the homepage news section and eventually the news listing page.
   */
  async getPosts(): Promise<PostSummary[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressPost[]>(
          `${this.wordpressApiUrl}/posts`,
          {
            params: {
              _embed: true,
              per_page: 10,
              order: 'desc',
              orderby: 'date',
            },
          },
        ),
      );

      return response.data.map((post) => this.mapPostSummary(post));
    } catch (error) {
      console.error('Failed to fetch WordPress posts:', error);

      throw new InternalServerErrorException(
        'Could not retrieve WordPress posts.',
      );
    }
  }

  /**
   * Retrieves one published post using its WordPress slug.
   *
   * Example:
   * /api/posts/downtown-street-improvements
   */
  async getPostBySlug(slug: string): Promise<Post> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressPost[]>(
          `${this.wordpressApiUrl}/posts`,
          {
            params: {
              slug,
              _embed: true,
            },
          },
        ),
      );

      const post = response.data[0];

      if (!post) {
        throw new NotFoundException(
          `The news article "${slug}" was not found.`,
        );
      }

      return this.mapPost(post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(
        `Failed to fetch WordPress post "${slug}":`,
        error,
      );

      throw new InternalServerErrorException(
        'Could not retrieve the WordPress article.',
      );
    }
  }

  async getHomePage(): Promise<HomePage> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<WordPressPage[]>(
          `${this.wordpressApiUrl}/pages`,
          {
            params: {
              slug: 'home',
              _embed: true,
            },
          },
        ),
      );

      const page = response.data[0];

      if (!page) {
        throw new NotFoundException(
          'The WordPress home page was not found.',
        );
      }

      const heroMedia = page.acf?.hero_image
        ? await this.getWordPressMedia(page.acf.hero_image)
        : null;

      return {
        id: page.id,
        slug: page.slug,
        title: this.decodeHtmlEntities(page.title.rendered),
        content: page.content.rendered,

        heroTitle:
          page.acf?.hero_title ??
          this.decodeHtmlEntities(page.title.rendered),

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

      console.error(
        'Failed to fetch the WordPress home page:',
        error,
      );

      throw new InternalServerErrorException(
        'Could not retrieve the WordPress home page.',
      );
    }
  }

  private mapPostSummary(post: WordPressPost): PostSummary {
    const featuredImage =
      post._embedded?.['wp:featuredmedia']?.[0];

    const category =
      post._embedded?.['wp:term']?.[0]?.[0]?.name ??
      'City news';

    return {
      id: post.id,
      slug: post.slug,
      title: this.decodeHtmlEntities(post.title.rendered),
      description: this.cleanExcerpt(post.excerpt.rendered),
      publishedAt: post.date,
      imageUrl: featuredImage?.source_url ?? null,
      imageAlt: featuredImage?.alt_text ?? '',
      category: this.decodeHtmlEntities(category),
    };
  }

  private mapPost(post: WordPressPost): Post {
    return {
      ...this.mapPostSummary(post),
      updatedAt: post.modified,
      content: post.content.rendered,
      author: 'City of Melrose',
    };
  }

  /**
   * WordPress excerpts contain HTML such as <p> and sometimes
   * the default "[…]" ending. Cards only need plain text.
   */
  private cleanExcerpt(value: string): string {
    return this.decodeHtmlEntities(
      value
        .replace(/<[^>]*>/g, ' ')
        .replace(/\[&hellip;\]|\[…\]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    );
  }

  /**
   * Handles common HTML entities returned by WordPress titles
   * and excerpts without adding another dependency.
   */
  private decodeHtmlEntities(value: string): string {
    return value
      .replace(/&#8217;|&rsquo;/g, '’')
      .replace(/&#8216;|&lsquo;/g, '‘')
      .replace(/&#8220;|&ldquo;/g, '“')
      .replace(/&#8221;|&rdquo;/g, '”')
      .replace(/&#8211;|&ndash;/g, '–')
      .replace(/&#8212;|&mdash;/g, '—')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;|&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ');
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
      console.error(
        `Failed to fetch WordPress media ${mediaId}:`,
        error,
      );

      return null;
    }
  }
}