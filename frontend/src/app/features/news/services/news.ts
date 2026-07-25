import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  NewsArticle,
  NewsSummary,
} from '../models/news-article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api';

  /**
   * Retrieves the newest WordPress posts through NestJS.
   */
  getNews(): Observable<NewsSummary[]> {
    return this.http.get<NewsSummary[]>(
      `${this.apiUrl}/posts`,
    );
  }

  /**
   * Retrieves one full article through NestJS.
   */
  getArticleBySlug(
    slug: string,
  ): Observable<NewsArticle> {
    return this.http.get<NewsArticle>(
      `${this.apiUrl}/posts/${encodeURIComponent(slug)}`,
    );
  }
}