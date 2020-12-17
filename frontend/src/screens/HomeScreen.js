import React, { useEffect, useState } from 'react';
import axios from      'axios';
import Product from    '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function HomeScreen() {
  const [products ,  setProducts]  =  useState([]);
  const [loading  ,   setLoading]  =  useState(false);
  const [error    ,     setError]  =  useState(false);

  useEffect(() => {
      const fetchData = async () =>{                           /*send a request */
       try{
          setLoading(true);
          const { data } = await axios.get('/api/products');   /*the array of backend will be transferred to front end */
          setLoading(false);
          setProducts(data);                                   /*setting products what we are getting from backend */
    } catch(err) {
          setError(err.message);
          setLoading(false);
    }
  };
    fetchData(); //calling fetch data 
  },[]);

    return (
       <div>
         {loading ? (
           <LoadingBox></LoadingBox>
         ) : error ? (
           <MessageBox varient = "danger"> {error}</MessageBox>
         ) : (
            <div className = "row center">
              {products.map((product) => (
                <Product key = {product.id} product ={product}></Product>
              ))}
              </div>
         )}

            </div>
    );
  }