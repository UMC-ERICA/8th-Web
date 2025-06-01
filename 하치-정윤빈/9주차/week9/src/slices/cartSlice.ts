import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import { CartItems } from "../types/cart";


export interface CartState{
    cartItems: CartItems;
    amount: number;
    total: number;
}

const initialState: CartState={
    cartItems: cartItems,
    amount:0,
    total:0,
};

//cartSlice 생성
//createSlice -> reduxToolkit에서 제공
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
    //todo: 증가
    increase:(state, action: PayloadAction<{id: string}>)=>{
        const itemId = action.payload.id;
        //이 아이디를 통해 전체 음반 중 내가 클릭한 음반 찾기
        const item = state.cartItems.find((cartItem):any=>cartItem.id===itemId);

        if(item){
            item.amount +=1;
        }
    },

    //todo: 감소
    decrease:(state, action: PayloadAction<{id: string}>)=>{
        const itemId = action.payload.id;
        //이 아이디를 통해 전체 음반 중 내가 클릭한 음반 찾기
        const item = state.cartItems.find((cartItem):any=>cartItem.id===itemId);

        if(item){
            item.amount -=1;
        }
    },
    //todo: removeItem 아이템 제거
    removeItem:(state, action: PayloadAction<{id: string}>) =>{
        const itemId = action.payload.id;
        state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== itemId
        );
    },
    //todo: clearCart

    clearCart: (state) =>{
        state.cartItems =[];
    },

    //todo: 총액 계산
    calculateTotals :(state) => {
        let amount =0;
        let total =0;

        state.cartItems.forEach((item)=>{
            amount += item.amount;
            total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
    },  
    },
});

export const {increase, decrease,removeItem, clearCart, calculateTotals} = 
cartSlice.actions

//duck pattern reducer는 export default로 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;