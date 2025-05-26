import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

// 1. 저장소 생성하기

function createStore() {
    const store = configureStore({
        // 2. 리듀서 설정
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    });
    return store;
}

const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;