import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, Paper, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Örnek: backend'den veya context'ten alabilirsin
import { dummyProducts } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = dummyProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Ürün bulunamadı.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* ÜRÜN FOTOĞRAF KISMI */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{ p: 2, borderRadius: 3, textAlign: "center", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            )}
          </Paper>
        </Grid>

        {/* ÜRÜN BİLGİLERİ */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Marka: <strong>{product.brand}</strong>
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Yoğunluk: <strong>{product.intensity}</strong>
          </Typography>

          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            {product.price} TL
          </Typography>

          {/* FAVORİ VE SEPETE EKLE */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <IconButton sx={{ background: "#f4f4f4", p: 2 }}>
              <FavoriteBorderIcon />
            </IconButton>

            <Button
              variant="contained"
              size="large"
              endIcon={<ShoppingCartIcon />}
              sx={{ px: 4, borderRadius: 2 }}
              onClick={() => console.log("Sepete eklendi", product)}
            >
              Sepete Ekle
            </Button>
          </Box>

          {/* ÜRÜN AÇIKLAMASI */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Ürün Açıklaması
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            {product.description || "Bu ürün için henüz açıklama eklenmedi."}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}