import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import pageHeaderBg from "../../assets/title.png";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setSubmitting(true);
      const data = await login(formData);
      toast.success("Logged in successfully.");
      const redirectPath =
        location.state?.from?.pathname || (data?.user?.role === "farmer" ? "/admin/products" : "/");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            / Login
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">Login</h1>
        </div>
      </div>

      <div className="max-w-screen-sm mx-auto px-5 py-10">
        <Box
          className="fs-card"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Welcome Back
          </Typography>
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ backgroundColor: "#4BAF47", "&:hover": { backgroundColor: "#6cd469" } }}
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>
          <Typography variant="body2" color="text.secondary">
            New user?{" "}
            <Link to="/register" className="text-[#4BAF47] hover:underline">
              Create an account
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
