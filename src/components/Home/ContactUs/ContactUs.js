import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import soaps from "../../../images/soaponhand.png";
import axios from "axios";
import LoadingSpinner from '../../../LoadingSpinner';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const ContactUs = React.forwardRef((props, ref) => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const subjectRef = useRef("");
    const descriptionRef = useRef("");
    const [inputError, setInputError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const userData = useSelector((state) => state.userData);
    const setClearError = () => {
        setInputError("Please enter all fields");
        setTimeout(() => {
            setInputError("");
        }, 3000);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameRef.current.value === "" ||
            emailRef.current.value === "" ||
            subjectRef.current.value === "" ||
            descriptionRef.current.value === "") {
            setClearError();
            return;
        }
        setIsLoading(true);
        axios({
            baseURL: "https://supple-soap-backend-api.herokuapp.com/contactus",
            method: "POST",
            data: {
                name: nameRef.current.value,
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                description: descriptionRef.current.value,
            },
            headers: {
                "Authentication": localStorage.getItem("user"),
            }
        }).then((data) => {
            nameRef.current.value = "";
            emailRef.current.value = "";
            subjectRef.current.value = "";
            descriptionRef.current.value = "";
            setIsLoading(false);
            props.showMessage(data.data.message);
        }).catch((err) => {
            setIsLoading(false);
            props.showMessage("There was some error, please try again later!");
        })
    }
    return (
        <div className='contactus-container' ref={ref}>
            <div className='contactus-left'>
                <form className='contactus-form'>
                    <h1>Contact Us</h1>
                    <input type="text" placeholder='Name' name="name" ref={nameRef} />
                    <input type="email" placeholder='Email' name="email" ref={emailRef} />
                    <input type="text" placeholder='Subject' name="subject" ref={subjectRef} />
                    <textarea placeholder='Type your message here...' ref={descriptionRef} />
                    <button onClick={handleSubmit} disabled={isLoading}>
                        {
                            isLoading ?
                                <LoadingSpinner size={1} />
                                :
                                <React.Fragment>
                                    Submit
                                    <img src="https://img.icons8.com/ios-filled/50/ffffff/forward--v1.png" style={{ width: "20px" }} alt=">" />
                                </React.Fragment>
                        }
                    </button>
                    {
                        inputError &&

                        <p className='signup-error'>*{inputError}</p>
                    }
                </form>
            </div>
            <div className='contactus-right'>
                <img src={soaps} alt="soaps" />
            </div>
        </div>
    )
})

export default ContactUs;