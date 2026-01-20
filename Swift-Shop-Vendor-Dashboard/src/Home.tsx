import React, { useEffect,useState, type FormEvent } from "react";
interface Product {
             ProductName: string;
             Price:number;
             Stock: number ;
             Catagory: string ;
             };

const Home : React.FC = ()=>{

    const [ProductName, setProductName] = useState('');
    const [Price, setPrice] = useState('');
    const [Stock, setStock] = useState('');
    const [Catogory, setCatogory] = useState('');
 
    const[listproduct, setListProduct] = useState([]);

    useEffect(()=>{

        const storedProduct = localStorage.getItem('products');
        console.log(storedProduct)
        if(storedProduct)
        {
           const parseProducts : Product [] =JSON.parse(storedProduct);
        }
    },[])

    
   const handleSubmit = (event:FormEvent)=>{
        event.preventDefault()

        const newProduct :  Product= {
            Catagory:Catogory,
            ProductName: ProductName,
            Price:parseInt(Price),
            Stock:parseInt(Stock)
        }
 
        addProductToLocalStorage(newProduct);
        setProductName('');
        setPrice('');
        setCatogory('');
        setStock('')


   }

    const addProductToLocalStorage = (product : Product) =>{

         const exsitingProduct = localStorage.getItem("products");

         let products: Product[]=[];

         if(exsitingProduct)
         {
            products= JSON.parse(exsitingProduct);

         }
         products.push(product);
         localStorage.setItem('products', JSON.stringify(products));
      
        console.log(localStorage.getItem('products'));
    }
    return(
        <>
          <div className="flax justify-center mx-auto max-w-7xl bg-gray-800 text-white">
            <span>WelCome to the Swift-shop-wendor system</span> 
           </div>

<hr />


         <form onSubmit={handleSubmit} className="">
         <div className="border-b border-gray-900/10 pb-12">
            <span>Fill form to add new product</span>
         <div>
            <label htmlFor="Catogory" >Catagory:</label>
            <input  id="Catogory"  type="text" value={Catogory} onChange={(e)=> setCatogory(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="ProductName" >Product Name:</label>
            <input  id="ProductName"  type="text" value={ProductName} onChange={(e)=> setProductName(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="Price" >Price:</label>
            <input  id="Price"  type="number" value={Price} onChange={(e)=> setPrice(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="Stock" >Stock:</label>
            <input  id="Stock"  type="number" value={Stock} onChange={(e)=> setStock(e.target.value)}  required/>
         </div>
         </div>
         <button type="submit"> Add Product</button>
         </form>
         <hr />
        
         <div className="container ">
      <h1 className="text-2xl ">Local Products</h1>
      {listproduct.length > 0 ? (
        <div className="flex flex-wrap -m-4">
          {listproduct.map((product) => (
            <span>{product}
            </span> 
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in local storage.</p>
      )}
    </div>
  
        </>
    );
};

export default Home;