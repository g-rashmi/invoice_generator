import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();

  interface ProductType {
    name: string;
    quantity: number;
    rate: number;
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
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Products</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {products.map((product, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <label htmlFor={`productName${index}`} className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id={`productName${index}`}
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
            <label htmlFor={`quantity${index}`} className="block text-sm font-medium text-gray-700 mt-2">
              Quantity
            </label>
            <input
              type="number"
              id={`quantity${index}`}
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
            <label htmlFor={`rate${index}`} className="block text-sm font-medium text-gray-700 mt-2">
              Rate
            </label>
            <input
              type="number"
              id={`rate${index}`}
              value={product.rate}
              onChange={(e) => handleProductChange(index, 'rate', parseInt(e.target.value))}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
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
            onClick={() => { navigate('/generate', { state: { products } }); setProducts([]); }}
          >
            Next
          </button>
        </div>
      </form>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Total:</h2>
        <p className="text-lg font-medium">Total Amount: INR {total.toFixed(2)}</p>
        <p className="text-lg font-medium">Total GST: INR {(total * 0.18).toFixed(2)} <span className="text-red-600">[18% on total product]</span></p>
      </div>
    </div>
  );
};

export default AddProductPage;
