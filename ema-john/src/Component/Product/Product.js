import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
const Product = (props) => {
    
    const {name, img, seller, price, stock, key}  = props.product;
    return (
        <div className='product'> 
             <div className='product-img'>
             <img src={img} alt=""/>
             </div>
             <div className='product-name'>
            <h4><Link to={"product/"+key}>{name}</Link></h4>
             <br/>
             <p>by: {seller}</p>
             <p>$ {price}</p>
             <br/>
             <p>Only {stock} left in stock -oder soon</p>
             <br/>
         { props.showAddToCart &&    <button onClick={() => props.hendleAddproduct(props.product)}>Add to cart</button>}
             </div>
        </div>
    );
};

export default Product;