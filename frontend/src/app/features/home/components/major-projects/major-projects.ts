import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MajorProject {
  id: number;
  title: string;
  description: string;
  status: string;
  imageUrl: string;
  imageAlt: string;
  route: string;
}

@Component({
  selector: 'app-major-projects',
  imports: [RouterLink],
  templateUrl: './major-projects.html',
  styleUrl: './major-projects.scss',
})
export class MajorProjects {
  readonly projects: MajorProject[] = [
    {
      id: 1,
      title: 'Central Avenue improvements',
      description: 'Sidewalk, road, lighting and accessibility improvements in downtown Melrose.',
      status: 'Construction begins August 2026',
      imageUrl: '/images/projects/central-avenue.jpg',
      imageAlt: 'Concept view of street and sidewalk improvements on Central Avenue',
      route: '/city-hall/projects/central-avenue',
    },
    {
      id: 2,
      title: 'Northside Recreation Centre',
      description:
        'A new accessible recreation facility with a gymnasium, pool and community rooms.',
      status: 'Design phase',
      imageUrl: '/images/projects/northside-recreation-centre.jpg',
      imageAlt: 'Architectural rendering of the Northside Recreation Centre',
      route: '/city-hall/projects/northside-recreation-centre',
    },
    {
      id: 3,
      title: 'Riverside flood protection',
      description: 'Upgrades to protect nearby neighbourhoods, trails and public infrastructure.',
      status: 'Planning and public engagement',
      imageUrl: '/images/projects/riverside-flood-protection.jpg',
      imageAlt: 'Riverside trail and riverbank in Melrose',
      route: '/city-hall/projects/riverside-flood-protection',
    },
  ];
}
