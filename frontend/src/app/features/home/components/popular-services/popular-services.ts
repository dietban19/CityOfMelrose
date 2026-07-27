import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../../core/services/analytics';
type ServiceIcon = 'recreation' | 'waste' | 'transit' | 'property' | 'roads' | 'calendar';

interface PopularService {
  key: string;
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
  private readonly analyticsService: AnalyticsService = inject(AnalyticsService);
  readonly services: PopularService[] = [
    {
      key: 'recreation-programs',
      title: 'Recreation programs',
      link: '/parks-community/recreation',
      icon: 'recreation',
    },
    {
      key: 'waste-collection',
      title: 'Waste collection schedule',
      link: '/waste-recycling/collection-schedule',
      icon: 'waste',
    },
    {
      key: 'transit-schedules',
      title: 'Transit schedules',
      link: '/transportation/transit',
      icon: 'transit',
    },
    {
      key: 'property-taxes',
      title: 'Property taxes',
      link: '/property-taxes',
      icon: 'property',
    },
    {
      key: 'parking-road-conditions',
      title: 'Parking and road conditions',
      link: '/transportation/parking-roads',
      icon: 'roads',
    },
    {
      key: 'events-calendar',
      title: 'Events calendar',
      link: '/events',
      icon: 'calendar',
    },
  ];
  trackServiceClick(service: PopularService): void {
    this.analyticsService.trackServiceClick(service.key, service.title, service.link);
  }
}
