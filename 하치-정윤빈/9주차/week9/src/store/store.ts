import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice"
// 1. 저장소 설정
function  createStore(){
    const store = configureStore({
        //2. 리듀서 설정
        reducer:{
            cart:cartReducer,
            modal:modalReducer,
        },

    });
    return store;
}

//store 활용할 수 있도록 export
//실행해 스토어를 뺴준다
//싱글 톤패턴
const store = createStore();
export default store;

//infer the `Rootstate` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//inferred type:{posts: PostsState, comments: CommentsState, users: UserState}
export type  AppDispatch = typeof store.dispatch;