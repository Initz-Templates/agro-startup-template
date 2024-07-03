import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setBillingDetails } from "../features/billingSlice";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";

const Checkout = () => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [dropdownState, setDropdownState] = useState('');
    const [countries, setCountries] = useState([]);
    const [zipCode, setZipCode] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const billingDetails = useSelector(state => state.billing);
    const { subtotal, shippingCost, couponDiscount, total } = billingDetails;
    const [message, setMessage] = useState('');
    useEffect(() => {
        const storedBillingDetails = JSON.parse(localStorage.getItem('billingDetails'));
        if (storedBillingDetails) {
            dispatch(setBillingDetails(storedBillingDetails));
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryList = response.data.map(country => ({
                    name: country.name.common,
                    code: country.cca2
                }));
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching countries", error);
            }
        };

        fetchCountries();
    }, []);

    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
    };
    const handleDropdownStateChange = (event) => {
        setDropdownState(event.target.value);
    };

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };
    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    const handleEditOrder = () => {
        navigate('/all-cart-products')
    }


    const handlePlaceOrder = () => {
        if (subtotal === 0 && shippingCost === 0 && couponDiscount === 0 && total === 0) {
            toast.error('Please review your billing details before placing the order.');
            return;
        }

        if (!cardNumber) {
            toast.error('Please enter your card number.');
            return;
        }
        dispatch(clearCart());
        dispatch(setBillingDetails({ subtotal: 0, shippingCost: 0, couponDiscount: 0, total: 0 }));
        localStorage.removeItem('billingDetails');
        localStorage.removeItem('cart');
        toast.success('Order placed successfully!');
        setMessage('');
        setCardNumber('');
        setPhoneNumber('');
        setZipCode('');
        navigate('/payment-success')
    };


    return (
        <div>
            <div style={{ backgroundImage: `url('https://i.ibb.co/rybD1fm/title.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <p className="text-center text-white opacity-75">
                        <Link to='/' className='hover:text-[#49A760] transform duration-300'>Home</Link> / Checkout
                    </p>
                    <h1 className='text-center text-white text-4xl font-bold font-monrope mt-5'>Checkout</h1>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-5 mb-20 mt-10">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-[55%] w-full mx-auto ">
                        {/* Billing Details */}
                        <h1 className="font-monrope font-semibold text-lg">Billing Details</h1>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Company Name"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <FormControl variant="outlined" sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                <InputLabel id="dropdown-label">Select Country</InputLabel>
                                <Select
                                    labelId="dropdown-label"
                                    value={dropdownValue}
                                    onChange={handleDropdownChange}
                                    label="Select Country"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="House Number and Street Name"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Apartment, Suite, Unit etc. (optional)"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Town / City"
                                variant="outlined"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <FormControl variant="outlined" sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                <InputLabel id="dropdown-label">Select State</InputLabel>
                                <Select
                                    labelId="dropdown-label"
                                    value={dropdownState}
                                    onChange={handleDropdownStateChange}
                                    label="Select State"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Zip Code"
                                variant="outlined"
                                type="number"
                                value={zipCode}
                                onChange={handleZipCodeChange}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Phone number"
                                variant="outlined"
                                type="number"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <div className="mt-10">
                            <h1 className="font-monrope font-semibold">Additional Information</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                <TextField
                                    id="message"
                                    label="Message"
                                    value={message}
                                    multiline
                                    rows={4}
                                    sx={{ width: '100%', }}
                                />
                            </Box>
                        </div>
                    </div>
                    {/* ***********right side ***********/}
                    <div className="md:w-[40%] w-full mt-11 mb-96 mx-auto">
                        <div className='border p-5  h-96'>
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
                                                        color="secondary"
                                                        variant="contained"
                                                        sx={{
                                                            padding: '8px 10px', width: '100%', borderRadius: '5px',
                                                        }}
                                                        onClick={handleEditOrder}
                                                    >
                                                        Edit Order
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            <div className="mt-10">
                                <h1 className="text-lg font-monrope font-semibold">Payment Information</h1>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                    <TextField
                                        label="XXXX-XXXX-XXXX-XXXX"
                                        variant="outlined"
                                        type="number"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        required  // Add required prop here
                                        sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                                    />

                                    <p className="text-gray-400">Your Personal Data Will Be Used To Process Your Order, Support Your Experience Throughout This Website, And For Other Purposes Described In Our <Link to='/checkout' className="text-[#4BAF47]"><span>Privacy Policy</span></Link></p>

                                    <Button
                                        sx={{
                                            padding: '8px 10px', width: '100%', borderRadius: '5px', backgroundColor: '#4BAF47', color: 'white', '&:hover': { backgroundColor: '#6cd469' }
                                        }}
                                        onClick={handlePlaceOrder}
                                        disabled={subtotal === 0 && shippingCost === 0 && couponDiscount === 0 && total === 0}
                                    >
                                        Place Order
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
