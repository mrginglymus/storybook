import {
  ItemId,
  type StoreEvent,
  type StoreState,
  createChecklistStore,
} from '../../shared/checklist-store/index.ts';
import { UNIVERSAL_CHECKLIST_STORE_OPTIONS } from '../../shared/checklist-store/index.ts';
import { UniversalStore } from '../../shared/universal-store/index.ts';

export const universalChecklistStore: UniversalStore<StoreState, StoreEvent> = UniversalStore.create<StoreState, StoreEvent>({
  ...UNIVERSAL_CHECKLIST_STORE_OPTIONS,
  leader: globalThis.CONFIG_TYPE === 'PRODUCTION',
});

export const checklistStore: {
  getValue: (id: ItemId) => {
    status?: "open" | "accepted" | "done" | "skipped" | undefined;
    mutedAt?: number | undefined;
  }; accept: (id: ItemId) => void; done: (id: ItemId) => void; skip: (id: ItemId) => void; reset: (id: ItemId) => void; mute: (itemIds: Array<ItemId>) => void; disable: (value: boolean) => void;
} = createChecklistStore(universalChecklistStore);
