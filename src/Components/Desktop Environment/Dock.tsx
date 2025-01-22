import { useContext, forwardRef } from 'react';
import { allAppsContext } from '../../Contexts/allApps';
import styles from './style.module.css';
import { runningProcessesContext } from '../../Contexts/runningProcesses';

interface DockProps {
    onEntryClick: (appName: string) => void,
    activeIndex: number | null,
    thumbs: string[]
}

const Dock = forwardRef<HTMLDivElement, DockProps>(({ onEntryClick, activeIndex, thumbs}: DockProps, ref) => {
    const allApps = useContext(allAppsContext);
    const runningProcesses = useContext(runningProcessesContext);

    const isAppRunning = (appName: string) => {
        return runningProcesses.processes.some(process => process.app.appName === appName);
    };

    const isAppFocused = (appName: string) => {
        return runningProcesses.processes.some(process => process.app.appName === appName && process.id === activeIndex);
    };

    return (
        <div className={styles['dock']} ref={ref}>
            <div className={styles['icon']}>
                <img src="/launchpad.webp" alt="icon" />
            </div>
            {
                allApps?.map((app) => (
                    <div
                        key={app.appName}
                        className={`${styles['icon']} ${isAppRunning(app.appName) ? styles['icon-highlighted'] : ''} ${isAppFocused(app.appName) ? styles['icon-focused'] : ''}`}
                        onClick={() => onEntryClick(app.appName)}
                    >
                        <img src={app.icon} alt={app.appName} />
                        <div className={styles['icon-indicator']}></div>
                    </div>
                ))
            }
            {
                thumbs.map((thumb, index) => (
                    <div key={index} className={styles['icon']}>
                        <img src={thumb} alt="thumb" />
                    </div>
                ))
            }
        </div>
    );
});

export default Dock;