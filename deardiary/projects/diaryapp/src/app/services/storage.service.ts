import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  dbName: string = "diaryStore";

  constructor() {

    const db = indexedDB.open(this.dbName);
    db.onsuccess = (e: Event) => {
      console.log(e);
    }


  }


}
