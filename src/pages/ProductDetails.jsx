import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import ProductContext from '../contexts/ProductContext'
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaTruck } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHandHoldingUsd } from "react-icons/fa";

export const ProductDetails = () => {
    const {productarray, additeminCart} = useContext(ProductContext)
    const [productData,setProductData] = useState({})
    const productId = useParams()
    const {data,loading ,error} = useFetch(`http://localhost:3000/products/${productId.productId}`)
    useEffect(()=>{
        if(data){
            console.log("Product Data:",data.data.product)
            setProductData(data.data.product)
            console.log("Prd:", productData)
        }
    },[data])
    const naviagte = useNavigate()
  return (
    <div className='container my-4'>
        <div className="row">
            <div className="col-md-3">
                <img
                    src={productData.image}
                    alt={productData.name}
                    className="img-fluid"
                />
                <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary">Buy Now</button>
                    <button className="btn btn-outline-secondary" onClick={()=>  additeminCart(productData)}>Add to Cart</button>
                </div>
            </div>
            <div className="col-md-7">
                <h4>{productData.name}</h4>
                <p className="text-muted">{productData.description}</p>
                {/* <div className="mb-2">
                    <span className="text-warning">★★★★☆</span>
                    <span className="ms-2">4.5 (456)</span>
                </div> */}
                <hr />
                <h3 className="text-danger">₹{productData.price} <small className="text-muted text-decoration-line-through">₹{productData.price*2}</small> <span className="text-success">50% off</span></h3>
                <hr />    
                <div className="mt-3">
                    <strong>Size:</strong>
                    <div className="btn-group ms-2" role="group">
                    <button className="btn btn-outline-dark">S</button>
                    <button className="btn btn-outline-dark">M</button>
                    <button className="btn btn-outline-dark">L</button>
                    <button className="btn btn-outline-dark">XL</button>
                    <button className="btn btn-outline-dark">XXL</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <div className="text-center">
                        <RxCounterClockwiseClock/>
                        <p>10 Days Return</p>
                    </div>
                    <div className="text-center">
                        <FaHandHoldingUsd/>
                        <p>Cash on Delivery</p>
                    </div>
                    <div className="text-center">
                        <FaTruck/>
                        <p>Free Delivery</p>
                    </div>
                    <div className="text-center">
                        <RiSecurePaymentLine/>
                        <p>Secure Payment</p>
                    </div>
                </div>
                <hr />
                <div className="mt-4">
                    <h5>Description:</h5>
                    <ul>
                        <li>STYLE REDEFINED: Elevate your look with our versatile Premium Jacket.</li>
                        <li>ALL-WEATHER READY: Cozy combination for chilly weather with wind & water resistance.</li>
                        <li>UNPARALLELED COMFORT: Non-restrictive fit and premium material.</li>
                        <li>VERSATILE ESSENTIAL: From casual outings to semi-formal events.</li>
                        <li>PACK & STYLE: Lightweight and easy to carry.</li>
                    </ul>
                </div>
            </div>    
        </div>
        <hr />
        <div className="row g-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {productarray.slice(0, 4).map((product, index) => (
                <div className="col" key={index}>
                            <div className="card h-100 position-relative">
                            {/* Wishlist */}
                            <div className="position-absolute top-0 end-0 p-2">
                                {/* <FaRegHeart className="text-secondary" /> */}
                            </div>
                            <img src={product.image} className="card-img-top" onClick={()=> naviagte(`/productdetail/${product._id}`)} alt={product.name} />
                            <div className="card-body text-center">
                                <h6 className="card-title">{product.name}</h6>
                                <p className="fw-bold">₹{product.price}</p>
                                {
                                   ( <button className={`btn btn-secondary`} onClick={()=> additeminCart(product)}>
                                        Add to Cart
                                    </button>)
                                }
                            </div>
                            </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}
