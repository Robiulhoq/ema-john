import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return ( <div>
               <div className='logo'>
            <img src={logo}></img>
        </div>
        <div className="menu-item">
            <nav>
             <a href="/shop">Shop</a>
             <a href="/order review">Order review</a>
             <a href="/manage inventory">Manage inventory</a>
            </nav>
       </div>
    </div>
       
    );
};

export default Header;