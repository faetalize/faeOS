import { ReactNode, useEffect, useRef, useState, useCallback } from 'react'
import './style.css'
import Titlebar from './Titlebar';

interface WindowProps {
    children?: ReactNode,
    active: boolean,
    useClientsideDecorations: boolean,
    title: string
}

const Window = ({ children, useClientsideDecorations: csd, title, active }: WindowProps) => {
    const isDragging = useRef(false);
    const [isActive, setIsActive] = useState(active);
    const resizeDirection = useRef<string | null>(null);
    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);

    const handleResize = (e: React.MouseEvent) => {
        //we handle the 8 possibilities for resizing, n e s w ne se nw sw
        const classList = (e.target as HTMLElement).classList;
        if(classList.contains("resize-handle-e")){
            resizeDirection.current = "e";
        }
        if(classList.contains("resize-handle-s")){
            resizeDirection.current = 's';
        }
        if(classList.contains("resize-handle-se")){
            resizeDirection.current = 'se';
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('resize-handle')) {
            return; // Do not initiate drag if the target is a resize handle
        }
        isDragging.current = true;

        offset.current = {
            x: e.clientX - x,
            y: e.clientY - y
        }
    }

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        resizeDirection.current = null;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            setX(Math.max(0, e.clientX - offset.current.x));
            setY(Math.max(0, e.clientY - offset.current.y));
        }
        if(resizeDirection.current) {
            switch (resizeDirection.current) {
                case 'e':
                    setWidth(e.clientX-x);
                    break;
                case 's':
                    setHeight(e.clientY-30-y); //we need to take into account the DE's top bar.
                    break;
                case 'se':
                    setWidth(e.clientX-x);
                    setHeight(e.clientY-30-y);
                    break;
            
                default:
                    break;
            }
        }
    }, [x,y]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [handleMouseMove, handleMouseUp]);

    return (
        //we add the event on the container to support CSD
        <div className="window" ref={windowRef} onMouseDown={handleMouseDown} style={{ width: `${width}px`, height: `${height}px`, top: `${y}px`, left: `${x}px`}}>
            {!csd && <Titlebar title={title} />}
            {children}
            <div onMouseDown={handleResize}>
                <div className="resize-handle resize-handle-w" />
                <div className="resize-handle resize-handle-n" />
                <div className="resize-handle resize-handle-e" />
                <div className="resize-handle resize-handle-s" />
                <div className="resize-handle resize-handle-ne" />
                <div className="resize-handle resize-handle-nw" />
                <div className="resize-handle resize-handle-se" />
                <div className="resize-handle resize-handle-sw" />
            </div>
        </div>
    )
}

export default Window