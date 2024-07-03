import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Our_service = () => {
    const [products, setProducts] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/whatWeOffer.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-[#F8F7F0] mt-20">
            <div className="max-w-screen-xl mx-auto py-10  px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
                <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-center text-2xl'>Our Services</p>
                <h1 className="text-center text-4xl font-semibold ">
                    What We <span className='text-[#4BAF47]'>Offer</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5 justify-items-center my-10">
                    {products.map((product, index) => (
                        <Link
                            key={product.id}
                            to={`service-details/${product.id}`}
                            className={`relative bg-[#FFFFFF] w-64 sm:w-64 md:w-64 lg:w-52 xl:w-64 2xl:w-64 overflow-hidden transition-shadow duration-300 ${hoveredIndex === index ? 'shadow-md shadow-[#C5CE38]' : 'shadow-md'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img className='h-40 sm:h-40 md:h-40 lg:h-36 xl:h-40 2xl:h-40 w-64' src={product.img1} alt={product.offerName} />
                            <div
                                className={`absolute top-[150px] left-3/4 transform  -translate-x-1/2 -translate-y-1/2 bg-[${hoveredIndex === index ? '#EEC044' : '#C5CE38'}] w-16 sm:w-16 md:w-16 lg:w-14 xl:w-16 2xl:w-16 h-16 sm:h-16 md:h-16 lg:h-14 xl:h-16 2xl:h-16 rounded-md flex items-center justify-center transition-background-color duration-300`}
                            >
                                <img src={product.icon} alt={product.offerName} className="w-10" />
                            </div>
                            <div className='p-5'>
                                <div className="mt-5">
                                    <h1 className="text-xl font-semibold my-2 ">{product.offerName}</h1>
                                    <p className="text-[#878680]">{product.title}</p>
                                </div>
                            </div>
                            {hoveredIndex === index && (
                                <div
                                    className='flex justify-end items-center px-5 absolute bottom-0 left-0  right-0  h-5 text-white cursor-pointer transition-transform duration-300 bg-[#EEC044] hover:text-[#FFFFFF] hover:translate-x-1 hover:translate-y-1 hover:scale-105'
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
