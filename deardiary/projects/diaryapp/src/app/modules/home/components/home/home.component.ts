import { Component, OnInit } from '@angular/core';
import { StorageService } from 'projects/diaryapp/src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: StorageService) { }

  entries = [];

  async ngOnInit(): Promise<void> {
    const entries = await this.store.getAllEntries();
    this.entries = entries.map((e: any) => {
      return {
        entryId: e.entryId,
        title: e.title,
        excerpt: e.notes?.substr(0, 100),
        dateCreated: e.dateCreated
      }
    })
  }

}
