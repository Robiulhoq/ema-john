import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return ( <div>
               <div className='logo'>
            <img src={logo} alt="/"></img>
        </div>
        <div className="menu-item">
            <nav>
             <Link to ="/shop">Shop</Link>
             <Link to ="/review">Order review</Link>
             <Link to ="/inventory">Manage inventory</Link>
            <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
       </div>
    </div>
       
    );
};

export default Header;