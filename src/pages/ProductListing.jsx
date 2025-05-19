import { useContext, useEffect, useState } from "react"
import ProductContext from "../contexts/ProductContext"
import { NavLink, useNavigate } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"
import axios from "axios"
import Loader from "../components/Loader"


export const ProductListing = () => {
    const {additeminCart, cartItem,removefromcart,addtowishlist,removeItemfromWishlist,wishlist} = useContext(ProductContext)
    const [sortOrder, setSortOrder] = useState('');
    const [products,setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 8000]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState([])
    

    useEffect(() => {
        const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://ecommerce-backend-vert-one.vercel.app/products');
            setAllProducts(res.data.data.product);
            setProducts(res.data.data.product);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
        };
        fetchAllProducts();
    }, []);

    useEffect(()=>{
        let filtered = [...allProducts]

        filtered = filtered.filter(
            product => product.price>= priceRange[0] && product.price <= priceRange[1]
        )

        if(selectedCategory.length > 0) {
            filtered = filtered.filter(product => selectedCategory.includes(product.categoryId));
        }


        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setProducts(filtered);
    },[sortOrder,priceRange,selectedCategory])
    
    const naviagte = useNavigate()

    const handlecategoryChange=(e)=>{
        const {value,checked} = e.target
        if(checked){
            setSelectedCategory((prev)=> [...prev,value])
        }else{
            setSelectedCategory((prev)=> prev.filter((p)=> p!==value))
        }
    }

    const clearFilterHandle =()=>{
        setSortOrder('')
        setPriceRange([0,8000])
        setSelectedCategory([])
    }
    // Things learn on sunday 18 may :
    // sort function in array use of axios 
    //includes fuction of array
  return (
    <div className="container my-3">
        
        <div className="row">
            <div className="col-md-3 border-end">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Filters</h5>
                    <button className="btn btn-link text-decoration-none p-0" onClick={clearFilterHandle}>Clear</button>
                </div>
                <div className="mb-4">
                    <label htmlFor="priceRange" className="form-label fw-semibold">Price</label>
                    <input type="range" className="form-range" min={0} max={8000} value={priceRange[1]} onChange={e => setPriceRange([0, parseInt(e.target.value)])} id="priceRange" />
                    <div className="d-flex justify-content-between text-muted">
                        <small>₹{priceRange[0]}</small>
                        <small>₹{priceRange[1]}</small>
                    </div>
                </div>
                <div className="mb-4">
                    <h6>Category</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="682384b938af0e1e95cdf98e" onChange={handlecategoryChange} id="menClothing1" />
                        <label className="form-check-label" htmlFor="menClothing1">Men Clothing</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="6823854538af0e1e95cdf990" onChange={handlecategoryChange} id="menClothing2" />
                        <label className="form-check-label" htmlFor="menClothing2">Women Clothing</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="682385a238af0e1e95cdf992" onChange={handlecategoryChange} id="menClothing2" />
                        <label className="form-check-label" htmlFor="menClothing2">Boys Clothing</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="682385e538af0e1e95cdf994" onChange={handlecategoryChange} id="menClothing2" />
                        <label className="form-check-label" htmlFor="menClothing2">Girl Clothing</label>
                    </div>
                </div>
                <div>
                    <h6>Sort by</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sort" checked={sortOrder === 'asc'} onChange={() => setSortOrder('asc')} id="lowHigh" />
                        <label className="form-check-label" htmlFor="lowHigh">Price - Low to High</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sort" checked={sortOrder === 'desc'} onChange={() => setSortOrder('desc')} id="highLow" />
                        <label className="form-check-label" htmlFor="highLow">Price - High to Low</label>
                    </div>
                </div>
            </div>
            { loading ? (<div className="col-md-9 d-flex justify-content-center align-items-center" style={{ height: '400px' }}> <Loader/> </div>) : (
            <div className="col-md-9">
                <h5 className="mb-3">Showing All Products <small className="text-muted">(Showing {products.length} products)</small></h5>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {products.map((product, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 position-relative">
                            {/* Wishlist */}
                            <div className="position-absolute top-0 end-0 p-2">
                                {  wishlist.some((p)=> p.name == product.name) ?
                                    (<div onClick={()=>  removeItemfromWishlist(product.name)}> ❤️</div>) :
                                    (<FaRegHeart className="text-secondary" onClick={()=> addtowishlist(product)} /> ) 
                                }          
                            </div>
                            <img src={product.image} className="card-img-top" onClick={()=> naviagte(`/productdetail/${product._id}`)} alt={product.name} />
                            <div className="card-body text-center">
                                <h6 className="card-title">{product.name}</h6>
                                <p className="fw-bold">₹{product.price}</p>
                                {cartItem.some((p)=> p.name == product.name) ? (
                                    <button className={`btn btn-warning`} onClick={()=>removefromcart(product.name)}>
                                        Remove from Cart
                                    </button>
                                ):
                                (
                                    <button className={`btn btn-secondary`} onClick={()=>additeminCart(product)}>
                                        Add to Cart
                                    </button>)
                                }
                                
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             )}
        </div>
    </div>
  )
}
