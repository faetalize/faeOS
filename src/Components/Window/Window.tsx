import { ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'
import Titlebar from './Titlebar';

const Window = ({ children, useClientSideDecorations }: { children: ReactNode, useClientSideDecorations: boolean }) => {
    const [csd] = useState(useClientSideDecorations);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const offset = useRef({ x: 0, y: 0 });
    const window = useRef<HTMLDivElement>(null);


    function handleMouseDown(e: React.MouseEvent) {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
            });
        }
    };

    function handleMouseUp() {
        setIsDragging(false);
    }

    useEffect(() => {
        const debouncedHandleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                requestAnimationFrame(() => handleMouseMove(e));
            }
        };
        document.addEventListener('mousemove', debouncedHandleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', debouncedHandleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        if (window.current) {
            window.current.style.left = `${position.x}px`;
            window.current.style.top = `${position.y}px`;
        }
    }, [position]);

    return (
        <div className="window" ref={window}>
            {!csd ? <Titlebar onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></Titlebar> : null}
            <div className="window-content">
                {children}
            </div>
        </div>
    )
}

export default Window