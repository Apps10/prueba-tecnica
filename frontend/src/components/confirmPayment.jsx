import React, { useEffect, useState } from 'react'
import { Plus, MinusIcon, X, Loader } from "lucide-react";
import { useOrderStore } from '../redux/hooks/useOrderStore'
import { usePaymentStore } from '../redux/hooks/usePaymentStore';
import { useAuthStore } from '../redux/hooks/useAuthStore';

export const ConfirmPaymentModal = () => {
    const { 
      paymentResponse,
      clearPaymentResponseAction
    } = usePaymentStore()

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Estado de la Transacción</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Estado:</p>
              <p id="transaccionStatus" className="text-gray-800 font-medium">{paymentResponse.status}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Monto:</p>
              <p id="amount" className="text-gray-800 font-medium">${paymentResponse.totalAmount}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Fecha:</p>
              <p id="payat" className="text-gray-800 font-medium">{paymentResponse.created_at}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Referencia:</p>
              <p id="reference" className="text-gray-800 font-medium">{'order-'+paymentResponse.orderId}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" 
              onClick={clearPaymentResponseAction}>Cerrar</button>
          </div>
        </div>
      </div>
    );
}
