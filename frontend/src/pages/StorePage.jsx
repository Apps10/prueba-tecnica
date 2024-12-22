import { KeyRound, Loader2, Mail, Receipt, ShoppingCart} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios';

export const StorePage = () => {
  const [products, setProducts] = useState([])
  const [pagination, setPagination ] = useState({
    currentPage: null,
    lastPage: null,
    totalCount: null
  })

  const findProducts = async ()=>{
    const res = await axiosInstance.get('product');
    const { Products, metadata } = res.data 
    setProducts(Products)
    setPagination(metadata)
  }

  useEffect(()=>{
    findProducts()   
  },[])

  console.log(products);

  return (
    <div className="h-screen">
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow '>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
              { products.map(product=>{
                return <>
                  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src={product.picture} alt={`image.${product.name}`} />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  hover:text-gray-500" title='Ver Mas'>{product.name}</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2' >
                            <button  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Carrito
                                <ShoppingCart/>
                            </button>
                             <button  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-success rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                               Comprar
                               <Receipt />
                            </button>

                            </div>
                        </div>
                    </div>
                </>
                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
