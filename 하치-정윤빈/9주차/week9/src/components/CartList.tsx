import CartItem from "./CartItem"
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useDispatch, UseDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import Modal from "./Modal";

const CartList = () => {
  const {cartItems} = useCartInfo();
  const {clearCart} = useCartActions();
  const dispatch = useDispatch();

  const handleAllClearButton = ()=>{
    dispatch(openModal("정말 삭제하겠습니까?"));
  }
  const handleConfirmClear=()=>{
    clearCart();
  }


  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length ===0 &&(
        <div className="my-10">
          <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
        </div>
      )}
      <ul>
        {cartItems.map((item,index)=>(
          <CartItem key={index} lp={item} />
      ))}
      </ul>
      <button onClick={handleAllClearButton}
      className="p-4 border rounded-md my-10">전체삭제</button>
      <Modal onConfirm={handleConfirmClear}/>
    </div>
  )
}

export default CartList;