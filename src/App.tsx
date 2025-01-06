import Browser from './Components/Browser/Browser';
import Window from './Components/Window/Window'
import DesktopEnvironment from './Components/Desktop Environment/DesktopEnvironment';

function App() {
  return (
    <>
      <DesktopEnvironment>
        <Browser></Browser>
        <Browser></Browser>
        <Browser></Browser>
        <Window useClientsideDecorations={true} title="Empty Window"></Window>
      </DesktopEnvironment>
    </>
  )
}

export default App