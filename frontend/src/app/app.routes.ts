import { Routes } from '@angular/router';

import { MainLayout } from './core/layout/main-layout/main-layout';
import { Recreation } from './features/parks-community/pages/recreation/recreation';

const informationPage = () =>
  import('./shared/pages/information-page/information-page').then(
    (component) => component.InformationPage
  );

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        title: 'CityConnect | Home',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page').then(
            (component) => component.HomePage
          ),
      },

      // Services

      {
        path: 'services/payments',
        title: 'Payments | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Services',
            title: 'Payments',
            description:
              'Pay city bills, taxes, tickets, licences, and other municipal fees.',
            links: [
              {
                label: 'Property taxes',
                route: '/services/property-taxes',
                description: 'View and pay your municipal property tax bill.',
              },
              {
                label: 'Utility bill',
                route: '/services/payments/utility-bill',
                description: 'Pay water and other city utility charges.',
              },
              {
                label: 'Parking ticket',
                route: '/services/payments/parking-ticket',
                description: 'Pay or review a parking violation.',
              },
            ],
          },
        },
      },
      {
        path: 'services/waste-collection',
        title: 'Waste Collection | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Services',
            title: 'Waste collection',
            description:
              'Find collection schedules and information about garbage, recycling, and organics.',
            links: [
              {
                label: 'Collection schedule',
                route: '/services/waste-collection/schedule',
                description: 'Find your next waste collection date.',
              },
              {
                label: 'Recycling',
                route: '/services/waste-collection/recycling',
                description: 'Learn what belongs in your recycling cart.',
              },
              {
                label: 'Missed collection',
                route: '/services/report-a-problem/missed-collection',
                description: 'Report waste that was not collected.',
              },
            ],
          },
        },
      },
      {
        path: 'services/permits-and-licences',
        title: 'Permits and Licences | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Services',
            title: 'Permits and licences',
            description:
              'Apply for permits and licences required for construction, businesses, pets, and events.',
            links: [
              {
                label: 'Building permits',
                route: '/services/permits-and-licences/building-permits',
              },
              {
                label: 'Business licences',
                route: '/services/permits-and-licences/business-licences',
              },
              {
                label: 'Pet licences',
                route: '/services/permits-and-licences/pet-licences',
              },
            ],
          },
        },
      },
      {
        path: 'services/report-a-problem',
        title: 'Report a Problem | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Services',
            title: 'Report a problem',
            description:
              'Tell the city about problems involving roads, waste collection, parks, and public property.',
            links: [
              {
                label: 'Report a pothole',
                route: '/services/report-a-problem/pothole',
              },
              {
                label: 'Missed collection',
                route: '/services/report-a-problem/missed-collection',
              },
              {
                label: 'Streetlight issue',
                route: '/services/report-a-problem/streetlight',
              },
            ],
          },
        },
      },
      {
        path: 'services/property-taxes',
        title: 'Property Taxes | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Services',
            title: 'Property taxes',
            description:
              'View property tax information, payment options, due dates, and assessment resources.',
            links: [
              {
                label: 'Pay property taxes',
                route: '/services/payments',
              },
              {
                label: 'Tax due dates',
                route: '/services/property-taxes/due-dates',
              },
              {
                label: 'Property assessment',
                route: '/services/property-taxes/assessment',
              },
            ],
          },
        },
      },

      // Getting Around

      {
        path: 'getting-around/transit',
        title: 'Transit | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Getting Around',
            title: 'Transit',
            description:
              'Find bus routes, schedules, fares, service alerts, and accessibility information.',
            links: [
              {
                label: 'Routes and schedules',
                route: '/getting-around/transit/routes',
              },
              {
                label: 'Transit fares',
                route: '/getting-around/transit/fares',
              },
              {
                label: 'Service alerts',
                route: '/getting-around/transit/service-alerts',
              },
            ],
          },
        },
      },
      {
        path: 'getting-around/roads-and-closures',
        title: 'Roads and Closures | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Getting Around',
            title: 'Roads and closures',
            description:
              'Check current road closures, construction work, maintenance, and traffic information.',
            links: [
              {
                label: 'Current closures',
                route: '/getting-around/roads-and-closures/current',
              },
              {
                label: 'Construction projects',
                route: '/city-hall/projects',
              },
              {
                label: 'Report a road problem',
                route: '/services/report-a-problem',
              },
            ],
          },
        },
      },
      {
        path: 'getting-around/parking',
        title: 'Parking | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Getting Around',
            title: 'Parking',
            description:
              'Find public parking, permits, parking regulations, and ticket payment information.',
            links: [
              {
                label: 'Public parking',
                route: '/getting-around/parking/public-parking',
              },
              {
                label: 'Parking permits',
                route: '/getting-around/parking/permits',
              },
              {
                label: 'Pay a parking ticket',
                route: '/services/payments',
              },
            ],
          },
        },
      },
      {
        path: 'getting-around/cycling-and-walking',
        title: 'Cycling and Walking | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Getting Around',
            title: 'Cycling and walking',
            description:
              'Explore cycling routes, pedestrian paths, trails, and active transportation programs.',
            links: [
              {
                label: 'Cycling routes',
                route: '/getting-around/cycling-and-walking/cycling-routes',
              },
              {
                label: 'Walking paths',
                route: '/getting-around/cycling-and-walking/walking-paths',
              },
              {
                label: 'Trail map',
                route: '/parks-community/parks-and-trails',
              },
            ],
          },
        },
      },

      // Parks and Community

      {
        path: 'parks-community/recreation',
        title: 'Recreation | CityConnect',
        component: Recreation,
        // loadComponent: informationPage,
        // data: {
        //   page: {
        //     category: 'Parks & Community',
        //     title: 'Recreation',
        //     description:
        //       'Discover recreation programs, facilities, classes, and registration options.',
        //     links: [
        //       {
        //         label: 'Program registration',
        //         route: '/parks-community/recreation/program-registration',
        //       },
        //       {
        //         label: 'Recreation centres',
        //         route: '/parks-community/recreation/recreation-centres',
        //       },
        //       {
        //         label: 'Pools and arenas',
        //         route: '/parks-community/recreation/pools-and-arenas',
        //       },
        //     ],
        //   },
        // },
      },
      {
        path: 'parks-community/parks-and-trails',
        title: 'Parks and Trails | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Parks & Community',
            title: 'Parks and trails',
            description:
              'Find parks, playgrounds, trails, picnic areas, and outdoor amenities.',
            links: [
              {
                label: 'Find a park',
                route: '/parks-community/parks-and-trails/find-a-park',
              },
              {
                label: 'Trail maps',
                route: '/parks-community/parks-and-trails/trail-maps',
              },
              {
                label: 'Park bookings',
                route: '/parks-community/parks-and-trails/bookings',
              },
            ],
          },
        },
      },
      {
        path: 'parks-community/events',
        title: 'Events | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Parks & Community',
            title: 'Events',
            description:
              'Find festivals, public meetings, recreation activities, and community events.',
            links: [
              {
                label: 'Event calendar',
                route: '/parks-community/events/calendar',
              },
              {
                label: 'Festivals',
                route: '/parks-community/events/festivals',
              },
              {
                label: 'Submit an event',
                route: '/parks-community/events/submit',
              },
            ],
          },
        },
      },
      {
        path: 'parks-community/community-programs',
        title: 'Community Programs | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'Parks & Community',
            title: 'Community programs',
            description:
              'Explore programs, resources, grants, and support for Melrose residents.',
            links: [
              {
                label: 'Youth programs',
                route: '/parks-community/community-programs/youth',
              },
              {
                label: 'Older adult programs',
                route: '/parks-community/community-programs/older-adults',
              },
              {
                label: 'Community grants',
                route: '/parks-community/community-programs/grants',
              },
            ],
          },
        },
      },

      // City Hall

      {
        path: 'city-hall/mayor-and-council',
        title: 'Mayor and Council | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'City Hall',
            title: 'Mayor and council',
            description:
              'Learn about the mayor, city councillors, council meetings, and municipal decisions.',
            links: [
              {
                label: 'Mayor',
                route: '/city-hall/mayor-and-council/mayor',
              },
              {
                label: 'City council',
                route: '/city-hall/mayor-and-council/council',
              },
              {
                label: 'Council meetings',
                route: '/city-hall/mayor-and-council/meetings',
              },
            ],
          },
        },
      },
      {
        path: 'city-hall/news',
        title: 'News | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'City Hall',
            title: 'News',
            description:
              'Read city announcements, construction updates, notices, and service changes.',
            links: [
              {
                label: 'City announcements',
                route: '/city-hall/news/announcements',
              },
              {
                label: 'Construction updates',
                route: '/city-hall/news/construction',
              },
              {
                label: 'Service changes',
                route: '/city-hall/news/service-changes',
              },
            ],
          },
        },
      },
      {
        path: 'city-hall/projects',
        title: 'Projects | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'City Hall',
            title: 'Projects',
            description:
              'Learn about major infrastructure, transportation, and community development projects.',
            links: [
              {
                label: 'Riverfront Renewal',
                route: '/city-hall/projects/riverfront-renewal',
              },
              {
                label: 'Rose Line Transit',
                route: '/city-hall/projects/rose-line-transit',
              },
              {
                label: 'Downtown Revitalization',
                route: '/city-hall/projects/downtown-revitalization',
              },
            ],
          },
        },
      },
      {
        path: 'city-hall/jobs',
        title: 'Jobs | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'City Hall',
            title: 'Jobs',
            description:
              'Explore employment opportunities and learn about working for the City of Melrose.',
            links: [
              {
                label: 'Current opportunities',
                route: '/city-hall/jobs/current-opportunities',
              },
              {
                label: 'Student positions',
                route: '/city-hall/jobs/student-positions',
              },
              {
                label: 'How to apply',
                route: '/city-hall/jobs/how-to-apply',
              },
            ],
          },
        },
      },
      {
        path: 'city-hall/about-melrose',
        title: 'About Melrose | CityConnect',
        loadComponent: informationPage,
        data: {
          page: {
            category: 'City Hall',
            title: 'About Melrose',
            description:
              'Learn about the city’s history, population, neighbourhoods, landmarks, and geography.',
            links: [
              {
                label: 'City history',
                route: '/city-hall/about-melrose/history',
              },
              {
                label: 'Population',
                route: '/city-hall/about-melrose/population',
              },
              {
                label: 'Neighbourhoods',
                route: '/city-hall/about-melrose/neighbourhoods',
              },
              {
                label: 'Fort Melrose',
                route: '/city-hall/about-melrose/fort-melrose',
              },
              {
                label: 'City map',
                route: '/city-hall/about-melrose/map',
              },
            ],
          },
        },
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];