
import styles from './style.module.css'

interface SidebarProps {
    collapsed?: boolean
}

const Sidebar = ({collapsed = false}  : SidebarProps) => {

    return (
        <div className={`${styles['sidebar']} ${collapsed ? styles['collapsed'] : ""}`}>
            <div className={styles['slot-top']}></div>
            <div className={styles['slot-main']}></div>
            <div className={styles['slot-bottom']}></div>
        </div>
    )
}

export default Sidebar