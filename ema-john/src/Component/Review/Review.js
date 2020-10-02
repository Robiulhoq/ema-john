import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import gifimg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setcart] = useState([]);
    const [odderplaced, setOdderplaced] = useState(false);
    const history = useHistory();

    const hendlePlaceOdder = () =>{
       history.push('/shipment');

    }

    const removeitem = (productkey) =>{
                const newcart = cart.filter(pd => pd.key !==productkey);
                setcart(newcart);
                removeFromDatabaseCart(productkey);    
    }
    useEffect(() => {
        const savedCart =  getDatabaseCart();
        const productkeys = Object.keys(savedCart);
        const cartProducts= productkeys.map( key => {
            const product = fakeData.find (pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        },);
        setcart(cartProducts);    
    },[]);

    let thankyou; 
    if(odderplaced){
      thankyou =  <img src={gifimg} alt=""/>
}
     
    return (
        <div className="shop-container">
           <div className="products-container">
           {
               cart.map(pd => <Reviewitem removeitems ={removeitem} product={pd} ></Reviewitem>)
           }
           {thankyou}
        
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={hendlePlaceOdder}>Proceed Chackout</button>
               </Cart>
           </div>
        </div>
    );
};

export default Review;