/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaSpinner, FaWeebly } from "react-icons/fa";
import { IoMdPaperPlane, IoMdTime } from "react-icons/io";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubFooter from "./SubFooter";

// *********Define the validation schema using yup*********
const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
});

const Footer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    // *******handle form submission*********
    const onSubmit = (data) => {
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Subscribed successfully!");
            reset();
        }, 2000);
    };

    return (
        <>
            <div className="bg-[#24231D] w-full">
                <div className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 py-14">
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                            {/* **********Logo sections*************/}
                            <div className="flex flex-col items-center md:items-start">
                                <img className="w-48" src="https://banner2.cleanpng.com/20180326/pse/kisspng-sustainable-agriculture-research-conservation-agri-agriculture-5ab96f69ed9fb2.4696676415221021219733.jpg" alt="" />
                                <p className="text-gray-400 mt-5 text-center md:text-start">
                                </p>
                                <div className="mt-4">
                                    <p className="text-gray-400 mb-2">Follow us:</p>
                                    <div className='flex items-center gap-2 text-white'>

                                        <div className="flex justify-center items-center bg-[#1F1E17] rounded-full w-10 h-10 ">
                                        <a href='https://www.facebook.com/profile.php?id=61556962362662' target='_blank'>
                                            <FaFacebookF className="text-white text-xl transform transition duration-300 hover:scale-110" />
                                            </a>
                                        </div>
                                        <div className="flex justify-center items-center bg-[#1F1E17] rounded-full w-10 h-10 ">
                                        <a href='https://www.instagram.com/initializ.ai/' target='_blank'>
                                            <FaInstagram className="text-white text-xl transform transition duration-300 hover:scale-110" />
                                            </a>
                                        </div>
                                        <div className="flex justify-center items-center bg-[#1F1E17] rounded-full w-10 h-10 ">
                                        <a href='https://x.com/initializ/' target='_blank'>
                                            <FaTwitter className="text-white text-xl transform transition duration-300 hover:scale-110" />
                                            </a>
                                        </div>
                                        <div className="flex justify-center items-center bg-[#1F1E17] rounded-full w-10 h-10 ">
                                        <a href='https://initializ.ai/' target='_blank'>
                                            <FaWeebly className="text-white text-xl transform transition duration-300 hover:scale-110" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ***********Explore**********/}
                            <div>
                                <h1 className="text-white text-xl font-semibold  mt-2">Explore</h1>
                                <img className="w-60" src="https://i.ibb.co/gRQ5QMt/div-elementor-element.png" alt="" />
                                <div className="">
                                    <ul className="flex gap-10">
                                        <div className="flex flex-col gap-4">
                                            <Link to='/about' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300  text-gray-400 ">About</span>
                                                </li>
                                            </Link>
                                            <Link to='/services' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">Services</span>
                                                </li>
                                            </Link>
                                            <Link to='/products' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">Products</span>
                                                </li>
                                            </Link>
                                            <Link to='/shop' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">Shop</span>
                                                </li>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Link to='/careers' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">Careers</span>
                                                </li>
                                            </Link>
                                            <Link to='/news' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">News</span>
                                                </li>
                                            </Link>
                                            <Link to='/contact' className="">
                                                <li className="flex items-center gap-2 ">
                                                    <img className="w-4" src="https://i.ibb.co/SQYSXfF/Iconfg.png" alt="" />
                                                    <span className="text-md hover:text-[#EEC044] transform duration-300   text-gray-400 ">Contact</span>
                                                </li>
                                            </Link>
                                        </div>

                                    </ul>
                                </div>
                            </div>
                            {/* ***********Contacts**************/}
                            <div>
                                <h1 className="text-white text-xl font-semibold  mt-2">Contacts</h1>
                                <img className="w-60" src="https://i.ibb.co/gRQ5QMt/div-elementor-element.png" alt="" />
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="flex items-center gap-2 text-md  text-gray-400">
                                            <IoMdTime className="text-xl text-[#EEC044]" /> <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-md  text-gray-400">
                                            <IoLocationOutline className="text-xl text-[#EEC044]" /> <span>Georgia, Atlanta</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-md  text-gray-400">
                                            <IoCallOutline className="text-xl text-[#EEC044]" />
                                            <a href="tel:0000000000" className="text-gray-400 hover:text-[#EEC044]">
                                            0000000000
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-md  text-gray-400">
                                            <MdMailOutline className="text-xl text-[#EEC044]" />
                                            <a href="mailto:support@agrios.com" className="text-gray-400 hover:text-[#EEC044]">
                                            support@initializ.ai
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* **********Newsletter***********/}
                            <div>
                                <h1 className="text-white text-xl font-semibold  mt-2 self-start">Newsletter</h1>
                                <img className="w-60" src="https://i.ibb.co/gRQ5QMt/div-elementor-element.png" alt="" />
                                <form className="" onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                        className={`w-full p-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EEC044] focus:border-transparent`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    <button
                                        type="submit"
                                        className="mt-5 flex items-center justify-center gap-2 w-full p-3 hover:bg-[#EEC044]  text-white rounded-md bg-[#4BAF47] transform duration-300"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            <>
                                                <span>Subscribe</span>
                                                <IoMdPaperPlane className="text-md" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubFooter />
        </>
    );
};

export default Footer;
