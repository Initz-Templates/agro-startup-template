import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdPaperPlane } from "react-icons/io";
import { addToWishlist } from '../../features/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { FaSpinner } from 'react-icons/fa';
import { addProductReview, getProductById } from '../../services/catalogService';
import pageHeaderBg from '../../assets/title.png';

const Products_details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, review: '' });
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector(state => state.cart.items);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const selectedProduct = await getProductById(id);
                if (selectedProduct) {
                    const formattedProduct = selectedProduct.discount
                        ? { ...selectedProduct, discountedPrice: (selectedProduct.price * 0.8).toFixed(2) }
                        : selectedProduct;
                    setProduct(formattedProduct);
                    setReviews(Array.isArray(selectedProduct.reviews) ? selectedProduct.reviews : []);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // ****************add to wishlist********
    const handleAddToWishList = (product) => {
        const existingItem = wishlistItems.find(item => item.id === product.id);
        if (existingItem) {
            toast.error(`${product.product_name} is already in the wishlist!`);
        } else {
            const price = product.discount ? product.discountedPrice : product.price;
            const productWithQuantity = { ...product,price, quantity };
            dispatch(addToWishlist(productWithQuantity));
            toast.success(`Added ${product.product_name} to wishlist!`);
        }
    };

    // ***************add to cart********
    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            toast.error(`${product.product_name} is already in the cart!`);
        } else {
            const price = product.discount ? product.discountedPrice : product.price;
            const productWithQuantity = { ...product, price, quantity };
            dispatch(addToCart(productWithQuantity));
            toast.success(`Added ${product.product_name} to cart!`);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            return newQuantity;
        });
        toast.success(`Quantity increased to ${quantity + 1}`);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => {
                const newQuantity = prevQuantity - 1;
                return newQuantity;
            });
            toast.info(`Quantity decreased to ${quantity - 1}`);
        } else {
            toast.warn('Quantity cannot be less than 1');
        }
    }

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (/^\d+$/.test(value)) {
            setQuantity(parseInt(value, 10));
        } else if (value === '') {
            setQuantity('');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleReviewSubmit = async () => {
        setIsSubmittingReview(true);
        if (!newReview.review.trim()) {
            toast.error("Please write your review first.");
            setIsSubmittingReview(false);
            return;
        }

        try {
            const data = await addProductReview(id, {
                rating: Number(newReview.rating),
                comment: newReview.review,
            });
            setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
            setNewReview({ rating: 5, review: '' });
            toast.success("Review submitted successfully");
        } catch (submitError) {
            console.error("Review submit failed", submitError);
            toast.error(submitError?.response?.data?.message || "Unable to submit review.");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    const divStyle = {
        backgroundImage: `url(${pageHeaderBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div>
            <div style={divStyle}>
                <div>
                    <p className="text-center text-white opacity-75"> <Link to='/' className='hover:text-[#49A760] transform duration-300'>Home</Link> / product / product-details</p>
                    <h1 className='text-center text-white text-4xl font-bold font-monrope mt-5'>Product Details</h1>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto py-10 px-5'>
                <div className='flex flex-col md:flex-row items-center'>
                    <img
                        src={product.image}
                        alt={product.product_name}
                        className='w-2/3 p-5 md:w-1/3 rounded-lg shadow-slate-400/35 bg-[#f7f4f0] transform transition-transform duration-300 hover:scale-105'
                    />
                    <div className='md:ml-10 mt-5 md:mt-0'>
                       <div className='flex items-center justify-center md:justify-start gap-5'>
                            <h2 className="text-3xl font-bold font-monrope">{product.product_name}</h2>
                            {product.discount ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-red-500 line-through flex items-center"><TbCurrencyTaka className='text-2xl' />{product.price}</p>
                                    <p className="text-[#49A760] flex items-center font-semibold"><TbCurrencyTaka className='text-2xl' />{product.discountedPrice}</p>
                                </div>
                            ) : (
                                <p className="mt-2 text-xl text-[#49A760] flex items-center font-monrope"><TbCurrencyTaka className='text-2xl' />{product.price}</p>
                            )}
                        </div>
                        <p className='mt-3 text-[#878680] text-[13px] font-monrope text-center md:text-start'>({reviews.length} Customer Reviews)</p>
                        <hr className='my-5' />
                        <p className="mt-5 text-[#878680] font-sans">{product.description}</p>

                        <div className='mt-6 flex gap-5 items-center justify-center md:justify-start'>
                            <h1 className='text-lg font-bold font-monrope'>Choose Quantity</h1>
                            <div className="mt-2 flex items-center border rounded-lg w-20 h-20">
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-12 text-center text-lg font-semibold rounded-l-lg focus:outline-none"
                                    style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                />
                                <div className="flex flex-col border-l rounded-r-lg">
                                    <button onClick={decrementQuantity} className="px-2 border-b py-3"><AiOutlineMinus /></button>
                                    <button onClick={incrementQuantity} className="px-2 py-3"><AiOutlinePlus /></button>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-center md:justify-start  gap-5 mt-6'>
                            <button onClick={() => handleAddToCart(product)} className='mt-5 border  transform duration-300 hover:text-white  font-semibold text-[14px] font-monrope hover:bg-[#58ce54] px-8 py-3 text-white rounded-lg bg-[#4BAF47]'>
                                <span className='flex items-center gap-2'><IoCartOutline className='text-2xl' />Add to cart</span>
                            </button>
                            <button onClick={() => handleAddToWishList(product)} className='mt-5 border  transform duration-300 hover:text-white  font-semibold text-[14px] font-monrope hover:bg-[#eec144dc] px-8 py-3 text-white rounded-lg bg-[#EEC044]'>
                                <span className='flex items-center gap-2'><IoMdHeartEmpty className='text-2xl' />Add to wishlist</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='py-10'>
                    <h1 className='text-2xl font-semibold font-monrope mb-2'>Description</h1>
                    <p className='text-[#878680] font-sans'>{product.description || "No description available yet."}</p>
                </div>

                <div className='mt-20'>
                    <p className='text-xl font-bold font-monrope '>{reviews.length} review(s) for {product.product_name}</p>
                    <div className='mt-10 flex flex-col gap-6'>
                        {reviews.length === 0 && <p className='text-[#878680]'>No reviews yet. Be the first to review this product.</p>}
                        {reviews.map((item) => (
                            <div key={item._id || `${item.name}-${item.createdAt}`} className='border rounded-lg p-4'>
                                <h1 className='text-lg font-semibold mb-1'>{item.name}</h1>
                                <h1 className='text-sm text-[#4BAF47] mb-2 font-semibold'>
                                    {item.rating}/5 · {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                                </h1>
                                <p className='text-[#878680] font-sans'>{item.comment}</p>
                            </div>
                        ))}
                    </div>
                    <hr className='my-10' />
                </div>

                <div className='mt-10'>
                    <h1 className="text-2xl font-bold mb-4">Add a review</h1>
                    <p className='text-[#878680] font-sans mb-2'>Your rating and feedback</p>
                    <select
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                        className="w-full p-3 border bg-[#f7f4f0] border-[#f7f4f0] rounded-lg focus:outline-none focus:border-green-500 mb-4"
                    >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Fair</option>
                        <option value={1}>1 - Poor</option>
                    </select>
                    <textarea
                        className="w-full p-3 border bg-[#f7f4f0] border-[#f7f4f0] rounded-lg focus:outline-none focus:border-green-500 mb-4"
                        placeholder="Write your review here..."
                        rows="4"
                        name="review"
                        value={newReview.review}
                        required
                        onChange={handleInputChange}
                    ></textarea>
                    <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                    <button
                        className={`relative mt-5 flex items-center justify-center gap-1 w-2/12 p-3 bg-[#4BAF47] font-monrope text-white rounded-md hover:bg-[#6cd469] transform duration-300 ${isSubmittingReview ? 'opacity-50 pointer-events-none' : ''
                            }`}
                        onClick={handleReviewSubmit}
                        disabled={isSubmittingReview}
                    >
                        {isSubmittingReview ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <IoMdPaperPlane className="text-lg ms-1 opacity-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </>
                        ) : (
                            <>
                                <span>Submit Review</span>
                                <IoMdPaperPlane className="text-lg ms-1 transition duration-300" />
                            </>
                            
                        )}
                    </button>
                    <Link to="/" className="text-[#4BAF47] border border-[#4BAF47] py-2 px-6 rounded-full font-semibold uppercase tracking-wide hover:bg-[#4BAF47] hover:text-white duration-300">
                        Back to Home
                    </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Products_details;


