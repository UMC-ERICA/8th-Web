import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

export interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Todo: 증가
        increase: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id; // 이 아이디르 통해서 내가 클릭한 음반 찾음
            const item = state.cartItems.find((cartItems) => cartItems.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },

        // Todo: 감소
        decrease: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id; // 이 아이디르 통해서 내가 클릭한 음반 찾음
            const item = state.cartItems.find((cartItems) => cartItems.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },

        // Todo: removeItem 제거
        removeItem: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        },

        // Todo: clearCart 장바구니 비우기
        clearCart: (state) => {
            state.cartItems = [];
        },

        // Todo: 총액 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
});

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions

const cartReducer = cartSlice.reducer;

export default cartReducer;