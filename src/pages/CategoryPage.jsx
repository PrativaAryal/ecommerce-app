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

import Navbar from "../components/Navbar";
import ProductDialog from "../components/ProductDialog";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // ENV variables
  const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  const API_HOST = import.meta.env.VITE_RAPID_API_HOST;
  const API_BASE = import.meta.env.VITE_RAPID_API_BASE;
  const PRODUCT_DETAILS_PATH = import.meta.env.VITE_RAPID_API_PRODUCT_DETAILS_PATH;

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}/search?query=${categoryName}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const text = await response.text();
        console.log("Raw search API response:", text);
        let result = JSON.parse(text);

        const items = result?.data?.products || result?.products || [];

        if (!items || items.length === 0) {
          setProducts([
            {
              asin: "B07ZPKBL9V",
              product_title: "Test Phone",
              product_price: "$170",
              product_photo:
                "https://m.media-amazon.com/images/I/514k7uOBMwL._AC_SL1000_.jpg",
            },
          ]);
          setError("No products found from API. Showing fallback product.");
        } else {
          setProducts(items);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  // Handle "View" click to fetch product details
  const handleViewClick = async (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
    setLoadingDetails(true);

    const asin = product.asin;
    if (!asin) {
      console.error("No ASIN found for this product");
      setLoadingDetails(false);
      return;
    }

    const url = `${API_BASE}/${PRODUCT_DETAILS_PATH}?asin=${asin}&country=US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    };

    try {
      const response = await fetch(url, options);
      const text = await response.text();
      console.log("Raw product details response:", text);
      const result = JSON.parse(text);
      console.log("Parsed product details:", result);

      const details = {
        title: result.data?.product_title,
        description: result.data?.product_description || "No description available",
        offeredPrice: result.data?.product_price,
        originalPrice: result.data?.product_original_price,
        image: result.data?.product_photo || result.data?.product_photos?.[0],
        rating: result.data?.product_star_rating,
        url: result.data?.product_url,
        product_num_offers: result.data?.product_num_offers,
        product_availability: result.data?.product_availability,
        product_condition: result.data?.product_condition,
      };

      setProductDetails(details);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProductDetails({
        title: product.product_title || "No Title",
        description: "No description available",
        offeredPrice: product.product_price,
        image: product.product_photo,
        rating: product.product_star_rating,
        url: product.product_url,
        product_num_offers: "N/A",
        product_availability: "N/A",
        product_condition: "N/A",
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setProductDetails(null);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "hsla(60, 22%, 97%, 0.51)" }}>
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
                <Typography variant="h6">{item.product_title || "No title"}</Typography>
                <Typography>Price: {item.product_price || "N/A"}</Typography>
                <Typography>Rating: {item.product_star_rating || "N/A"}</Typography>
                <Button variant="contained" onClick={() => handleViewClick(item)}>
                  View
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No products found for this category.</Typography>
        )}

        <ProductDialog
          open={openDialog}
          onClose={handleClose}
          productDetails={productDetails}
          loading={loadingDetails}
        />
      </Box>
    </Box>
  );
};

export default CategoryPage;
