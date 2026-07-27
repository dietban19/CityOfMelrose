import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  getHomePage(): Observable<HomePageContent> {
    return this.http.get<HomePageContent>(`${this.apiUrl}/pages/home`);
  }
}
