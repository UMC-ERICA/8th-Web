import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartitems";
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
  name: "cart",
  initialState,
  reducers: {
    //incerease
    increase : (state, action : PayloadAction<{id : string}>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find(item => item.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },
    //decrease
    decrease : (state, action : PayloadAction<{id : string}>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find(item => item.id === itemId);
      if (item) {
        item.amount -= 1;
      }
    },
    //remove
    removeItems: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem.id !== itemId
      );
    },
    //clear cart
    clearCart: (state) => {
      state.cartItems = [];
    },
    //calculate totals
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += Number(item.amount) * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    }
  }
});

export const {
  increase,
  decrease,
  removeItems,
  clearCart,
  calculateTotals
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;