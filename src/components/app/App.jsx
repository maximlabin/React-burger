import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/getIngredients";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <div className={styles.app}>
            <AppHeader />
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
        </div>
    );
}

export default App;