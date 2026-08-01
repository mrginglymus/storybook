import { optionalEnvToBoolean } from '../../common/utils/envs.ts';
import { createTestProviderStore, TestProviderStoreEvent, TestProviderStoreById, TestProviderStateByProviderId, TestProviderId } from '../../shared/test-provider-store/index.ts';
import { UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS } from '../../shared/test-provider-store/index.ts';
import { UniversalStore } from '../../shared/universal-store/index.ts';

const testProviderStore = createTestProviderStore({
  universalTestProviderStore: UniversalStore.create({
    ...UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS,
    /*
            This is a temporary workaround, to ensure that the store is not created in the
            vitest sub-process in addon-vitest, even though it imports from core-server
            If it was created in the sub-process, it would try to connect to the leader in the dev server
            before it was ready.
            This will be fixed when we do the planned UniversalStore v0.2.
          */
    leader: !optionalEnvToBoolean(process.env.VITEST_CHILD_PROCESS),
  }),
});

export const fullTestProviderStore: {
  settingsChanged: () => void;
  onRunAll: (listener: () => void) => () => void;
  onClearAll: (listener: () => void) => () => void;
} & {
  getFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>["getState"];
  setFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>["setState"];
  onSettingsChanged: (listener: (testProviderId: TestProviderId) => void) => () => void;
  runAll: () => void;
  clearAll: () => void;
} = testProviderStore.fullTestProviderStore;
export const getTestProviderStoreById: (testProviderId: TestProviderId) => TestProviderStoreById = testProviderStore.getTestProviderStoreById;
export const universalTestProviderStore: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent> = testProviderStore.universalTestProviderStore;
