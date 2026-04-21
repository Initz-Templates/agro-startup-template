import { Link } from "react-router-dom";
import pageHeaderBg from "../assets/title.png";
import { useCurrentLocation } from "../hooks/useCurrentLocation";

const Contact = () => {
  const { locationLabel, loadingLocation, locationError, requestLocation } = useCurrentLocation();
  const supportPoints = [
    "Order assistance and delivery updates",
    "Farmer onboarding and listing support",
    "Account, payment, and checkout troubleshooting",
  ];

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
            / Contact
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">Contact FarmStore</h1>
        </div>
      </div>

      <div className="bg-[#f4f8f4] py-12">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="fs-card p-8">
              <p className="text-[#EEC044] font-semibold">Support Hub</p>
              <h2 className="text-3xl font-bold text-[#232a24] mb-3 mt-1">Let us help you fast</h2>
              <p className="text-[#5f6c5f] mb-6">
                Reach our support team for order help, farmer onboarding, account issues, and partnership inquiries.
              </p>
              <div className="rounded-xl bg-[#f8fbf6] border border-[#e7efe6] p-4 mb-6">
                <p className="text-[#2d352d] font-semibold mb-2">How we support you</p>
                <ul className="space-y-1 text-[#5f6c5f]">
                  {supportPoints.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-xl bg-white border border-[#e7efe6] p-4">
                  <p className="text-sm text-[#6d786d]">Business Hours</p>
                  <p className="font-semibold mt-1">Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
                <div className="rounded-xl bg-white border border-[#e7efe6] p-4">
                  <p className="text-sm text-[#6d786d]">Phone</p>
                  <a href="tel:+14045550199" className="font-semibold mt-1 block hover:text-[#4BAF47]">
                    +1 404 555 0199
                  </a>
                </div>
                <div className="rounded-xl bg-white border border-[#e7efe6] p-4">
                  <p className="text-sm text-[#6d786d]">Email</p>
                  <a href="mailto:support@farmstore.com" className="font-semibold mt-1 block hover:text-[#4BAF47]">
                    support@farmstore.com
                  </a>
                </div>
                <div className="rounded-xl bg-white border border-[#e7efe6] p-4">
                  <p className="text-sm text-[#6d786d]">Location</p>
                  <button
                    onClick={requestLocation}
                    className="font-semibold mt-1 text-left hover:text-[#4BAF47]"
                    type="button"
                    title="Click to share current location"
                  >
                    {locationLabel}
                  </button>
                  <button
                    onClick={requestLocation}
                    className="fs-btn-outline mt-3"
                    type="button"
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? "Detecting..." : "Use My Current Location"}
                  </button>
                  {locationError && <p className="text-xs text-red-500 mt-2">{locationError}</p>}
                </div>
              </div>
            </div>

            <div className="fs-card overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1400&q=80"
                alt="FarmStore Support"
                className="w-full h-full object-cover min-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f251f]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="uppercase tracking-[0.2em] text-xs text-[#EEC044]">FarmStore Care</p>
                <h3 className="text-2xl font-bold mt-1">Human support, fast resolution</h3>
                <p className="text-sm text-[#dde5dc] mt-2">We usually respond within one business day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
