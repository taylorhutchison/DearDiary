import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  isOnline = new BehaviorSubject<boolean>(false);

  private monitoring = false;

  constructor() {
    if (typeof navigator !== 'undefined') {
      this.isOnline.next(navigator.onLine);
    }
  }

  monitorNetworkStatus(): BehaviorSubject<boolean> {
    if (typeof window !== 'undefined' && !this.monitoring) {
      this.monitoring = true;
      ['online', 'offline'].forEach(e => {
        window.addEventListener(e, () => {
          this.isOnline.next(navigator.onLine);
        });
      });
    }
    return this.isOnline;
  }
}
