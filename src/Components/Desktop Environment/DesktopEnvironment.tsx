import { ReactNode, useState, useEffect, useRef } from 'react';
import styles from './style.module.css';
import Toolbar from './Toolbar';
import Dock from './Dock';

interface DEProps {
    children?: ReactNode
}

const DesktopEnvironment = ({ children }: DEProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const desktopEnvironment = useRef<HTMLDivElement>(null);

    const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
        const windows = desktopEnvironment.current!.querySelectorAll('.window');
        windows?.forEach((window, index) => {
            if (window.contains(event.target as HTMLDivElement)) {
                setActiveIndex(index);
            }
        });
    }

    useEffect(() => {
        if (activeIndex !== null && desktopEnvironment.current) {
            const windows = desktopEnvironment.current.querySelectorAll('.window');
            windows.forEach((window, index) => {
                window.classList.toggle("active", index === activeIndex);
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (desktopEnvironment.current) {
                const windows = desktopEnvironment.current.querySelectorAll('.window');
                if (windows.length > 0) {
                    setActiveIndex(windows.length - 1);
                }
            }
        });
    
        if (desktopEnvironment.current) {
            observer.observe(desktopEnvironment.current, { childList: true, subtree: true });
        }
    
        // Initial check
        if (desktopEnvironment.current) {
            const windows = desktopEnvironment.current.querySelectorAll('.window');
            if (windows.length > 0) {
                setActiveIndex(windows.length - 1);
            }
        }
    
        return () => {
            observer.disconnect();
        };
    }, [children]);

    return (
        <div className={styles["desktop-environment"]} onTouchStartCapture={handleMouseDown} onMouseDownCapture={handleMouseDown} ref={desktopEnvironment}>
            <Toolbar />
            <div className={styles["de-window-container"]}>
                {children}
            </div>
            <Dock />
        </div>
    );
}

export default DesktopEnvironment;