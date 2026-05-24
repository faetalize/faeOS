import { ReactNode, useEffect, useRef, useState } from "react"
import DragArea from "../../SystemUI/Drag Area/DragArea"
import Sidebar, { SidebarSlot } from "../../SystemUI/Sidebar/Sidebar"
import styles from './style.module.css'

interface SidebarLayoutProps {
    children?: ReactNode,
    topBarStartSlot?: ReactNode,
    topBarCenterSlot?: ReactNode,
    sidebarSlotTop?: SidebarSlot,
    sidebarSlotMain?: SidebarSlot,
    sidebarSlotBottom?: SidebarSlot,
}

const SidebarLayout = ({ children, ...props }: SidebarLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setIsCollapsed(width < 600 && width >= 400);
                setIsMobile(width < 400);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    return (
        <div ref={containerRef} className={`${styles['container']} ${isMobile ? styles['mobile'] : ''}`}>
            <Sidebar 
                collapsed={isCollapsed}
                sidebarSlotTop={props.sidebarSlotTop}
                sidebarSlotMain={props.sidebarSlotMain}
                sidebarSlotBottom={props.sidebarSlotBottom}
            />
            <div className={`${styles['fill']} ${styles['main-panel']}`}>
                <DragArea startSlot={props.topBarStartSlot} centerSlot={props.topBarCenterSlot}></DragArea>
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    )
}

export default SidebarLayout
