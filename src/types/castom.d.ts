///<reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

  export = ReactComponent;
}

declare module '*.png' {
  const path: string;
  export default path;
}