import { PayloadResponse } from "../../components/parse/PayloadResponse";

const DB_NAME = "SensorDataTools";
const DB_VERSION = 1;
const STORE_NAME = "Payloads";

class IndexedDBProvider {
  private db: IDBDatabase | null;

  constructor() {
    this.db = null;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async saveData(data: PayloadResponse): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized."));
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.add(data);
      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest<number>).result);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async getAllData(): Promise<PayloadResponse[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized."));
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.getAll();
      request.onsuccess = (event: Event) => {
        resolve(
          (event.target as IDBRequest<PayloadResponse[]>).result
        );
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async getDataByFilter(filter: (data: PayloadResponse) => boolean): Promise<PayloadResponse[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized."));
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.getAll();
      request.onsuccess = (event: Event) => {
        const data = (event.target as IDBRequest<PayloadResponse[]>).result;
        const filteredData = data.filter(filter);
        resolve(filteredData);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
  async deleteDataById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized."));
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.delete(id);
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
  async dropDb(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized."));
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.clear()
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new IndexedDBProvider();
