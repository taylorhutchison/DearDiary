import { DBConfig, StoreConfig } from "../../interfaces/DBConfig";

export function initialize(desiredConfiguration: DBConfig): Promise<IDBDatabase> {
    return new Promise(async (res, rej) => {
        try {
            const result = await getDB(desiredConfiguration);
            if (result.version == null) {
                res(result.db);
            } else {
                result.db.close();
                const upgradedResult = await getDB(desiredConfiguration, result.version + 1);
                res(upgradedResult.db);
            }
        } catch (err) {
            rej(err)
        }
    });
}

export async function getDB(desiredConfiguration: DBConfig, version?: number): Promise<{ db: IDBDatabase, version: number | null }> {
    return new Promise((res, rej) => {
        if (typeof window !== 'undefined' && window.indexedDB) {
            const dbRequest = indexedDB.open(desiredConfiguration.name, version);
            dbRequest.onupgradeneeded = (e: any) => {
                const db = e.target.result;
                const transaction = e.target.transaction;
                ensureDbState(db, transaction, desiredConfiguration);
            }
            dbRequest.onsuccess = (e: any) => {
                if (checkDbState(e.target.result, desiredConfiguration)) {
                    res({ db: e.target.result, version: null });
                } else {
                    res({ db: e.target.result, version: e.target.result.version });
                }
            }
            dbRequest.onerror = (e: Event) => {
                rej(e);
            }
        } else {
            rej();
        }
    });
}

export function checkDbState(db: IDBDatabase, dbConfig: DBConfig): boolean {
    if (dbConfig.stores && dbConfig.stores.length > 0) {
        for (let i = 0; i < dbConfig.stores.length; i++) {
            if (!db.objectStoreNames.contains(dbConfig.stores[i].name)) {
                return false;
            }
            const transaction = db.transaction(dbConfig.stores[i].name, 'readwrite');
            const store = transaction.objectStore(dbConfig.stores[i].name);
            for (let j = 0; j < dbConfig.stores[i].indexes.length; j++) {
                if (!store.indexNames.contains(dbConfig.stores[i].indexes[j].name)) {
                    return false;
                }
                const index = store.index(dbConfig.stores[i].indexes[j].name)
                if (index.keyPath != dbConfig.stores[i].indexes[j].keyPath) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function ensureDbState(db: IDBDatabase, transaction: IDBTransaction, dbConfig: DBConfig) {
    dbConfig.stores.forEach(store => {
        ensureStoreState(db, transaction, store);
    })
}

export function ensureStoreState(db: IDBDatabase, transaction: IDBTransaction, storeConfig: StoreConfig) {
    if (!db.objectStoreNames.contains(storeConfig.name)) {
        db.createObjectStore(storeConfig.name, { keyPath: storeConfig.keyPath });
    }
    if (storeConfig.indexes) {
        const store = transaction.objectStore(storeConfig.name);
        const existingIndexes = store.indexNames;
        storeConfig.indexes.forEach(index => {
            if (!existingIndexes.contains(index.name)) {
                store.createIndex(index.name, index.keyPath, index.config);
            }
        });
    }
}