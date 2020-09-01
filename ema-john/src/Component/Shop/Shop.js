import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const fast10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(fast10);
    const [cart, setCart] = useState([]);

    const hendleAddproducts = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className='shop-container'>
             <div className="products-container">
                {
                  products.map(pd => <Product
                    hendleAddproduct = {hendleAddproducts}
                    product={pd}></Product>)
                 }
                
             </div>
     <div className="cart-container">
       <Cart cart ={cart}></Cart>
    </div>
                
        </div>
    );
};

export default Shop;