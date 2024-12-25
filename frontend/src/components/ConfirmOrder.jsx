import React, { useEffect, useState } from 'react'
import { Plus, MinusIcon, X, Loader } from "lucide-react";
import { useOrderStore } from '../redux/hooks/useOrderStore'
import { usePaymentStore } from '../redux/hooks/usePaymentStore';
import { useAuthStore } from '../redux/hooks/useAuthStore';

export const ConfirmOrderModal = () => {
  const { payOrderAction, cryptcreditCard, isPaying, } = usePaymentStore()
  const { productsSelected, clearProductsSelectedAction, setconfirmOrderProductAction, newOrderAction, order,  } = useOrderStore()
  const [ productsSelectedLocal, SetproductsSelectedLocal ] = useState(productsSelected);
  const { authUser } = useAuthStore()

  const GlobalSubtotal = (productsSelectedLocal.reduce((acumulador, producto) => {
    const subtotal = producto.quantity * producto.price;
    return acumulador + subtotal;
  }, 0)); 

  const globalTotal = Math.round(((GlobalSubtotal) * 1.09)*100)/100
  const iva = Math.round((GlobalSubtotal * 0.09)*100)/100

  const Minus = (productSelected)=> {
    const { quantity } = productSelected;
    if( quantity > 1 ){
      const index = productsSelectedLocal.findIndex(p=> p.id == productSelected.id)
      let pl = JSON.parse(JSON.stringify( productsSelectedLocal));
      pl[index].quantity -= 1
      SetproductsSelectedLocal([...pl ])
    }
  }

  const Sum = (productSelected)=> {
    const { quantity, stock } = productSelected;
    if(stock > quantity){
      const index = productsSelectedLocal.findIndex(p=> p.id == productSelected.id)
      let pl = JSON.parse(JSON.stringify( productsSelectedLocal));
      pl[index].quantity += 1
      SetproductsSelectedLocal([...pl ])
    }
  }

  const handleCancel = () =>{
    clearProductsSelectedAction(),
    setconfirmOrderProductAction(false)
  }

  const handlePay = async () =>{
      newOrderAction({productsSelectedLocal, globalTotal, GlobalSubtotal})
  }


  if(productsSelected) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 backdrop:blur-sm flex justify-center items-center '>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
            
            <div className="space-y-4">

              <div className="max-h-80 overflow-y-scroll"> 
                { 
                  productsSelectedLocal.map(productSelected => {
                      const { price, quantity, name, description, id, picture } = productSelected;
                      
                      return (
                        <div key={ id+name } className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img src={picture} alt="Product" className="w-20 h-20 object-cover rounded-md"/>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{name}</h3>
                            <p className="text-sm text-gray-500">{description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="text-gray-500 hover:text-gray-700" onClick={()=>Minus(productSelected)}> <MinusIcon/> </button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button className="text-gray-500 hover:text-gray-700" onClick={()=>Sum(productSelected)} ><Plus/></button>
                          </div>
                          <p className="font-semibold text-gray-900 w-20 text-right">${price}</p>
                          <button className=" hidden text-gray-400 hover:text-red-500">
                            <X/>
                          </button>
                        </div>
                      )
                  })
                }
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-base text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p className="font-semibold">{GlobalSubtotal}</p>
                </div>
                <div className="flex justify-between text-base text-gray-500 mb-4">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-base text-gray-500 mb-4">
                  <p>Iva %9</p>
                  <p>{iva}</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <p>Total</p>
                  <p>{globalTotal}</p>
                </div>
              </div>
            </div>
              
            <button 
            disabled={isPaying}
            onClick={handlePay}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
              <span className='flex justify-center gap-2'>Checkout { 
                isPaying ? <Loader className="animate-spin" /> : ''
              }</span>  
            </button>

            <button onClick={handleCancel} className="w-full bg-warning/70 hover:bg-warning text-white font-medium py-3 rounded-lg transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
