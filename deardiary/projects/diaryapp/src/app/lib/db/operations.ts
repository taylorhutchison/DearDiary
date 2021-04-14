
export async function query(initializedDB: Promise<IDBDatabase>, storeName: string, storeQuery: (store: IDBObjectStore) => IDBRequest<any> | IDBRequest<any[]>): Promise<IDBRequest<any>> {
    try {
        return new Promise(async (res, rej) => {
            const db = await initializedDB;
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = storeQuery(store);
            request.onsuccess = () => {
                res(request.result);
            }
            request.onerror = (e) => {
                rej(e);
            }
        })
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export async function addOrUpdate(initializedDB: Promise<IDBDatabase>, storeName: string, value: any): Promise<any> {
    try {
        return new Promise(async (res, rej) => {
            const db = await initializedDB;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
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
        return Promise.reject(err);
    }
}