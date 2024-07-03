import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const About = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-4">About Our Agricultural Landing Website</h1>
                    <p className="text-lg mb-4">
                        Welcome to our agricultural landing page! We are passionate about agriculture and committed to 
                        providing valuable information and resources for farmers and agricultural enthusiasts alike.
                    </p>
                    <p className="text-lg mb-4">
                        Our mission is to promote sustainable farming practices, share insights on agricultural 
                        technologies, and connect farmers with the latest market trends and innovations.
                    </p>
                    <p className="text-lg mb-4">
                        Whether you are a seasoned farmer or just starting out in agriculture, our website aims to be 
                        your go-to source for everything related to farming, from crop cultivation techniques to 
                        livestock management tips.
                    </p>
                    <p className="text-lg mb-4">
                        Explore our articles, guides, and resources curated by experts in the field, and join our 
                        community of agricultural enthusiasts dedicated to the future of farming.
                    </p>
                    <p className="text-lg mb-4">
                        Thank you for visiting us. Together, let's grow the future of agriculture.
                    </p>
                </div>
                <div>
                    <img src="https://storage.googleapis.com/5paisa-prod-storage/files/2022-07/Agri_3.jpg" alt="Agriculture" className="rounded-lg shadow-lg" />
                </div>
            </div>
            <div className="mt-10 text-center">
                    <Link to="/" className="text-[#4BAF47] border border-[#4BAF47] py-2 px-6 rounded-full font-semibold uppercase tracking-wide hover:bg-[#4BAF47] hover:text-white duration-300">
                        Back to Home
                    </Link>
                </div>
        </div>
    );
};

export default About;
