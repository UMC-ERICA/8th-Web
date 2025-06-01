// import { useDispatch, useSelector } from '../hooks/useCustomRedux';
// import { CartState, clearCart } from '../slices/cartSlice';
import { useCartActions, useCartInfo } from '../hooks/useCartStore';
const PriceBox = () => {
    // const {total} = useSelector((state):CartState => state.cart);
    // const dispatch = useDispatch();
    const {total} = useCartInfo();
    const {clearCart, calculateTotals} = useCartActions();

    // const handleInitializeCart=()=>{
    //     dispatch(clearCart());
    // }

    const handleInitializeCart = ()=>{
      clearCart();
      calculateTotals();
    }
  return (
    <div className='p-12 flex justify-between'> 
    <div>
        <button 
        onClick={handleInitializeCart}
        className='border p-4 rounded-md cursor-pointer'>장바구니 초기화</button>
    </div>
    <div>총 가격: {total.toLocaleString()}원</div>
      
    </div>
  )
}

export default PriceBox;
