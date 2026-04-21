import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  deleteAdminProduct,
  getAdminProducts,
} from "../../services/adminProductService";
import pageHeaderBg from "../../assets/title.png";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminProducts();
      setProducts(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.error("Failed to load admin products", err);
      setError("Failed to load products. Please check admin API access.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Delete this product permanently?");
    if (!confirmed) return;

    try {
      setDeletingId(productId);
      await deleteAdminProduct(productId);
      toast.success("Product deleted successfully.");
      await loadProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
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
            / Farmer / Products
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">
            Farmer Product Management
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" fontWeight="bold">
            Products
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4BAF47",
              "&:hover": { backgroundColor: "#6cd469" },
            }}
            onClick={() => navigate("/admin/products/new")}
          >
            Add Product
          </Button>
        </div>

        {loading && <p className="text-[#878680]">Loading your farm products...</p>}
        {error && !loading && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <Box className="fs-card" sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      </TableCell>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                          sx={{ color: "#4BAF47" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          sx={{ color: "#EEC044" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
