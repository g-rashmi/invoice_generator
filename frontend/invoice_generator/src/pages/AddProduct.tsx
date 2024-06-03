import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
const AddProductPage: React.FC = () => {
  const navigate=useNavigate();
  
  interface ProductType {    name: string;
    quantity: number;
    rate:number
    // other properties
}
const [products, setProducts] = useState<ProductType[]>([{ name: '', quantity: 0, rate: 0 }]);
const [total, setTotal] = useState<number>(0);

const handleAddProduct = () => {
  setProducts([...products, { name: '', quantity: 0, rate: 0 }]);
};

const handleProductChange = (index: number, field: keyof ProductType, value: string | number) => {
  const updatedProducts = products.map((product, i) => {
    if (i === index) {
      return {
        ...product,
        [field]: value
      };
    }
    return product;
  });
  setProducts(updatedProducts);
  calculateTotal(updatedProducts);
};
  const calculateTotal = (products: ProductType[]) => {
    let sum = 0;
    products.forEach((product) => {
      const productTotal = product.quantity * product.rate;
      const productGST = (productTotal * 18) / 100;
      sum += productTotal + productGST;
    });
    setTotal(sum);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Generating PDF invoice:', products);
    // You can redirect the user to the next page here
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Products</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto ">
        {products.map((product, index) => (
          <div key={index} className="mb-3 text-lg">
            <label htmlFor={`productName${index}`} className="block text-l font-medium text-gray-2000">
              Product Name
            </label>
            <input
              type="text"
              id={`productName${index}`}
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              className="mt-1 p-2 block w-full border-black rounded-md shadow-l
focus:ring-red-500 focus:border-indigo-500"
            />
            <label htmlFor={`quantity${index}`} className="block font-medium text-gray-2000 mt-2 text-lg">
              Quantity
            </label>
            <input
              type="number"
              id={`quantity${index}`}
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label htmlFor={`rate${index}`} className="block text-lg font-medium text-gray-1000 mt-2">
              Rate
            </label>
            <input
              type="number"
              id={`rate${index}`}
              value={product.rate}
              onChange={(e) => handleProductChange(index, 'rate', parseInt(e.target.value))}
              className="mt-1 p-2 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
           onClick={()=>{  navigate('/generate', { state: { products } }); setProducts([]) ;} }>
            Next
          </button>
        </div>
      </form>
      <div className="mt-1 mx-24">
        <h2 className="text-xl font-semibold mb-2">Total:</h2>
        <p className="text-lg font-medium">Total Amount: INR {total.toFixed(2)}</p>   <p className="text-lg font-medium">Total gst: INR {(0.18)*total.toFixed(2)} <span className="mx-7 text-red-600">[18% on total product] </span></p> 
      </div>
    </div>
  );
};

export default AddProductPage;
