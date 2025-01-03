import Browser from './Components/Browser/Browser';
import DesktopEnvironment from './Components/Desktop Environment/DesktopEnvironment';

function App() {
  return (
    <>
      <DesktopEnvironment>
        <Browser></Browser>
        <Browser></Browser>
        <Browser></Browser>
      </DesktopEnvironment>
    </>
  )
}

export default App