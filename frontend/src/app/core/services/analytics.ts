import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly measurementId = 'G-KPMPEN58F7';

  trackPageView(url: string, title: string): void {
    if (!this.isAvailable()) {
      return;
    }

    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: url,
      page_title: title,
      send_to: this.measurementId,
    });
  }

  trackServiceClick(serviceKey: string, serviceName: string, serviceUrl: string): void {
    if (!this.isAvailable()) {
      return;
    }

    window.gtag('event', 'service_click', {
      service_key: serviceKey,
      service_name: serviceName,
      service_url: serviceUrl,
    });
  }

  private isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
  }
}
