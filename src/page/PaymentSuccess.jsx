import { Link } from 'react-router-dom';
import img from '../../public/Animation.json';
import Lottie from 'lottie-react';
import { Button } from '@mui/material';

const PaymentSuccess = () => {
    return (
        <div className="max-w-screen-xl mx-auto  px-5 flex justify-center items-center h-screen">
            <div className=" text-center">

                <div className="w-[500px] mx-auto">
                    <Lottie animationData={img} loop={false} autoplay={true} />
                    <Button  variant="contained"><Link to='/'>Go to Home</Link></Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
