
import { ReactNode } from 'react'
import styles from './style.module.css'

interface SidebarProps {
    collapsed?: boolean,
    sidebarSlotTop?: ReactNode,
    sidebarSlotMain?: ReactNode,
    sidebarSlotBottom?: ReactNode
}

const Sidebar = ({
    collapsed = false,
    sidebarSlotTop,
    sidebarSlotMain,
    sidebarSlotBottom
}: SidebarProps) => {

    return (
        <div className={`${styles['sidebar']} ${collapsed ? styles['collapsed'] : ""}`}>
            <div className={styles['slot-top']}>{sidebarSlotTop}</div>
            <div className={styles['slot-main']}>{sidebarSlotMain}</div>
            <div className={styles['slot-bottom']}>{sidebarSlotBottom}</div>
        </div>
    )
}

export default Sidebar
