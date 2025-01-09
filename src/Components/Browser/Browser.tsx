import Omnibox from "./Omnibox";
import { useEffect, useRef, useState } from 'react';
import './style.css'
import BasicLayout from "../Layouts/Basic/Basic";


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
            if ('error' in response) {
                browserViewRef.current!.srcdoc = response.message;
                return;
            }
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
        <BasicLayout title="Web Browser" topBarCenterSlot={<Omnibox url={url} setUrl={setUrl}></Omnibox>} fullHeight transluscent>
            <div className="browser">
                <iframe className="browser-view" ref={browserViewRef} sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups-to-escape-sandbox allow-popups allow-modals allow-presentation"></iframe>
            </div>
        </BasicLayout>
    )
}

async function getMD(src: string) {
    try {
        return await fetch("http://localhost:3000/browser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ src })
        });
    } catch (error) {
        console.error("Fetch failed, is the backend running?", error);
        return { message: "Not Found", error: error }
    }

}

export default Browser;