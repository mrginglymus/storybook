import process from 'node:process';

import { Channel } from 'storybook/internal/channels';

import { TEST_PROVIDER_ID } from '../constants';
import { TestManager } from './test-manager';

process.env.TEST = 'true';
process.env.VITEST = 'true';
process.env.NODE_ENV ??= 'test';

const channel: Channel = new Channel({
  async: true,
  transport: {
    send: (event) => {
      process.send?.(event);
    },
    setHandler: (handler) => {
      process.on('message', handler);
    },
  },
});

const testManager = new TestManager(channel, {
  onError: (message, error) => {
    process.send?.({ type: 'error', message, error: error.stack ?? error });
  },
  onReady: () => {
    process.send?.({ type: 'ready' });
  },
});

// Enable raw mode to get keystrokes
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

// Listen for keyboard input
process.stdin.on('data', (key) => {
  // Press 'C' to trigger
  if (key === 'c' || key === 'C') {
    console.log('C was pressed, enabling coverage!');
    testManager.handleConfigChange({ config: { coverage: true }, providerId: TEST_PROVIDER_ID });
  }
  if (key === 'v' || key === 'V') {
    console.log('V was pressed, disabling coverage!');
    testManager.handleConfigChange({ config: { coverage: false }, providerId: TEST_PROVIDER_ID });
  }

  // Press ctrl+c to exit
  if (key === '\u0003') {
    process.exit();
  }
});

const exit = (code = 0) => {
  channel?.removeAllListeners();
  process.exit(code);
};

process.on('exit', exit);
process.on('SIGINT', () => exit(0));
process.on('SIGTERM', () => exit(0));

process.on('uncaughtException', (err) => {
  process.send?.({ type: 'error', message: 'Uncaught exception', error: err.stack });
  exit(1);
});

process.on('unhandledRejection', (reason) => {
  process.send?.({ type: 'error', message: 'Unhandled rejection', error: String(reason) });
  exit(1);
});
