
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoIosCheckboxOutline } from 'react-icons/io';

const Banners = () => {
    return (
        <div className='bg-[#4BAF47] '>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>
                <div>
                    <img className='sm:w-[600px] w-full h-[450px]' src="https://i.ibb.co/x8VgFZV/div-shape.png" alt="" />
                </div>

                <div className='px-5 py-2'>
                    <h1 className='text-4xl font-bold mb-4 text-white'>Healthy life with <br /> fresh products</h1>
                    <p className='text-lg text-gray-200 2xl:w-[590px] xl:w-[550px]'>Embrace vitality with a healthy lifestyle enriched by fresh, wholesome products. Nourish your body and mind for sustained wellness and vibrant living.</p>
                    <div className='flex gap-10 mt-10 '>
                        <div>
                            <div className='w-[90px]'>

                                <CircularProgressbar
                                    value={66} // Set your desired progress value here
                                    text={`${66}%`}
                                    styles={buildStyles({
                                        textColor: '#F7C35F',
                                        pathColor: '#fff',
                                        trailColor: '#4B',
                                    })}
                                />

                            </div>
                            <p className='text-white mt-2 text-lg'>Organic Solutions</p>
                        </div>
                        <div className='h-30 bg-white w-[2px]'></div>
                        <div>
                            <div className='flex flex-col gap-5 '>
                                <p className='flex gap-2 items-center text-white'>
                                    <IoIosCheckboxOutline className=' text-xl'/>
                                    <span>Biodynamic food</span>
                                </p>
                                <p className='flex gap-2 items-center text-white'>
                                    <IoIosCheckboxOutline className=' text-xl'/>
                                    <span>Organic gardening</span>
                                </p>
                                <p className='flex gap-2 items-center text-white'>
                                    <IoIosCheckboxOutline className=' text-xl'/>
                                    <span>Organic food certification</span>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Banners;
