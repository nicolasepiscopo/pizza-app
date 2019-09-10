import './Cart.scss';

import React from 'react';

import {Pizza} from '../state/d.contracts';
import PizzaCreator from '../components/PizzaCreator';

interface Props {
    cart: Pizza[]
    addPizza: Function
    removePizza: Function
}

const sum = (prev: number, next: number) => prev + next;

const calculatePrice = (pizza: Pizza) => {
    const toppingsPrice = pizza.toppings
        .map(topping => topping.price)
        .reduce(sum, 0);

    return (pizza.size.basePrice + toppingsPrice);
}

const Cart = (props: Props) => {
    const {addPizza, cart, removePizza} = props;
    const prices = cart.map(calculatePrice);
    const total = prices.reduce(sum, 0).toFixed(2);
    const baseClassName = 'app-cart';

    return (
        <div className={baseClassName}>
            <div className={`${baseClassName}__description`}>
                Chose your favorite pizza and add it to your cart
            </div>
            <div className={`${baseClassName}__columns`}>
                <div className={`${baseClassName}__builder`}>
                    <h3>Pizza builder</h3>
                    <PizzaCreator onCreate={addPizza} />
                </div>
                <div className={`${baseClassName}__cart`}>
                    <h3>Cart</h3>
                    {!cart.length ? (
                        <i>The cart is empty so far.</i>
                    ) : (
                        <ul className={`${baseClassName}__products`}>
                            {cart.map(pizza => (
                                <li key={pizza.id}>
                                    <button type="button" onClick={removePizza.bind(null, pizza.id)}>
                                        Remove
                                    </button>
                                    Size: {pizza.size.name} <br />
                                    Toppings: {pizza.toppings.map(topping => topping.name).join(', ')} <br />
                                    Price: <strong>${calculatePrice(pizza).toFixed(2)}</strong> <br />
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className={`${baseClassName}__total`}>
                        <h3>Total</h3>
                        <strong>
                            ${total}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;