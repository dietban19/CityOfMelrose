import { Component, signal } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { PopularServices } from '../../components/popular-services/popular-services';
import { QuickActions } from '../../components/quick-actions/quick-actions';
import { NewsSection } from '../../components/news-section/news-section';
import { EventsSection } from '../../components/events-section/events-section';
import { MajorProjects } from '../../components/major-projects/major-projects';
import { ParksRecreation } from '../../components/parks-recreation/parks-recreation';
import { AboutMelrose } from '../../components/about-melrose/about-melrose';
@Component({
  selector: 'app-home-page',
  imports: [    HeroSection,
    PopularServices,
    QuickActions,
    NewsSection,
    EventsSection,
    MajorProjects,
    ParksRecreation,
    AboutMelrose,],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}