import './style.css'

const WindowControls = () => {
    return (
        <div className="window-controls">
            <button className="minimize">
                <span className="material-symbols-outlined">
                    minimize
                </span>
            </button>
            <button className="maximize">
                <span className="material-symbols-outlined">
                    fullscreen
                </span>
            </button>
            <button className="close">
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </div>
    )
}

export default WindowControls