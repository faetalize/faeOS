import { createContext, lazy } from "react";
import Application from '../Models/Application';


const allApps: Application[] = [
  {
    appName: 'Browser',
    Component: lazy(() => import('../Components/Browser/Browser')),
    icon: '/safari.avif',
    settings: {
      fullHeight: true,
      csd: true
    }
  },
  {
    appName: 'Component Playground',
    Component: lazy(() => import('../Components/Component Playground/ComponentPlayground')),
    icon: '/appledeveloper.avif',
    settings: {
      fullHeight: true,
      csd: true
    }
  },
];

export const allAppsContext = createContext(allApps);