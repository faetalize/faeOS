import { useState, useEffect } from 'react';
import styles from './style.module.css';

const Toolbar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className={styles["de-toolbar"]}>
            <button>
                Browser
            </button>
            <div className={styles["de-toolbar-menubar"]}>
                <button>File</button>
                <button>Edit</button>
                <button>View</button>
                <button>Help</button>
            </div>
            <div className={styles["de-toolbar-free-space"]}></div>
            <button className={styles["de-toolbar-quicksettings"]}>
                <span className="material-symbols-outlined">
                    battery_full_alt
                </span>
                <span className="material-symbols-outlined">
                    lan
                </span>
                <span className="material-symbols-outlined">
                    page_info
                </span>
            </button>
            <button className={styles["de-toolbar-clock"]}>
                {formatTime(time)}
            </button>
        </div>
    );
};

export default Toolbar;