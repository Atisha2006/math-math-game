import { IStoreConfig } from '../shared';

export class DataBase {
  database: IDBDatabase | null = null;

  constructor(iBDName: string, storeConfig: IStoreConfig[]) {
    const openRequest = window.indexedDB.open(iBDName);

    openRequest.onupgradeneeded = (): void => {
      storeConfig.forEach((store) => {
        this.database = openRequest.result;
        if (!this.database.objectStoreNames.contains(store.store)) {
          const storeOS = this.database.createObjectStore(store.store, { keyPath: store.keyPath, autoIncrement: true });
          Object.keys(store.index).forEach((key) => {
            storeOS.createIndex(key, key, { unique: store.index[key] });
          });
        }
      });
    };

    openRequest.onsuccess = (): void => {
      this.database = openRequest.result;
    };
  }

  add(storageName: string, data: { [key: string]: string | number }): void {
    if (this.database) {
      const request = this.database.transaction(storageName, 'readwrite').objectStore(storageName).put(data);

      request.onsuccess = () => {
        return request.result;
      };
    }
  }

  getSort<RecordType>(storageName: string, topIndex: number): Promise<Array<RecordType>> {
    return new Promise((resolve) => {
      let arrValue: Array<RecordType> = [];
      if (this.database) {
        const trans = this.database.transaction(storageName, 'readonly');
        const cursorRequest = trans.objectStore(storageName).index('score').openCursor(null, 'prev');

        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result;
          if (cursor) {
            arrValue = [...arrValue, cursor.value];
            if (arrValue.length < topIndex) {
              cursor.continue();
            }
          }
        };

        trans.oncomplete = () => {
          resolve(arrValue);
        };
      }
    });
  }
}
