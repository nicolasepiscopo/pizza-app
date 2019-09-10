export interface PizzaTopping {
    defaultSelected: any;
    topping: any;
    name: string,
    price: number
}

export interface PizzaSize {
    basePrice: number
    maxToppings: number
    toppings: PizzaTopping[]
    name: string
}

export interface Pizza {
    id?: number,
    size: PizzaSize,
    toppings: PizzaTopping[]
}