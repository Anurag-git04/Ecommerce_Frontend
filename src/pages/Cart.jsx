import React, { useContext } from 'react'
import ProductContext from '../contexts/ProductContext'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const { cartItem,removefromcart,addtowishlist,} = useContext(ProductContext)
    const totalPrice = cartItem.reduce((acc,curr)=> acc+curr.price,0)
    const removefromcarttoaddwishlist= async(Item)=>{
      removefromcart(Item.name)
      addtowishlist(Item)
    }
    const navigate = useNavigate()
  return (
    <div className='container py-3'>
      <h2 className='mb-4 fw-bold text-center'>Cart({cartItem.length})</h2>
      <div className='row'>
        <div className='col-md-6'>
        {
          cartItem.map((cart)=>(
            <div className='d-flex mb-4 border' >
              <img src={cart.image} alt={cart.name}  className="img-fluid me-3" style={{ maxWidth: "180px", height: "auto" }}/>
              <div className='py-3'>
                <h6>{cart.name}</h6>
                <h5>₹{cart.price} <span className="text-muted text-decoration-line-through fs-6">₹{cart.price*2}</span></h5>
                <p className="text-success mb-1">50% off</p>
                <div className="d-flex align-items-center mb-2">
                  <label className="me-2">Quantity:</label>
                  <button className="btn btn-outline-secondary btn-sm me-2">-</button>
                  <span>1</span>
                  <button className="btn btn-outline-secondary btn-sm ms-2">+</button>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-dark btn-sm" onClick={()=>removefromcart(cart.name)}>Remove From Cart</button>
                  <button className="btn btn-outline-secondary btn-sm"onClick={()=>removefromcarttoaddwishlist(cart)}>Move to Wishlist</button>
                </div>
              </div>
            </div>
          ))
        }
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
            <div className="border p-4 rounded shadow-sm">
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItem.length} item)</span>
                <span>₹{totalPrice*2}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Discount</span>
                <span>- ₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>{totalPrice > 0 ? (<span>₹499</span>):(<span>₹0</span>) }</span>
              </div>
              <hr />
            </div>
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>TOTAL AMOUNT</span>
              <span>₹{totalPrice>0 ? totalPrice + 499 : 0}</span>
            </div>
            {
              totalPrice > 0 ? (<p className="text-success mb-3">You will save ₹{totalPrice} on this order</p>) : (<span></span>)
            }
            {
              cartItem.length > 0 ? (<button className="btn btn-primary w-100" onClick={()=> navigate('/order-placed')}>PLACE ORDER</button>) : (<></> )
            }
            
        </div>
      </div>
    </div>
  )
}
