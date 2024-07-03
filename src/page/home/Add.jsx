import { useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const [discountProducts, setDiscountProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('product.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const filteredProducts = data.filter(product => product.discount === 20); // Filter for 20% discount products
                setDiscountProducts(filteredProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const discountedPrice = (product.price * 0.8).toFixed(2);
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            toast.error(`${product.product_name} is already in the cart!`);
        } else {
            dispatch(addToCart({ ...product, price: discountedPrice, quantity: 1 }));
            toast.success(`Added ${product.product_name} to cart!`);
        }
    };

    return (
        <div className="bg-white">
            <div className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-5 justify-between items-center py-14">
                    <div className="relative overflow-hidden w-[340px] h-[450px] bg-[#4BAF47] border hover:shadow-xl">
                        <div className="absolute right-0 top-0 h-16 w-16">
                            <div className="absolute transform rotate-45 bg-white text-center text-[14px] py-1 right-[-54px] top-[50px] w-[240px]">
                                Save 20% & Free delivery
                            </div>
                        </div>
                        <div className="p-5 my-14 flex flex-col justify-center items-center">
                            <div>
                                <h1 className="text-white text-3xl uppercase font-semibold text-center">Organic <br /> Fresh Fruit</h1>
                                <img className="w-52 my-5" src="https://i.ibb.co/NmtWv27/14-png.png" alt="" />
                                <div className="flex flex-col justify-center items-center hover:scale-105 transform duration-300">
                                    <Link to="/products">
                                    <button className="bg-[#EEC044] flex text-[14px] items-center gap-1 hover:bg-[#ffcb3a] transform duration-300 py-2 px-8 rounded font-semibold">
                                        All Products
                                        <HiArrowNarrowRight className='text-lg' />
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center lg:justify-start justify-center gap-5">
                            <div className="flex items-center gap-3">
                                <div>
                                    <img className="w-14" src="https://i.ibb.co/hXnwTBs/Item-26-png.png" alt="" />
                                </div>
                                <div>
                                    <h1 className="text-[18px] font-semibold">Money Return</h1>
                                    <p className="text-[14px] text-gray-500">Back guarantee under 15 days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <img className="w-14" src="https://i.ibb.co/3CgpGGG/Item-27-png.png" alt="" />
                                </div>
                                <div>
                                    <h1 className="text-[18px] font-semibold">Member Discount</h1>
                                    <p className="text-[14px] text-gray-500">Big offer for the new members</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-5 2xl:gap-4 items-center justify-center justify-items-center mt-10">
                            {discountProducts.slice(0, 3).map(product => {
                                const discountedPrice = (product.price * 0.8).toFixed(2);
                                return (
                                    <div key={product.id} className="bg-white hover:bg-slate-100 transform duration-300 hover:scale-105 shadow-slate-500/25 rounded-lg shadow py-8 sm:py-8 md:py-5 lg:py-7 xl:py-8 2xl:py-8 w-60 sm:w-60 md:w-[200px] lg:w-[220px] xl:w-60 2xl:w-60 cursor-pointer">
                                        <Link to={{
                                            pathname: `product-details/${product.id}`,
                                            state: { discountedPrice: discountedPrice }
                                        }}>
                                            <div className='flex justify-center'>
                                                <img className='w-40 md:w-36 hover:scale-105 transform transition-transform duration-300' src={product.image} alt="" />
                                            </div>
                                            <p className='text-center text-[12px] font-serif text-[#666666]'>{product.title}</p>
                                            <h2 className="text-md font-semibold text-center font-monrope mt-1">{product.product_name}</h2>
                                            <div className="mt-1 flex flex-col items-center justify-center">
                                                <p className="text-red-500 line-through flex items-center"><TbCurrencyTaka className='text-xl' />{product.price}</p>
                                                <p className="text-[#49A760] font-semibold flex items-center"><TbCurrencyTaka className='text-xl' />{discountedPrice}</p>
                                            </div>
                                        </Link>
                                        <div className='flex justify-center pt-2'>
                                            <button onClick={() => handleAddToCart(product)} className='border border-[#F7C35F] transform duration-300 hover:text-white uppercase font-semibold text-[12px] font-monrope hover:bg-[#F7C35F] px-4 py-1 rounded-full'>Add to cart</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
