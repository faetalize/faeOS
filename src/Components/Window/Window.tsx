import { ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'
import Titlebar from './Titlebar';

interface WindowProps {
    children?: ReactNode,
    useClientsideDecorations: boolean,
    title: string
}

const Window = ({ children, useClientsideDecorations: csd, title }: WindowProps) => {
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('window-resize-area')) {
            return; // Do not initiate drag if the target is a resize handle
        }
        isDragging.current = true;
        offset.current = {
            x: e.clientX - x,
            y: e.clientY - y
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            setX(Math.max(0, e.clientX - offset.current.x));
            setY(Math.max(0, e.clientY - offset.current.y));
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    }

    useEffect(() => {
        if (windowRef.current) {
            windowRef.current.style.left = `${x}px`;
            windowRef.current.style.top = `${y}px`;
        }
    }, [x, y]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        //we add the event on the container to support CSD
        <div className="window" ref={windowRef} onMouseDown={handleMouseDown}>
            {!csd && <Titlebar title={title} />}
            <div className="window-content" onMouseDown={(e) => e.stopPropagation()}>
                {children}
            </div>
            <div className="resize-handle resize-handle-left" />
            <div className="resize-handle resize-handle-top" />
            <div className="resize-handle resize-handle-right" />
            <div className="resize-handle resize-handle-bottom" />
            <div className="resize-handle resize-handle-corner-ne" />
            <div className="resize-handle resize-handle-corner-nw" />
            <div className="resize-handle resize-handle-corner-se" />
            <div className="resize-handle resize-handle-corner-sw" />
        </div>
    )
}

export default Window