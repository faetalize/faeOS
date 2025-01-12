import { useState, useEffect, useRef, useContext, Suspense } from 'react';
import styles from './style.module.css';
import Toolbar from './Toolbar';
import Dock from './Dock';
import { allAppsContext } from '../../Contexts/allApps';
import { runningProcessesContext } from '../../Contexts/runningProcesses';
import { ProcessProvider } from '../../Contexts/processContext';
import Window from '../Window/Window';

const DesktopEnvironment = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [dockVisible, setDockVisible] = useState(true);
    const { processes, addProcess } = useContext(runningProcessesContext);
    const allApps = useContext(allAppsContext);
    const desktopEnvironment = useRef<HTMLDivElement>(null);
    const dockRef = useRef<HTMLDivElement>(null);


    const openProcess = (appName: string) => {
        const app = allApps.find(app => app.appName === appName);
        if (!app) return;
        addProcess(app);
    };

    // when a new window is added, set it as active
    useEffect(() => {
        setActiveIndex(processes[processes.length - 1]?.id);
        return () => {
            setActiveIndex(null);
        };
    }, [processes]);

    return (
        <div className={styles["desktop-environment"]} ref={desktopEnvironment}>
            <Toolbar />
            <div className={styles["de-window-container"]}>
                {processes.map(process => (
                    <Suspense key={process.id} fallback={<div>Loading...</div>}>
                        <ProcessProvider id={process.id}>
                            <Window onFocused={() => setActiveIndex(process.id)} fullHeightContent={process.app.settings.fullHeight} title={process.app.appName} useClientsideDecorations={process.app.settings.csd} active={process.id == activeIndex}  >
                                <process.app.Component ></process.app.Component>
                            </Window>
                        </ProcessProvider>
                    </Suspense>
                ))}
            </div>
            {dockVisible && <Dock ref={dockRef} activeIndex={activeIndex} onEntryClick={openProcess} />}
        </div>
    );
}

export default DesktopEnvironment;