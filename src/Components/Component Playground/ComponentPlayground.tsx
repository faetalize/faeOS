import SidebarLayout from '../Layouts/Sidebar Layout/SidebarLayout';

const ComponentPlayground = () => {
    return (
        <SidebarLayout title="Component Playground" fullHeight>
            <div className="component-playground-content">
                <h2>This is the component playground</h2>
                <p>This app has been created with <code>Window.useClientsideDecorations = true</code><br></br>
                    This allows you to create your own contentful titlebars. <br></br>
                    This app serves as  a reference for components and layouts you might want to implement!</p>
                <div>
                    <button>Click me!</button><button>Click me!</button><button>Click me!</button>
                    <input></input>
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
        </SidebarLayout>
    )
}

export default ComponentPlayground