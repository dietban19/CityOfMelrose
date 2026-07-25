import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news';
@Component({
  selector: 'app-news-article',
  imports: [DatePipe, RouterLink],
  templateUrl: './news-article.html',
  styleUrl: './news-article.scss',
})
export class NewsArticlePage implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly newsService: NewsService =
    inject(NewsService);

  private readonly destroyRef: DestroyRef =
    inject(DestroyRef);

  readonly article = signal<NewsArticle | null>(null);
  readonly isLoading = signal<boolean>(true);
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
        next: (article: NewsArticle) => {
          this.article.set(article);
          this.isLoading.set(false);

          document.title =
            `${article.title} | City of Melrose`;
        },

        error: (error: unknown) => {
          console.error(
            'Failed to load the news article:',
            error,
          );

          this.article.set(null);
          this.errorMessage.set(
            'The news article could not be found or loaded.',
          );
          this.isLoading.set(false);
        },
      });
  }

  printArticle(): void {
    window.print();
  }
}