import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage: AsyncLocalStorage = new AsyncLocalStorage();

export { asyncLocalStorage };
