import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbCurrencyTaka } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
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
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            toast.error(`${product.product_name} is already in the cart!`);
        } else {
            const discountedPrice = product.discount ? (product.price * 0.8).toFixed(2) : product.price;
            dispatch(addToCart({ ...product, price: discountedPrice, quantity: 1 }));
            toast.success(`Added ${product.product_name} to cart!`);
        }
    };

    return (
        <div className="bg-[#E9F1EE] mt-20">
            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
                <div className="mb-6">
                    <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-xl text-center'>Recently Added</p>
                    <h1 className="text-center text-3xl font-semibold font-monrope">Latest Products</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-5 2xl:gap-4 items-center justify-center justify-items-center mt-10">
                    {products.slice(0, 10).map(product => {
                        const discountedPrice = product.discount ? (product.price * 0.8).toFixed(2) : null;
                        return (
                            <div key={product.id} className="bg-white hover:bg-slate-100 transform duration-300 hover:scale-105 shadow-slate-500/25 rounded-lg shadow py-8 sm:py-8 md:py-5 lg:py-7 xl:py-8 2xl:py-8 w-60 sm:w-60 md:w-[200px] lg:w-[220px] xl:w-60 2xl:w-60 cursor-pointer">
                                <Link to={`product-details/${product.id}`}>
                                    <div className='flex justify-center'>
                                        <img className='w-40 md:w-36 hover:scale-105 transform transition-transform duration-300' src={product.image} alt="" />
                                    </div>
                                    <p className='text-center text-[12px] font-serif text-[#666666]'>{product.title}</p>
                                    <h2 className="text-md font-semibold text-center font-monrope mt-1">{product.product_name}</h2>
                                    {discountedPrice ? (
                                        <div className="mt-1 flex flex-col items-center justify-center">
                                            <p className="text-red-500 line-through flex items-center"><TbCurrencyTaka className='text-xl' />{product.price}</p>
                                            <p className="text-[#49A760] font-semibold flex items-center"><TbCurrencyTaka className='text-xl' />{discountedPrice}</p>
                                        </div>
                                    ) : (
                                        <p className="mt-1 flex items-center justify-center text-[#49A760] font-semibold "><TbCurrencyTaka className='text-xl' />{product.price}</p>
                                    )}
                                </Link>
                                <div className='flex justify-center pt-2'>
                                    <button onClick={() => handleAddToCart(product)} className='border border-[#F7C35F] transform duration-300 hover:text-white uppercase font-semibold text-[12px] font-monrope hover:bg-[#F7C35F] px-4 py-1 rounded-full'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-10 text-center">
                    <Link to="/" className="text-[#4BAF47] border border-[#4BAF47] py-2 px-6 rounded-full font-semibold uppercase tracking-wide hover:bg-[#4BAF47] hover:text-white duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LatestProducts;
