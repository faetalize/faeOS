
import DesktopEnvironment from './Components/Desktop Environment/DesktopEnvironment';
import './App.css'
import { lazy, Suspense, useCallback, useState } from 'react';

interface App {
  processId: number;
  appName: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  icon?: string;
}


const componentMap: { [key: string]: React.LazyExoticComponent<() => JSX.Element> } = {
  'Browser': lazy(() => import('./Components/Browser/Browser')),
  'Component Playground': lazy(() => import('./Components/Component Playground/ComponentPlayground')),
};


function App() {
  const [openApps, setOpenApps] = useState<App[]>([]);

  const launchApp = (appName: string) => {
    const Component = componentMap[appName];
    setOpenApps(prevApps => [...prevApps, { processId: Date.now(), appName, Component }]);
  }

  return (
    <DesktopEnvironment>
      <button onClick={() => launchApp('Browser')}>Open Browser</button>
      <button onClick={() => launchApp('Component Playground')}>Open Component Playground</button>

      {openApps.map(({ processId: id, Component }) => (
        <Suspense key={id} fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      ))}

    </DesktopEnvironment>
  )
}

export default App