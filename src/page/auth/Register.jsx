import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import pageHeaderBg from "../../assets/title.png";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      toast.success("Account created successfully.");
      navigate(formData.role === "farmer" ? "/admin/products" : "/");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
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
            / Register
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">Create Account</h1>
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
            Join FarmStore
          </Typography>
          <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField
            select
            label="Account Type"
            name="role"
            value={formData.role}
            onChange={handleChange}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: "min(320px, calc(100vh - 32px))",
                    overflowY: "auto",
                  },
                },
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fff" } }}
          >
            <MenuItem value="customer">Customer (Buy products)</MenuItem>
            <MenuItem value="farmer">Farmer (Sell products)</MenuItem>
          </TextField>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ backgroundColor: "#4BAF47", "&:hover": { backgroundColor: "#6cd469" } }}
          >
            {submitting ? "Creating account..." : "Register"}
          </Button>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4BAF47] hover:underline">
              Login
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Register;
