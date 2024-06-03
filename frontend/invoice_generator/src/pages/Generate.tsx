import React from "react";
import { useLocation } from "react-router-dom";

import lvg from "./levi (1).png";
import { backend_url } from "../components/config";

interface ProductType {    name: string;
  quantity: number;
  rate:number
  // other properties
}
const GeneratePage = () => {
  const location = useLocation();
  const products = location.state?.products || [] as ProductType[];

  // Calculate total amount
  const totalAmount : number= products.reduce(
    (total: number, product: ProductType) => total + product.quantity * product.rate,
  0
  );
  
  

  const handleFunction = async () => {
    const url = window.location.href;
    window.location.href= `${backend_url}/generate?url=${url}`
      
  };
  

  
  
  return (
    <>
      <div className="m-2 p-1 border-indigo-500 border-x-2 border-y-2">
        <div className="container mx-auto mt-8">
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mx-14">
              <h1 className="text-lg font-semibold">INVOICE GENERATOR</h1>
              <p>Sample Output Should be like this</p>
            </div>
            <div className="w-1/2 text-right flex justify-self-end">
              <img
                src={lvg}
                className="text-right mx-40 h-20 w-20"
                alt="Logo"
              />
            </div>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="border-y-2 border-x-red-200">
                <th className="border border-gray-100 px-4 py-5">Product</th>
                <th className="border border-gray-100 px-4 py-5">Quantity</th>
                <th className="border border-gray-100 px-4 py-5">Rate</th>
                <th className="border border-gray-100 px-4 py-5">Total</th>
              </tr>
            </thead>
            <tbody>
                {products.map((product: ProductType, index: number) => (
                  <React.Fragment key={index}>
                    <tr className="text-center">
                      <td className="border border-gray-100 px-4 py-4">
                        {product.name}
                      </td>
                      <td className="border border-gray-100 px-4 py-4">
                        {product.quantity}
                      </td>
                      <td className="border border-gray-100 px-4 py-4">
                        {product.rate}
                      </td>
                      <td className="border border-gray-100 px-4 py-4">
                        {product.quantity * product.rate}
                      </td>
                    </tr>
                    {index === 0 && (
                      <tr className="border-b border-gray-300">
                        <td colSpan={4} className="px-4 py-2"></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                
            </tbody>
          </table>
          <div className="text-right m-10">
            <div className="flex justify-end gap-10">
              <p className="text-lg font-semibold">Total Amount</p>
              <p>INR {totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex font-semibold justify-end gap-20">
              <p>GST</p>
              <p>18%</p>
            </div>
            <div className="flex justify-end gap-28 border-t border-gray-300 border-b border-spacing-1 py-2">
              <p>Grand Total</p>
              <p>{0.18 * parseFloat(totalAmount.toFixed(2))}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2 m-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        onClick={handleFunction}
      >
        Download Invoice
      </button>
    </>
  );
};

export default GeneratePage;
