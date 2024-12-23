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
    <div className="">
      <div className='flex items-center justify-center pt-20 px-4  '>
        <div className='rounded-lg shadow-cl w-full max-w-6xl  bg-gray-300'>
          <div className='flex rounded-lg bg-gray-300 px-6 sm:p-6 '>
            <div className='h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  overflow '>
              { products.map(product=>{
                return <>
                  <div class="rounded-lg shadow dark:bg-gray-800 bg-white">
                        <a href="#">
                            <img class="rounded-t-lg w-48 h-50" src={product.picture} alt={`image.${product.name}`} />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white  hover:text-primary" title='Ver Mas'>{product.name}</h5>
                            </a>
                            <p class="text-xl  text-gray-700 dark:text-gray-400"><span className='font-bold'>$</span> {product.price}</p>
                            <p class="text-md  text-gray-700 dark:text-gray-400 "><span className='font-bold'>Stock Disponible: </span> {product.stock}</p>

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
