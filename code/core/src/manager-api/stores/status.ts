import { createStatusStore, UseStatusStore, StatusTypeId, StatusStoreEvent, StatusStoreByTypeId, StatusStore, StatusesByStoryIdAndTypeId, Status } from '../../shared/status-store/index.ts';
import { UNIVERSAL_STATUS_STORE_OPTIONS } from '../../shared/status-store/index.ts';
import { UniversalStore } from '../../shared/universal-store/index.ts';
import { useUniversalStore } from '../../shared/universal-store/use-universal-store-manager.ts';

const statusStore = createStatusStore({
  universalStatusStore: UniversalStore.create({
    ...UNIVERSAL_STATUS_STORE_OPTIONS,
    leader: globalThis.CONFIG_TYPE === 'PRODUCTION',
  }),
  useUniversalStore,
  environment: 'manager',
});

export const fullStatusStore: StatusStore & {
  selectStatuses: (statuses: Status[]) => void;
  typeId: undefined;
} = statusStore.fullStatusStore;
export const getStatusStoreByTypeId: (typeId: StatusTypeId) => StatusStoreByTypeId = statusStore.getStatusStoreByTypeId;
export const useStatusStore: UseStatusStore = statusStore.useStatusStore;
export const universalStatusStore: UniversalStore<StatusesByStoryIdAndTypeId, StatusStoreEvent> = statusStore.universalStatusStore;
