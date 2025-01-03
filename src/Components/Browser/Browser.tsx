import Omnibox from "./Omnibox";
import { useEffect, useRef, useState } from 'react';
import './style.css'
import Window from "../Window/Window";


const Browser = () => {
    const browserViewRef = useRef<HTMLIFrameElement>(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        (async () => {
            if (!url) {
                return;
            }
            const src = url;
            const response = await getMD(src);
            const markup = await response.text();
            const parser = new DOMParser();
            const targetdocument = parser.parseFromString(markup, 'text/html');
            const baseElement = document.createElement('base');
            baseElement.href = src;
            targetdocument.head.insertBefore(baseElement, targetdocument.head.firstChild);
            browserViewRef.current!.srcdoc = targetdocument.documentElement.outerHTML;
        }
        )();
    }, [url]);

    return (
        <Window useClientSideDecorations = {false}>
            <div className="browser">
                <Omnibox url={url} setUrl={setUrl}></Omnibox>
                <iframe className="browser-view" ref={browserViewRef} sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups-to-escape-sandbox allow-popups allow-modals allow-presentation"></iframe>
            </div>
        </Window>
    )
}

async function getMD(src: string) {
    return await fetch("http://localhost:3000/browser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ src })
    });
}

export default Browser;