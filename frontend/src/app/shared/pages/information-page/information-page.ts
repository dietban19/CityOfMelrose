import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

export interface InformationLink {
  label: string;
  route: string;
  description?: string;
}

export interface InformationPageData {
  category: string;
  title: string;
  description: string;
  links: InformationLink[];
}

@Component({
  selector: 'app-information-page',
  imports: [RouterLink],
  templateUrl: './information-page.html',
  styleUrl: './information-page.scss',
})
export class InformationPage {
  private readonly route = inject(ActivatedRoute);

  readonly page = computed(() => {
    return this.route.snapshot.data['page'] as InformationPageData;
  });
}