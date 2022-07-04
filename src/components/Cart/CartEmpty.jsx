import React from 'react';
import { NavLink } from 'react-router-dom';

function CartEmpty() {
    return (
        <div className='content'>
            <div className='container container--cart'>
                <div className='cart cart--empty'>
                    <h2>
                        Корзина пустая <icon>😕</icon>
                    </h2>
                    <p>
                        Вероятней всего, вы не выбрали ни одну игру.
                        <br />
                        Для того, чтобы купить игру, перейди на главную
                        страницу.
                    </p>
                    <NavLink to='/Home' className='button button--black'>
                        <span>Вернуться назад</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default CartEmpty;
