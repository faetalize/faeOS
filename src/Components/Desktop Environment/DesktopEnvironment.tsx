
import { ReactNode, useState } from 'react';
import './style.css';
import Toolbar from './Toolbar';
import Dock from './Dock';

interface DEProps {
    children?: ReactNode
}

const DesktopEnvironment = ({ children }: DEProps) => {
    const [active, setActive] = useState(0);
    
    return (
        <div className="desktop-environment">
            <Toolbar></Toolbar>
            {children}
            <Dock></Dock>
        </div>
    );
}

export default DesktopEnvironment