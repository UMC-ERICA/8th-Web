import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { clearCart, type CartState } from "../slices/cartSlice";

const PriceBox = () => {
    const {total} = useSelector((state) : CartState => state.cart);
    const dispatch = useDispatch();

    const handleInitalizeCart = () => {
        dispatch(clearCart());
    }

  return (
    <div className="p-12 flex justify-between">
        <button onClick={handleInitalizeCart} className="border p-2 py-4 rounded-md cursor-pointer"> 장바구니 초기화</button>
        총 가격 : {total}원
    </div>
  )
}

export default PriceBox