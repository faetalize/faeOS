interface TitlebarProps {
    title: string
}

const Titlebar = ({title} : TitlebarProps) => {
    return (
        <div className="titlebar" >
            <span>{title}</span>
            <div className="titlebar-buttons">
                <button className="minimize"></button><button className="maximize"></button><button className="close"></button>
            </div>
        </div>
    )
}

export default Titlebar