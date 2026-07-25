import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-article',
  imports: [DatePipe, RouterLink],
  templateUrl: './news-article.html',
  styleUrl: './news-article.scss',
})
export class NewsArticlePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsService = inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly article = signal<NewsArticle | null>(null);
  readonly relatedArticles = signal<NewsArticle[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug');

          this.isLoading.set(true);
          this.errorMessage.set(null);

          if (!slug) {
            throw new Error('No article slug was provided.');
          }

          return this.newsService.getArticleBySlug(slug);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (article) => {
          if (!article) {
            this.article.set(null);
            this.errorMessage.set(
              'The news article could not be found.',
            );
            this.isLoading.set(false);
            return;
          }

          this.article.set(article);
          this.loadRelatedArticles(article.slug);
          this.isLoading.set(false);

          document.title = `${article.title} | City of Melrose`;
        },
        error: (error: unknown) => {
          console.error('Failed to load news article:', error);

          this.errorMessage.set(
            'The news article could not be loaded. Please try again later.',
          );

          this.isLoading.set(false);
        },
      });
  }

  private loadRelatedArticles(currentSlug: string): void {
    this.newsService
      .getRelatedArticles(currentSlug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (articles) => {
          this.relatedArticles.set(articles);
        },
        error: (error: unknown) => {
          console.error('Failed to load related articles:', error);
        },
      });
  }

  printArticle(): void {
    window.print();
  }

  goBack(): void {
    void this.router.navigate(['/city-hall/news']);
  }
}