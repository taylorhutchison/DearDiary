import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NetworkService } from './services/network.service';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'diaryapp';
  isOnline: boolean = false;
  constructor(private store: StorageService,
    private notificationService: NotificationService,
    private networkService: NetworkService,
    private updates: SwUpdate
  ) {
  }

  ngOnInit() {
    this.networkService.monitorNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
      if (isOnline) {
        this.notificationService.notify('Application is online');
      } else {
        this.notificationService.notify('Offline mode enabled');
      }
    });

    this.updates.available.subscribe(event => {
      this.notificationService.notify(`An update is available. Current version ${event.current?.hash}. Available version ${event.available?.hash}.`);
    });
    this.updates.activated.subscribe(event => {
      this.notificationService.notify(`App Updated. Old version was ${event.previous?.hash}. Available version ${event.current?.hash}.`);
    });
  }
}
