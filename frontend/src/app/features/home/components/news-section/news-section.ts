import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  NewsSummary,
} from '../../../news/models/news-article.model';

import { NewsService } from '../../../news/services/news';
@Component({
  selector: 'app-news-section',
  imports: [RouterLink, DatePipe],
  templateUrl: './news-section.html',
  styleUrl: './news-section.scss',
})
export class NewsSection implements OnInit {
private readonly newsService: NewsService =
  inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly featuredNews = signal<NewsSummary[]>([]);
  readonly latestNews = signal<NewsSummary[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.newsService
      .getNews()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
next: (articles: NewsSummary[]) => {
          this.featuredNews.set(articles.slice(0, 3));
          this.latestNews.set(articles.slice(3, 7));
          this.isLoading.set(false);
        },
        error: (error: unknown) => {
          console.error('Failed to load news:', error);

          this.errorMessage.set(
            'News could not be loaded at this time.',
          );

          this.isLoading.set(false);
        },
      });
  }
}