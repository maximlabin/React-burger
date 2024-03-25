import styles from './home-page.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';


function HomePage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <>
                    <section className={styles.ingredients}>
                        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
                        <BurgerIngredients />
                    </section>
                    <section className={styles.constructor_item}>
                        <BurgerConstructor />
                    </section>
                </>
            </main>
        </DndProvider>
    )
}

export default HomePage;