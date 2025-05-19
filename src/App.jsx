import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import ProductContext from './contexts/ProductContext';
import { ProductListing } from './pages/ProductListing';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { WishList } from './pages/WishList';
import { ProductContextComponent } from './contexts/ProductContext';
import SuccessTick from './pages/SuccessTick';

// function ProductContextComponent({children}){
//   const [cartItem,setCartItem] = useState([])
//   const [wishlist,setWishList] = useState([])
  
  
//   const removefromcart=(Itemname)=>{
//     setCartItem((prev)=> prev.filter((item)=>{
//       if(item.name != Itemname){
//         return item
//       } 
//     }))
//   }

//   const addtowishlist = async(Item)=>{
//     const tr = cartItem.some((p)=> p.name == Item.name) 
//     if(tr){
//       removefromcart(Item.name)
//     }
//     setWishList((prev)=> [...prev,Item])
//     console.log("Wishlist : ",wishlist)
//   }

//   const removeItemfromWishlist = async(Itemname)=>{
//     setWishList((prev)=> prev.filter((item)=>{
//       if(item.name != Itemname){
//         return item
//       } 
//     }))
//   }

//   const additeminCart = (Item)=>{
//     const tr = wishlist.some((p)=> p.name == Item.name) 
//     if(tr){
//       removeItemfromWishlist(Item.name)
//     }
//     setCartItem((prev)=> [...prev,Item])
//     console.log(cartItem)
//   }

//   return (
//      <ProductContext.Provider value={{additeminCart,cartItem,removefromcart,addtowishlist,removeItemfromWishlist,wishlist}}>
//       {children}
//     </ProductContext.Provider>
//   )
// }

function App() {
  
 
  return (
    <ProductContextComponent>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/productlist' element={<ProductListing/>}/>
          <Route path='/productdetail/:productId' element={<ProductDetails/>}/>
          <Route path='/cartItem' element={<Cart/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/order-placed' element={<SuccessTick/>}/>
        </Routes>  
      </BrowserRouter>
    </ProductContextComponent>
  )
}

export default App
