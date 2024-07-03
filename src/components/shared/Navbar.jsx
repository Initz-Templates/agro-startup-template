/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Submenu from './Submenu';
import { IoSearchSharp } from 'react-icons/io5';
import { BiMenuAltRight } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import './style.css';
import navbr from '../../assets/nav.png';
import Searchbar from '../searchbar/Searchbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import { Badge, Modal, Box, Typography, IconButton, Fade, Backdrop, Table, TableHead, TableBody, TableRow, TableCell, Button, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MenuLoginIcon from './menuLoginIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, deleteFromCart, addAllToCart } from '../../features/cartSlice';
import { addToWishlist, clearWishlist, deleteFromWishlist, removeFromWishlist } from '../../features/wishlistSlice';
import { toast } from 'react-toastify';
import { TbCurrencyTaka } from 'react-icons/tb';
import { setBillingDetails } from '../../features/billingSlice';
import { FaArrowRight } from 'react-icons/fa';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [favoriteModalOpen, setFavoriteModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [anchorElServices, setAnchorElServices] = useState(null);
    const [anchorElProducts, setAnchorElProducts] = useState(null);
    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const couponDiscount = 10;
    const shippingCost = 50;
    // const [couponCode, setCouponCode] = useState('');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost - couponDiscount;
    // **********handle Increase Decrease quantity************
    const handleIncrease = (item) => {
        dispatch(addToCart({ id: item.id, quantity: 1 }));
        const newQuantity = item.quantity + 1;
        toast.success(`Quantity increased for ${item.product_name} ${newQuantity}`);
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch(removeFromCart(item));
            const newQuantity = item.quantity - 1;
            toast.info(`Quantity decreased for ${item.product_name} ${newQuantity}`);
        } else {
            toast.warn('Quantity cannot be less than 1');
        }
    };

    //  *********remove from cart**********
    const handleRemoveFromCart = (id) => {
        dispatch(deleteFromCart({ id }));
        toast.success("Removed  from cart!");
    };

    // **********wishlist handle Increase Decrease quantity*************
    const handleIncreaseWishlist = (product) => {
        dispatch(addToWishlist({ id: product.id, quantity: 1 }));
        const newQuantity = product.quantity + 1;
        toast.success(`Quantity increased for ${product.product_name} ${newQuantity}`);
    };
    const handleDecreaseFromWishlist = (product) => {
        if (product.quantity > 1) {
            dispatch(removeFromWishlist(product));
            const newQuantity = product.quantity - 1;
            toast.info(`Quantity decreased for ${product.product_name} ${newQuantity}`);
        } else {
            toast.warn('Quantity cannot be less than 1');
        }
    };
    const handleRemoveFromWishlist = (id) => {
        dispatch(deleteFromWishlist({ id }));
        toast.success("Removed  from wishlist!");
    };

    //******** add to all cart *******
    const handleAddAllToCart = () => {
        if (wishlistItems.length > 0) {
            dispatch(addAllToCart(wishlistItems));
            dispatch(clearWishlist());
            toast.success('Added all wishlist items to cart!');
        } else {
            toast.error('No items found in the wishlist!');
        }
    };
    const handleViewFullCart = () => {
        navigate('/all-cart-products'); // Navigate to the cart page
    };

    const handleMenuOpen = (event, menu) => {
        if (menu === 'services') {
            setAnchorElServices(event.currentTarget);
        } else if (menu === 'products') {
            setAnchorElProducts(event.currentTarget);
        }
    };

    const handleMenuClose = (menu) => {
        if (menu === 'services') {
            setAnchorElServices(null);
        } else if (menu === 'products') {
            setAnchorElProducts(null);
        }
    };

    const handleCartModalOpen = () => setCartModalOpen(true);
    const handleCartModalClose = () => setCartModalOpen(false);

    const handleFavoriteModalOpen = () => setFavoriteModalOpen(true);
    const handleFavoriteModalClose = () => setFavoriteModalOpen(false);
    const handleSearchModalOpen = () => setSearchModalOpen(true);
    const handleSearchModalClose = () => setSearchModalOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarStyle = {
        backgroundImage: isScrolled ? 'none' : `url(${navbr})`,
        backgroundColor: isScrolled ? '#F8F7F1' : 'transparent',
        transition: 'background-color 0.5s ease, background-image 0.5s ease', // Add smooth transition
        zIndex: '50', // Set a negative z-index
    };

    // ******* add to cart ************
    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(deleteFromWishlist({ id: item.id }));
        toast.success(`${item.product_name} added to cart!`);
    };

    const isActiveLink = (path) => location.pathname === path ? 'text-[#4BAF47] underline underline-offset-4' : '';
    const handleCheckout = () => {
        const billingDetails = { subtotal, shippingCost, couponDiscount, total };
        dispatch(setBillingDetails(billingDetails));
        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
        navigate('/checkout');
    };
    return (
        <div>
            <Submenu />
            <nav style={navbarStyle} className={`custom-navbar w-full ${isScrolled ? 'fixed top-0 z-50 shadow-lg ' : 'absolute'}`}>
                <div className="max-w-screen-xl mx-auto  px-5 sm:px-5 md:px-24 lg:px-10 xl:px-24 2xl:px-0">
                    <div className="flex items-center justify-between md:py-4 py-5">
                        <div className="flex items-center justify-between">
                            <div className="hidden lg:flex space-x-2">
                                <NavLink
                                    to='/'
                                    exact
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/')}`}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to='/about'
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/about')}`}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    to='/services'
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/services')}`}
                                >
                                    Services
                                </NavLink>
                                {/* <div>
                                    <button
                                        className="flex gap-1px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300  space-x-1"
                                        onClick={(event) => handleMenuOpen(event, 'services')}
                                    >
                                        <span>Services</span>
                                        {anchorElServices ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
                                    </button>
                                    <Menu
                                        anchorEl={anchorElServices}
                                        open={Boolean(anchorElServices)}
                                        onClose={() => handleMenuClose('services')}
                                        PaperProps={{
                                            style: {
                                                width: '200px',
                                                height: '200px',
                                                borderTop: '10px solid #EEC044',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services' className="text-base font-medium">
                                                Services
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/service2' className="text-base font-medium">
                                                Service 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/service2' className="text-base font-medium">
                                                Service 2
                                            </NavLink>
                                        </MenuItem>
                                    </Menu>
                                </div> */}
                                <NavLink
                                    to='/products'
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/products')}`}
                                >
                                    Products
                                </NavLink>
                                {/* <div>
                                    <button
                                        className="px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 flex gap-1"
                                        onClick={(event) => handleMenuOpen(event, 'products')}
                                    >
                                        <span>Products</span>
                                        {anchorElProducts ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
                                    </button>
                                    <Menu
                                        anchorEl={anchorElProducts}
                                        open={Boolean(anchorElProducts)}
                                        onClose={() => handleMenuClose('products')}
                                        PaperProps={{
                                            style: {
                                                width: '200px',
                                                height: '300px',
                                                borderTop: '10px solid #EEC044',
                                            },
                                        }}
                                    >
                                        
                                        <MenuItem onClick={() => handleMenuClose('products')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/products' className="text-base font-medium">
                                                Products
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <NavLink to='/services/details' className="text-base font-medium">
                                                Products 1
                                            </NavLink>
                                        </MenuItem>
                                    </Menu>
                                </div> */}

                                <NavLink
                                    to='/news'
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/news')}`}
                                >
                                    News
                                </NavLink>
                                <NavLink
                                    to='/contact'
                                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 ${isActiveLink('/contact')}`}
                                >
                                    Contact
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-7">
                            <Searchbar />
                            <Badge badgeContent={cartItems.length} color="success" onClick={handleCartModalOpen} sx={{ cursor: 'pointer' }}>
                                <AddShoppingCartSharpIcon className='bg-[#ECF5E8]' style={{ height: '40px', width: '40px', borderRadius: '50%', padding: '10px' }} />
                            </Badge>
                            <Badge badgeContent={wishlistItems.length} color="success" onClick={handleFavoriteModalOpen} sx={{ cursor: 'pointer' }}>
                                <FavoriteBorderIcon className='bg-[#ECF5E8]' style={{ height: '40px', width: '40px', borderRadius: '50%', padding: '10px' }} />
                            </Badge>

                            <MenuLoginIcon />
                        </div>

                        {/* Mobile menu button */}

                        <div className="flex justify-between items-center w-full lg:hidden">
                            <Link to='/'>
                                <img className=' w-28' src='https://i.ibb.co/wsZpB6J/logo.png' alt="Logo" />
                            </Link>
                            <div>
                                <div className="flex gap-5 items-center ">
                                    {/* searchBar icon*/}
                                    <IoSearchSharp className='text-2xl' onClick={handleSearchModalOpen} />
                                    <Badge badgeContent={cartItems.length} color="success" onClick={handleCartModalOpen} sx={{ cursor: 'pointer' }}>
                                        <AddShoppingCartSharpIcon className='bg-[#ECF5E8]' style={{ height: '40px', width: '40px', borderRadius: '50%', padding: '10px' }} />
                                    </Badge>
                                    <Badge badgeContent={wishlistItems.length} color="success" onClick={handleFavoriteModalOpen} sx={{ cursor: 'pointer' }}>
                                        <FavoriteBorderIcon className='bg-[#ECF5E8]' style={{ height: '40px', width: '40px', borderRadius: '50%', padding: '10px' }} />
                                    </Badge>
                                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-600 ">
                                        {isOpen ? <RxCross2 className='text-3xl' /> : <BiMenuAltRight className='text-3xl' />}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Mobile menu content */}
                <div className={isOpen ? 'menu-visible' : 'menu-hidden'} style={{ backgroundColor: '#F8F7F1' }}>
                    {/* Mobile navigation links */}
                    <div className="px-2 pt-2 pb-3 space-y-1 text-center">
                        <NavLink to='/' exact className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/')}`}>Home</NavLink>
                        <NavLink to='/about' className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/about')}`}>About</NavLink>
                        <div className='flex justify-center'>
                            <button
                                className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#4BAF47] hover:underline hover:underline-offset-4 duration-300 space-x-1"
                                onClick={(event) => handleMenuOpen(event, 'services')}
                            >
                                <span>Services</span>
                                {anchorElServices ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
                            </button>
                            <Menu
                                anchorEl={anchorElServices}
                                open={Boolean(anchorElServices)}
                                onClose={() => handleMenuClose('services')}
                                PaperProps={{
                                    style: {
                                        width: '200px',
                                        height: '200px',
                                        borderTop: '10px solid #EEC044',
                                    },
                                }}
                            >
                                {/* Menu Items for Services */}
                                <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <NavLink to='/services' className="text-base font-medium">
                                        Services
                                    </NavLink>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <NavLink to='/services' className="text-base font-medium">
                                        Services 1
                                    </NavLink>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose('services')} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <NavLink to='/services' className="text-base font-medium">
                                        Services 2
                                    </NavLink>
                                </MenuItem>
                            </Menu>
                        </div>
                        <NavLink to='/products' className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/products')}`}>  Products
                        </NavLink>
                        <NavLink to='/news' className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/news')}`}>News</NavLink>
                        <NavLink to='/contact' className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/contact')}`}>Contact</NavLink>
                    </div>


                </div>
            </nav>
            {/*************Modal for search bar ***************/}
            <Modal
                aria-labelledby="search-modal-title"
                aria-describedby="search-modal-description"
                open={searchModalOpen}
                onClose={handleSearchModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {
                        backdropFilter: 'blur(5px)', // Adding background blur
                    },
                }}
            >
                <Fade in={searchModalOpen} timeout={500}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: '80%', lg: '60%', xl: '50%', },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleSearchModalClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography id="search-modal-title" variant="h6" component="h2" fontWeight="bold" className='mb-52'>
                            Search
                        </Typography>
                        {/* Your search bar component goes here */}
                        <Searchbar />
                    </Box>
                </Fade>
            </Modal>

            {/**************add to cart modal****************/}
            <Modal
                aria-labelledby="cart-modal-title"
                aria-describedby="cart-modal-description"
                open={cartModalOpen}
                onClose={handleCartModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={cartModalOpen} timeout={500}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: '80%', lg: '60%', xl: '50%', },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleCartModalClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography id="cart-modal-title" variant="h6" component="h2" fontWeight="bold">
                            Cart Items
                        </Typography>
                        <Box sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                            <Table sx={{ minWidth: 650 }}>
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
                                            <TableCell colSpan={5} align="center">No items add to wishlist</TableCell>
                                        </TableRow>
                                    ) : (
                                        cartItems.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">
                                                    <div className='flex items-center'>
                                                        <img src={item.image} alt={item.product_name} className='w-28 border p-1 rounded' />
                                                        <span className='ms-5 text-md font-semibold'>{item.product_name}</span>
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
                            <Button
                                variant="contained"
                                onClick={handleViewFullCart}
                                color="success"
                                sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            >
                               View Full Cart <FaArrowRight className='text-md ms-1' /> 
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                                onClick={handleCheckout}
                                disabled={subtotal === 0}
                            >
                                Proceed to Checkout <FaArrowRight className='text-md ms-1' /> 
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* *****************add to wishlist*************** */}
            <Modal
                aria-labelledby="favorite-modal-title"
                aria-describedby="favorite-modal-description"
                open={favoriteModalOpen}
                onClose={handleFavoriteModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={favoriteModalOpen} timeout={500}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: '80%', lg: '60%', xl: '50%', },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleFavoriteModalClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography id="cart-modal-title" variant="h6" component="h2" fontWeight="bold">
                            Wishlist Items
                        </Typography>
                        <Box sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                            <Table sx={{ minWidth: 650 }}>
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
                                                Action
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
                                    {wishlistItems.length > 0 ? (
                                        wishlistItems.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">
                                                    <div className='flex  items-center '>
                                                        <img src={item.image} alt={item.product_name} className='w-28 border p-1 rounded' />
                                                        <span className='ms-5 text-md font-semibold'>{item.product_name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">${item.price}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="remove" onClick={() => handleDecreaseFromWishlist(item)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    {item.quantity}
                                                    <IconButton
                                                        aria-label="add"
                                                        onClick={() => handleIncreaseWishlist(item)}
                                                        disabled={item.quantity >= item.stock} // Disable button if quantity reaches stock limit
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell align="center">${(Number(item.price) * item.quantity).toFixed(2)}</TableCell>
                                                <TableCell align="center">
                                                    <button className='text-[#4BAF47]' onClick={() => handleAddToCart(item)}>Add to cart</button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="remove" onClick={() => handleRemoveFromWishlist(item.id)}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">No items add to wishlist</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            >
                                View Wishlist
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                                // onClick={() => console.log('Checkout button clicked')}
                                onClick={handleAddAllToCart}
                            >
                                Add to all Cart
                            </Button>
                        </Box>

                    </Box>

                </Fade>
            </Modal>
        </div>
    );
};

export default Navbar;
