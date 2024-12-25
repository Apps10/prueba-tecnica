// src/payments/infrastructure/adapters/stripe-payment.adapter.ts
import { Injectable } from '@nestjs/common';
import { PaymentServicePort } from '../../domain/ports/payment-service.port';
import { ProcessOrderDto } from '../../domain/dto/process-order.dto';
import envs from 'src/contexts/shared/config/envs';
import axios from 'axios'
import { sha256 } from 'js-sha256';

@Injectable()
export class WPaymentAdapter implements PaymentServicePort {
  private readonly apiUrl:string = envs.UAT_SANDBOX_URL
  private readonly axiosInstance

  constructor(){
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      withCredentials: true
    })
  }


 async processPayment(processOrderDto: ProcessOrderDto) {
    const { amount, creditCard, orderId } = processOrderDto
   
    const getAceptationToken = (await this.axiosInstance.get(`${this.apiUrl}/merchants/${envs.UAT_SANDBOX_PUBLIC_KEY}`)).data
    const { presigned_acceptance, presigned_personal_data_auth } = getAceptationToken.data

    const cardToken = (await this.axiosInstance.post(`${this.apiUrl}/tokens/cards`, creditCard, {
      headers: {
        Authorization: 'Bearer '+ envs.UAT_SANDBOX_PUBLIC_KEY
      }
    })).data


    const payloadPayment =  {
      "type": "CARD",
      "token": cardToken.data.id,
      "customer_email": "pepito_perez@example.com",
      "acceptance_token": presigned_acceptance.acceptance_token,
      "accept_personal_auth": presigned_personal_data_auth.acceptance_token
  }

    const paymentSource = (await this.axiosInstance.post(`${this.apiUrl}/payment_sources`, payloadPayment, {
      headers: {
        Authorization: 'Bearer '+ envs.UAT_SANDBOX_PRIVATE_KEY
      }
    })).data

    const payloadTransaccion = 
      {
        "amount_in_cents": amount*100, // Monto current centavos
        "currency": "COP", // Moneda
        "signature": sha256('order-'+orderId+amount*100+"COP"+envs.UAT_SANDBOX_INTEGRITY_KEY), //Firma de integridad
        "customer_email": "example@gmail.com", // Email del usuario,
        "payment_method": {
          "installments": 1 // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
        },
        "reference": 'order-'+orderId, // Referencia única de pago
        "payment_source_id": paymentSource.data.id // ID de la fuente de pago
    }  

    const transaccion = (await this.axiosInstance.post(`${this.apiUrl}/transactions`, payloadTransaccion, {
      headers: {
        Authorization: 'Bearer '+ envs.UAT_SANDBOX_PRIVATE_KEY
      }
    })).data

    /**
     * se hace de esta manera debido a que la cuenta que sandbox ya tiene configurado un webhook,
     * lo ideal es que se cree la transaccion y luego desde el webhook es que se cambia el estado
     * se agrego un tiempo de espera porque en ocaciones se demora el procesar el pago.
     */
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(2000) 


    const searchTransaccion = (await this.axiosInstance.get(`${this.apiUrl}/transactions/${transaccion.data.id}` )).data;

    const { created_at,  currency, id, status, reference } = searchTransaccion.data;

    return {
      totalAmount: amount,
      created_at,
      currency,
      id,
      status,
      orderId: reference.slice(6, reference.length),
    }
    
  }

}
