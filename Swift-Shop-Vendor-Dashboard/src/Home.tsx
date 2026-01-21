import React, { useEffect,useState, type FormEvent } from "react";
interface Product {
             id: number;
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
    const[listproduct, setListProduct] = useState<Product[]>([]);

   
    useEffect(()=>{

        const storedProduct = localStorage.getItem('products');
        console.log(storedProduct)
        if(storedProduct)
        {
           setListProduct(JSON.parse(storedProduct));
        }
    },[])


    
   const handleSubmit = (event:FormEvent)=>{
        event.preventDefault()

        const newProduct :  Product= {
             id:Date.now(),
            Catagory:Catogory,
            ProductName: ProductName,
            Price:parseInt(Price),
            Stock:parseInt(Stock)
        }
 
        addProductToLocalStorage(newProduct);
        setProductName('');
        setPrice('');
        setCatogory('');
        setStock('');
   }

   //add item
    const addProductToLocalStorage = (product : Product) =>{

         const exsitingProduct = localStorage.getItem("products");
         let products: Product[]=[];

         if(exsitingProduct)
         {
            products= JSON.parse(exsitingProduct);

         }
          setListProduct((prev) => {
          const updated = [...prev, product ];
           localStorage.setItem('products', JSON.stringify(updated));
           return updated;
       });
    };

    //Delete Item
    const deleteItem=(id:number)=>{
       const updated = listproduct.filter((item) => item.id !==id);
       setListProduct(updated);
       localStorage.setItem('products', JSON.stringify(updated));
    };

    return(
        <><div>
          <nav className="bg-blue-400  shadow fixed top-0 left-0 w-full z-10">
            <div className="text-xl font-bold text-black-500"><h2>Swift Shop</h2></div>

            <span className="text-sm text-gray-800"> Inventory Dashboard</span>
         </nav>

 </div>


         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mb-8 mt-20 relative">
         <div className="flex flex-col md:flex-row items-center gap-3">
            <span>Fill The Details</span>
         <div>
            <label htmlFor="Catogory" >Catagory:</label>
            <input  className="w-full border rounded-lg"id="Catogory"  type="text" value={Catogory} onChange={(e)=> setCatogory(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="ProductName" >Product Name:</label>
            <input   className="w-full border rounded-lg" id="ProductName"  type="text" value={ProductName} onChange={(e)=> setProductName(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="Price" >Price:</label>
            <input  className="w-full border rounded-lg" id="Price"  type="number" value={Price} onChange={(e)=> setPrice(e.target.value)}  required/>
         </div>
         <div>
            <label htmlFor="Stock" >Stock:</label>
            <input   className="w-full border rounded-lg" id="Stock"  type="number" value={Stock} onChange={(e)=> setStock(e.target.value)}  required/>
         </div>
         </div>
         <button type="submit" className="w-full md:w-auto bg-blue-500 mt-2 text-white px-5 py-2 rounded-lg hover:bg-blue-700 trasition"> Add Product</button>
         </form>
        
         <hr />
        
         <div className="min-h-screen bg-gray-100 p-6">
            <div>
              
              
                  {listproduct.length === 0?(
                     <p className="text-center text-gray-400">No items yet</p>
                  ):(
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listproduct.map((item)=>(
                           <div key={item.id} className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                              <div> 
                                 <h2 className="text-xl font-semibold mb-2">NAME:{item.ProductName}</h2>
                                  <p className="text-gray-600">Catagory:{item.Catagory}</p>
                                  <p className="text-gray-600">Price:{item.Price}</p>
                                  <p className="text-gray-600">Stock:{item.Stock}</p>

                              
                              <button onClick={() => deleteItem(item.id)} className="mt-4 text bg-red-400  border border-roundedhover:underline self-start">Delete</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         
  
        </>
    );
};

export default Home;