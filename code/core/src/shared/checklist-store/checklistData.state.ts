import type { StoreState } from './index.ts';

export const initialState: {
  readonly items: {
    readonly accessibilityTests: {
      readonly status: "open";
    };
    readonly aiSetup: {
      readonly status: "open";
    };
    readonly autodocs: {
      readonly status: "open";
    };
    readonly ciTests: {
      readonly status: "open";
    };
    readonly controls: {
      readonly status: "open";
    };
    readonly coverage: {
      readonly status: "open";
    };
    readonly guidedTour: {
      readonly status: "open";
    };
    readonly installA11y: {
      readonly status: "open";
    };
    readonly installChromatic: {
      readonly status: "open";
    };
    readonly installDocs: {
      readonly status: "open";
    };
    readonly installVitest: {
      readonly status: "open";
    };
    readonly mdxDocs: {
      readonly status: "open";
    };
    readonly moreComponents: {
      readonly status: "open";
    };
    readonly moreStories: {
      readonly status: "open";
    };
    readonly onboardingSurvey: {
      readonly status: "open";
    };
    readonly organizeStories: {
      readonly status: "open";
    };
    readonly renderComponent: {
      readonly status: "open";
    };
    readonly runTests: {
      readonly status: "open";
    };
    readonly publishStorybook: {
      readonly status: "open";
    };
    readonly shareStorybook: {
      readonly status: "open";
    };
    readonly viewports: {
      readonly status: "open";
    };
    readonly visualTests: {
      readonly status: "open";
    };
    readonly whatsNewStorybook10: {
      readonly status: "open";
    };
    readonly writeInteractions: {
      readonly status: "open";
    };
  }; readonly widget: {};
} = {
  items: {
    accessibilityTests: { status: 'open' },
    aiSetup: { status: 'open' },
    autodocs: { status: 'open' },
    ciTests: { status: 'open' },
    controls: { status: 'open' },
    coverage: { status: 'open' },
    guidedTour: { status: 'open' },
    installA11y: { status: 'open' },
    installChromatic: { status: 'open' },
    installDocs: { status: 'open' },
    installVitest: { status: 'open' },
    mdxDocs: { status: 'open' },
    moreComponents: { status: 'open' },
    moreStories: { status: 'open' },
    onboardingSurvey: { status: 'open' },
    organizeStories: { status: 'open' },
    renderComponent: { status: 'open' },
    runTests: { status: 'open' },
    publishStorybook: { status: 'open' },
    shareStorybook: { status: 'open' },
    viewports: { status: 'open' },
    visualTests: { status: 'open' },
    whatsNewStorybook10: { status: 'open' },
    writeInteractions: { status: 'open' },
  },
  widget: {},
} as const satisfies StoreState;
