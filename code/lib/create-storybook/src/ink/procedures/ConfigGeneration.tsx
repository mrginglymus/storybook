import React, { useEffect, useState } from 'react';

import { Box, Text } from 'ink';

import type { State } from '../Main';

export function ConfigGeneration({ state, onComplete }: { state: State; onComplete: () => void }) {
  const [line, setLine] = useState<string>('');

  useEffect(() => {
    // do work to install dependencies
    const interval = setInterval(() => {
      setLine((l) => l + '.');
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 1000);
  }, []);

  return (
    <Box height={1} overflow="hidden">
      <Text>- Generating config files {line === '' ? '...' : line}</Text>
    </Box>
  );
}
