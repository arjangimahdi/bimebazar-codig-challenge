const DB_NAME = 'bimebazar-db'
const DB_VERSION = 1
const STORE_INQUERIES = 'inqueries'

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_INQUERIES)) {
        db.createObjectStore(STORE_INQUERIES, { keyPath: 'plateEn' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => Promise<T>,
): Promise<T> {
  const db = await openDB()
  const tx = db.transaction(storeName, mode)
  const store = tx.objectStore(storeName)
  const result = await run(store)
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
    tx.onabort = () => rej(tx.error)
  })
  return result
}

export function insert(record: { createdAt?: string } & Record<string, unknown>) {
  const payload: Record<string, unknown> = {
    ...record,
    createdAt: record.createdAt ?? Date.now(),
  }
  return withStore(STORE_INQUERIES, 'readwrite', async (store) => {
    await promisifyRequest(store.put(payload))
  })
}

export function get(keyPath: string) {
  return withStore(STORE_INQUERIES, 'readonly', async (store) => {
    const res = await promisifyRequest<(unknown & { createdAt?: number }) | undefined>(
      store.get(keyPath),
    )
    return res
  })
}

export function getAll() {
  return withStore(STORE_INQUERIES, 'readonly', async (store) => {
    const res = await promisifyRequest<Array<unknown & { createdAt?: number }>>(store.getAll())
    return res
  })
}

export function remove(keyPath: string) {
  return withStore(STORE_INQUERIES, 'readwrite', async (store) => {
    await promisifyRequest(store.delete(keyPath))
  })
}
