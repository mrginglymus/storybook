import React from 'react';

import { addons, types } from 'storybook/manager-api';

import { Tool } from './Tool.tsx';
import { ADDON_ID, TOOL_ID } from './constants.ts';

const registration: void = addons.register(ADDON_ID, () => {
  if (globalThis?.FEATURES?.measure) {
    addons.add(TOOL_ID, {
      type: types.TOOL,
      title: 'Measure',
      match: ({ viewMode, tabId }) => viewMode === 'story' && !tabId,
      render: () => <Tool />,
    });
  }
});

export default registration;
