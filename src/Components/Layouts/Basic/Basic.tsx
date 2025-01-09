import { ReactNode } from "react"
import DragArea from "../../SystemUI/Drag Area/DragArea"
import Window from "../../Window/Window"
import styles from './style.module.css'

interface BasicLayoutProps {
    title: string,
    topBarStartSlot?: ReactNode,
    topBarCenterSlot?: ReactNode,
    fullHeight?: boolean,
    children?: ReactNode,
    transluscent?: boolean
}

const BasicLayout = ({ title, children, topBarStartSlot, topBarCenterSlot, fullHeight, transluscent }: BasicLayoutProps) => {
    return (
        <Window className={!transluscent ? styles['fill'] : undefined} useClientsideDecorations={true} title={title} fullHeightContent={fullHeight}>
            <DragArea startSlot={topBarStartSlot} centerSlot={topBarCenterSlot}></DragArea>
            <div className={styles['content']}>{children}</div>
        </Window>
    )
}

export default BasicLayout