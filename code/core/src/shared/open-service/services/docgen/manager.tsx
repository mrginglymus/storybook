import { addons } from 'storybook/manager-api';

import { registerService } from '../../manager.ts';
import { docgenServiceDef } from './definition.ts';

const ADDON_ID = 'core/docgen';

const registration: void = addons.register(ADDON_ID, () => {
  if (globalThis.FEATURES?.experimentalDocgenServer) {
    registerService(docgenServiceDef);
  }
});

export default registration;
