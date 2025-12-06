import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, Paper, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getProductDetail } from "../api/productApi";

/*
{
    "id": 1,
    "productName": "V102",
    "brandName": "MAD",
    "category": {
        "id": 1,
        "gender": "WOMEN",
        "concentrationName": "EDT",
        "season": "SPRING",
        "accord": "woody"
    },
    "price": 400.00,
    "rating": 4.9,
    "topNotes": [
        "Frambuaz"
    ],
    "heartNotes": [
        "Mango"
    ],
    "baseNotes": [
        "Vanilya",
        "Yasemin"
    ]
}
*/

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(async () => {
    setLoading(true);
    const data = await getProductDetail(id)
      .then( (res) => {
        setProduct(res.data);
       })
      .finally(() => { setLoading(false); })
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Yükleniyor...
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Ürün bulunamadı.
      </Typography>
    );
  }

  return (
    <Box id="iremmmm" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* ÜRÜN FOTOĞRAF KISMI */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{ p: 2, borderRadius: 3, textAlign: "center", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
             <div>Resim yok.</div>
          </Paper>
        </Grid>

        {/* ÜRÜN BİLGİLERİ */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.productName}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Marka: <strong>{product.brandName}</strong>
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Yoğunluk: <strong>{product.category.concentrationName}</strong>
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
            {product.category.accord || "Bu ürün için henüz açıklama eklenmedi."}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}