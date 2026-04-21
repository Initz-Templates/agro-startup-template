import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AdminRoute from "../components/auth/AdminRoute";
import UserRoute from "../components/auth/UserRoute";

const Home = lazy(() => import("../page/Home"));
const ProductsDetails = lazy(() => import("../page/home/Products_details"));
const About = lazy(() => import("../page/About"));
const ServiceDetails = lazy(() => import("../page/home/Service_details"));
const AllCartProducts = lazy(() => import("../page/AllCartProducts"));
const Checkout = lazy(() => import("../page/Checkout"));
const PaymentSuccess = lazy(() => import("../page/PaymentSuccess"));
const News = lazy(() => import("../page/News"));
const NewsDetails = lazy(() => import("../page/NewsDetails"));
const Contact = lazy(() => import("../page/Contact"));
const OurService = lazy(() => import("../page/home/Our_service"));
const Products = lazy(() => import("../page/home/Products"));
const AdminProducts = lazy(() => import("../page/admin/AdminProducts"));
const AdminProductForm = lazy(() => import("../page/admin/AdminProductForm"));
const Login = lazy(() => import("../page/auth/Login"));
const Register = lazy(() => import("../page/auth/Register"));
const Profile = lazy(() => import("../page/Profile"));

const withSuspense = (component) => (
    <Suspense fallback={<div className="py-24 text-center">Loading page...</div>}>
        {component}
    </Suspense>
);



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: withSuspense(<Home />),
            },
            {
                path: "products",
                element: withSuspense(<Products />),
            },
            {
                path: "product-details/:id",
                element: withSuspense(<ProductsDetails />),
            },
            {
                path: "products/product-details/:id",
                element: withSuspense(<ProductsDetails />),
            },
            {
                path: "all-cart-products",
                element: withSuspense(<AllCartProducts />),
            },
            {
                path: "checkout",
                element: withSuspense(
                    <UserRoute>
                        <Checkout />
                    </UserRoute>
                ),
            },
            {
                path: "payment-success",
                element: withSuspense(
                    <UserRoute>
                        <PaymentSuccess />
                    </UserRoute>
                ),
            },
            {
                path: "about",
                element: withSuspense(<About />),
            },
            {
                path: "news",
                element: withSuspense(<News />)
            },
            {
                path: "news/:id",
                element: withSuspense(<NewsDetails />),
            },
            {

                path: "contact",
                element: withSuspense(<Contact />)
            },{
                path:"services",
                element: withSuspense(<OurService />)
            },
            {
                path: "service-details/:id",
                element: withSuspense(<ServiceDetails />),
            },
            {
                path: "services/service-details/:id",
                element: withSuspense(<ServiceDetails />),
            },
            {
                path: "login",
                element: withSuspense(<Login />),
            },
            {
                path: "register",
                element: withSuspense(<Register />),
            },
            {
                path: "profile",
                element: withSuspense(
                    <UserRoute>
                        <Profile />
                    </UserRoute>
                ),
            },
            {
                path: "admin/products",
                element: withSuspense(
                    <AdminRoute>
                        <AdminProducts />
                    </AdminRoute>
                ),
            },
            {
                path: "admin/products/new",
                element: withSuspense(
                    <AdminRoute>
                        <AdminProductForm />
                    </AdminRoute>
                ),
            },
            {
                path: "admin/products/:id/edit",
                element: withSuspense(
                    <AdminRoute>
                        <AdminProductForm />
                    </AdminRoute>
                ),
            },
           
        ],
    },
]);