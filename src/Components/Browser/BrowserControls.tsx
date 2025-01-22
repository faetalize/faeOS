interface BrowserControlsProps {
    goBack: () => void;
    goForward: () => void;
    reload: () => void;
}

const BrowserControls = ({goBack, goForward, reload}: BrowserControlsProps) => {
    return (
        <div className="browser-controls">
            <button disabled className="material-symbols-outlined" onClick={goBack}>arrow_back</button>
            <button disabled className="material-symbols-outlined" onClick={goForward}>arrow_forward</button>
            <button className="material-symbols-outlined" onClick={reload}>refresh</button>
        </div>
    )
}

export default BrowserControls