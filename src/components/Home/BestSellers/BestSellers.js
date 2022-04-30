import React from 'react'
import { useSelector } from 'react-redux';
import curlUnderline from "../../../images/curl_underline.png";
import LoadingSpinner from '../../../LoadingSpinner';
import SoapDescription from './components/SoapDescription';

const BestSellers = (props) => {
    const products = useSelector((state) => state.products.products);
    return (
        <div className='bestseller-container' >
            <div className='bestseller-overlay'></div>
            <h1>BEST SELLERS</h1>
            <img src={curlUnderline} alt="underline" className='bestseller-underline' />
            <div className='bestseller-grid'>
                {
                    products.length === 0 ?
                        <LoadingSpinner />
                        : products.map((item, index) => {
                            if (index % 2 === 0) {
                                return <SoapDescription item={item} key={item._id} imgDirection={"down"} productId={item._id} />
                            } else {
                                return <SoapDescription item={item} key={item._id} imgDirection={"up"} productId={item._id} />
                            }
                        })
                }

            </div>
        </div>
    )
}

export default BestSellers;