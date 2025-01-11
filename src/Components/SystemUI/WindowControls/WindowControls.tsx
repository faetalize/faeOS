import { useContext } from 'react';
import { runningProcessesContext } from '../../../Contexts/runningProcesses';

import './style.css'
import { ProcessContext } from '../../../Contexts/processContext';

const WindowControls = () => {
    const { removeProcess } = useContext(runningProcessesContext);
    const { id } = useContext(ProcessContext);

    return (
        <div className="window-controls">
            <button className="minimize">
                <span className="material-symbols-outlined">
                    minimize
                </span>
            </button>
            <button className="maximize">
                <span className="material-symbols-outlined">
                    fullscreen
                </span>
            </button>
            <button className="close" onClick={() => removeProcess(id)}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </div>
    )
}

export default WindowControls