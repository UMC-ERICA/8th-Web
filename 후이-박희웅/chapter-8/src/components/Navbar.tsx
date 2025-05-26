import {FaShoppingCart} from 'react-icons/fa';
import { useEffect } from 'react';
import { useCartActions, useCartInfo } from '../hooks/useCartStore';

const Navbar = () => {
  const {amount, cartItems} = useCartInfo();
  const {calculateTotals} = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className = "flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 
        onClick={() =>{
          window.location.href = '/';
        }} 
      className = "flex items-center cursor-pointer">Heewoong</h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  )
}

export default Navbar
