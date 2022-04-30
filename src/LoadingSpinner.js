import React from 'react'

function LoadingSpinner(props) {
    return (
        <div className='loading-spinner-container'>
            <div className='loading-spinner' style={props.size && { width: `${props.size}rem`, height: `${props.size}rem` }}></div>
        </div>
    )
}

export default LoadingSpinner;