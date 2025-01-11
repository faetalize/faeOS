import { ReactNode } from "react"
import DragArea from "../../SystemUI/Drag Area/DragArea"
import styles from './style.module.css'

interface BasicLayoutProps {
    topBarStartSlot?: ReactNode,
    topBarCenterSlot?: ReactNode
    children?: ReactNode
}

const BasicLayout = ({ children, topBarStartSlot, topBarCenterSlot}: BasicLayoutProps) => {
    return (
        <>
            <DragArea startSlot={topBarStartSlot} centerSlot={topBarCenterSlot}></DragArea>
            <div className={styles['content']}>{children}</div>
        </>
    )
}

export default BasicLayout