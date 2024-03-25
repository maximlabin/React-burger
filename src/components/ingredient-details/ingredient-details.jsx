import styles from './ingridient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getData } from '../../routes';

function IngredientDetails({ head }) {
    const { _id } = useParams();

    const ingredients = useSelector(getData);
    const ingredient = ingredients.data.find(ingredient => ingredient._id === _id);
    return (
        <section className={`${styles.root}`}>
            {
                head && (<h1 className={`${styles.head} text text_type_main-large mt-5`}>{head}</h1>)
            }
            {ingredient && (
                <>
                    <img src={ingredient.image_large} alt={ingredient.name} />
                    <h1 className={`text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h1>
                    <ul className={`${styles.info} mb-15`}>
                        <li className={`text text_type_main-default text_color_inactive`}>Калории,ккал<br />{ingredient.calories}</li>
                        <li className={`text text_type_main-default text_color_inactive`}>Белки, г<br />{ingredient.proteins}</li>
                        <li className={`text text_type_main-default text_color_inactive`}>Жиры, г<br />{ingredient.fat}</li>
                        <li className={`text text_type_main-default text_color_inactive`}>Углеводы, г<br />{ingredient.carbohydrates}</li>
                    </ul>
                </>
            )}
        </section>
    );
}

export default IngredientDetails;