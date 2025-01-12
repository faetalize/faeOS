import React, { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import './style.css';
import Titlebar from './Titlebar';

const DE_TOPBAR_HEIGHT = 30;
const RESIZE_HANDLE_PADDING = 5;

interface WindowProps {
    children?: ReactNode;
    useClientsideDecorations: boolean;
    title: string;
    fullHeightContent?: boolean;
    className?: string;
    active?: boolean;
    onFocused?: () => void;
}

const Window = ({ children, useClientsideDecorations: csd, title, fullHeightContent = false, className = "", active = false, onFocused }: WindowProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const resizeDirection = useRef<string | null>(null);
    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(window.innerWidth / 2 - 250);
    const [y, setY] = useState(window.innerHeight / 2 - 200);
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(400);

    const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsResizing(true);
        const classList = (e.target as HTMLElement).classList;
        if (classList.contains("resize-handle-e")) {
            resizeDirection.current = "e";
        }
        if (classList.contains("resize-handle-s")) {
            resizeDirection.current = 's';
        }
        if (classList.contains("resize-handle-se")) {
            resizeDirection.current = 'se';
        }
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (onFocused) onFocused();
        const target = e.target as HTMLElement;
        //if the target is a resize handle, we return to let the handleResize function handle it
        if (target.classList.contains('resize-handle')) {
            return;
        }
        setIsDragging(target.classList.contains('dragarea'));

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        offset.current = {
            x: clientX - x,
            y: clientY - y
        };
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
        resizeDirection.current = null;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (isDragging || resizeDirection.current) {
            e.preventDefault();
        }
        
        //different handling depending on whether the event is a touch event or mouse event
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        if (isDragging) {
            setX(clientX - offset.current.x);
            //we don't want the window to be dragged above the topbar
            //we also substract the padding caused by the resize handles of the window
            setY(Math.max(-RESIZE_HANDLE_PADDING, clientY - offset.current.y));
        }
        if (resizeDirection.current) {
            switch (resizeDirection.current) {
                case 'e':
                    setWidth(clientX - x - RESIZE_HANDLE_PADDING);
                    break;
                case 's':
                    setHeight(clientY - DE_TOPBAR_HEIGHT - y - RESIZE_HANDLE_PADDING);
                    break;
                case 'se':
                    setWidth(clientX - x - RESIZE_HANDLE_PADDING);
                    setHeight(clientY - DE_TOPBAR_HEIGHT - y - RESIZE_HANDLE_PADDING);
                    break;
                default:
                    break;
            }
        }
    }, [x, y, isDragging]);

    //we add the event listeners to the document so that we the window will follow 
    // the cursor during dragging and resizing, even if the mouse leaves the 
    // target window due to fast movement
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    //we have to add the dragging class to prevent any iframes from stealing mouse events
    //this class disables pointer events on the iframe only when dragging or resizing, then
    //reenables them when the dragging or resizing is done by removing the class
    useEffect(() => {
        windowRef.current?.classList.toggle("dragging", isDragging || isResizing);
    }, [isDragging, isResizing]);

    return (
        <div className={`${active ? "active" : ""} window`} ref={windowRef} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} style={{ width: `${width}px`, height: `${height}px`, top: `${y}px`, left: `${x}px` }}>
            <div className={`${className} window-view`}>
                {!csd && <Titlebar title={title} />}
                <div className={`window-content ${fullHeightContent ? 'window-content-fullheight' : ''}`}>
                    {children}
                </div>
            </div>
            <div onMouseDown={handleResize} onTouchStart={handleResize}>
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
    );
};

export default Window;