/* eslint-disable no-unused-vars */
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import call from '../../assets/call.png';
import icon from '../../assets/Icon.png';
import location from '../../assets/Vector.png';
import logoLight from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';

const Submenu = () => {
    const { locationLabel, loadingLocation, requestLocation } = useCurrentLocation();
    return (
        <div className="hidden lg:block">
            <div className='max-w-screen-xl mx-auto py-1 px-5'>
                <div className='flex justify-between items-center gap-5'>
                    <Link to='/'>
                        <img className='w-32' src={logoLight} alt="FarmStore" />
                    </Link>
                    <div className='flex justify-between items-center gap-9'>
                        <div className='flex items-center gap-2'>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                                <FaFacebookF className='w-3' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                                <FaInstagram className='w-4' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://x.com/' target='_blank' rel='noreferrer'>
                                <FaTwitter className='w-5' />
                                </a>
                            </div>
                            <div className=" hover:bg-green-100 p-1 rounded-full text-2xl transform transition duration-300 hover:scale-110">
                                <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
                                <FaLinkedinIn className='w-5' />
                                </a>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={call} alt="" />
                            <div>
                                <p className='text-[#878680]'>Call anytime</p>
                                <p className='text-[#878680] text-sm'>+1 404 555 0199</p>
                            </div>
                        </div>
                        <div className='h-14 w-[2px] bg-gray-200'></div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={icon} alt="" />
                            <div>
                                <p className='text-[#878680]'>Send email</p>
                                <p className='text-[#878680] text-sm'>support@farmstore.com</p>
                            </div>
                        </div>
                        <div className='h-14 w-[2px] bg-gray-200'></div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4' src={location} alt="" />
                            <div>
                                <button
                                  type="button"
                                  onClick={requestLocation}
                                  className='text-[#878680] text-sm hover:text-[#4BAF47] transition-colors'
                                  title="Click to share current location"
                                >
                                  {loadingLocation ? "Detecting location..." : locationLabel}
                                </button>
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
