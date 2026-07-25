import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly openMenu = signal<string | null>(null);

  readonly navigationGroups: NavGroup[] = [
    {
      title: 'Services',
      items: [
        {
          label: 'Payments',
          route: '/services/payments',
        },
        {
          label: 'Waste collection',
          route: '/services/waste-collection',
        },
        {
          label: 'Permits and licences',
          route: '/services/permits-and-licences',
        },
        {
          label: 'Report a problem',
          route: '/services/report-a-problem',
        },
        {
          label: 'Property taxes',
          route: '/services/property-taxes',
        },
      ],
    },
    {
      title: 'Getting Around',
      items: [
        {
          label: 'Transit',
          route: '/getting-around/transit',
        },
        {
          label: 'Roads and closures',
          route: '/getting-around/roads-and-closures',
        },
        {
          label: 'Parking',
          route: '/getting-around/parking',
        },
        {
          label: 'Cycling and walking',
          route: '/getting-around/cycling-and-walking',
        },
      ],
    },
    {
      title: 'Parks & Community',
      items: [
        {
          label: 'Recreation',
          route: '/parks-community/recreation',
        },
        {
          label: 'Parks and trails',
          route: '/parks-community/parks-and-trails',
        },
        {
          label: 'Events',
          route: '/parks-community/events',
        },
        {
          label: 'Community programs',
          route: '/parks-community/community-programs',
        },
      ],
    },
    {
      title: 'City Hall',
      items: [
        {
          label: 'Mayor and council',
          route: '/city-hall/mayor-and-council',
        },
        {
          label: 'News',
          route: '/city-hall/news',
        },
        {
          label: 'Projects',
          route: '/city-hall/projects',
        },
        {
          label: 'Jobs',
          route: '/city-hall/jobs',
        },
        {
          label: 'About Melrose',
          route: '/city-hall/about-melrose',
        },
      ],
    },
  ];

  toggleMenu(title: string): void {
    this.openMenu.update((currentMenu) =>
      currentMenu === title ? null : title
    );
  }

  closeMenu(): void {
    this.openMenu.set(null);
  }
}