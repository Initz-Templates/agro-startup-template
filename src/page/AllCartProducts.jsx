import { useSelector, useDispatch } from 'react-redux';
import { TbCurrencyTaka } from "react-icons/tb";
import { IconButton, TextField, Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { setBillingDetails } from '../features/billingSlice';
import { FaArrowRight } from 'react-icons/fa';

const AllCartProducts = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const couponDiscount = 10;
    const shippingCost = 50;
    const [couponCode, setCouponCode] = useState('');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost - couponDiscount;
    const navigate = useNavigate();

    const handleIncrease = (item) => {
        dispatch({ type: 'cart/addToCart', payload: { id: item.id, quantity: 1 } });
    };

    const handleDecrease = (item) => {
        dispatch({ type: 'cart/removeFromCart', payload: { id: item.id } });
    };

    const handleRemoveFromCart = (id) => {
        dispatch({ type: 'cart/deleteFromCart', payload: { id } });
    };

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            toast.success('Coupon applied successfully!');
            setCouponCode('');
        } else {
            toast.error('Please enter a valid coupon code. try agrios123');
        }
    };

    const handleCheckout = () => {
        if (total === 0) {
            toast.error('Please review your billing details before placing the order.');
            return;
        } else {
            const billingDetails = { subtotal, shippingCost, couponDiscount, total };
            dispatch(setBillingDetails(billingDetails));
            localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
            navigate('/checkout');
        }


    };

    return (
        <div>
            <div style={{ backgroundImage: `url('https://i.ibb.co/rybD1fm/title.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <p className="text-center text-white opacity-75">
                        <Link to='/' className='hover:text-[#49A760] transform duration-300'>Home</Link> / Cart
                    </p>
                    <h1 className='text-center text-white text-4xl font-bold font-monrope mt-5'>Cart Products</h1>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-5 my-10">
                <div className='flex flex-col xl:flex-row justify-between gap-5'>
                    <div className='border p-5 rounded-xl'>
                        <Box sx={{ overflow: 'auto' }}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body1" fontWeight="bold">
                                                Product
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                Price
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                Quantity
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                Total
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                Remove
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">No items in the cart</TableCell>
                                        </TableRow>
                                    ) : (
                                        cartItems.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div className='flex items-center'>
                                                        <img src={item.image} alt={item.product_name} className='w-28 border p-1 rounded' />
                                                        <span className='ml-5 text-md font-semibold'>{item.product_name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <span className='flex items-center justify-center'>
                                                        <TbCurrencyTaka className='text-xl' /> <span>{item.price}</span>
                                                    </span>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="remove" onClick={() => handleDecrease(item)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    {item.quantity}
                                                    <IconButton
                                                        aria-label="add"
                                                        onClick={() => handleIncrease(item)}
                                                        disabled={item.quantity >= item.stock}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">${(Number(item.price) * item.quantity).toFixed(2)}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="remove" onClick={() => handleRemoveFromCart(item.id)}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 2 }}>
                            <TextField
                                label="Enter Coupon Code"
                                variant="outlined"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                            <Button
                                onClick={handleApplyCoupon}
                                variant="contained"
                                color="secondary"
                                sx={{ width: { xs: '100%', sm: 'auto', padding: '12px 15px', } }}
                            >
                                Apply Coupon <FaArrowRight className='text-md ms-1' /> 
                            </Button>
                        </Box>
                    </div>

                    {/* ***************right side***********/}
                    <div className='border p-5 rounded-xl h-96'>
                        <Box sx={{ overflow: 'auto', height: '100%' }}>
                            <Table sx={{ minWidth: 400 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                Billing Summary
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className='flex flex-col gap-5'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-md font-monrope'>Subtotal</span>
                                                    <span className='flex items-center justify-center'>
                                                        <TbCurrencyTaka className='text-lg' /> <span>{subtotal}</span>
                                                    </span>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-md font-monrope'>Shipping</span>
                                                    <span className='flex items-center justify-center'>
                                                        <TbCurrencyTaka className='text-lg' /> <span>{shippingCost}</span>
                                                    </span>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-md font-monrope'>Coupon discount</span>
                                                    <span className='flex items-center justify-center'>
                                                        - <TbCurrencyTaka className='text-lg' /> <span>{couponDiscount}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-md font-monrope font-semibold'>Total</span>
                                                    <span className='flex items-center justify-center'>
                                                        <TbCurrencyTaka className='text-lg' /> <span className='font-semibold'>{total}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='mt-5'>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        padding: '8px 10px', width: '100%', borderRadius: '5px', backgroundColor: '#4BAF47', color: 'white', '&:hover': { backgroundColor: '#6cd469', }
                                                    }}
                                                    onClick={handleCheckout}
                                                    disabled={subtotal === 0}
                                                >
                                                    Proceed To Checkout <FaArrowRight className='text-md ms-1' /> 
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCartProducts;
