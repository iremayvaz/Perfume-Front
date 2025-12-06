import { Grid, Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

function ProductCard({ products = [] }) {
  const navigate = useNavigate();

  return (
    <Box>
      {products.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Hiç ürün yok.
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 }
              }}
              onClick={() => navigate(`/product-detail/${product.id}`)}
            >
              {/* ÜSTTE FAVORİ BUTON */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: '#fff',
                  '&:hover': { background: '#f0f0f0' }
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              {/* ÜRÜN RESMİ */}
              <Box sx={{ height: 200, background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.image && (
                  <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                )}
              </Box>

              <CardContent>
                {/* ÜRÜN ADI */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {product.name}
                </Typography>

                {/* FİYAT ALANI */}
                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                  {product.price} TL
                </Typography>

                {/* SEPETE EKLE */}
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ShoppingCartIcon />}
                  sx={{ py: 1.2, borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Sepete eklendi:', product);
                  }}
                >
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductCard;