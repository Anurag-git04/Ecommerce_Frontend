import { useContext, useEffect, useState } from "react"
import ProductContext from "../contexts/ProductContext"
import { NavLink } from "react-router-dom"
import useFetch from "../useFetch"

export const Home = () => {
    // const {Categoryarray} = useContext(ProductContext)
    const [Categoryarray,setcategory] = useState([])
 
    const {data,loading,error} = useFetch(`https://ecommerce-backend-vert-one.vercel.app/category`)
    // console.log(data)
  
    useEffect(() => {
        console.log(data)
        console.log("Error",error)
        if(data){
        //   console.log("DATA: ",data.data.product)
          // const Products = data.data.product
          setcategory(data.data.product)
        }
    }, [data])
   
  return (
    <div className='container my-4'>
        <div className="container text-center">
            <NavLink to='/productlist'>
                {/* <img src="https://placehold.co/1240x400?text=Home+Page" alt="" /> */}
                <img src="https://kelingster.com/cdn/shop/files/Grey_Minimalist_Elegant_Photo_Collage_Ad_Banner_1.png?v=1742544797&width=1250" alt="" />
            </NavLink>
        </div>
        <div className="container text-center">
            <h2 className="my-2">Different Category of Dress</h2>
            {loading ? <div> Loading... </div> :
                (<div className="row g-2 m-2">
                    {
                        Categoryarray?.map((product,index)=>(
                            <div key={index} className="col-md-3">
                                <div className="card">
                                    <img src={product.image} className="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">{product.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    </div>
  )
}
