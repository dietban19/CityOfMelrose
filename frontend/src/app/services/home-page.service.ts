import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HomePageContent {
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

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api';

  getHomePage(): Observable<HomePageContent> {
    return this.http.get<HomePageContent>(
      `${this.apiUrl}/pages/home`,
    );
  }
}