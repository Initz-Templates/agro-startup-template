/* eslint-disable react/no-unescaped-entities */

// import React from 'react';

const Contact = () => {
    return (
        <div className="bg-gray-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="mb-8 md:mb-0">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                        <p className="text-lg text-gray-700 mb-6">
                            Have questions or need assistance? Get in touch with our support team.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
                                <p className="text-lg text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
                                <p className="text-lg text-gray-700">Georgia, Atlanta</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                                <p className="text-lg text-gray-700">0000000000</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                                <p className="text-lg text-gray-700"><a href="mailto:support@initializ.ai" className="text-blue-600 hover:underline">support@initializ.ai</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="md:justify-self-end">
                        <img 
                            src="https://storage.googleapis.com/5paisa-prod-storage/files/2022-07/Agri_3.jpg" 
                            alt="Contact Us" 
                            className="rounded-lg shadow-lg"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
