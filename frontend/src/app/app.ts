import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnalyticsService } from './core/services/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router: Router = inject(Router);

  private readonly analyticsService: AnalyticsService = inject(AnalyticsService);

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.analyticsService.trackPageView(event.urlAfterRedirects, document.title);
      });
  }
}
