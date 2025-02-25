import { createStore } from 'zustand';
import { type StateCreator } from 'zustand/vanilla';

export function createMockStore<T>(config: StateCreator<T>) {
  return createStore<T>(config);
}
