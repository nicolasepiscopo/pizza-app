import {combineReducers} from 'redux';
import types from './types';
import { Pizza } from './d.contracts';

const initialState = [] as Pizza[];

const cartReducer = (state: Pizza[] = initialState, action: any) => {
    switch (action.type) {
        case types.ADD_PIZZA:
            return [
                ...state,
                {
                    id: state.length,
                    ...action.payload.pizza,
                }
            ];
        case types.REMOVE_PIZZA:
            return state.filter((pizza: Pizza) => pizza.id !== action.payload.id);
        default: return state;
    }
}

export default combineReducers({
    cart: cartReducer
});