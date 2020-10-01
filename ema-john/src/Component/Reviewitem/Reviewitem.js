import React from 'react';

const Reviewitem = (props) => {
    const {name, quantity, key, price, img} = props.product;
    return (
            <div>
         <h4>{name}</h4>
         <p> Quantity: {quantity}</p>
         <h6>$ Price: {price}</h6>
         <img src={img} alt=""/>
        <button onClick={() =>props.removeitems(key)}>Remove</button>
        </div>
    );
};

export default Reviewitem;