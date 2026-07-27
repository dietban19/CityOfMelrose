import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CityStatistic {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about-melrose',
  imports: [RouterLink],
  templateUrl: './about-melrose.html',
  styleUrl: './about-melrose.scss',
})
export class AboutMelrose {
  readonly statistics: CityStatistic[] = [
    {
      value: '148,000',
      label: 'Residents',
    },
    {
      value: '64',
      label: 'Neighbourhoods',
    },
    {
      value: '120+',
      label: 'Parks and green spaces',
    },
    {
      value: '1892',
      label: 'Year established',
    },
  ];
}
