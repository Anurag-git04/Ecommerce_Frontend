// import { createContext } from "react";
import { createContext, useState } from "react";
const ProductContext = createContext()

export default ProductContext;

export function ProductContextComponent({children}){
  const [cartItem,setCartItem] = useState([])
  const [wishlist,setWishList] = useState([])
  
  
  const removefromcart=(Itemname)=>{
    setCartItem((prev)=> prev.filter((item)=>{
      if(item.name != Itemname){
        return item
      } 
    }))
  }

  const addtowishlist = async(Item)=>{
    const tr = cartItem.some((p)=> p.name == Item.name) 
    if(tr){
      removefromcart(Item.name)
    }
    setWishList((prev)=> [...prev,Item])
    console.log("Wishlist : ",wishlist)
  }

  const removeItemfromWishlist = async(Itemname)=>{
    setWishList((prev)=> prev.filter((item)=>{
      if(item.name != Itemname){
        return item
      } 
    }))
  }

  const additeminCart = (Item)=>{
    const tr = wishlist.some((p)=> p.name == Item.name) 
    if(tr){
      removeItemfromWishlist(Item.name)
    }
    setCartItem((prev)=> [...prev,Item])
    console.log(cartItem)
  }

  const setallclear = ()=>{
    setCartItem([])
    setWishList([])
  }

  return (
     <ProductContext.Provider value={{additeminCart,cartItem,removefromcart,addtowishlist,removeItemfromWishlist,wishlist,setallclear}}>
      {children}
    </ProductContext.Provider>
  )
}