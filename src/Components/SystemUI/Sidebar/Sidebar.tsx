
import { ReactNode } from 'react'
import styles from './style.module.css'

export type SidebarSlot = ReactNode | ((collapsed: boolean) => ReactNode)

interface SidebarProps {
    collapsed?: boolean,
    sidebarSlotTop?: SidebarSlot,
    sidebarSlotMain?: SidebarSlot,
    sidebarSlotBottom?: SidebarSlot
}

const Sidebar = ({
    collapsed = false,
    sidebarSlotTop,
    sidebarSlotMain,
    sidebarSlotBottom
}: SidebarProps) => {
    const renderSlot = (slot?: SidebarSlot) => {
        return typeof slot === 'function' ? slot(collapsed) : slot
    }

    return (
        <aside className={`${styles['sidebar']} ${collapsed ? styles['collapsed'] : ""}`}>
            <div className={styles['slot-top']}>{renderSlot(sidebarSlotTop)}</div>
            <div className={styles['slot-main']}>{renderSlot(sidebarSlotMain)}</div>
            <div className={styles['slot-bottom']}>{renderSlot(sidebarSlotBottom)}</div>
        </aside>
    )
}

export default Sidebar
