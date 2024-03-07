import styles from './ingridient-details.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ data, head }) {
    return (
        <section className={`${styles.root}`}>
            {
                head && (<h1 className={`${styles.head} text text_type_main-large mt-5`}>{head}</h1>)
            }
            <img src={data.image_large} alt={data.name} />
            <h1 className={`text_type_main-medium mt-4 mb-8`}>{data.name}</h1>
            <ul className={`${styles.info} mb-15`}>
                <li className={`text text_type_main-default text_color_inactive`}>Калории,ккал<br />{data.calories}</li>
                <li className={`text text_type_main-default text_color_inactive`}>Белки, г<br />{data.proteins}</li>
                <li className={`text text_type_main-default text_color_inactive`}>Жиры, г<br />{data.fat}</li>
                <li className={`text text_type_main-default text_color_inactive`}>Углеводы, г<br />{data.carbohydrates}</li>
            </ul>
        </section>
    );
}

IngredientDetails.propTypes = {
    data: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }).isRequired,
    head: PropTypes.string,
};

export default IngredientDetails;