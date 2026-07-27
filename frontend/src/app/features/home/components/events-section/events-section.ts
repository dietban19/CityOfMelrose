import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CityEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  route: string;
}

@Component({
  selector: 'app-events-section',
  imports: [DatePipe, RouterLink],
  templateUrl: './events-section.html',
  styleUrl: './events-section.scss',
})
export class EventsSection {
  readonly events: CityEvent[] = [
    {
      id: 1,
      title: 'Melrose Summer Market',
      description: 'Shop from local vendors and enjoy live music and family activities.',
      startDate: '2026-08-08',
      time: '10 a.m. to 4 p.m.',
      location: 'Civic Square',
      route: '/parks-community/events/summer-market',
    },
    {
      id: 2,
      title: 'City Council meeting',
      description: 'Attend the next regular meeting of Melrose City Council.',
      startDate: '2026-08-12',
      time: '6 p.m.',
      location: 'Melrose City Hall',
      route: '/city-hall/mayor-and-council/meetings',
    },
    {
      id: 3,
      title: 'Outdoor movie night',
      description: 'Bring a chair or blanket and enjoy a free outdoor family movie.',
      startDate: '2026-08-16',
      time: '8:30 p.m.',
      location: 'Willow Park',
      route: '/parks-community/events/outdoor-movie-night',
    },
    {
      id: 4,
      title: 'Community grant information session',
      description: 'Learn about eligibility and the application process for City grants.',
      startDate: '2026-08-20',
      time: '7 p.m.',
      location: 'Online',
      route: '/parks-community/community-programs/grants',
    },
  ];
}
