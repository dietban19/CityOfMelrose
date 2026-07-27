import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type QuickActionIcon = 'payment' | 'report' | 'calendar' | 'permit';

interface QuickAction {
  title: string;
  description: string;
  route: string;
  icon: QuickActionIcon;
}

@Component({
  selector: 'app-quick-actions',
  imports: [RouterLink],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
})
export class QuickActions {
  readonly actions: QuickAction[] = [
    {
      title: 'Make a payment',
      description: 'Pay property taxes, utility bills, tickets and other City fees.',
      route: '/services/payments',
      icon: 'payment',
    },
    {
      title: 'Report a problem',
      description: 'Report potholes, missed collection, damaged property and other issues.',
      route: '/services/report-a-problem',
      icon: 'report',
    },
    {
      title: 'Check waste collection',
      description: 'Find your next garbage, recycling and organics collection date.',
      route: '/services/waste-collection',
      icon: 'calendar',
    },
    {
      title: 'Apply for a permit',
      description: 'Find building permits, business licences and application information.',
      route: '/services/permits-and-licences',
      icon: 'permit',
    },
  ];
}
