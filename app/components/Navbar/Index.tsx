// navbar
import styles from './navbar.module.css'
import { navlogo } from '@/public/assets';



const Navbar = () => {
    return (
        <div className={styles.outer}>
            <img src={navlogo} />

            <div className={styles.left}>

            </div>
            <div className={styles.middle}>

            </div>
            <div className={styles.right}>

            </div>
        </div>

    );
}

export default Navbar;