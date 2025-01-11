import React from 'react';

export default interface Application {
  appName: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  icon?: string;
  settings:{
    fullHeight: boolean;
    csd: boolean;
  }
}
