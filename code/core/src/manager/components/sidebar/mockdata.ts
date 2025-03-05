import type { API_HashEntry } from 'storybook/internal/types';

export type MockDataSet = Record<string, Record<string, Partial<API_HashEntry>>>;

export const mockDataset: MockDataSet = {
  withRoot: {
    'group-1': {
      type: 'group',
      children: ['group-1--child-b1', 'group-1--child-b2'],
      depth: 0,
      id: 'group-1',
      name: 'Group 1',
    },
    'group-1--child-b1': {
      type: 'story',
      prepared: true,
      id: 'group-1--child-b1',
      depth: 1,
      name: 'Child B1',
      parent: 'group-1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'group-1--child-b2': {
      type: 'story',
      prepared: true,
      id: 'group-1--child-b2',
      depth: 1,
      name: 'Child B2',
      parent: 'group-1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-1': {
      type: 'root',
      children: ['root-1-child-a1', 'root-1-child-a2'],
      depth: 0,
      id: 'root-1',
      name: 'Root 1',
    },
    'root-1-child-a1': {
      type: 'component',
      id: 'root-1-child-a1',
      parent: 'root-1',
      depth: 1,
      name: 'Child A1',
      children: [],
    },
    'root-1-child-a2': {
      type: 'component',
      id: 'root-1-child-a2',
      parent: 'root-1',
      name: 'Child A2',
      depth: 1,
      children: ['root-1-child-a2--grandchild-a1-1', 'root-1-child-a2--grandchild-a1-2'],
    },
    'root-1-child-a2--grandchild-a1-1': {
      type: 'story',
      prepared: true,
      id: 'root-1-child-a2--grandchild-a1-1',
      parent: 'root-1-child-a2',
      depth: 2,
      name: 'GrandChild A1.1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-1-child-a2--grandchild-a1-2': {
      type: 'story',
      prepared: true,
      id: 'root-1-child-a2--grandchild-a1-2',
      parent: 'root-1-child-a2',
      depth: 2,
      name: 'GrandChild A1.2',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-3': {
      type: 'root',
      children: ['root-3--child-a1', 'root-3-child-a2'],
      depth: 0,
      id: 'root-3',
      name: 'Root 3',
    },
    'root-3--child-a1': {
      type: 'story',
      prepared: true,
      id: 'root-3--child-a1',
      depth: 1,
      name: 'Child A1',
      parent: 'root-3',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-3-child-a2': {
      type: 'component',
      id: 'root-3-child-a2',
      name: 'Child A2',
      depth: 1,
      children: ['root-3-child-a2--grandchild-a1-1', 'root-3-child-a2--grandchild-a1-2'],
      parent: 'root-3',
    },
    'root-3-child-a2--grandchild-a1-1': {
      type: 'story',
      prepared: true,
      id: 'root-3-child-a2--grandchild-a1-1',
      depth: 2,
      name: 'GrandChild A1.1',
      parent: 'root-3-child-a2',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-3-child-a2--grandchild-a1-2': {
      type: 'story',
      prepared: true,
      id: 'root-3-child-a2--grandchild-a1-2',
      depth: 2,
      name: 'GrandChild A1.2',
      parent: 'root-3-child-a2',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
  },
  noRoot: {
    'root-1': {
      children: ['root-1-child-a1', 'root-1-child-a2'],
      type: 'group',
      depth: 0,
      id: 'root-1',
      name: 'Parent A',
    },
    'group-1': {
      children: ['group-1--child-b1', 'group-1--child-b2'],
      type: 'component',
      depth: 0,
      id: 'group-1',
      name: 'Parent B',
    },
    'root-1-child-a1': {
      id: 'root-1-child-a1',
      depth: 1,
      name: 'Child A1',
      type: 'story',
      prepared: true,
      parent: 'root-1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-1-child-a2--grandchild-a1-1': {
      id: 'root-1-child-a2--grandchild-a1-1',
      depth: 2,
      name: 'GrandChild A1.1',
      type: 'story',
      prepared: true,
      parent: 'root-1-child-a2',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-1-child-a2--grandchild-a1-2': {
      id: 'root-1-child-a2--grandchild-a1-2',
      depth: 2,
      name: 'GrandChild A1.2',
      type: 'story',
      prepared: true,
      parent: 'root-1-child-a2',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'root-1-child-a2': {
      id: 'root-1-child-a2',
      name: 'Child A2',
      depth: 1,
      children: ['root-1-child-a2--grandchild-a1-1', 'root-1-child-a2--grandchild-a1-2'],
      type: 'component',
      parent: 'root-1',
    },
    'group-1--child-b1': {
      id: 'group-1--child-b1',
      depth: 1,
      name: 'Child B1',
      type: 'story',
      prepared: true,
      parent: 'group-1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
    'group-1--child-b2': {
      id: 'group-1--child-b2',
      depth: 1,
      name: 'Child B2',
      type: 'story',
      prepared: true,
      parent: 'group-1',
      title: '',
      args: {},
      initialArgs: {},
      importPath: './importPath.js',
    },
  },
};

export const mockSelected = {
  withRoot: {
    'root-1': false,
    'group-1': false,
    'root-1-child-a1': false,
    'root-1-child-a2--grandchild-a1-1': false,
    'root-1-child-a2--grandchild-a1-2': false,
    'root-1-child-a2': false,
    'group-1--child-b1': false,
    'group-1--child-b2': false,
    'root-3': false,
    'root-3--child-a1': false,
    'root-3-child-a2': false,
    'root-3-child-a2--grandchild-a1-1': false,
    'root-3-child-a2--grandchild-a1-2': false,
  },
  noRoot: {
    'root-1': false,
    'group-1': false,
    'root-1-child-a1': false,
    'root-1-child-a2--grandchild-a1-1': false,
    'root-1-child-a2--grandchild-a1-2': false,
    'root-1-child-a2': false,
    'group-1--child-b1': false,
    'group-1--child-b2': false,
  },
};

export const mockExpanded = {
  withRoot: {
    'root-1': true,
    'group-1': false,
    'root-1-child-a1': true,
    'root-1-child-a2--grandchild-a1-1': false,
    'root-1-child-a2--grandchild-a1-2': false,
    'root-1-child-a2': false,
    'group-1--child-b1': false,
    'group-1--child-b2': false,
    'root-3': false,
    'root-3--child-a1': false,
    'root-3-child-a2': false,
    'root-3-child-a2--grandchild-a1-1': false,
    'root-3-child-a2--grandchild-a1-2': false,
  },
  noRoot: {
    'root-1': true,
    'group-1': false,
    'root-1-child-a1': true,
    'root-1-child-a2--grandchild-a1-1': false,
    'root-1-child-a2--grandchild-a1-2': false,
    'root-1-child-a2': false,
    'group-1--child-b1': false,
    'group-1--child-b2': false,
  },
  noRootSecond: {
    'root-1': true,
    'group-1': false,
    'root-1-child-a1': true,
    'root-1-child-a2--grandchild-a1-1': true,
    'root-1-child-a2--grandchild-a1-2': true,
    'root-1-child-a2': true,
    'group-1--child-b1': false,
    'group-1--child-b2': false,
  },
};
