import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

interface FooterGroup {
  heading: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly linkGroups: FooterGroup[] = [
    {
      heading: 'City services',
      links: [
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
      ],
    },
    {
      heading: 'Community',
      links: [
        {
          label: 'Parks and trails',
          route: '/parks-community/parks-and-trails',
        },
        {
          label: 'Recreation',
          route: '/parks-community/recreation',
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
      heading: 'City Hall',
      links: [
        {
          label: 'Mayor and council',
          route: '/city-hall/mayor-and-council',
        },
        {
          label: 'News',
          route: '/city-hall/news',
        },
        {
          label: 'Major projects',
          route: '/city-hall/projects',
        },
        {
          label: 'Careers',
          route: '/city-hall/careers',
        },
      ],
    },
  ];
}
