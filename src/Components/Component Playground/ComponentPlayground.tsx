import Window from '../Window/Window'
import WindowControls from '../WindowControls/WindowControls'
import './style.css'

const ComponentPlayground = () => {
    return (
        <Window useClientsideDecorations={true} title="Component Playground" fullHeightContent={false}>
            <div className="component-playground">
                <div className="dragarea playground-titlebar">
                    <span className="dragarea">Window drag area</span>
                    <button>Button in the drag area</button>
                    <WindowControls></WindowControls>
                </div>
                <div className="component-playground-content">
                    <h2>Hello!! this is the component playground</h2>
                    <p>This app has been created with <code>Window.useClientsideDecorations = true</code></p>
                    <p>In this place, we shall test some components. This is a paragraph.</p>
                    <div>
                        <button>Click me!</button><button>Click me!</button><button>Click me!</button>
                    </div>
                    <textarea placeholder="this is a textarea!"></textarea>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, rerum
                        eligendi blanditiis quis nulla earum optio eos incidunt harum ipsum,
                        vero natus veniam, laboriosam perspiciatis repellendus sed magnam possimus mollitia!</p>
                    <div className="surface">
                        <h2>Hello!! this is the component playground</h2>
                        <p>This app has been created with <code>Window.useClientsideDecorations = true</code></p>
                        <p>In this place, we shall test some components. This is a paragraph.</p>
                        <div>
                            <button>Click me!</button><button>Click me!</button><button>Click me!</button>
                        </div>
                        <textarea placeholder="this is a textarea!"></textarea>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, rerum
                            eligendi blanditiis quis nulla earum optio eos incidunt harum ipsum,
                            vero natus veniam, laboriosam perspiciatis repellendus sed magnam possimus mollitia!</p>
                    
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default ComponentPlayground