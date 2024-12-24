import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { ConfirmOrderModal, CreditCardModal } from "../components";
import { useOrderStore } from "../redux/hooks/useOrderStore";
import {  MinusIcon, Plus, ShoppingCart, CreditCard } from "lucide-react";
import { usePaymentStore } from "../redux/hooks/usePaymentStore";
import { useAuthStore } from "../redux/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export const StorePage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const { 
    addProductsSelectedAction,
    confirmOrderProduct
  } = useOrderStore()

  const { 
    isRegisterCreditCard,
    isRegisterNewCreditCardAction
  } = usePaymentStore()


  const Minus = (productSelected)=> {
    const { quantity } = productSelected;
    if(quantity > 0){
      const index = products.findIndex(p=> p.id == productSelected.id)
      let pl = JSON.parse(JSON.stringify( products));
      pl[index].quantity -= 1
      setProducts([...pl ])
    }
  }
  const Sum = (productSelected)=> {
    const { quantity, stock } = productSelected;
    if(stock > quantity){
      const index = products.findIndex(p=> p.id == productSelected.id)
      let pl = JSON.parse(JSON.stringify( products));
      pl[index].quantity += 1
      setProducts([...pl ])
    }
  }
  
  const [products, setProducts] = useState([]);
  const [carrito, SetCarrito] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: null,
    lastPage: null,
    totalCount: null,
  });

  const findProducts = async () => {
    const res = await axiosInstance.get("product");
    const { Products, metadata } = res.data;
    setProducts(Products.map(p=>({...p, quantity: 1})));
    setPagination(metadata);
  };

  useEffect(() => {
    findProducts();
  }, []);

  const handlePayment = (product) =>{
    if(!authUser) {
       navigate('/login');
    }
    addProductsSelectedAction({...product}); 
    isRegisterNewCreditCardAction(true)
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="pt-12 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  overflow ">
        {products.map((product, i) => {
          return (
            <div key={product.id} className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="relative ">
                  <img
                    src={product.picture}
                    alt={`image.${product.name}`}
                    className="rounded-t-lg w-48 h-50"
                  />
                 
                {i % 4 === 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sale
                  </span>
                ) }
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mt-1">{product.description}</p>
                  <p className="text-gray-600 mt-2 font-bold">Stock Disponible: <span className="text-green-500">{product.stock}</span></p>

                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </p>
                    {i % 4 === 0 && (
                      <p className="text-sm text-gray-500 line-through">
                        ${Math.round(product.price * 1.2)}
                      </p>
                    ) 
                    }
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="text-yellow-400">★★★★</div>
                    <div className="text-gray-300">★</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="text-gray-500 hover:text-gray-700" onClick={()=>Minus(product)}> <MinusIcon/> </button>
                  <span className="w-8 text-center">{product.quantity}</span>
                  <button className="text-gray-500 hover:text-gray-700" onClick={()=>Sum(product)} ><Plus/></button>
                </div>

                <div className="flex gap-2">
                  <button onClick={()=>handlePayment(product)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors col-span-1">
                  <span className="pl-1 flex gap-2 text-center justify-center items-center">
                    Pagar con Tarjeta <CreditCard/>
                    </span>

                   
                  </button>
                  <button onClick={()=>SetCarrito([...carrito, product])} className="hidden w-full bg-green-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors ">
                    <span className="pl-1 flex gap-1 text-center justify-center items-center">
                     <ShoppingCart/>
                      Carrito
                    </span>
                  </button>
                </div>
                </div>
                
            </div>
          );
        })}
        
        { confirmOrderProduct && 
          <ConfirmOrderModal/>
        }

        {isRegisterCreditCard &&
          <CreditCardModal/> 
        }
      </div>
    </div>
  );

 
};
