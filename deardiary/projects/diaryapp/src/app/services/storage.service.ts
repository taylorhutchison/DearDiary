import { Injectable } from '@angular/core';
import { DBConfig } from '../interfaces/DBConfig';
import { addOrUpdate, query } from '../lib/db/operations';
import { initialize } from '../lib/db/setup';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private dbConfig: DBConfig = {
    name: 'diaryDB',
    stores: [
      {
        name: 'entries',
        keyPath: 'entryId',
        indexes: []
      },
      {
        name: 'images',
        keyPath: 'imageId',
        indexes: [
          { name: 'entryId', keyPath: 'entryId', config: { unique: false } }
        ]
      }
    ]
  }

  private initializedDb: Promise<IDBDatabase>;

  constructor() {
    this.initializedDb = initialize(this.dbConfig);
  }

  async addOrUpdateEntry(value: Partial<{ entryId: string }>): Promise<any> {
    return addOrUpdate(this.initializedDb, 'entries', value);
  }

  async getEntry(entryId: string): Promise<IDBRequest<any>> {
    return query(this.initializedDb, 'entries', (store) => store.get(entryId));
  }

  async getAllEntries(): Promise<IDBRequest<any>> {
    return query(this.initializedDb, 'entries', (store) => store.getAll());
  }

  async setImage(value: Partial<{ imageId: string, data: string }>): Promise<any> {
    return addOrUpdate(this.initializedDb, 'images', value);
  }

  async getImage(imageId: string): Promise<any> {
    return query(this.initializedDb, 'images', (store) => store.get(imageId));
  }

}
