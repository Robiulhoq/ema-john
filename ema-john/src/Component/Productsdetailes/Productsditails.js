import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Productsditails = () => {
    const {productkey} = useParams();
     const product = fakeData.find(pd => pd.key === productkey)
    return (
        <div>
            <h3>Your product detailes</h3>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default Productsditails;