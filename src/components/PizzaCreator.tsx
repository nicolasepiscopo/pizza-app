import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { PizzaSize, PizzaTopping, Pizza } from '../state/d.contracts';

interface Props {
    onCreate: Function
}

interface State {
    size?: PizzaSize,
    toppings: PizzaTopping[],
}

class PizzaSizes extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);

        this.state = {
            size: undefined,
            toppings: [],
        }
    }

    handleOnSizeChange (size: PizzaSize) {
        const toppings = size.toppings.map(data => ({
            ...data.topping, 
            defaultSelected: data.defaultSelected
        }));

        this.setState({
            size: {
                ...size,
                toppings
            },
            toppings: toppings.filter(({defaultSelected}) => defaultSelected)
        });
    }

    handleOnToppingChange (topping: PizzaTopping) {
        const {toppings, size} = this.state;
        const alreadyAdded = toppings.find(({name}) => name === topping.name);
        const canAddTopping = size && (size.maxToppings > toppings.length);

        if (alreadyAdded) {
            this.setState({
                toppings: toppings.filter(({name}) => name !== topping.name)
            });
        } else if (canAddTopping) {
            this.setState({
                toppings: [...toppings, topping]
            });
        }
    }

    isSizeChecked (size: PizzaSize) {
        return this.state.size && this.state.size.name === size.name;
    }

    isToppingChecked (topping: PizzaTopping) {
        return this.state.toppings.some(({name}) => topping.name === name);
    }

    isToppingDisabled (topping: PizzaTopping) {
        const {size, toppings} = this.state;
        const maxToppingsReached = size && size.maxToppings === toppings.length;

        return !toppings.find(({name}) => topping.name === name) && maxToppingsReached;
    }

    handleOnAddToCart (pizza: Pizza) {
        this.props.onCreate(pizza);
        this.setState({
            size: undefined,
            toppings: [],
        });
    }

    render () {
        const {size, toppings} = this.state;
        const toppingsTotal = toppings.map(topping => topping.price).reduce((prev, next) => prev + next, 0);
        const price = (size ? size.basePrice + toppingsTotal : 0).toFixed(2);
        const baseClassName = 'app-pizza-creator';

        return (
            <Query query={gql`
            {
                pizzaSizes {
                 name
                 basePrice
                 maxToppings
                 toppings {
                   topping {
                     name
                     price
                   }
                   defaultSelected
                 }
               }
           }
            `}>
                {({data, error, loading}: any) => (
                    <div className={baseClassName}>
                        {loading ? (
                            <div className={`${baseClassName}__loading`}>Loading sizes...</div>
                        ) : (
                            error ? (
                                <div className={`${baseClassName}__error`}>Error: {error}</div>
                            ) : (
                                <div className={`${baseClassName}__form`}>
                                    <h4>Select a size</h4>
                                    <ul className={`${baseClassName}__sizes`}>
                                        {data.pizzaSizes.map((size: PizzaSize) => (
                                            <li key={size.name}>
                                                <label>
                                                    <input 
                                                        type="radio" 
                                                        name="size" 
                                                        value={size.name} 
                                                        onChange={this.handleOnSizeChange.bind(this, size)} 
                                                        checked={this.isSizeChecked(size)}
                                                    />
                                                    {size.name} <strong>@ ${size.basePrice}</strong>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {size && (
                                        <div className={`${baseClassName}__toppings`}>
                                            <h4>Select toppings {size.maxToppings && `(max: ${size.maxToppings})`}</h4>
                                            <ul>
                                                {size.toppings.map((topping: PizzaTopping) => (
                                                    <li key={topping.name}>
                                                        <label>
                                                            <input 
                                                                type="checkbox" 
                                                                name="size"
                                                                value={topping.name} 
                                                                onChange={this.handleOnToppingChange.bind(this, topping)} 
                                                                checked={this.isToppingChecked(topping)}
                                                                disabled={this.isToppingDisabled(topping)}
                                                            />
                                                            {topping.name} <strong>@ ${topping.price}</strong>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                            
                                            <h4>Est. Price</h4>
                                            <strong className={`${baseClassName}__price`}>${price}</strong>

                                            <div className={`${baseClassName}__submit`}>
                                                <button onClick={this.handleOnAddToCart.bind(this, {size, toppings} as Pizza)}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                )}
            </Query>
        )
    }
}

export default PizzaSizes;