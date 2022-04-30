import React from 'react';
import ErrorWindowImage from "../../images/ErrorWindowImage.svg"

function ErrorWindow() {
    return (
        <div className='error-window'>
            <h3>Sorry for the inconvenience ☹</h3>
            <h3>There has been some error. We will be back soon.</h3>
            <img src={ErrorWindowImage} alt="Error" />
            <a href="https://storyset.com/online">Online illustrations by Storyset</a>
        </div>
    )
}

export default ErrorWindow;