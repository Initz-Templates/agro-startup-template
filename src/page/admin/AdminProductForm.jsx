import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  createAdminProduct,
  getAdminProductCategories,
  getAdminProductById,
  updateAdminProduct,
} from "../../services/adminProductService";
import pageHeaderBg from "../../assets/title.png";

const defaultForm = {
  product_name: "",
  title: "",
  image: "",
  price: "",
  quantity: "",
  discount: "",
  description: "",
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const TARGET_IMAGE_MAX_DIMENSION = 1280;
const TARGET_IMAGE_QUALITY = 0.8;

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const compressImageDataUrl = (dataUrl, mimeType = "image/jpeg") =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const maxOriginalDimension = Math.max(img.width, img.height);
      const scale = maxOriginalDimension > TARGET_IMAGE_MAX_DIMENSION ? TARGET_IMAGE_MAX_DIMENSION / maxOriginalDimension : 1;
      const targetWidth = Math.max(1, Math.round(img.width * scale));
      const targetHeight = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Canvas context unavailable"));
        return;
      }
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      resolve(canvas.toDataURL(mimeType, TARGET_IMAGE_QUALITY));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getAdminProductCategories();
        setCategoryOptions(Array.isArray(categories) ? categories : []);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!isEditMode) return;
      try {
        const data = await getAdminProductById(id);
        setFormData({
          product_name: data.product_name || "",
          title: data.title || "",
          image: data.image || "",
          price: data.price ?? "",
          quantity: data.quantity ?? "",
          discount: data.discount ?? "",
          description: data.description || "",
        });
        if (typeof data.image === "string" && data.image.startsWith("http")) {
          setShowImageUrlInput(true);
        }
      } catch (error) {
        console.error("Failed to load product for editing", error);
        toast.error("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("Image must be under 5MB.");
      return;
    }

    try {
      setUploadingImage(true);
      const originalDataUrl = await readFileAsDataUrl(file);
      const outputMimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const compressedDataUrl = await compressImageDataUrl(originalDataUrl, outputMimeType);
      setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
      toast.success("Image optimized and selected.");
    } catch (error) {
      console.error("Failed to process selected image", error);
      toast.error("Failed to process selected image.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const validateForm = () => {
    if (!formData.product_name.trim() || !formData.title.trim() || !formData.image.trim()) {
      return "Please fill name, category, and image fields.";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      return "Price must be greater than 0.";
    }
    if (!formData.quantity || Number(formData.quantity) < 0) {
      return "Quantity must be 0 or more.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      discount: formData.discount === "" ? 0 : Number(formData.discount),
    };

    try {
      setSubmitting(true);
      if (isEditMode) {
        await updateAdminProduct(id, payload);
        toast.success("Product updated successfully.");
      } else {
        await createAdminProduct(payload);
        toast.success("Product created successfully.");
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to submit product", error);
      toast.error("Failed to save product. Check API and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-[#878680]">Loading product...</p>;
  }

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
            / Farmer / {isEditMode ? "Edit Product" : "Add Product"}
          </p>
          <h1 className="text-center text-white text-4xl font-bold font-monrope mt-5">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-5 py-10">
        <Box
          className="fs-card"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Product Information
          </Typography>

          <TextField label="Product Name" name="product_name" value={formData.product_name} onChange={handleChange} required />
          <Autocomplete
            freeSolo
            options={categoryOptions}
            value={formData.title}
            onChange={(_, value) => setFormData((prev) => ({ ...prev, title: String(value || "") }))}
            onInputChange={(_, value) => setFormData((prev) => ({ ...prev, title: String(value || "") }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                name="title"
                required
                helperText="Select existing or type a new category"
              />
            )}
          />
          <div className="flex flex-col gap-3">
            <Button variant="outlined" component="label" disabled={uploadingImage} sx={{ width: "fit-content" }}>
              {uploadingImage ? "Processing image..." : "Upload Image From Device"}
              <input type="file" accept="image/*" hidden onChange={handleImageFileChange} />
            </Button>
            <Button
              variant="text"
              onClick={() => setShowImageUrlInput((prev) => !prev)}
              sx={{ width: "fit-content", color: "#4BAF47" }}
            >
              {showImageUrlInput ? "Hide Image URL Option" : "Use Image URL Instead"}
            </Button>
            {showImageUrlInput && (
              <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} />
            )}
            {formData.image && (
              <img
                src={formData.image}
                alt="Product preview"
                className="w-36 h-36 object-cover rounded-lg border border-[#dce6da]"
              />
            )}
          </div>
          <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          <TextField label="Stock Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
          <TextField label="Discount (%)" name="discount" type="number" value={formData.discount} onChange={handleChange} />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />

          <div className="flex gap-3 mt-2">
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{ backgroundColor: "#4BAF47", "&:hover": { backgroundColor: "#6cd469" } }}
            >
              {submitting ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/products")}
              sx={{ borderColor: "#EEC044", color: "#b8860b", "&:hover": { borderColor: "#EEC044" } }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AdminProductForm;
