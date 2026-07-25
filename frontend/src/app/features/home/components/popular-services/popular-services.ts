import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ServiceIcon =
  | 'recreation'
  | 'waste'
  | 'transit'
  | 'property'
  | 'roads'
  | 'calendar';

interface PopularService {
  title: string;
  link: string;
  icon: ServiceIcon;
}

@Component({
  selector: 'app-popular-services',
  imports: [RouterLink],
  templateUrl: './popular-services.html',
  styleUrl: './popular-services.scss',
})
export class PopularServices {
  readonly services: PopularService[] = [
    {
      title: 'Recreation programs',
      link: '/parks-community/recreation',
      icon: 'recreation',
    },
    {
      title: 'Waste collection schedule',
      link: '/waste-recycling/collection-schedule',
      icon: 'waste',
    },
    {
      title: 'Transit schedules',
      link: '/transportation/transit',
      icon: 'transit',
    },
    {
      title: 'Property taxes',
      link: '/property-taxes',
      icon: 'property',
    },
    {
      title: 'Parking and road conditions',
      link: '/transportation/parking-roads',
      icon: 'roads',
    },
    {
      title: 'Events calendar',
      link: '/events',
      icon: 'calendar',
    },
  ];
}