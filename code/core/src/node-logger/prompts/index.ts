import { ResultPromise } from 'execa';
import { executeTask, executeTaskWithSpinner } from '../tasks.ts';
import * as promptConfig from './prompt-config.ts';
import * as promptFunctions from './prompt-functions.ts';
import { PromptProvider, SpinnerOptions } from './prompt-provider-base.ts';

export const prompt: {
  executeTask: (childProcessFactories: ((signal?: AbortSignal) => ResultPromise) | ((signal?: AbortSignal) => ResultPromise)[], { intro, error, success, abortable, }: {
    intro: string;
    error: string;
    success: string;
    abortable?: boolean;
  }) => Promise<"aborted" | void>; executeTaskWithSpinner: (childProcessFactories: ((signal?: AbortSignal) => ResultPromise) | ((signal?: AbortSignal) => ResultPromise)[], { id, intro, error, success, abortable, }: {
    id: string;
    intro: string;
    error: string;
    success: string;
    abortable?: boolean;
  }) => Promise<"aborted" | void>; setPromptLibrary: (library: "clack") => void; getPromptLibrary: () => "clack"; getPromptProvider: () => PromptProvider; isClackEnabled: () => boolean; getPreferredStdio: () => "inherit" | "pipe"; text: (options: promptFunctions.TextPromptOptions, promptOptions?: promptFunctions.PromptOptions) => Promise<string>; confirm: (options: promptFunctions.ConfirmPromptOptions, promptOptions?: promptFunctions.PromptOptions) => Promise<boolean>; select: <T>(options: promptFunctions.SelectPromptOptions<T>, promptOptions?: promptFunctions.PromptOptions) => Promise<T>; multiselect: <T>(options: promptFunctions.MultiSelectPromptOptions<T>, promptOptions?: promptFunctions.PromptOptions) => Promise<T[]>; spinner: (options: SpinnerOptions) => promptFunctions.SpinnerInstance; taskLog: (options: promptFunctions.TaskLogOptions) => promptFunctions.TaskLogInstance;
} = {
  ...promptFunctions,
  ...promptConfig,
  executeTask,
  executeTaskWithSpinner,
};
