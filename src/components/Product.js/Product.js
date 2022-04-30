import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OtherProducts from './OtherProducts';
import { Navigate, useLocation } from 'react-router-dom';
import { userConstants } from '../../redux/actions/userActions';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';

function Product(props) {
    const products = useSelector((state) => state.products.products);
    const location = useLocation();
    const quantityRef = useRef(1);
    const userData = useSelector((state) => state.userData);
    const productId = location.pathname.split("/").reverse()[0];
    const [isLoading, setIsLoading] = useState(false);
    console.log(productId);
    const selectedProduct = products.find((product) => product._id === productId);
    const dispatch = useDispatch();
    console.log(selectedProduct);
    if (!selectedProduct) {
        return <Navigate to="/" />
    }
    const others = products.filter((product) => product._id !== productId);
    const addToCart = async () => {
        if (!userData.isAuthenticated) {
            props.openSignupModal();
            return;
        }
        const cartData = [...userData.cart.regularProducts];
        const selectedItemInCart = cartData.findIndex((item) => {
            return item.productId === selectedProduct._id;
        });
        if (selectedItemInCart !== -1) {
            cartData[selectedItemInCart].quantity += Number(quantityRef.current.value);
        } else {
            cartData.push({
                productId: selectedProduct._id,
                productData: selectedProduct,
                quantity: Number(quantityRef.current.value),
            });
        }
        setIsLoading(true);
        axios({
            method: "PUT",
            baseURL: "https://supple-soap-backend-api.herokuapp.com/user/cart/update",
            data: {
                ...userData.cart,
                regularProducts: cartData,
            },
            headers: {
                "Authentication": localStorage.getItem("user"),
            }
        }).then((data) => {
            console.log(data.data);
            dispatch({
                type: userConstants.UPDATE_CART_DATA,
                payload: data.data.cart,
            });
            quantityRef.current.value = 1;
            setIsLoading(false);
            props.setShowCart(true);

        }).catch((err) => {
            setIsLoading(false);
            alert("There was some error", err);
        })
        // console.log(userData);
    }
    return (
        <React.Fragment>
            <div className='product-page-container'>
                <div className='product-page-card'>
                    <div className='product-page-image'>
                        <img src={selectedProduct.image} alt="" />
                    </div>
                    <div className='product-page-line'></div>
                    <div className='product-page-description'>
                        <div className='product-page-description-content'>
                            <h2 className='product-page-description-title'>{selectedProduct.name}</h2>
                            <p className='product-page-description-text'>{selectedProduct.description}</p>
                            <div>
                                <label htmlFor='quantity'>Quantity </label>
                                <div>
                                    <p>&#10006;</p>
                                    <input type="number" name="quantity" defaultValue={1} min={1} max={10} ref={quantityRef} />
                                </div>
                            </div>
                            <p className='product-page-description-price'>₹{selectedProduct.price}</p>
                        </div>
                        <div className='product-page-description-button-container'>
                            <button className='product-page-description-button' onClick={addToCart} disabled={isLoading}>{
                                isLoading ?
                                    <LoadingSpinner size={1} /> :
                                    "Add To Cart"
                            }</button>
                        </div>
                    </div>
                </div>
                <OtherProducts products={others} />
            </div >
        </React.Fragment>
    )
}

export default Product;