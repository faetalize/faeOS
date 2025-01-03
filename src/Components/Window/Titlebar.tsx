interface TitlebarProps {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
}

const Titlebar = ({onMouseDown, onMouseUp} : TitlebarProps) => {
    return (
        <div className="titlebar" onMouseDown = {onMouseDown} onMouseUp = {onMouseUp}>
            <span>Title</span>
            <div className="titlebar-buttons">
                <button className="minimize"></button><button className="maximize"></button><button className="close"></button>
            </div>
        </div>
    )
}

export default Titlebar