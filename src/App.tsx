import Browser from './Components/Browser/Browser';
import DesktopEnvironment from './Components/Desktop Environment/DesktopEnvironment';
import ComponentPlayground from './Components/Component Playground/ComponentPlayground';
import 'overlayscrollbars/overlayscrollbars.css';

function App() {
  return (
    <>
      <DesktopEnvironment>
        <Browser></Browser>
        <ComponentPlayground></ComponentPlayground>
      </DesktopEnvironment>
    </>
  )
}

export default App