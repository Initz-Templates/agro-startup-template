/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/elements.png';
import cardImge1 from '../assets/cardimg1.png';
import cardImge2 from '../assets/cardimg2.png';
import cardImge3 from '../assets/cardimg3.png';
import sectionImg from '../assets/section-2-1.png';
import sectionImg2 from '../assets/section-2-.png';
import { IoIosCheckmarkCircle } from "react-icons/io";
import Our_service from './home/Our_service';
import Farming from './home/Farming';
import Latest_products from './home/Latest_products';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.css';
import { HiArrowNarrowRight } from "react-icons/hi";
import Banners from './home/Banners';
import Add from './home/Add';
import { Link } from 'react-router-dom';
const images = [
    {
        url: 'https://i.ibb.co/tJgWT94/bg.png',
        title: 'Agriculture & ',
        title2: 'Eco Farming',
        subtitle: 'Welcome to Agro-Startup Template',
        text: 'Agriculture and eco farming promote a healthier environment and better future.'
    },
    {
        url: 'https://i.ibb.co/7ktP3Pj/bg-3.png',
        title: 'Agriculture',
        title2: '& Organic Market',
        subtitle: 'Welcome to Agr0-Startup Template',
        text: 'Agriculture and the organic market support sustainable practices.'
    },
    {
        url: 'https://i.ibb.co/J3DRmWk/bg-2.png',
        title: 'Natural Products',
        title2: 'For Lovers of Healthy',

        subtitle: 'Join Us for a Greener Future',
        text: 'Discover the benefits of sustainable farming and eco-friendly practices.'
    },
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000); // Change image every 6 seconds

        return () => clearInterval(interval);
    }, []);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const currentImage = images[currentIndex];
    // Function to chunk text into 300-word segments
    const chunkText = (text, chunkSize) => {
        const words = text.split(' ');
        const chunks = [];
        for (let i = 0; i < words.length; i += chunkSize) {
            chunks.push(words.slice(i, i + chunkSize).join(' '));
        }
        return chunks;
    };

    const textChunks = chunkText(currentImage.text, 10);

    return (
        <div>
            <div className="relative min-h-screen mt-[51px]">
                <AnimatePresence>
                    <motion.div
                        key={`${currentImage.url}_${currentIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentImage.url})` }}
                    >
                        <div className="flex items-center justify-center min-h-screen text-white">
                            <div className='w-full max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0'>
                                <div className="text-animation-container">
                                    <motion.div
                                        className='text-sm md:text-base lg:text-lg font-light uppercase'
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <p className='text-sm md:text-base lg:text-lg font-light uppercase'>{currentImage.subtitle}</p>
                                        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-2' style={{ fontFamily: "'Covered By Your Grace', cursive" }}>
                                            {currentImage.title.split(' ').map((word, index) => (
                                                index === 1 ? <span key={index} className='text-[#EEC044]'>{word} </span> : `${word} `
                                            ))}
                                        </h1>
                                        {currentImage.title2 && (
                                            <h1 className='text-5xl md:text-5xl lg:text-7xl font-bold leading-tight mt-2' style={{ fontFamily: "'Covered By Your Grace', cursive" }}>
                                                {currentImage.title2.split(' ').map((word, index) => (
                                                    index === 1 ? <span key={index} className='text-[#EEC044]'>{word} </span> : `${word} `
                                                ))}
                                            </h1>
                                        )}
                                        <p className='mt-5 text-sm  text-gray-300'>
                                            {textChunks.map((chunk, index) => (
                                                <React.Fragment key={index}>
                                                    {chunk}<br />
                                                </React.Fragment>
                                            ))}
                                        </p>
                                        <div className='mt-10 flex items-center gap-6'>
                                            <Link to="/services">
                                            <Button
                                                variant="contained"
                                                endIcon={<HiArrowNarrowRight />}
                                                color="success"
                                                sx={{
                                                    padding: '12px 15px', borderRadius: '5px', backgroundColor: '#4BAF47', color: 'white', '&:hover': { backgroundColor: '#6cd469' }
                                                }}
                                            >
                                                Discover More
                                            </Button>
                                            </Link>
                                            <motion.img
                                                src={logo}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 10 }}
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                                <div className='btn-dv '>
                                    <button className='btn1 hover:bg-green-500 hover:text-white transform duration-300' onClick={goToPreviousSlide}><ArrowBackIcon className='icn' /></button>
                                    <button className='btn2 hover:bg-green-500 hover:text-white transform duration-300' onClick={goToNextSlide}><ArrowForwardIcon className='icn' /></button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
            <div className='max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0'>
                {/* section card */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-5 mt-[-40px] z-10'>
                    <div className='bg-white shadow-lg flex flex-col items-center gap-3 py-2 px-10 rounded-lg shadow-gray-400 hover:bg-green-100 transform duration-300 group'>
                        <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-xl'>Feature 01</p>
                        <h1 className='text-lg font-semibold text-center whitespace-nowrap'>We are using a <br /> new technology</h1>
                        <img className="w-16 transform transition-transform duration-300 group-hover:scale-110" src={cardImge1} alt="" />
                    </div>
                    <div className='bg-white shadow-lg flex flex-col items-center gap-3 py-2 px-10  rounded-lg shadow-gray-400 hover:bg-green-100 transform duration-300 group'>
                        <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-xl'>Feature 02</p>
                        <h1 className='text-lg font-semibold text-center whitespace-nowrap'>Good in smart <br />organic services</h1>
                        <img className="w-16 transform transition-transform duration-300 group-hover:scale-110" src={cardImge2} alt="" />
                    </div>
                    <div className="bg-white shadow-lg flex flex-col items-center gap-3 py-2 px-10 rounded-lg shadow-gray-400 hover:bg-green-100 transform duration-300 group">
                        <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className="text-[#EEC044] text-xl">Feature 02</p>
                        <h1 className="text-lg font-semibold text-center whitespace-nowrap">Reforming <br /> in the systems</h1>
                        <img className="w-16 transform transition-transform duration-300 group-hover:scale-110" src={cardImge3} alt="Feature" />
                    </div>
                </div>

                {/*  section two */}
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 justify-between mt-28 px-5'>
                    <div className="relative 2xl:ms-10 ms-0">
                        <img className="w-[340px] transform transition-transform duration-300 hover:scale-105" src={sectionImg} alt="Main" />
                        <div className="absolute left-0 top-0 mt-[200px] ml-[-10px] md:mt-[200px] md:ml-[-40px] z-10">
                            <img className="w-[150px] md:w-[200px] transform transition-transform duration-300 hover:scale-105" src={sectionImg2} alt="Overlay" />
                        </div>
                    </div>

                    <div className='pt-36 md:pt-0 lg:pt-0 xl:pt-0'>
                        <h5 style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-2xl'>Our Introductions</h5>
                        <h1 className='text-5xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-[43px] font-semibold mt-2'>Agriculture & Organic
                            Product Farm</h1>
                        <h3 className='font-semibold text-[16px] md:text-[15px] whitespace-nowrap lg:text-[16px] text-[#4BAF47] my-5'>Agro-Startup is the largest global organic farm.</h3>
                        <p className='text-[#878680] text-[14px]'>
                        Agriculture & organic product farms cultivate sustainable, chemical-free crops, promoting environmental stewardship and healthy living through natural farming practices.
                        </p>
                        <div className='flex flex-col sm:flex-row my-5 items-center gap-14 w-[100%] justify-between'>
                            <div className='flex items-center gap-3'>
                                <img className='w-14 sm:w-14 md:w-12 lg:w-16 xl:w-16 2xl:w-16' src="https://i.ibb.co/4tCJK40/Icon.png" alt="" />
                                <p className='text-lg sm:text-[16px] md:text-[14px] lg:text-[16px] 2xl:text-[16px] font-semibold whitespace-nowrap '>Growing fruits <br />
                                    vegetables</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <img className='w-14 sm:w-14 md:w-12 lg:w-16 xl:w-16 2xl:w-16' src="https://i.ibb.co/VHM1T9L/dsaf.png" alt="" />
                                <p className='text-lg sm:text-[16px] whitespace-nowrap md:text-[14px] lg:text-[16px] 2xl:text-[16px]  font-semibold'>Tips for ripening <br />
                                    your fruits</p>
                            </div>
                        </div>

                        <div className='my-8'>
                            <p className='flex items-center gap-1'>
                                <IoIosCheckmarkCircle className='text-[#C5CE38]' />
                                <span>Cultivate eco-friendly produce with natural methods.</span>
                            </p>
                            <p className='flex items-center gap-1'>
                                <IoIosCheckmarkCircle className='text-[#C5CE38]' />
                                <span>Chemical-free organic products promote health and sustainability</span>
                            </p>

                        </div>
                        <Link to="/services">
                        <button className='px-7 hover:scale-105  py-3 flex items-center gap-1 text-white bg-[#4BAF47] mb-8 rounded hover:bg-[#6cd469] transform duration-300'>Discover more

                            <HiArrowNarrowRight className='text-lg' />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Our_service />
            {/* <Farming /> */}
            <Banners/>
            <Latest_products />
            <Add/>
        </div>
    );
};

export default Home;
