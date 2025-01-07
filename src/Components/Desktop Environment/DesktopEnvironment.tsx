import { ReactNode, useState, useEffect, useRef } from 'react';
import './style.css';
import Toolbar from './Toolbar';
import Dock from './Dock';

interface DEProps {
    children?: ReactNode
}

const DesktopEnvironment = ({ children }: DEProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const desktopEnvironment = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeIndex !== null && desktopEnvironment.current) {
            const windows = desktopEnvironment.current.querySelectorAll('.window');
            windows.forEach((window, index) => {
                window.classList.toggle('active', index === activeIndex);
            });
        }
    }, [activeIndex])

    const handleMouseDown = (event: React.MouseEvent|React.TouchEvent) => {
        const windows = desktopEnvironment.current!.querySelectorAll('.window');
        windows?.forEach((window, index) => {
            if (window.contains(event.target as HTMLDivElement)) {
                setActiveIndex(index);
            }
        });
    }

    return (
        <div className="desktop-environment" onTouchStartCapture={handleMouseDown} onMouseDownCapture={handleMouseDown} ref={desktopEnvironment}>
            <Toolbar />
            <div className="de-window-container">
                {children}
            </div>
            <Dock />
        </div>
    );
}

export default DesktopEnvironment;