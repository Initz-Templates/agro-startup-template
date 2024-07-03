/* eslint-disable no-unused-vars */
import {  FaFacebookF, FaHandHolding, FaInstagram, FaPinterest, FaTwitter, FaWeebly } from 'react-icons/fa';
import call from '../../assets/call.png';
import icon from '../../assets/Icon.png';
import location from '../../assets/Vector.png';
import { Link } from 'react-router-dom';

const Submenu = () => {
    return (
        <div className="hidden lg:block">
            <div className='max-w-screen-xl mx-auto py-1 px-5'>
                <div className='flex justify-between items-center gap-5'>
                    <Link to='/'> <img className='w-10' src="https://banner2.cleanpng.com/20180326/pse/kisspng-sustainable-agriculture-research-conservation-agri-agriculture-5ab96f69ed9fb2.4696676415221021219733.jpg" alt="" /></Link>
                    <div className='flex justify-between items-center gap-9'>
                        <div className='flex items-center gap-2'>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://www.facebook.com/profile.php?id=61556962362662' target='_blank'>
                                <FaFacebookF className='w-3' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://www.instagram.com/initializ.ai/' target='_blank'>
                                <FaInstagram className='w-4' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://x.com/initializ/' target='_blank'>
                                <FaTwitter className='w-5' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://initializ.ai/' target='_blank'>
                                <FaWeebly className='w-5' />
                                </a>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={call} alt="" />
                            <div>
                                <p className='text-[#878680]'>Call anytime</p>
                                <p className='text-[#878680] text-sm'>0000000000</p>
                            </div>
                        </div>
                        <div className='h-14 w-[2px] bg-gray-200'></div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={icon} alt="" />
                            <div>
                                <p className='text-[#878680]'>Send email</p>
                                <p className='text-[#878680] text-sm'>support@initializ.ai</p>
                            </div>
                        </div>
                        <div className='h-14 w-[2px] bg-gray-200'></div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={location} alt="" />
                            <div>
                                <p className='text-[#878680] text-sm'>Georgia, Atlanta</p>
                                <p className='font-semibold'></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Submenu;
