import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

const ProductDialog = ({ open, onClose, productDetails, loading }) => {
  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading product details...
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (!productDetails) return null;

  // TanStack table rows
  const data = useMemo(
    () => [
      { field: "Condition", value: productDetails.product_condition || "N/A" },
      { field: "Availability", value: productDetails.product_availability || "N/A" },
      { field: "Number of Offers", value: productDetails.product_num_offers || "N/A" },
      { field: "Offered Price", value: productDetails.offeredPrice || "N/A" },
      { field: "Original Price", value: productDetails.originalPrice || "N/A" },
    ],
    [productDetails]
  );

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("field", { header: "Detail", cell: (info) => info.getValue() }),
      columnHelper.accessor("value", { header: "Value", cell: (info) => info.getValue() }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {productDetails.image && (
            <img
              src={productDetails.image}
              alt={productDetails.title}
              style={{ width: 60, height: 60, borderRadius: 8, objectFit: "contain" }}
            />
          )}
          <Typography variant="h6">{productDetails.title}</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {productDetails.product_description || "No description available."}
        </Typography>

        {/* TanStack Table */}
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

        {/* View on Amazon */}
        {productDetails.url && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              href={productDetails.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
