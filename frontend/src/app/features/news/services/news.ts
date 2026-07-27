import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { NewsArticle, NewsSummary } from '../models/news-article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  /**
   * Retrieves the newest WordPress posts through ASP.NET Core.
   */
  getNews(): Observable<NewsSummary[]> {
    return this.http.get<NewsSummary[]>(`${this.apiUrl}/posts`);
  }

  /**
   * Retrieves one full article through ASP.NET Core.
   */
  getArticleBySlug(slug: string): Observable<NewsArticle> {
    return this.http.get<NewsArticle>(`${this.apiUrl}/posts/${encodeURIComponent(slug)}`);
  }
}
