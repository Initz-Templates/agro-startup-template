
const SubFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='bg-[#1F1E17]'>
            <div className='max-w-screen-xl mx-auto  px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 '>
                <div className='flex flex-col md:flex-row justify-between items-center py-5'>
                    <div>
                        <p className='text-gray-400 font-monrope text-center'>© {currentYear} Initializ Inc. All Rights Reserved.</p>
                    </div>
                    <div className=''>
                        <p className='text-gray-400 font-monrope text-center'>
                            Terms of Use <span>|</span> Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubFooter;
