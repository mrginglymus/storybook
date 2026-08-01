import { optionalEnvToBoolean } from '../../common/utils/envs.ts';
import { createStatusStore, StatusTypeId, StatusStoreEvent, StatusStoreByTypeId, StatusStore, StatusesByStoryIdAndTypeId, Status } from '../../shared/status-store/index.ts';
import { UNIVERSAL_STATUS_STORE_OPTIONS } from '../../shared/status-store/index.ts';
import { UniversalStore } from '../../shared/universal-store/index.ts';

const statusStore = createStatusStore({
  universalStatusStore: UniversalStore.create({
    ...UNIVERSAL_STATUS_STORE_OPTIONS,
    /*
      This is a temporary workaround, to ensure that the store is not created in the
      vitest sub-process in addon-vitest, even though it imports from core-server
      If it was created in the sub-process, it would try to connect to the leader in the dev server
      before it was ready.
      This will be fixed when we do the planned UniversalStore v0.2.
    */
    leader: !optionalEnvToBoolean(process.env.VITEST_CHILD_PROCESS),
  }),
  environment: 'server',
});

export const fullStatusStore: StatusStore & {
  selectStatuses: (statuses: Status[]) => void;
  typeId: undefined;
} = statusStore.fullStatusStore;
export const getStatusStoreByTypeId: (typeId: StatusTypeId) => StatusStoreByTypeId = statusStore.getStatusStoreByTypeId;
export const universalStatusStore: UniversalStore<StatusesByStoryIdAndTypeId, StatusStoreEvent> = statusStore.universalStatusStore;
