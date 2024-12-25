import Joi from "joi-browser";
import toast from "react-hot-toast";
import React, { useState } from 'react'
import { usePaymentStore } from '../redux/hooks/usePaymentStore';
import { useShippingStore } from "../redux/hooks/useShippingStore";
import { useOrderStore } from "../redux/hooks/useOrderStore";
import { useAuthStore } from "../redux/hooks/useAuthStore";



export const CreditCardModal = () => {
  const { addShippingInfoAction, shippingInfo:shippingInfoStore } = useShippingStore()
  const { cryptcreditCard,  addCreditCardAction, isRegisterNewCreditCardAction, } = usePaymentStore()
  const { clearProductsSelectedAction, setconfirmOrderProductAction,  } = useOrderStore()

  const decryptCreditCard = (cryptcreditCard) ?JSON.parse(atob(cryptcreditCard)) : {
    ownName: "",
    cardNumber: "",
    expDate: "",
    cvv: ""
  } 

  const  { authUser } = useAuthStore()
  const [creditCardForm, setCreditCardForm] = useState(decryptCreditCard)

  const selectShippingInfo = ()=>{
    if(
      !shippingInfoStore.shippName ||
      !shippingInfoStore.address 
    ){
      return {
        shippName: authUser.fullName,
        address: authUser.address,
        city: "",
        state: "",
        postalCode: "",
        contry: ''
      }
    }
    return shippingInfoStore
  }

  const [shippingInfo, setShippingInfo] = useState(selectShippingInfo())

  const HandleCancel = () => {
    clearProductsSelectedAction(); 
    isRegisterNewCreditCardAction(false)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!validateForm()) return ;

    setconfirmOrderProductAction(true)
    isRegisterNewCreditCardAction(false)
    addShippingInfoAction(shippingInfo)
    addCreditCardAction(btoa(JSON.stringify(creditCardForm)))
  }

  const validateForm = () => {
    const schema = Joi.object({
      ownName: Joi.string().min(3).max(19).required().label('nombre del propietario'),
      cardNumber: Joi.number().min(999999999999).max(9999999999999999999).required().label('numero de tarjeta'),
      cvv: Joi.number().max(999).max(999).required(),
      shippName: Joi.string().min(3).max(19).required().label('nombre de quien recibe'),
      address:  Joi.string().min(3).max(40).required().label('direccion'),
      city:  Joi.string().min(3).max(20).required().label('ciudad'),
      state:  Joi.string().min(3).max(20).required().label('estado'),
      postalCode:  Joi.number().min(999).max(9999999).required().label('codigo postal'),
      contry:  Joi.string().valid('MX', 'US', 'ES', 'COL').required().label('pais'),
      expDate: Joi.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/).required()
    });

    const { error } = Joi.validate({...creditCardForm, ...shippingInfo}, schema, {
      abortEarly: true,
    });

    if (error) {
      toast.error(error.details[0].message);
      return false;
    }

    return true;
  };


  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className=" flex items-center justify-center p-4 w-full">
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6">
          
            <div className="max-h-[80vh] overflow-y-auto p-4">
              <form onSubmit={handleSubmit} className="bg-white w-full max-w-3xl mx-auto px-6 py-8 shadow-md rounded-md">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full lg:w-1/2 px-4">
                  
                    <h2 className="text-xl font-bold mb-4">Información de Pago</h2>
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      Nombre del Propietario:
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                      placeholder="Pepito perez"
                      onChange={(e)=>setCreditCardForm({...creditCardForm, ownName: e.target.value })}
                      value={creditCardForm.ownName}
                    />
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      Numbero de Tarjeta:
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                      maxLength={19}
                      placeholder="XXXX XXXX XXXX XXXX"
                      onChange={(e)=>setCreditCardForm({...creditCardForm, cardNumber: e.target.value })}
                      value={creditCardForm.cardNumber}
                    />
                    <div className="flex gap-x-2 mb-4">
                      <div className="flex-1">
                        <label className="text-neutral-800 font-bold text-sm mb-2 block">
                          Exp. date:
                        </label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                          maxLength={5}
                          id='expDate'
                          placeholder="MM/YY"
                          onChange={(e)=>setCreditCardForm({...creditCardForm, expDate: e.target.value })}
                          value={creditCardForm.expDate}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-neutral-800 font-bold text-sm mb-2 block">
                          CCV:
                        </label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                          maxLength={3}
                          placeholder="123"
                          onChange={(e)=>setCreditCardForm({...creditCardForm, cvv: e.target.value })}
                          value={creditCardForm.cvv}
                        />
                      </div>
                    </div>
                  </div>


                  <div className="w-full lg:w-1/2 px-4">
                    <h2 className="text-xl font-bold mb-4">Información de Envío</h2>
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      Nombre completo:
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                      placeholder="John Doe"
                      onChange={(e)=>setShippingInfo({...shippingInfo, shippName: e.target.value })}
                      value={shippingInfo.shippName}
                    />
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      Dirección:
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                      placeholder="Calle 123, Departamento 4B"
                      onChange={(e)=>setShippingInfo({...shippingInfo, address: e.target.value })}
                      value={shippingInfo.address}
                    />
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      Ciudad:
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                      placeholder="Ciudad"
                      onChange={(e)=>setShippingInfo({...shippingInfo, city: e.target.value })}
                      value={shippingInfo.city}
                    />
                    <div className="flex gap-x-2 mb-4">
                      <div className="flex-1">
                        <label className="text-neutral-800 font-bold text-sm mb-2 block">
                          Estado/Provincia:
                        </label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                          placeholder="Estado"
                          onChange={(e)=>setShippingInfo({...shippingInfo, state: e.target.value })}
                          value={shippingInfo.state}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-neutral-800 font-bold text-sm mb-2 block">
                          Código Postal:
                        </label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4"
                          placeholder="12345"
                          onChange={(e)=>setShippingInfo({...shippingInfo, postalCode: e.target.value })}
                          value={shippingInfo.postalCode}
                        />
                      </div>
                    </div>
                    <label className="text-neutral-800 font-bold text-sm mb-2 block">
                      País:
                    </label>
                    <select 
                      onChange={(e)=>setShippingInfo({...shippingInfo, contry: e.target.value })}
                      value={shippingInfo.contry}
                      className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg focus-visible:outline-none focus-visible:border-purple-600 mb-4">
                        <option value="">Selecciona un país</option>
                        <option value="MX">México</option>
                        <option value="US">Estados Unidos</option>
                        <option value="ES">España</option>
                        <option value="COL">Colombia</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={HandleCancel}
                    className="text-white px-6 py-2 rounded-md shadow bg-yellow-400 hover:bg-yellow-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700"
                  >
                    Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
