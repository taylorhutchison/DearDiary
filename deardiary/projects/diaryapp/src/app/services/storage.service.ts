import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  dbName: string = "diaryStore";

  constructor() {
    if (typeof window !== 'undefined' && window.indexedDB) {
      const db = indexedDB.open(this.dbName);
      db.onsuccess = (e: Event) => {
        console.log(e);
      }
    }

  }


}
