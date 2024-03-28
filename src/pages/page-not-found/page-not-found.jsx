import styles from './page-not-found.module.css';
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className={styles.root}>
            <h1 className={styles.main}>Страница не найдена</h1>
            <Link to="/" className={styles.link}>Перейти на главную страницу
            </Link>
        </div>
    )
}
export default PageNotFound;