import { ReactNode, useEffect, useRef, useState } from "react"
import DragArea from "../../SystemUI/Drag Area/DragArea"
import Sidebar from "../../SystemUI/Sidebar/Sidebar"
import styles from './style.module.css'

interface SidebarLayoutProps {
    children?: ReactNode,
    topBarStartSlot?: ReactNode,
    topBarCenterSlot?: ReactNode,
    sidebarSlotTop?: ReactNode,
    sidebarSlotMain?: ReactNode,
    sidebarSlotBottom?: ReactNode,
}

const SidebarLayout = ({ children, ...props }: SidebarLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                setIsCollapsed(containerRef.current.offsetWidth < 600);
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
        <div ref={containerRef} className={styles['container']}>
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
