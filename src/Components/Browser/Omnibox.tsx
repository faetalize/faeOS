import { ChangeEvent, useState, KeyboardEvent } from "react";

interface OmniboxProps {
    url: string;
    setUrl: (url: string) => void;
}

const Omnibox = ({ url, setUrl }: OmniboxProps) => {
    const [inputVal, setInputVal] = useState(url);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputVal(event.target.value);

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setUrl(`${inputVal}?refresh=${new Date().getTime()}`);
        }
    };

    return (
        <input type="text" value={inputVal} onChange={handleChange} onKeyDown={handleEnter} className="omnibox" />
    );
}

export default Omnibox;
