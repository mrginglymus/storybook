/// <reference types="node" />
import npmLog from 'npmlog';
import prettyTime from 'pretty-hrtime';

import * as newLogger from './logger/logger.ts';
import { LogMessageOptions } from '@clack/prompts';

export { prompt } from './prompts/index.ts';
export { logTracker } from './logger/log-tracker.ts';
export type { SpinnerInstance, TaskLogInstance } from './prompts/prompt-provider-base.ts';
export { protectUrls, createHyperlink } from './wrap-utils.ts';
export { CLI_COLORS } from './logger/colors.ts';
export { ConsoleLogger, StyledConsoleLogger } from './logger/console.ts';

export type { BoxOptions, LogLevel } from './logger/logger.ts';
export type { LogMessageOptions } from '@clack/prompts';

// The default is stderr, which can cause some tools (like rush.js) to think
// there are issues with the build: https://github.com/storybookjs/storybook/issues/14621
npmLog.stream = process.stdout;

const toNpmLogLevel = (level: newLogger.LogLevel): string => {
  switch (level) {
    case 'trace':
      return 'silly';
    case 'debug':
      return 'verbose';
    default:
      return level;
  }
};

const setLoggerLevel = (level: newLogger.LogLevel = 'info'): void => {
  npmLog.level = toNpmLogLevel(level);
  newLogger.setLogLevel(level);
};

function hex(hexColor: string) {
  // Ensure the hex color is 6 characters long and starts with '#'
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hexColor)) {
    throw new Error('Invalid hex color. It must be a 6-character hex code.');
  }

  // Remove the leading '#' if it exists
  if (hexColor.startsWith('#')) {
    hexColor = hexColor.slice(1);
  }

  // Convert hex to RGB
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Return the ANSI escape sequence for the given RGB color
  return (text: string) => `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
}

/** @deprecated Use CLI_COLORS instead */
export const colors: { pink: (text: string) => string; purple: (text: string) => string; orange: (text: string) => string; green: (text: string) => string; blue: (text: string) => string; red: (text: string) => string; gray: (text: string) => string; } = {
  pink: hex('#F1618C'),
  purple: hex('#B57EE5'),
  orange: hex('#F3AD38'),
  green: hex('#A2E05E'),
  blue: hex('#6DABF5'),
  red: hex('#F16161'),
  gray: hex('#B8C2CC'),
};

export const logger: {
  verbose: (message: string) => void; line: (count?: number) => void;
  /** For non-critical issues or warnings */
  warn: (message: string) => void; trace: ({ message, time }: { message: string; time: [number, number]; }) => void; setLevel: (level?: newLogger.LogLevel) => void; setLogLevel: (level?: newLogger.LogLevel) => void; error: (message: unknown) => void; getLogLevel: () => newLogger.LogLevel; shouldLog: (level: newLogger.LogLevel) => boolean; debug: (message: any) => void; log: (message?: string | string[] | undefined, args_1?: LogMessageOptions | undefined) => void; info: (message: string, opts?: LogMessageOptions | undefined) => void; logBox: (message: string, { title, ...options }?: newLogger.BoxOptions) => void; intro: (message: string) => void; outro: (message: string) => void; step: (message: string) => void; SYMBOLS: {
    success: string;
    error: string;
  }; wrapTextForClack: typeof newLogger.wrapTextForClack;
} = {
  ...newLogger,
  verbose: (message: string): void => newLogger.debug(message),

  line: (count = 1): void => newLogger.log(`${Array(count - 1).fill('\n')}`),
  /** For non-critical issues or warnings */
  warn: (message: string): void => newLogger.warn(message),
  trace: ({ message, time }: { message: string; time: [number, number] }): void =>
    newLogger.debug(`${message} (${colors.purple(prettyTime(time))})`),
  setLevel: setLoggerLevel,
  setLogLevel: setLoggerLevel,
  error: (message: unknown): void => {
    let msg: string;
    if (message instanceof Error && message.stack) {
      msg = message.stack.toString().replace(message.toString(), colors.red(message.toString()));
    } else if (typeof message === 'string') {
      msg = message.toString();
    } else {
      msg = String(message);
    }

    newLogger.error(msg.replaceAll(process.cwd(), '.'));
  },
};

export { npmLog as instance };

const logged = new Set();
export const once: { (type: "verbose" | "info" | "warn" | "error"): (message: string) => void; clear(): void; verbose: (message: string) => void; info: (message: string) => void; warn: (message: string) => void; error: (message: string) => void; } = (type: 'verbose' | 'info' | 'warn' | 'error') => (message: string): void => {
  if (logged.has(message)) {
    return undefined;
  }
  logged.add(message);
  return logger[type](message);
};

once.clear = (): void => logged.clear();
once.verbose = once('verbose');
once.info = once('info');
once.warn = once('warn');
once.error = once('error');

export const deprecate: (message: string) => void = once('warn');
