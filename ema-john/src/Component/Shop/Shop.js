import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const fast10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(fast10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart);
        const previewsCart = productsKeys.map ( existingkey => {
            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity = savedCart[existingkey];
            return product;
        
        })
        setCart(previewsCart);
    },[])

    const hendleAddproducts = (product) => {
        const toBeaddedkey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeaddedkey);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeaddedkey);
            newCart =[...others, sameProduct];
            
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        
        
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='shop-container'>
             <div className="products-container">
                {
                  products.map(pd => <Product showAddToCart={true}
                    key={pd.key}
                    hendleAddproduct = {hendleAddproducts}
                    product={pd}></Product>)
                 }
                
             </div>
     <div className="cart-container">
       <Cart cart ={cart}>
       <Link to="/review">
            <button>Review Odder</button>
            </Link>
       </Cart>
    </div>
                
        </div>
    );
};

export default Shop;