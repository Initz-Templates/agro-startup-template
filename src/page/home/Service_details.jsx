import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import pageHeaderBg from '../../assets/title.png';
import { getServiceOffers } from '../../services/catalogService';

const Service_details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setLoadError("");
                const data = await getServiceOffers();
                const selectedProduct = Array.isArray(data)
                    ? data.find((item) => String(item.id) === String(id))
                    : null;
                setProduct(selectedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoadError("Unable to load service details right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="py-24 text-center text-[#6f746d]">Loading service details...</div>;
    }

    if (loadError) {
        return <div className="py-24 text-center text-red-500">{loadError}</div>;
    }

    if (!product) {
        return (
            <div className="py-24 text-center">
                <p className="text-xl font-semibold text-[#2f3a2e]">Service not found</p>
                <p className="text-[#6f746d] mt-2">The service you are looking for does not exist.</p>
                <Link
                    to="/services"
                    className="inline-flex mt-6 px-5 py-2 rounded-md bg-[#4BAF47] text-white hover:bg-[#6cd469] duration-300"
                >
                    Back to Services
                </Link>
            </div>
        );
    }

    const validate = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (name.trim().length === 0) {
            tempErrors.name = 'Full Name is required';
            isValid = false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }
        if (message.trim().length === 0) {
            tempErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                toast.success('Your question has been submitted!');
                setName('');
                setEmail('');
                setMessage('');
                setIsLoading(false);
            }, 2000);
        }
    };

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
        <div className='mb-5'>
            <div style={divStyle}>
                <div>
                    <h1 className='text-center text-white text-4xl font-bold font-monrope mt-5'>Service Details</h1>
                    <p className="text-center text-white opacity-75 mt-2 flex justify-center items-center">
                        <Link className='hover:text-[#4BAF47] transform duration-300' to='/'>
                            <span className='flex items-center gap-1'><IoPaperPlaneOutline />
                                Home </span>
                        </Link> / {product.offerName}
                    </p>

                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 mt-20">
                <div className='flex justify-center flex-col md:flex-row md:items-start items-center gap-5 w-full'>
                    <div className='md:w-[70%] w-full'>
                        <div>
                            <img src={product.img1} alt={product.offerName} className="w-full h-[500px] object-cover rounded-xl" />
                            <h1 className="text-4xl font-semibold font-monrope mt-5 text-gray-700">{product.offerName}</h1>
                            <div className="mt-5">
                                <p className='font-roboto leading-7 text-gray-700'>{product.title || "Service description is currently unavailable."}</p>
                            </div>

                            <h1 className='mt-8 text-2xl font-roboto text-gray-700 mb-3'>Why this service matters</h1>
                            <p className='font-roboto leading-7 text-gray-700'>
                                {product.longDescription || "FarmStore services are designed to support better sourcing, smoother operations, and trusted buyer confidence."}
                            </p>

                            <div className='mt-8 p-6 rounded-xl bg-[#F8F7F0] border border-[#e5eadf]'>
                                <h2 className='text-xl font-semibold text-[#2f3a2e]'>Key Highlights</h2>
                                <ul className='mt-4 space-y-2 text-[#5c6358]'>
                                    {(product.highlights || []).map((item) => (
                                        <li key={item} className='flex items-start gap-2'>
                                            <span className='text-[#4BAF47] font-bold'>-</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='mt-8'>
                                <h2 className='text-xl font-semibold text-[#2f3a2e] mb-3'>How it works</h2>
                                <div className='space-y-3'>
                                    {(product.process || []).map((step, index) => (
                                        <div key={step} className='p-4 rounded-lg border border-[#e5eadf] bg-white'>
                                            <p className='text-sm text-[#4BAF47] font-semibold'>Step {index + 1}</p>
                                            <p className='text-[#5c6358]'>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-10'>
                                {(product.gallery || [product.img1, product.img1]).slice(0, 2).map((imageUrl, index) => (
                                    <img
                                        key={`${product.id}-gallery-${index}`}
                                        className='w-full h-[220px] object-cover rounded-lg'
                                        src={imageUrl}
                                        alt={`${product.offerName} ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 mt-10 flex justify-center">
                <Link
                    to="/"
                    className="flex items-center px-4 py-2 bg-[#4BAF47] text-white rounded-md shadow-md hover:bg-[#6cd469] transform duration-300"
                >
                    <IoPaperPlaneOutline className="text-xl mr-2" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default Service_details;
