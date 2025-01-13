import WindowControls from "../SystemUI/WindowControls/WindowControls"

interface TitlebarProps {
    title: string
}

const Titlebar = ({title} : TitlebarProps) => {
    return (
        <div className="titlebar dragarea" >
            <span className="dragarea">{title}</span>
            <WindowControls></WindowControls>
        </div>
    )
}

export default Titlebar