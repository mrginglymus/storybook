import * as React from 'react';

import { addons, types } from 'storybook/manager-api';

import { ViewportTool } from './components/Tool.tsx';
import { ADDON_ID, TOOL_ID } from './constants.ts';

const registration: void = addons.register(ADDON_ID, () => {
  if (globalThis?.FEATURES?.viewport) {
    addons.add(TOOL_ID, {
      title: 'viewport / media-queries',
      type: types.TOOL,
      match: ({ viewMode, tabId }) => viewMode === 'story' && !tabId,
      render: () => <ViewportTool />,
    });
  }
});

export default registration;
