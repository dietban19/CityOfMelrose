import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl?: string;
  imageAlt?: string;
}
@Component({
  selector: 'app-news-section',
  imports: [RouterLink, DatePipe],
  templateUrl: './news-section.html',
  styleUrl: './news-section.scss',
})
export class NewsSection {
  readonly featuredNews: NewsItem[] = [
    {
      id: 1,
      title: 'Melrose opens registration for summer recreation programs',
      description:
        'Residents can now register for swimming lessons, youth programs, fitness classes and other summer activities offered throughout the city.',
      publishedAt: '2026-07-22',
      imageUrl: '/images/news/summer-recreation.jpg',
      imageAlt: 'Children taking part in an outdoor recreation program',
      link: '/news/summer-recreation-registration',
    },
    {
      id: 2,
      title: 'Downtown street improvements begin next month',
      description:
        'Construction will include sidewalk repairs, new street lighting, improved pedestrian crossings and landscaping along Central Avenue.',
      publishedAt: '2026-07-19',
      imageUrl: '/images/news/downtown-improvements.jpg',
      imageAlt: 'Downtown Melrose street and businesses',
      link: '/news/downtown-street-improvements',
    },
    {
      id: 3,
      title: 'New waste collection schedule starts August 1',
      description:
        'Some neighbourhoods will have new collection days beginning in August. Residents are encouraged to review the updated schedule before placing carts outside.',
      publishedAt: '2026-07-16',
      imageUrl: '/images/news/waste-collection.jpg',
      imageAlt: 'City waste collection vehicle',
      link: '/news/new-waste-collection-schedule',
    },
  ];

  readonly latestNews: NewsItem[] = [
    {
      id: 4,
      title: 'City Council meeting highlights for July',
      description:
        'Council approved several transportation and community development initiatives.',
      publishedAt: '2026-07-14',
      link: '/news/council-meeting-highlights-july',
    },
    {
      id: 5,
      title: 'Temporary closure at Riverside Trail',
      description:
        'A section of the trail will close for maintenance from July 28 to July 30.',
      publishedAt: '2026-07-12',
      link: '/news/riverside-trail-closure',
    },
    {
      id: 6,
      title: 'Applications open for community grants',
      description:
        'Local organizations can apply for funding for programs and neighbourhood projects.',
      publishedAt: '2026-07-10',
      link: '/news/community-grants',
    },
    {
      id: 7,
      title: 'Melrose Fire Service shares summer safety reminders',
      description:
        'Residents are reminded to follow fire restrictions and use outdoor equipment safely.',
      publishedAt: '2026-07-08',
      link: '/news/summer-fire-safety',
    },
  ];
}