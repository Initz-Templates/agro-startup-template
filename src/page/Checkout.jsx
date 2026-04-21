import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setBillingDetails } from "../features/billingSlice";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";
import pageHeaderBg from "../assets/title.png";
import { createOrder } from "../services/orderService";
import { useCurrentLocation } from "../hooks/useCurrentLocation";

const FALLBACK_COUNTRIES = [
    { name: "India", code: "IN" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "GB" },
    { name: "Canada", code: "CA" },
    { name: "Australia", code: "AU" },
];

const Checkout = () => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [dropdownState, setDropdownState] = useState('');
    const [countries, setCountries] = useState([]);
    const [statesByCountry, setStatesByCountry] = useState({});
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const { requestLocation, loadingLocation } = useCurrentLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const billingDetails = useSelector(state => state.billing);
    const cartItems = useSelector(state => state.cart.items);
    const { subtotal, shippingCost, couponDiscount, total } = billingDetails;
    const [message, setMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const dropdownMenuProps = {
        PaperProps: {
            sx: {
                maxHeight: "min(360px, calc(100vh - 32px))",
                overflowY: "auto",
            },
        },
    };
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
                const rawList = Array.isArray(response.data) ? response.data : [];
                const countryList = rawList
                    .map((country) => ({
                        name: country?.name?.common,
                        code: country?.cca2 || country?.cca3 || country?.name?.common,
                    }))
                    .filter((country) => country.name && country.code)
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCountries(countryList.length > 0 ? countryList : FALLBACK_COUNTRIES);
            } catch (error) {
                console.error("Error fetching countries", error);
                setCountries(FALLBACK_COUNTRIES);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states');
                const countryStateMap = {};
                const entries = Array.isArray(response.data?.data) ? response.data.data : [];
                entries.forEach((entry) => {
                    const countryName = entry?.name;
                    const states = Array.isArray(entry?.states)
                        ? entry.states.map((stateItem) => stateItem?.name).filter(Boolean)
                        : [];
                    if (countryName) {
                        countryStateMap[countryName] = states;
                    }
                });
                setStatesByCountry(countryStateMap);
            } catch (error) {
                console.error("Error fetching states", error);
                setStatesByCountry({});
            }
        };

        fetchStates();
    }, []);

    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
        setDropdownState('');
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
    const handleUseCurrentLocation = async () => {
        const details = await requestLocation();
        if (!details) return;
        if (details.country) setDropdownValue(details.country);
        if (details.state) setDropdownState(details.state);
        if (details.city) setCity(details.city);
        if (details.postalCode) setZipCode(String(details.postalCode).trim());
        toast.success("Location details applied to shipping form.");
    };

    const availableStates = statesByCountry[dropdownValue] || [];


    const handlePlaceOrder = async () => {
        if (subtotal === 0 && shippingCost === 0 && couponDiscount === 0 && total === 0) {
            toast.error('Please review your billing details before placing the order.');
            return;
        }

        if (!cardNumber) {
            toast.error('Please enter your card number.');
            return;
        }
        if (!fullName || !emailAddress || !addressLine1 || !city || !dropdownValue || !zipCode || !phoneNumber) {
            toast.error('Please fill complete shipping address details.');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Your cart is empty. Add products before placing an order.');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderPayload = {
                items: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    unitPrice: Number(item.price),
                })),
                billing: {
                    fullName,
                    email: emailAddress,
                    addressLine1,
                    addressLine2: addressLine2 || "",
                    city,
                    country: dropdownValue,
                    state: dropdownState,
                    zipCode: zipCode || "",
                    phoneNumber: phoneNumber || "",
                    note: message || "",
                },
                pricing: {
                    subtotal,
                    shippingCost,
                    couponDiscount,
                    total,
                },
                payment: {
                    method: "card",
                    cardLast4: String(cardNumber).slice(-4),
                },
            };

            await createOrder(orderPayload);

            dispatch(clearCart());
            dispatch(setBillingDetails({ subtotal: 0, shippingCost: 0, couponDiscount: 0, total: 0 }));
            localStorage.removeItem('billingDetails');
            localStorage.removeItem('cart');
            toast.success('Order placed successfully!');
            setMessage('');
            setCardNumber('');
            setPhoneNumber('');
            setZipCode('');
            setFullName('');
            setEmailAddress('');
            setAddressLine1('');
            setAddressLine2('');
            setCity('');
            navigate('/payment-success');
        } catch (error) {
            console.error("Error placing order", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    };


    return (
        <div>
            <div style={{ backgroundImage: `url(${pageHeaderBg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <div className="mt-3">
                            <Button
                                variant="outlined"
                                onClick={handleUseCurrentLocation}
                                disabled={loadingLocation}
                                sx={{ borderColor: "#4BAF47", color: "#4BAF47", borderRadius: "999px" }}
                            >
                                {loadingLocation ? "Fetching location..." : "Use my location for shipping"}
                            </Button>
                        </div>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={emailAddress}
                                onChange={(event) => setEmailAddress(event.target.value)}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <FormControl variant="outlined" sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                <InputLabel id="country-dropdown-label">Select Country</InputLabel>
                                <Select
                                    labelId="country-dropdown-label"
                                    value={dropdownValue}
                                    onChange={handleDropdownChange}
                                    label="Select Country"
                                    MenuProps={dropdownMenuProps}
                                    sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
                                >
                                    {countries.length === 0 && (
                                        <MenuItem value="" disabled>
                                            <em>Loading countries...</em>
                                        </MenuItem>
                                    )}
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
                                value={addressLine1}
                                onChange={(event) => setAddressLine1(event.target.value)}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Apartment, Suite, Unit etc. (optional)"
                                variant="outlined"
                                value={addressLine2}
                                onChange={(event) => setAddressLine2(event.target.value)}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <TextField
                                label="Town / City"
                                variant="outlined"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            {availableStates.length > 0 ? (
                                <FormControl variant="outlined" sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                                    <InputLabel id="state-dropdown-label">Select State</InputLabel>
                                    <Select
                                        labelId="state-dropdown-label"
                                        value={dropdownState}
                                        onChange={handleDropdownStateChange}
                                        label="Select State"
                                        MenuProps={dropdownMenuProps}
                                        sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {availableStates.map((stateName) => (
                                            <MenuItem key={stateName} value={stateName}>{stateName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    label="State / Province"
                                    variant="outlined"
                                    value={dropdownState}
                                    onChange={(event) => setDropdownState(event.target.value)}
                                    placeholder={dropdownValue ? "Type your state" : "Select country first"}
                                    sx={{ flex: '1 1 calc(50% - 8px)', mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                                />
                            )}
                            <TextField
                                label="Zip Code"
                                variant="outlined"
                                type="text"
                                value={zipCode}
                                onChange={handleZipCodeChange}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
                        </Box>
                        <div className="mt-10">
                            <h1 className="font-monrope font-semibold">Additional Information</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                <TextField
                                    id="message"
                                    label="Message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
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
                                        disabled={isPlacingOrder || (subtotal === 0 && shippingCost === 0 && couponDiscount === 0 && total === 0)}
                                    >
                                        {isPlacingOrder ? "Placing Order..." : "Place Order"}
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
