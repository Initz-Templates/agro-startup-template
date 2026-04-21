import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbCurrencyTaka } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { getProducts } from '../../services/catalogService';
import { Pagination } from '@mui/material';
import { matchesCategory } from '../../utils/productCategory';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const location = useLocation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const pageSize = 10;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError("Unable to load products right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
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

    const query = new URLSearchParams(location.search).get("q")?.trim().toLowerCase() || "";
    const categoryQuery = new URLSearchParams(location.search).get("category")?.trim().toLowerCase() || "";
    const filteredProducts = products.filter((product) =>
        (!query ||
            product.product_name?.toLowerCase().includes(query) ||
            product.title?.toLowerCase().includes(query)) &&
        (!categoryQuery || matchesCategory(product, categoryQuery))
    );
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const currentPageProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
        setPage(1);
    }, [query, categoryQuery]);

    return (
        <div className="bg-[#E9F1EE] mt-20">
            <div className="max-w-screen-xl mx-auto py-10 px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
                <div className="mb-6">
                    <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className='text-[#EEC044] text-xl text-center'>Recently Added</p>
                    <h1 className="text-center text-3xl font-semibold font-monrope">
                        {query
                            ? `Search Results for "${query}"`
                            : categoryQuery
                                ? `${categoryQuery.charAt(0).toUpperCase()}${categoryQuery.slice(1)} Products`
                                : "Latest Products"}
                    </h1>
                </div>
                {loading && (
                    <p className="text-center text-[#878680]">Loading products...</p>
                )}
                {error && !loading && (
                    <p className="text-center text-red-500">{error}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-5 2xl:gap-4 items-center justify-center justify-items-center mt-10">
                    {!loading && !error && currentPageProducts.map(product => {
                        const discountedPrice = product.discount ? (product.price * 0.8).toFixed(2) : null;
                        return (
                            <div key={product.id} className="fs-card py-8 sm:py-8 md:py-5 lg:py-7 xl:py-8 2xl:py-8 w-60 sm:w-60 md:w-[200px] lg:w-[220px] xl:w-60 2xl:w-60 cursor-pointer">
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
                                    <button onClick={() => handleAddToCart(product)} className='fs-btn-outline font-monrope'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {!loading && !error && filteredProducts.length === 0 && (
                    <p className="text-center mt-8 text-[#878680]">No products found for your search.</p>
                )}
                {!loading && !error && filteredProducts.length > pageSize && (
                    <div className="mt-10 flex justify-center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="success"
                            shape="rounded"
                        />
                    </div>
                )}
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
