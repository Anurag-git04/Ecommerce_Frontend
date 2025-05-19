import { NavLink } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from 'react';
import ProductContext from '../contexts/ProductContext';

export const Navbar = () => {
  const {cartItem,wishlist} = useContext(ProductContext)
  return (
    <div className='container'>
        <nav className="navbar bg-body-tertiary px-3 mb-3 d-flex justify-content-between align-items-center">
            <NavLink className="navbar-brand fw-bold text-muted" to="/">MyShoppingSite</NavLink>
            
            <div>
              <NavLink to='/productlist' className='mx-4 text-dark'>
                 Product List
              </NavLink>
              <NavLink to='/wishlist' className='mx-4 text-dark position-relative'>
                <FaRegHeart size={22} />
                {wishlist.length > 0 && (
                  <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle p-1 small-badge">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
              <NavLink to='/cartItem' className='text-dark position-relative'>
                <MdOutlineShoppingCart size={24}/>
                {cartItem.length > 0 && (
                  <span className='badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle p-1 small-badge'>
                    {cartItem.length}
                  </span>
                )}
              </NavLink>
            </div>
        </nav>
    </div>
  )
}
