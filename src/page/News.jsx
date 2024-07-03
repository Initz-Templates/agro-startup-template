
const News = () => {
    // Example data of news articles (replace with actual data or fetch from API)
    const newsArticles = [
        {
            id: 1,
            title: "New Study Shows Benefits of Organic Farming Methods",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwITA0V8vNDI2BdM68kXbSHB3YXzE75q0BtA&s",
            description: "A recent study conducted by researchers at Agriculture University highlights the environmental and health benefits of organic farming practices.",
            date: "July 1, 2024"
        },
        {
            id: 2,
            title: "Farmers Adopting IoT Technology to Improve Crop Yield",
            image: "https://images.prismic.io//intuzwebsite/ee51a4e5-4769-4a1b-b4a4-ce1ae93731a5_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8",
            description: "Farmers are increasingly integrating IoT devices to monitor soil moisture levels, optimize irrigation, and enhance overall crop productivity.",
            date: "June 28, 2024"
        },
        {
            id: 3,
            title: "Government Initiatives Promote Sustainable Agriculture",
            image: "https://storage.googleapis.com/jm-gcp-bethestory-p-12po-bucket/uploads/2023/09/sustainable-agriculture.jpg",
            description: "Governments worldwide are rolling out incentives and policies to encourage farmers to adopt sustainable agriculture practices for a greener future.",
            date: "June 25, 2024"
        },
        {
            id: 4,
            title: "New Crop Varieties Introduced to Withstand Climate Change",
            image: "https://khetigaadi.com/blog/wp-content/uploads/2018/07/Effect-of-Climate-Change-on-Agriculture.jpg",
            description: "In response to climate challenges, new crop varieties resistant to extreme weather conditions are being introduced, ensuring food security.",
            date: "June 20, 2024"
        },
        {
            id: 5,
            title: "Latest Trends in Vertical Farming Techniques",
            image: "https://smarttek.solutions/wp-content/uploads/vertical-farming-1.jpg",
            description: "Vertical farming continues to revolutionize urban agriculture with innovative techniques to maximize space and increase crop yields.",
            date: "June 15, 2024"
        },
        {
            id: 6,
            title: "Role of AI in Modern Agriculture",
            image: "https://bio-grow.com/wp-content/uploads/2023/04/artificial-intelligence-in-agriculture.png",
            description: "Artificial Intelligence is transforming agriculture with predictive analytics and automated farming practices, enhancing efficiency.",
            date: "June 10, 2024"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-8">Latest News and Updates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map(article => (
                    <div key={article.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                        <img src={article.image} alt={article.title} className="w-full h-60 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                            <p className="text-gray-700 mb-2">{article.description}</p>
                            <p className="text-sm text-gray-500">{article.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">Load More</button>
            </div>
        </div>
    );
};

export default News;
