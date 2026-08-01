import * as domTestingLibrary from '@testing-library/dom';
import type { FireFunction, FireObject } from '@testing-library/dom/types/events';
import * as _userEvent from '@testing-library/user-event';

import { once } from 'storybook/internal/client-logger';
import { instrument } from 'storybook/internal/instrumenter';

import { dedent } from 'ts-dedent';
import type { Writable } from 'type-fest';

import type { Promisify, PromisifyObject } from './utils.ts';
import { clear, click, copy, cut, dblClick, deselectOptions, hover, keyboard, pointer, paste, selectOptions, tripleClick, type, unhover, upload, tab } from "@testing-library/user-event/dist/cjs/setup/directApi.js";
import { setupMain } from "@testing-library/user-event/dist/cjs/setup/setup.js";

type TestingLibraryDom = typeof domTestingLibrary;

const testingLibrary = instrument(
  { ...domTestingLibrary },
  {
    getKeys: (obj) => Object.keys(obj).filter((key) => key !== 'eventWrapper'),
    intercept: (method, path) =>
      path[0] === 'fireEvent' || method.startsWith('find') || method.startsWith('waitFor'),
  }
) as {} as Writable<Omit<TestingLibraryDom, 'fireEvent'>> & {
  fireEvent: Promisify<FireFunction> & PromisifyObject<FireObject>;
};

testingLibrary.screen = new Proxy(testingLibrary.screen, {
  get(target, prop, receiver) {
    if (typeof window !== 'undefined' && globalThis.location?.href?.includes('viewMode=docs')) {
      once.warn(dedent`
        You are using Testing Library's \`screen\` object while the story is rendered in docs mode. This will likely lead to issues, as multiple stories are rendered in the same page and therefore screen will potentially find multiple elements. Use the \`canvas\` utility from the story context instead, which will scope the queries to each story's canvas.

        More info: https://storybook.js.org/docs/writing-tests/interaction-testing?ref=error#querying-the-canvas
      `);
    }
    return Reflect.get(target, prop, receiver);
  },
});

export const buildQueries: typeof domTestingLibrary.buildQueries =
  testingLibrary.buildQueries;
export const configure: typeof domTestingLibrary.configure =
  testingLibrary.configure;
export const createEvent: domTestingLibrary.CreateObject &
  domTestingLibrary.CreateFunction = testingLibrary.createEvent;
export const fireEvent: (<T>(
  element: Element | Document | Node | Window,
  event: Event,
) => Promise<false> | Promise<true>) &
  PromisifyObject<domTestingLibrary.FireObject> = testingLibrary.fireEvent;
export const findAllByAltText: typeof domTestingLibrary.findAllByAltText =
  testingLibrary.findAllByAltText;
export const findAllByDisplayValue: typeof domTestingLibrary.findAllByDisplayValue =
  testingLibrary.findAllByDisplayValue;
export const findAllByLabelText: typeof domTestingLibrary.findAllByLabelText =
  testingLibrary.findAllByLabelText;
export const findAllByPlaceholderText: typeof domTestingLibrary.findAllByPlaceholderText =
  testingLibrary.findAllByPlaceholderText;
export const findAllByRole: typeof domTestingLibrary.findAllByRole =
  testingLibrary.findAllByRole;
export const findAllByTestId: typeof domTestingLibrary.findAllByTestId =
  testingLibrary.findAllByTestId;
export const findAllByText: typeof domTestingLibrary.findAllByText =
  testingLibrary.findAllByText;
export const findAllByTitle: typeof domTestingLibrary.findAllByTitle =
  testingLibrary.findAllByTitle;
export const findByAltText: typeof domTestingLibrary.findByAltText =
  testingLibrary.findByAltText;
export const findByDisplayValue: typeof domTestingLibrary.findByDisplayValue =
  testingLibrary.findByDisplayValue;
export const findByLabelText: typeof domTestingLibrary.findByLabelText =
  testingLibrary.findByLabelText;
export const findByPlaceholderText: typeof domTestingLibrary.findByPlaceholderText =
  testingLibrary.findByPlaceholderText;
export const findByRole: typeof domTestingLibrary.findByRole =
  testingLibrary.findByRole;
export const findByTestId: typeof domTestingLibrary.findByTestId =
  testingLibrary.findByTestId;
export const findByText: typeof domTestingLibrary.findByText =
  testingLibrary.findByText;
export const findByTitle: typeof domTestingLibrary.findByTitle =
  testingLibrary.findByTitle;
export const getAllByAltText: typeof domTestingLibrary.getAllByAltText =
  testingLibrary.getAllByAltText;
export const getAllByDisplayValue: typeof domTestingLibrary.getAllByDisplayValue =
  testingLibrary.getAllByDisplayValue;
export const getAllByLabelText: typeof domTestingLibrary.getAllByLabelText =
  testingLibrary.getAllByLabelText;
export const getAllByPlaceholderText: typeof domTestingLibrary.getAllByPlaceholderText =
  testingLibrary.getAllByPlaceholderText;
export const getAllByRole: typeof domTestingLibrary.getAllByRole =
  testingLibrary.getAllByRole;
export const getAllByTestId: typeof domTestingLibrary.getAllByTestId =
  testingLibrary.getAllByTestId;
export const getAllByText: typeof domTestingLibrary.getAllByText =
  testingLibrary.getAllByText;
export const getAllByTitle: typeof domTestingLibrary.getAllByTitle =
  testingLibrary.getAllByTitle;
export const getByAltText: typeof domTestingLibrary.getByAltText =
  testingLibrary.getByAltText;
export const getByDisplayValue: typeof domTestingLibrary.getByDisplayValue =
  testingLibrary.getByDisplayValue;
export const getByLabelText: typeof domTestingLibrary.getByLabelText =
  testingLibrary.getByLabelText;
export const getByPlaceholderText: typeof domTestingLibrary.getByPlaceholderText =
  testingLibrary.getByPlaceholderText;
export const getByRole: typeof domTestingLibrary.getByRole =
  testingLibrary.getByRole;
export const getByTestId: typeof domTestingLibrary.getByTestId =
  testingLibrary.getByTestId;
export const getByText: typeof domTestingLibrary.getByText =
  testingLibrary.getByText;
export const getByTitle: typeof domTestingLibrary.getByTitle =
  testingLibrary.getByTitle;
export const getConfig: typeof domTestingLibrary.getConfig =
  testingLibrary.getConfig;
export const getDefaultNormalizer: typeof domTestingLibrary.getDefaultNormalizer =
  testingLibrary.getDefaultNormalizer;
export const getElementError: typeof domTestingLibrary.getElementError =
  testingLibrary.getElementError;
export const getNodeText: typeof domTestingLibrary.getNodeText =
  testingLibrary.getNodeText;
export const getQueriesForElement: typeof domTestingLibrary.getQueriesForElement =
  testingLibrary.getQueriesForElement;
export const getRoles: typeof domTestingLibrary.getRoles =
  testingLibrary.getRoles;
export const getSuggestedQuery: typeof domTestingLibrary.getSuggestedQuery =
  testingLibrary.getSuggestedQuery;
export const isInaccessible: typeof domTestingLibrary.isInaccessible =
  testingLibrary.isInaccessible;
export const logDOM: typeof domTestingLibrary.logDOM = testingLibrary.logDOM;
export const logRoles: typeof domTestingLibrary.logRoles =
  testingLibrary.logRoles;
export const prettyDOM: typeof domTestingLibrary.prettyDOM =
  testingLibrary.prettyDOM;
export const queries: typeof domTestingLibrary.queries = testingLibrary.queries;
export const queryAllByAltText: typeof domTestingLibrary.queryAllByAltText =
  testingLibrary.queryAllByAltText;
export const queryAllByAttribute: domTestingLibrary.AllByAttribute =
  testingLibrary.queryAllByAttribute;
export const queryAllByDisplayValue: typeof domTestingLibrary.queryAllByDisplayValue =
  testingLibrary.queryAllByDisplayValue;
export const queryAllByLabelText: typeof domTestingLibrary.queryAllByLabelText =
  testingLibrary.queryAllByLabelText;
export const queryAllByPlaceholderText: typeof domTestingLibrary.queryAllByPlaceholderText =
  testingLibrary.queryAllByPlaceholderText;
export const queryAllByRole: typeof domTestingLibrary.queryAllByRole =
  testingLibrary.queryAllByRole;
export const queryAllByTestId: typeof domTestingLibrary.queryAllByTestId =
  testingLibrary.queryAllByTestId;
export const queryAllByText: typeof domTestingLibrary.queryAllByText =
  testingLibrary.queryAllByText;
export const queryAllByTitle: typeof domTestingLibrary.queryAllByTitle =
  testingLibrary.queryAllByTitle;
export const queryByAltText: typeof domTestingLibrary.queryByAltText =
  testingLibrary.queryByAltText;
export const queryByAttribute: domTestingLibrary.QueryByAttribute =
  testingLibrary.queryByAttribute;
export const queryByDisplayValue: typeof domTestingLibrary.queryByDisplayValue =
  testingLibrary.queryByDisplayValue;
export const queryByLabelText: typeof domTestingLibrary.queryByLabelText =
  testingLibrary.queryByLabelText;
export const queryByPlaceholderText: typeof domTestingLibrary.queryByPlaceholderText =
  testingLibrary.queryByPlaceholderText;
export const queryByRole: typeof domTestingLibrary.queryByRole =
  testingLibrary.queryByRole;
export const queryByTestId: typeof domTestingLibrary.queryByTestId =
  testingLibrary.queryByTestId;
export const queryByText: typeof domTestingLibrary.queryByText =
  testingLibrary.queryByText;
export const queryByTitle: typeof domTestingLibrary.queryByTitle =
  testingLibrary.queryByTitle;
export const queryHelpers: typeof domTestingLibrary.queryHelpers =
  testingLibrary.queryHelpers;
export const screen: domTestingLibrary.Screen<
  typeof domTestingLibrary.queries
> = testingLibrary.screen;
export const waitFor: typeof domTestingLibrary.waitFor = testingLibrary.waitFor;
export const waitForElementToBeRemoved: typeof domTestingLibrary.waitForElementToBeRemoved =
  testingLibrary.waitForElementToBeRemoved;
export const within: typeof domTestingLibrary.getQueriesForElement =
  testingLibrary.within;
export const prettyFormat: typeof domTestingLibrary.prettyFormat =
  testingLibrary.prettyFormat;


export const uninstrumentedUserEvent: typeof _userEvent.userEvent =
  _userEvent.userEvent;

const dest = instrument(
  { userEvent: _userEvent.userEvent },
  { intercept: true, getKeys: (obj) => Object.keys(obj).filter((key) => key !== 'eventWrapper') }
);
export const userEvent: {
  readonly setup: typeof setupMain;
  readonly clear: typeof clear;
  readonly click: typeof click;
  readonly copy: typeof copy;
  readonly cut: typeof cut;
  readonly dblClick: typeof dblClick;
  readonly deselectOptions: typeof deselectOptions;
  readonly hover: typeof hover;
  readonly keyboard: typeof keyboard;
  readonly pointer: typeof pointer;
  readonly paste: typeof paste;
  readonly selectOptions: typeof selectOptions;
  readonly tripleClick: typeof tripleClick;
  readonly type: typeof type;
  readonly unhover: typeof unhover;
  readonly upload: typeof upload;
  readonly tab: typeof tab;
} = dest.userEvent;
