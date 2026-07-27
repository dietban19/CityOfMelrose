import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RecreationLink {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-parks-recreation',
  imports: [RouterLink],
  templateUrl: './parks-recreation.html',
  styleUrl: './parks-recreation.scss',
})
export class ParksRecreation {
  readonly links: RecreationLink[] = [
    {
      title: 'Recreation programs',
      description: 'Browse and register for swimming, fitness, arts and youth programs.',
      route: '/parks-community/recreation',
    },
    {
      title: 'Parks and trails',
      description: 'Find parks, playgrounds, picnic spaces and walking trails.',
      route: '/parks-community/parks-and-trails',
    },
    {
      title: 'Facilities',
      description: 'Explore recreation centres, pools, arenas and community spaces.',
      route: '/parks-community/recreation/recreation-centres',
    },
  ];
}
