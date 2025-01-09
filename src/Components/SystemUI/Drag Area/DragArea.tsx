import { ReactNode } from "react"
import styles from './style.module.css'
import WindowControls from "../WindowControls/WindowControls"

interface DragAreaProps{
    startSlot?: ReactNode,
    centerSlot?: ReactNode
}

const DragArea = ({startSlot, centerSlot} : DragAreaProps) => {
    return (
        <div className={"dragarea " + styles['container']}>
            <div className={styles['slot-start']}>
                {startSlot}
            </div>
            <div className={styles["slot-center"]}>
                {centerSlot}
            </div>
            <div className={styles["slot-end"]}>
                <WindowControls></WindowControls>
            </div>
        </div>
    )
}

export default DragArea