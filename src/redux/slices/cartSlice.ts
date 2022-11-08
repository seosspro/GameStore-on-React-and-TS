import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export type cartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    count: number;
}

interface cartSliceState {
    totalPrice: number;
    items: cartItem[]
}

const cartData = getCartFromLS()

const initialState: cartSliceState = {
    totalPrice: cartData.totalPrice,
    items: cartData.items,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<cartItem>) {
            const findItem = state.items.find(
                    obj => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
