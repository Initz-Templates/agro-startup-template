import { FiWifiOff } from "react-icons/fi";

const CheckInternetConnection = () => {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <FiWifiOff className="text-4xl my-3" />
            <p className="text-xl mb-4">You are offline. Please check your internet connection.</p>
            <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Retry
            </button>
        </div>
    );
};

export default CheckInternetConnection;
