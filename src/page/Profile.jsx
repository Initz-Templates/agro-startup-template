import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import pageHeaderBg from "../assets/title.png";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { authUser, logout } = useAuth();
  const roleLabel = authUser?.role === "farmer" ? "Farmer Account" : "Customer Account";

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
            / Profile
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">My Profile</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="fs-card p-7 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <Typography variant="h5" fontWeight="bold">
                  Account Overview
                </Typography>
                <p className="text-[#6a756b] mt-1">Manage your FarmStore profile and account access.</p>
              </div>
              <span className="inline-flex items-center bg-[#edf7ec] text-[#2f7f3a] px-4 py-2 rounded-full text-sm font-semibold">
                {roleLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e6eee4] p-4 bg-white">
                <p className="text-xs uppercase tracking-wide text-[#879084]">Full Name</p>
                <p className="text-lg font-semibold mt-1">{authUser?.name || "N/A"}</p>
              </div>
              <div className="rounded-xl border border-[#e6eee4] p-4 bg-white">
                <p className="text-xs uppercase tracking-wide text-[#879084]">Email Address</p>
                <p className="text-lg font-semibold mt-1 break-words">{authUser?.email || "N/A"}</p>
              </div>
              <div className="rounded-xl border border-[#e6eee4] p-4 bg-white">
                <p className="text-xs uppercase tracking-wide text-[#879084]">Role</p>
                <p className="text-lg font-semibold mt-1 capitalize">{authUser?.role || "N/A"}</p>
              </div>
              <div className="rounded-xl border border-[#e6eee4] p-4 bg-white">
                <p className="text-xs uppercase tracking-wide text-[#879084]">Status</p>
                <p className="text-lg font-semibold mt-1 text-[#2f7f3a]">Active</p>
              </div>
            </div>
          </div>

          <div className="fs-card p-7">
            <Typography variant="h6" fontWeight="bold">
              Quick Actions
            </Typography>
            <p className="text-[#6a756b] text-sm mt-1 mb-5">Jump to important areas in one click.</p>

            <div className="flex flex-col gap-3">
              <Link to="/products" className="fs-btn-outline text-center">
                Browse Products
              </Link>
              <Link to="/all-cart-products" className="fs-btn-outline text-center">
                View Cart
              </Link>
              {authUser?.role === "farmer" && (
                <Link to="/admin/products" className="fs-btn-primary text-center">
                  Open Farmer Dashboard
                </Link>
              )}
              <Button
                variant="contained"
                onClick={logout}
                sx={{ backgroundColor: "#4BAF47", "&:hover": { backgroundColor: "#6cd469" } }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
