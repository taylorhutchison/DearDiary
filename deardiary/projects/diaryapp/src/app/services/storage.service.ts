import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  dbName: string = "diaryStore";

  constructor() {
  }

  generateEntryKey(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );

  }


  async addOrUpdateItem(value: Partial<{ entryId: string }>): Promise<any> {
    try {
      return new Promise(async (res, rej) => {
        const db = await this.getDB(this.dbName);
        const transaction = db.transaction('entries', 'readwrite');
        const store = transaction.objectStore('entries');
        const request = store.put(value);
        request.onsuccess = () => {
          res(request.result);
        }
        request.onerror = (e) => {
          rej(e);
        }
      })
    }
    catch (err) {
      console.error(err);
    }
  }

  async getItem(entryId: string): Promise<any> {
    try {
      return new Promise(async (res, rej) => {
        const db = await this.getDB(this.dbName);
        const transaction = db.transaction('entries', 'readwrite');
        const store = transaction.objectStore('entries');
        const request = store.get(entryId);
        request.onsuccess = () => {
          res(request.result);
        }
        request.onerror = (e) => {
          rej(e);
        }
      })
    }
    catch (err) {
      console.error(err);
    }
  }

  async getAllEntries(): Promise<any> {
    try {
      return new Promise(async (res, rej) => {
        const db = await this.getDB(this.dbName);
        const transaction = db.transaction('entries', 'readonly');
        const store = transaction.objectStore('entries');
        const request = store.getAll();
        request.onsuccess = () => {
          res(request.result);
        }
        request.onerror = (e) => {
          rej(e);
        }
      })
    }
    catch (err) {
      console.error(err);
    }
  }

  private async getDB(dbName: string): Promise<IDBDatabase> {
    return new Promise((res, rej) => {
      if (typeof window !== 'undefined' && window.indexedDB) {
        const dbRequest = indexedDB.open(dbName, 2);
        dbRequest.onupgradeneeded = (e: any) => {
          const db = e.target.result;
          this.createEntryStore(db);
        }
        dbRequest.onsuccess = (e: any) => {
          res(e.target.result);
        }
        dbRequest.onerror = (e: Event) => {
          rej(e);
        }
      } else {
        rej();
      }
    });
  }

  private createEntryStore(db: IDBDatabase): void {
    if (!db.objectStoreNames.contains('entries')) {
      db.createObjectStore('entries', { keyPath: 'entryId' });
    }
  }
}
