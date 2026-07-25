import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { HeroSection } from '../../components/hero-section/hero-section';
import { PopularServices } from '../../components/popular-services/popular-services';
import { QuickActions } from '../../components/quick-actions/quick-actions';
import { NewsSection } from '../../components/news-section/news-section';
import { EventsSection } from '../../components/events-section/events-section';
import { MajorProjects } from '../../components/major-projects/major-projects';
import { ParksRecreation } from '../../components/parks-recreation/parks-recreation';
import { AboutMelrose } from '../../components/about-melrose/about-melrose';
import { HomePageService, type HomePageContent } from '../../../../services/home-page.service';
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PopularServices,
    QuickActions,
    NewsSection,
    EventsSection,
    MajorProjects,
    ParksRecreation,
    AboutMelrose,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private readonly homePageService: HomePageService =
    inject(HomePageService);

  readonly homePage = signal<HomePageContent | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.homePageService.getHomePage().subscribe({
      next: (homePage: HomePageContent) => {
        this.homePage.set(homePage);
        this.isLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load homepage:', error);

        this.errorMessage.set(
          'The homepage content could not be loaded.',
        );

        this.isLoading.set(false);
      },
    });
  }
}