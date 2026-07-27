"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    httpService;
    wordpressApiUrl = 'http://melrose.local/wp-json/wp/v2';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPosts() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.wordpressApiUrl}/posts`, {
                params: {
                    _embed: true,
                    per_page: 10,
                    order: 'desc',
                    orderby: 'date',
                },
            }));
            return response.data.map((post) => this.mapPostSummary(post));
        }
        catch (error) {
            console.error('Failed to fetch WordPress posts:', error);
            throw new common_1.InternalServerErrorException('Could not retrieve WordPress posts.');
        }
    }
    async getPostBySlug(slug) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.wordpressApiUrl}/posts`, {
                params: {
                    slug,
                    _embed: true,
                },
            }));
            const post = response.data[0];
            if (!post) {
                throw new common_1.NotFoundException(`The news article "${slug}" was not found.`);
            }
            return this.mapPost(post);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`Failed to fetch WordPress post "${slug}":`, error);
            throw new common_1.InternalServerErrorException('Could not retrieve the WordPress article.');
        }
    }
    async getHomePage() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.wordpressApiUrl}/pages`, {
                params: {
                    slug: 'home',
                    _embed: true,
                },
            }));
            const page = response.data[0];
            if (!page) {
                throw new common_1.NotFoundException('The WordPress home page was not found.');
            }
            const heroMedia = page.acf?.hero_image
                ? await this.getWordPressMedia(page.acf.hero_image)
                : null;
            return {
                id: page.id,
                slug: page.slug,
                title: this.decodeHtmlEntities(page.title.rendered),
                content: page.content.rendered,
                heroTitle: page.acf?.hero_title ??
                    this.decodeHtmlEntities(page.title.rendered),
                heroDescription: page.acf?.hero_description ?? '',
                heroImageUrl: heroMedia?.source_url ??
                    page._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
                    null,
                heroImageAlt: heroMedia?.alt_text ??
                    page._embedded?.['wp:featuredmedia']?.[0]?.alt_text ??
                    '',
                heroButtonText: page.acf?.hero_button_text ?? null,
                heroButtonUrl: page.acf?.hero_button_url ?? null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Failed to fetch the WordPress home page:', error);
            throw new common_1.InternalServerErrorException('Could not retrieve the WordPress home page.');
        }
    }
    mapPostSummary(post) {
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
        const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ??
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
    mapPost(post) {
        return {
            ...this.mapPostSummary(post),
            updatedAt: post.modified,
            content: post.content.rendered,
            author: 'City of Melrose',
        };
    }
    cleanExcerpt(value) {
        return this.decodeHtmlEntities(value
            .replace(/<[^>]*>/g, ' ')
            .replace(/\[&hellip;\]|\[…\]/g, '')
            .replace(/\s+/g, ' ')
            .trim());
    }
    decodeHtmlEntities(value) {
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
    async getWordPressMedia(mediaId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.wordpressApiUrl}/media/${mediaId}`));
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch WordPress media ${mediaId}:`, error);
            return null;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map