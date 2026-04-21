import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { getServiceOffers } from '../../services/catalogService';

const Our_service = () => {
    const [products, setProducts] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fallbackServiceImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

    useEffect(() => {
        const loadOffers = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getServiceOffers();
                setProducts(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load services right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadOffers();
    }, []);

    return (
        <div className="bg-[#F8F7F0] mt-20">
            <div className="max-w-screen-xl mx-auto py-10  px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
                <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-center text-2xl'>Our Services</p>
                <h1 className="text-center text-4xl font-semibold ">
                    What We <span className='text-[#4BAF47]'>Offer</span>
                </h1>
                {loading && (
                    <p className="text-center text-[#878680] mt-6">Loading services...</p>
                )}
                {error && !loading && (
                    <p className="text-center text-red-500 mt-6">{error}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-items-center my-10">
                    {!loading && !error && products.map((product, index) => (
                        <Link
                            key={product.id}
                            to={`service-details/${product.id}`}
                            className={`relative bg-[#FFFFFF] rounded-xl w-64 sm:w-64 md:w-64 lg:w-52 xl:w-64 2xl:w-64 overflow-hidden transition-all duration-300 border border-[#edf2ea] ${hoveredIndex === index ? 'shadow-lg -translate-y-1' : 'shadow-sm'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img
                                className='h-40 sm:h-40 md:h-40 lg:h-36 xl:h-40 2xl:h-40 w-64 object-cover'
                                src={product.img1}
                                alt={product.offerName}
                                onError={(event) => {
                                    event.currentTarget.src = fallbackServiceImage;
                                }}
                            />
                            <div
                                className={`absolute top-[150px] left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-16 sm:w-16 md:w-16 lg:w-14 xl:w-16 2xl:w-16 h-16 sm:h-16 md:h-16 lg:h-14 xl:h-16 2xl:h-16 rounded-md flex items-center justify-center duration-300 ${hoveredIndex === index ? 'bg-[#EEC044]' : 'bg-[#C5CE38]'}`}
                            >
                                <img src={product.icon} alt={product.offerName} className="w-10" />
                            </div>
                            <div className='p-5'>
                                <div className="mt-5 min-h-[116px]">
                                    <h1 className="text-xl font-semibold my-2 leading-tight">{product.offerName}</h1>
                                    <p className="text-[#6f746d] text-[14px] leading-6">{product.title}</p>
                                </div>
                            </div>
                            {hoveredIndex === index && (
                                <div
                                    className='flex justify-end items-center px-5 absolute bottom-0 left-0 right-0 h-8 text-white cursor-pointer transition-transform duration-300 bg-[#4BAF47]'
                                >
                                    <ArrowRightAltIcon />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Our_service;
