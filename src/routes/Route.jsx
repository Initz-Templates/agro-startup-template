import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/Home";
import Products_details from "../page/home/Products_details";
import About from "../page/About";
import Service_details from "../page/home/Service_details";
import AllCartProducts from "../page/AllCartProducts";
import Checkout from "../page/Checkout";
import PaymentSuccess from "../page/PaymentSuccess";
import News from "../page/News";
import Contact from "../page/Contact";
import Our_service from "../page/home/Our_service";
import Products from "../page/home/Products";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "product-details/:id",
                element: <Products_details />,
            },
            {
                path: "products/product-details/:id",
                element: <Products_details />,
            },
            {
                path: "all-cart-products",
                element: <AllCartProducts />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "news",
                element: <News />
            },
            {

                path: "contact",
                element: <Contact />
            },{
                path:"services",
                element: <Our_service />
            },
            {
                path: "service-details/:id",
                element: <Service_details />,
            },
            {
                path: "services/service-details/:id",
                element: <Service_details />,
            },
           
        ],
    },
]);