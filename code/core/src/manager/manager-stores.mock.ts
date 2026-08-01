import {
  experimental_MockUniversalStore,
  experimental_useUniversalStore,
} from 'storybook/manager-api';
import * as testUtils from 'storybook/test';

import {
  ItemId,
  type StoreEvent,
  type StoreState,
  UNIVERSAL_CHECKLIST_STORE_OPTIONS,
  createChecklistStore,
} from '../shared/checklist-store/index.ts';
import {
  StatusStoreByTypeId,
  StatusStore,
  Status,
  type StatusStoreEvent,
  StatusTypeId,
  type StatusesByStoryIdAndTypeId,
  UseStatusStore,
  createStatusStore,
} from '../shared/status-store/index.ts';
import { UNIVERSAL_STATUS_STORE_OPTIONS } from '../shared/status-store/index.ts';
import type {
  TestProviderId,
  TestProviderStateByProviderId,
  TestProviderStoreById,
  TestProviderStoreEvent
  UseTestProviderStore,,
} from '../shared/test-provider-store/index.ts';
import { UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS } from '../shared/test-provider-store/index.ts';
import { createTestProviderStore } from '../shared/test-provider-store/index.ts';
import type { UniversalStore } from '../shared/universal-store/index.ts';

const dest = createStatusStore({
  universalStatusStore: new experimental_MockUniversalStore(
    UNIVERSAL_STATUS_STORE_OPTIONS,
    testUtils
  ) as unknown as UniversalStore<StatusesByStoryIdAndTypeId, StatusStoreEvent>,
  useUniversalStore: experimental_useUniversalStore,
  environment: 'manager',
});
export const internal_fullStatusStore: StatusStore & {
  selectStatuses: (statuses: Status[]) => void;
  typeId: undefined;
} = dest.fullStatusStore;
export const experimental_getStatusStore: (typeId: StatusTypeId) => StatusStoreByTypeId = dest.getStatusStoreByTypeId;
export const experimental_useStatusStore: UseStatusStore = dest.useStatusStore;

const dest = createTestProviderStore({
  universalTestProviderStore: new experimental_MockUniversalStore(
    UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS,
    testUtils
  ) as unknown as UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>,
  useUniversalStore: experimental_useUniversalStore,
});
export const internal_fullTestProviderStore: {
  settingsChanged: () => void;
  onRunAll: (listener: () => void) => () => void;
  onClearAll: (listener: () => void) => () => void;
} & {
  getFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>["getState"];
  setFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>["setState"];
  onSettingsChanged: (listener: (testProviderId: TestProviderId) => void) => () => void;
  runAll: () => void;
  clearAll: () => void;
} = dest.fullTestProviderStore;
export const experimental_getTestProviderStore: (testProviderId: TestProviderId) => TestProviderStoreById = dest.getTestProviderStoreById;
export const experimental_useTestProviderStore: UseTestProviderStore = dest.useTestProviderStore;

export const internal_universalChecklistStore = new experimental_MockUniversalStore<
  StoreState,
  StoreEvent
>(
  {
    ...UNIVERSAL_CHECKLIST_STORE_OPTIONS,
    leader: globalThis.CONFIG_TYPE === 'PRODUCTION',
  },
  testUtils
) as unknown as UniversalStore<StoreState, StoreEvent>;

export const internal_checklistStore: {
  getValue: (id: ItemId) => {
    status?: "open" | "accepted" | "done" | "skipped" | undefined;
    mutedAt?: number | undefined;
  }; accept: (id: ItemId) => void; done: (id: ItemId) => void; skip: (id: ItemId) => void; reset: (id: ItemId) => void; mute: (itemIds: Array<ItemId>) => void; disable: (value: boolean) => void;
} = createChecklistStore(internal_universalChecklistStore);
