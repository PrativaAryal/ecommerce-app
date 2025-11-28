import React, { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

const ProductDialog = ({ open, onClose, productDetails, loading }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // TanStack table setup
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("field", { header: "Detail", cell: (info) => info.getValue() }),
      columnHelper.accessor("value", { header: "Value", cell: (info) => info.getValue() }),
    ],
    [columnHelper]
  );

  const data = useMemo(() => {
    if (!productDetails) return [];
    return [
      { field: "Condition", value: productDetails.product_condition || "N/A" },
      { field: "Availability", value: productDetails.product_availability || "N/A" },
      { field: "Number of Offers", value: productDetails.product_num_offers ?? "N/A" },
      { field: "Offered Price", value: productDetails.offeredPrice || "N/A" },
      { field: "Original Price", value: productDetails.originalPrice || "N/A" },
    ];
  }, [productDetails]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  // Fetch reviews
  const fetchReviews = async () => {
    if (!productDetails?.asin) return;
    setLoadingReviews(true);

    try {
      const url = `${import.meta.env.VITE_RAPID_API_BASE}/${import.meta.env.VITE_RAPID_API_PRODUCT_REVIEWS_PATH}?asin=${productDetails.asin}&page=1&country=US`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
        },
      });
      const result = await res.json();
      console.log("Fetched Reviews:", result);

      setReviews(result.data?.reviews || []); // set reviews from API
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setReviews([]); // empty if API fails
    } finally {
      setLoadingReviews(false);
    }
  };

  // Loading dialog for product details
  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading product details...</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (!productDetails) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>No product details found.</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog Header */}
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {productDetails.image && (
            <img
              src={productDetails.image}
              alt={productDetails.title || "Product"}
              style={{ width: 60, height: 60, borderRadius: 8, objectFit: "contain" }}
            />
          )}
          <Typography variant="h6">{productDetails.title || "Product Title"}</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Product Table */}
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Customer Feedback Button */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={async () => {
              if (reviews.length === 0) await fetchReviews();
              setShowReviews((prev) => !prev);
            }}
          >
            Customer Feedback
          </Button>
        </Box>

        {/* Reviews Section */}
        {showReviews && (
          <Box sx={{ mt: 3 }}>
            {loadingReviews ? (
              <CircularProgress />
            ) : reviews.length === 0 ? (
              <Typography>No reviews found.</Typography>
            ) : (
              reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: "#f5f5f5", border: "1px solid #ddd" }}
                >
                  <Typography fontWeight="bold">{review.review_title || "No Title"}</Typography>
                  <Typography>Rating: {review.review_star_rating || "N/A"}</Typography>
                  <Typography variant="caption">{review.review_date || "Unknown date"}</Typography>
                </Box>
              ))
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
