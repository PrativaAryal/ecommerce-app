import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Alert,
} from "@mui/material";
import ProductDialog from "../components/ProductDialog";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  const API_HOST = import.meta.env.VITE_RAPID_API_HOST;
  const API_BASE = import.meta.env.VITE_RAPID_API_BASE;
  const PRODUCT_DETAILS_PATH = import.meta.env.VITE_RAPID_API_PRODUCT_DETAILS_PATH;

  /* Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}/search?query=${categoryName}&page=1&country=US`;
      const options = { method: "GET", headers: { "x-rapidapi-key": API_KEY, "x-rapidapi-host": API_HOST } };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const items = result?.data?.products || result?.products || [];
        setProducts(
          items.length
            ? items
            : [
                {
                  asin: "B07ZPKBL9V",
                  product_title: "Test Phone",
                  product_price: "$170",
                  product_photo: "https://m.media-amazon.com/images/I/514k7uOBMwL._AC_SL1000_.jpg",
                },
              ]
        );

        if (!items.length) setError("No products found from API.");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  /* Open product dialog with full details */
  const handleViewClick = async (product) => {
    setOpenDialog(true);
    setLoadingDetails(true);

    const asin = product.asin;
    const url = `${API_BASE}/${PRODUCT_DETAILS_PATH}?asin=${asin}&country=US`;
    const options = { method: "GET", headers: { "x-rapidapi-key": API_KEY, "x-rapidapi-host": API_HOST } };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setProductDetails({
        asin,
        title: result.data?.product_title || product.product_title,
        offeredPrice: result.data?.product_price || product.product_price,
        originalPrice: result.data?.product_original_price || "N/A",
        product_condition: result.data?.product_condition || "N/A",
        product_availability: result.data?.product_availability || "N/A",
        product_num_offers: result.data?.product_num_offers ?? "N/A",
        image: result.data?.product_photo || product.product_photo,
        rating: result.data?.product_star_rating || "N/A",
        url: result.data?.product_url || product.product_url,
      });
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      setProductDetails({
        asin,
        title: product.product_title,
        offeredPrice: product.product_price,
        originalPrice: "N/A",
        product_condition: "N/A",
        product_availability: "N/A",
        product_num_offers: "N/A",
        image: product.product_photo,
        rating: product.product_star_rating || "N/A",
        url: product.product_url,
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setProductDetails(null);
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {categoryName.toUpperCase()} Category
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", height: "60vh" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : products.length > 0 ? (
        products.map((item, index) => (
          <Card key={index} sx={{ mb: 2, display: "flex", p: 2, alignItems: "center" }}>
            <CardMedia
              component="img"
              image={item.product_photo}
              alt={item.product_title}
              sx={{ width: 100, height: 100, objectFit: "contain", mr: 3, borderRadius: 2 }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.product_title}</Typography>
              <Typography>Price: {item.product_price || "N/A"}</Typography>
              <Typography>Rating: {item.product_star_rating || "N/A"}</Typography>
              <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleViewClick(item)}>
                View
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No products found.</Typography>
      )}

      <ProductDialog
        open={openDialog}
        onClose={handleClose}
        productDetails={productDetails}
        loading={loadingDetails}
      />
    </Box>
  );
};

export default CategoryPage;
