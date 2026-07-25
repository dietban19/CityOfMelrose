import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  readonly title = input.required<string>();
  readonly description = input.required<string>();

  readonly imageUrl = input<string | null>(null);
  readonly imageAlt = input<string>('');

  readonly buttonText = input<string | null>(null);
  readonly buttonUrl = input<string | null>(null);
}
