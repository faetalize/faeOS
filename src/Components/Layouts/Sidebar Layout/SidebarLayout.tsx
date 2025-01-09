import { ReactNode, useEffect, useRef, useState } from "react"
import Window from "../../Window/Window"
import DragArea from "../../SystemUI/Drag Area/DragArea"
import Sidebar from "../../SystemUI/Sidebar/Sidebar"
import styles from './style.module.css'

interface SidebarLayoutProps {
    title: string,
    children?: ReactNode,
    topBarStartSlot?: ReactNode,
    topBarCenterSlot?: ReactNode,
    fullHeight?: boolean,
    transluscent?: boolean
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
        <Window useClientsideDecorations={true} title={props.title} fullHeightContent={props.fullHeight}>
            <div className={styles['container']} ref={containerRef}>
                <Sidebar collapsed={isCollapsed}></Sidebar>
                <div className={`${!props.transluscent ? styles['fill'] : ""} ${styles['main-panel']}`}>
                    <DragArea startSlot={props.topBarStartSlot} centerSlot={props.topBarCenterSlot}></DragArea>
                    <div className={styles['content']}>{children}</div>
                </div>
            </div>
        </Window>
    )
}

export default SidebarLayout