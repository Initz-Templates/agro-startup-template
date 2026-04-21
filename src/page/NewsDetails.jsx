import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import pageHeaderBg from "../assets/title.png";
import { getNewsArticleById } from "../services/catalogService";

const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getNewsArticleById(id);
        setArticle(data);
      } catch (loadError) {
        console.error("Failed to load news article", loadError);
        setError("Unable to load this news article right now.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <p className="text-center text-white opacity-75">
            <Link to="/" className="hover:text-[#49A760] transform duration-300">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/news" className="hover:text-[#49A760] transform duration-300">
              News
            </Link>
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">News Details</h1>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-5 py-10">
        {loading && <p className="text-center text-[#878680]">Loading article...</p>}
        {error && !loading && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && article && (
          <article className="fs-card overflow-hidden">
            <div className="relative">
              <img src={article.image} alt={article.title} className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-sm text-[#EEC044] font-semibold">
                  FarmStore Newsroom
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <p className="text-sm text-[#4BAF47] font-semibold uppercase tracking-wide">
                  {new Date(article.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {article.readTime && <span className="text-sm text-[#7b857a]">- {article.readTime}</span>}
                {article.author && <span className="text-sm text-[#7b857a]">- By {article.author}</span>}
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[#1f2a1f]">{article.title}</h2>
              <p className="text-[#646f63] leading-8 text-lg">{article.description}</p>
              <p className="text-[#646f63] leading-8 mt-5">
                FarmStore newsroom highlights important updates from the agriculture ecosystem, including supply-chain
                trends, farmer growth opportunities, and buyer demand signals to support better decisions.
              </p>
              {Array.isArray(article.keyTakeaways) && article.keyTakeaways.length > 0 && (
                <div className="mt-7 rounded-xl bg-[#fffef5] border border-[#ece3ba] p-5">
                  <h3 className="font-semibold text-[#2a3529]">Key Takeaways</h3>
                  <ul className="mt-3 space-y-2 text-[#5f6d5f]">
                    {article.keyTakeaways.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#4BAF47] font-bold">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(article.sections) && article.sections.length > 0 && (
                <div className="mt-8 space-y-6">
                  {article.sections.map((section) => (
                    <div key={section.heading} className="border border-[#e8eee7] rounded-xl p-5 bg-white">
                      <h3 className="text-xl font-semibold text-[#233024]">{section.heading}</h3>
                      <p className="mt-2 text-[#5f6d5f] leading-8">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-7 rounded-xl bg-[#f6faf4] border border-[#e1eadf] p-5">
                <h3 className="font-semibold text-[#2a3529]">Why this matters</h3>
                <p className="mt-2 text-[#5f6d5f] leading-7">
                  This update helps both farmers and customers adapt faster to market changes while maintaining quality,
                  trust, and smoother farm-to-home purchasing journeys.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/news" className="fs-btn-primary inline-flex items-center">
                  Back to News
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default NewsDetails;
