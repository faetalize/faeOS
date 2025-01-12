import { useContext, forwardRef } from 'react';
import { allAppsContext } from '../../Contexts/allApps';
import styles from './style.module.css';
import { runningProcessesContext } from '../../Contexts/runningProcesses';


interface DockProps {
    onEntryClick: (appName: string) => void,
    activeIndex: number | null
}


const Dock = forwardRef<HTMLDivElement,DockProps>(({ onEntryClick, activeIndex }: DockProps, ref) => {
    const allApps = useContext(allAppsContext);
    const runningProcesses = useContext(runningProcessesContext);

    return (
        <div className={styles['dock']} ref={ref}>
            <div className={styles['icon']}>
                <img src="/launchpad.webp" alt="icon" />
            </div>
            {
                allApps?.map(app => (
                    <div key={app.appName} className={styles['icon']} onClick={() => onEntryClick(app.appName)}>
                        <img src={app.icon} alt={app.appName} />
                    </div>
                ))
            }
            {
                runningProcesses.processes?.map(process => (
                    <div key={process.id} className={`${styles['icon']} ${activeIndex === process.id ? styles['icon-highlighted'] : "" }`}>
                        <img src={process.app.icon} alt={process.app.appName} />
                    </div>
                ))
            }
        </div>
    )
});

export default Dock;