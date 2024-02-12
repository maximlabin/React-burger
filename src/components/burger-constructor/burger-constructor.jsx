import React from "react";
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from "../../utils/data";
function BurgerConstructor() {
    let sum = 0;
    data.forEach(item => sum += item.price)
    return (
        <div className={`mt-25`}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>

                {data.length > 0 && (
                    <>
                        <div style={{ position: 'sticky', top: '0', paddingLeft: '32px', paddingRight: '16px' }}>
                            <ConstructorElement type="top" isLocked={true} text={data[0].name} price={data[0].price} thumbnail={data[0].image} />
                        </div>
                        <div className={`${styles.scrollable}`}>
                            {data.slice(1, -1).map(item => (
                                <div className={`${styles.scrollable_item} pl-8 mr-2`} key={item.name}>
                                    <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                                </div>
                            ))}
                        </div>
                        <div style={{ position: 'sticky', top: '0', paddingLeft: '32px', paddingRight: '16px' }}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={data[data.length - 1]?.name}
                                price={data[data.length - 1]?.price}
                                thumbnail={data[data.length - 1]?.image}
                            />
                        </div>
                    </>

                )
                }
            </div>
            <div className={`${styles.order} mt-10`}>
                <div className={`${styles.order_details} mr-10`}>
                    <h1 className={`mr-2`}>{sum}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;