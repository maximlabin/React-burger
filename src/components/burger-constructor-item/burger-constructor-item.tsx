import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import styles from './burger-constructor-item.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteIngredient, moveCard } from '../../services/actions';
import { TIngredient } from '../../services/types/data';
import { IBurgerConstructorProps } from '../../services/types/data';


function BurgerConstructorItem({ item, index, isLocked }: IBurgerConstructorProps) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const deleteElement = (id: string) => {
        // @ts-ignore
        dispatch(deleteIngredient(id));
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: { id: item.uniqId, index: index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<TIngredient, void, { handlerId: string }>({
        accept: 'item',
        hover(hoverItem, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = hoverItem.index;

            if (dragIndex === undefined) {
                return;
            }

            const hoverIndex = index;


            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = (ref.current as HTMLElement).getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset() as DOMRect;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return;
            }
            dispatch(moveCard(dragIndex, hoverIndex));
            hoverItem.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div className={styles.root} ref={ref} style={{ opacity }}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={isLocked}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteElement(item.uniqId)}
            />
        </div>
    );
}

export default BurgerConstructorItem;