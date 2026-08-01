import { createTestProviderStore, UseTestProviderStore, TestProviderStoreEvent, TestProviderStoreById, TestProviderStateByProviderId, TestProviderId } from '../../shared/test-provider-store/index.ts';
import { UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS } from '../../shared/test-provider-store/index.ts';
import { UniversalStore } from '../../shared/universal-store/index.ts';
import { useUniversalStore } from '../../shared/universal-store/use-universal-store-manager.ts';

const testProviderStore = createTestProviderStore({
  universalTestProviderStore: UniversalStore.create({
    ...UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS,
    leader: globalThis.CONFIG_TYPE === 'PRODUCTION',
  }),
  useUniversalStore,
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
export const useTestProviderStore: UseTestProviderStore = testProviderStore.useTestProviderStore;
export const universalTestProviderStore: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent> = testProviderStore.universalTestProviderStore;
