import React from 'react';
import CartDetails from '../Navbar/CartDetails';

function Checkout(props) {
    return (
        <div className='cart-main-page-container'>
            <CartDetails mainPage={true} showMessage={props.showMessage} />
        </div>
    )
}

export default Checkout;