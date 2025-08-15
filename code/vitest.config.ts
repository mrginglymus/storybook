import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'vitest-storybook.config.mts',
      'addons/*',
      'frameworks/*',
      'lib/*',
      'core',
      'builders/*',
      'presets/*',
      'renderers/*',
    ],
    coverage: {
      all: false,
      provider: 'istanbul',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/__mocks/**',
        '**/dist/**',
        'playwright.config.ts',
        'vitest-setup.ts',
        'vitest.helpers.ts',
        '**/*.stories.*',
      ],
    },
  },
});
