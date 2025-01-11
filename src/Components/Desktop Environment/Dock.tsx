import styles from './style.module.css';

const Dock = ()=>{
    return(
        <div className={styles['dock']}>
            <div className={styles['icon']}>
                <img src="/launchpad.webp" alt="icon"/>
            </div>
            <div className={styles['icon']}>
                <img src="/cleanmymac.avif" alt="icon"/>
            </div>
            <div className={styles['icon']}>
                <img src="/safari.avif" alt="icon"/>
            </div>
            <div className={styles['icon']}>
                <img src="/settings.avif" alt="icon"/>
            </div>
            <div className={styles['icon']}>
                <img src="/terminal.avif" alt="icon"/>
            </div>
            <div className={styles['icon']}>
                <img src="/finder.avif" alt="icon"/>
            </div>
        </div>
    )
}

export default Dock;