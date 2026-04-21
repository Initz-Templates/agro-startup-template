import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewsArticles } from "../services/catalogService";

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getNewsArticles();
                setArticles(Array.isArray(data) ? data : []);
            } catch (loadError) {
                console.error("Failed to load news articles", loadError);
                setError("Unable to load news right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto px-5 py-12 mt-20">
            <div className="text-center mb-10">
                <p style={{ fontFamily: "'Covered By Your Grace', cursive" }} className="text-[#EEC044] text-2xl">
                    Agro Insights
                </p>
                <h1 className="text-4xl font-semibold">Latest News and Updates</h1>
            </div>
            {loading && <p className="text-center text-[#878680]">Loading latest news...</p>}
            {error && !loading && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link key={article.id} to={`/news/${article.id}`} className="block">
                        <article className="fs-card overflow-hidden h-full">
                            <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
                            <div className="p-5">
                                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                <p className="text-gray-600 mb-3">{article.description}</p>
                                <p className="text-sm text-[#4BAF47] font-medium">
                                    {new Date(article.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                                </p>
                                <p className="text-sm font-semibold text-[#4BAF47] mt-3">Read full story →</p>
                            </div>
                        </article>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
