import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { NewsArticle } from '../models/news-article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly articles: NewsArticle[] = [
    {
      id: 1,
      slug: 'summer-recreation-registration',
      title: 'Melrose opens registration for summer recreation programs',
      description:
        'Residents can now register for swimming lessons, youth programs, fitness classes and other summer activities offered throughout the city.',
      publishedAt: '2026-07-22',
      category: 'Community and recreation',
      author: 'City of Melrose',
      imageUrl: '/images/news/summer-recreation.jpg',
      imageAlt:
        'Children participating in an outdoor recreation program in Melrose',
      content: `
        <p>
          Registration is now open for the City of Melrose summer recreation
          season. Residents can choose from swimming lessons, fitness programs,
          youth activities, arts programs and outdoor recreation opportunities.
        </p>

        <h2>Programs available this summer</h2>

        <p>
          Programs are available for children, youth, adults and older adults.
          New sessions will be offered at recreation centres, parks and aquatic
          facilities throughout Melrose.
        </p>

        <ul>
          <li>Swimming lessons and aquatic programs</li>
          <li>Youth day camps</li>
          <li>Adult fitness classes</li>
          <li>Arts and cultural programs</li>
          <li>Outdoor recreation activities</li>
        </ul>

        <h2>How to register</h2>

        <p>
          Residents can register online, by telephone or in person at a City of
          Melrose recreation facility. Space is limited and registration is
          completed on a first-come, first-served basis.
        </p>

        <p>
          Residents who need help completing their registration can contact
          Recreation Services during regular business hours.
        </p>
      `,
    },
    {
      id: 2,
      slug: 'downtown-street-improvements',
      title: 'Downtown street improvements begin next month',
      description:
        'Construction will include sidewalk repairs, new street lighting, improved pedestrian crossings and landscaping along Central Avenue.',
      publishedAt: '2026-07-19',
      category: 'Roads and construction',
      author: 'City of Melrose',
      imageUrl: '/images/news/downtown-improvements.jpg',
      imageAlt: 'Downtown Melrose street and local businesses',
      content: `
        <p>
          The City of Melrose will begin a series of infrastructure
          improvements along Central Avenue next month.
        </p>

        <p>
          The work is intended to improve pedestrian safety, accessibility and
          the overall condition of the downtown public realm.
        </p>

        <h2>Planned improvements</h2>

        <ul>
          <li>Sidewalk and curb repairs</li>
          <li>New energy-efficient street lighting</li>
          <li>Improved pedestrian crossings</li>
          <li>New trees and landscaping</li>
          <li>Road surface repairs</li>
        </ul>

        <h2>Traffic and business access</h2>

        <p>
          Central Avenue will remain open during most of the construction.
          Temporary lane closures and parking restrictions may be required.
          Access to local businesses will be maintained.
        </p>

        <p>
          Residents should follow posted signs and allow additional travel time
          while construction is underway.
        </p>
      `,
    },
    {
      id: 3,
      slug: 'new-waste-collection-schedule',
      title: 'New waste collection schedule starts August 1',
      description:
        'Some neighbourhoods will have new collection days beginning in August. Residents should review the updated schedule before placing carts outside.',
      publishedAt: '2026-07-16',
      category: 'Waste and recycling',
      author: 'City of Melrose',
      imageUrl: '/images/news/waste-collection.jpg',
      imageAlt: 'A City of Melrose waste collection vehicle',
      content: `
        <p>
          The City of Melrose is updating waste collection routes beginning
          August 1. The changes will improve route efficiency and reduce delays.
        </p>

        <h2>Check your collection day</h2>

        <p>
          Some households will have a different garbage, recycling or organics
          collection day. Residents should check their address before the new
          schedule begins.
        </p>

        <p>
          Collection carts must be placed outside by 7 a.m. on the scheduled
          collection day.
        </p>

        <h2>No changes to accepted materials</h2>

        <p>
          The materials accepted in garbage, recycling and organics carts are
          not changing. Only collection dates and routes are being updated.
        </p>
      `,
    },
  ];

  getArticleBySlug(slug: string): Observable<NewsArticle | null> {
    return of(this.articles).pipe(
      map((articles) => {
        return articles.find((article) => article.slug === slug) ?? null;
      }),
      delay(250),
    );
  }

  getRelatedArticles(
    currentSlug: string,
    limit = 3,
  ): Observable<NewsArticle[]> {
    return of(this.articles).pipe(
      map((articles) => {
        return articles
          .filter((article) => article.slug !== currentSlug)
          .slice(0, limit);
      }),
    );
  }
}