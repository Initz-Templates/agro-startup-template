import { Link } from "react-router-dom";
import pageHeaderBg from "../assets/title.png";

const About = () => {
  const stats = [
    { value: "50+", label: "Farm-fresh products seeded" },
    { value: "2", label: "Dedicated user roles" },
    { value: "100%", label: "API-driven catalog flow" },
    { value: "24/7", label: "Platform availability focus" },
  ];

  const pillars = [
    {
      title: "Trust First Commerce",
      description:
        "Verified farmer listings, transparent reviews, and secure order flows help both buyers and sellers trade with confidence.",
    },
    {
      title: "Farmer Empowerment",
      description:
        "Each farmer has a role-safe dashboard to manage products, stock, categories, and images in real time without complexity.",
    },
    {
      title: "Premium Customer Experience",
      description:
        "From search to checkout, every step is designed to be fast, clear, and reliable on mobile and desktop.",
    },
  ];

  return (
    <div className="bg-[#F8F7F0]">
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(32,39,30,0.55), rgba(32,39,30,0.55)), url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="pt-28 pb-24"
      >
        <div className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 text-white">
          <p className="uppercase tracking-[0.2em] text-sm text-[#EEC044]">About FarmStore</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Building a premium digital bridge between farmers and modern buyers
          </h1>
          <p className="mt-5 max-w-2xl text-[#e6ebe2] leading-7">
            FarmStore is a farm-to-customer marketplace where fresh produce meets reliable technology. We focus on
            fair access, transparent operations, and smooth shopping experiences backed by secure APIs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="fs-btn">
              Explore Products
            </Link>
            <Link to="/services" className="fs-btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-[#223122]">
              View Services
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div key={item.label} className="fs-card p-5 text-center">
              <p className="text-3xl font-bold text-[#4BAF47]">{item.value}</p>
              <p className="mt-2 text-sm text-[#6f746d]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="fs-card p-7">
            <p className="text-[#EEC044] font-semibold">Our Story</p>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3a2e]">Why FarmStore exists</h2>
            <p className="mt-4 leading-7 text-[#5f665d]">
              Traditional farm commerce often struggles with visibility, pricing clarity, and operational friction.
              FarmStore addresses this by giving farmers direct digital storefronts and giving customers a consistent
              path to discover, compare, and buy fresh produce.
            </p>
            <p className="mt-4 leading-7 text-[#5f665d]">
              We blend role-based access, product lifecycle control, and modern checkout UX to create a platform that
              feels premium while staying practical for everyday use.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
            alt="Farm landscape"
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0 pb-16">
        <p className="text-center text-[#EEC044] font-semibold">Core Pillars</p>
        <h2 className="text-center text-3xl font-bold text-[#2f3a2e] mt-2">What makes our platform different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="fs-card p-6">
              <h3 className="text-xl font-semibold text-[#2f3a2e]">{pillar.title}</h3>
              <p className="mt-3 leading-7 text-[#5f665d]">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-5 md:px-24 lg:px-20 xl:px-24 2xl:px-0">
          <div className="rounded-3xl bg-gradient-to-r from-[#2A3A28] to-[#334830] py-14 px-6 md:px-12 text-center shadow-xl border border-[#42573d]">
            <h2 className="text-3xl font-bold text-white">Join the future of farm commerce</h2>
            <p className="text-[#d6dfd2] mt-4 max-w-2xl mx-auto">
              Whether you are a farmer expanding digital reach or a customer looking for trusted produce, FarmStore is
              built for your workflow.
            </p>
            <div className="mt-7 flex justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="bg-[#4BAF47] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#63c95f] duration-300"
              >
                Create Account
              </Link>
              <Link
                to="/"
                className="border border-[#EEC044] text-[#EEC044] font-semibold px-6 py-3 rounded-full hover:bg-[#EEC044] hover:text-[#2f3a2e] duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
