import { ChangeEvent, useState, KeyboardEvent } from "react";

interface OmniboxProps {
    url: string;
    setUrl: (url: string) => void;
}

const Omnibox = ({ url, setUrl }: OmniboxProps) => {
    const [inputVal, setInputVal] = useState(url);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputVal(event.target.value);
    }

    function handleEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const newUrl = inputVal + `?refresh=${new Date().getTime()}`;
            setUrl(newUrl);
        }
    }
    return (
        <input type="text" value={inputVal} onChange={handleChange} onKeyDown={handleEnter} className="omnibox" />
    )
}

export default Omnibox;