import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RecreationProgram {
  name: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-recreation',
  imports: [RouterLink],
  templateUrl: './recreation.html',
  styleUrl: './recreation.scss',
})
export class Recreation {
  programs: RecreationProgram[] = [
    {
      name: 'Swimming lessons',
      description: 'Programs for children, teens, and adults.',
      route: '/parks-community/program-registration',
    },
    {
      name: 'Fitness classes',
      description: 'Group fitness classes offered throughout Melrose.',
      route: '/parks-community/program-registration',
    },
    {
      name: 'Youth programs',
      description: 'Sports, camps, and activities for young residents.',
      route: '/parks-community/program-registration',
    },
  ];
}