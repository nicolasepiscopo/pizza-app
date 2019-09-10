import { Pizza } from "./d.contracts";
import types from "./types";

export const addPizza = (pizza: Pizza) => ({
    type: types.ADD_PIZZA,
    payload: {
        pizza
    }
});

export const removePizza = (id: number) => ({
    type: types.REMOVE_PIZZA,
    payload: {
        id
    }
});

export default {
    addPizza,
    removePizza
};