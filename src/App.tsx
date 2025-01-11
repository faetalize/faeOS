
import DesktopEnvironment from './Components/Desktop Environment/DesktopEnvironment';
import './App.css';
import { RunningProcessesProvider } from './Contexts/runningProcesses';


function App() {

  return (
    <RunningProcessesProvider>
      <DesktopEnvironment/>
    </RunningProcessesProvider>

  );
}

export default App;