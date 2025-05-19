import React, { useContext } from 'react'
import ProductContext from '../contexts/ProductContext'
import { FaRegHeart } from "react-icons/fa"

export const WishList = () => {
    const {wishlist,additeminCart,removeItemfromWishlist,addtowishlist} = useContext(ProductContext)
    const removefromwishlistAndAddToCart=async(Item)=>{
      removeItemfromWishlist(Item.name)
      additeminCart(Item)
    }
  return (
    <div className='container py-3 bg-gray-500'>
      <h2 className='mb-4 fw-bold text-center'>My WishList</h2>
      <div className="row g-2">
        {
            wishlist.map((product)=> (
                 <div className="col-md-3" key={product.id}>
                  <div className="card h-100 position-relative">
                    <div className="position-absolute top-0 end-0 p-2">
                        {wishlist.some((p)=> p.name == product.name) ?
                          (<div onClick={()=> removeItemfromWishlist(product.name)}>❤️</div>):
                          (<FaRegHeart className="text-secondary" onClick={()=> addtowishlist(product)} /> ) 
                          
                        }          
                      </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '400px', objectFit: 'cover' }}
                    />

                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text fw-bold">₹{product.price}</p>
                      <button className="btn btn-dark btn-sm" onClick={()=> removefromwishlistAndAddToCart(product)}>Move to Cart</button>
                    </div>
                  </div>
               </div>
            ))
            
        }
      </div>

    </div>
  )
}
