import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import Preloader from '../components/Preloade';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, [location]);

    const hideNavbarFooterRoutes = ['/payment-success'];

    const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

    return (
        <div>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    {!shouldHideNavbarFooter && <Navbar />}
                    <Outlet />
                    {!shouldHideNavbarFooter && <Footer />}
                </>
            )}
        </div>
    );
};

export default Main;
