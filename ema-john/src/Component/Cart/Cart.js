import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
//    const totalprice = cart.reduce((total, ped) => total + ped.price, 0);

 let total = 0;
 for (let i = 0; i < cart.length; i++) {
     const product = cart[i];
     total = total + product.price;
     
 }
    let shipping = 0;
   if(total > 35){
     shipping = 0;
 }
    else if(total > 15 ){
     shipping = 4.99;
 }
 else if (total > 0){
     shipping = 12.99;
 }
 const tex  = total /10;
    return (
        <div>
            <h3>Odder Summary</h3>
            <h5>items orderde: {cart.length} </h5>
            <p>Price: {total}</p>
            <p> shipping cost: {shipping}</p>
            <p>Text + vat: {tex}</p>
            <p> total price: {total + shipping + tex}</p>
            <br/>
             
        </div>
    );
};

export default Cart;