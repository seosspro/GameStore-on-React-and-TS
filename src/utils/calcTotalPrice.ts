import {cartItem} from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: cartItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);
}