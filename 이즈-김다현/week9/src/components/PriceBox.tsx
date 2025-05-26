import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";

const PriceBox = () => {
    const {total} = useCartInfo();
    const {clearCart, calculateTotals} = useCartActions();

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);

    const handleInitalizeCart = () => {
        clearCart();
    }

    return (
        <div className="p-12 flex justify-between">
            <button onClick={handleInitalizeCart} className="border p-2 py-4 rounded-md cursor-pointer"> 장바구니 초기화</button>
            총 가격 : {total}원
        </div>
    )
}

export default PriceBox

