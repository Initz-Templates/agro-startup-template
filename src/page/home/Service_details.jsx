/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { IoPaperPlaneOutline } from 'react-icons/io5'; // Changed import to IoPaperPlaneOutline for the paper plane icon

const Service_details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/whatWeOffer.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                const selectedProduct = data.find(item => item.id === parseInt(id));
                setProduct(selectedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const validate = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (name.trim().length === 0) {
            tempErrors.name = 'Full Name is required';
            isValid = false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }
        if (message.trim().length === 0) {
            tempErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                toast.success('Your question has been submitted!');
                setName('');
                setEmail('');
                setMessage('');
                setIsLoading(false);
            }, 2000);
        }
    };

    const divStyle = {
        backgroundImage: `url('https://i.ibb.co/rybD1fm/title.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className='mb-5'>
            <div style={divStyle}>
                <div>
                    <h1 className='text-center text-white text-4xl font-bold font-monrope mt-5'>Service Details</h1>
                    <p className="text-center text-white opacity-75 mt-2 flex justify-center items-center">
                        <Link className='hover:text-[#4BAF47] transform duration-300' to='/'>
                            <span className='flex items-center gap-1'><IoPaperPlaneOutline />
                                Home </span>
                        </Link> / {product.offerName}
                    </p>

                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 mt-20">
                <div className='flex justify-center flex-col md:flex-row md:items-start items-center gap-5 w-full'>
                    <div className='md:w-[70%] w-full'>
                        <div>
                            <img src={product.img1} alt={product.offerName} className="w-full h-[500px]" />
                            <h1 className="text-4xl font-semibold font-monrope mt-5 text-gray-700">{product.offerName}</h1>
                            <div className="mt-5">
                                <p className='font-roboto leading-7 text-gray-700'>{product.description}</p>
                            </div>
                            <h1 className='mt-5 text-2xl font-roboto text-gray-700 mb-5'>The importance of {product.offerName}</h1>
                            <p className='font-roboto leading-7 text-gray-700'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eveniet? Assumenda perspiciatis a error nulla, qui earum veniam labore consequuntur quo aut tempora vitae doloribus excepturi ipsa distinctio odio quam et at tenetur cum, porro cumque? Reiciendis animi porro fuga?</p>
                            <div className='grid grid-cols-2 gap-5 my-10'>
                                <img className='w-full h-[200px]' src={product.img2} alt="" />
                                <img className='w-full h-[200px]' src={product.img1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 mt-10 flex justify-center">
                <Link
                    to="/"
                    className="flex items-center px-4 py-2 bg-[#4BAF47] text-white rounded-md shadow-md hover:bg-[#6cd469] transform duration-300"
                >
                    <IoPaperPlaneOutline className="text-xl mr-2" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default Service_details;
