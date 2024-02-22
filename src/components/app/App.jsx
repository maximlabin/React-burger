import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/apiConfig.js";

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(BASE_URL + '/ingredients');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                {!loading && (
                    <>
                        <section className={styles.ingredients}>
                            <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
                            <BurgerIngredients ingredients={data} />
                        </section>
                        <section className={styles.constructor_item}>
                            <BurgerConstructor ingredients={data} />
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;