import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper, IconButton, Chip, MenuItem, TextField } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getProductDetail } from '../api/productApi';
import { useAuth } from '../auth/AuthContext';
import { addToCart } from '../api/cartApi';

const dummyProduct = {
    id: 1,
    productName: 'V102',
    brandName: 'MAD',
    category: {
        id: 1,
        gender: 'WOMEN',
        concentrationName: 'EDT',
        season: 'SPRING',
        accord: 'Woody – Fruity',
    },
    price: 400.0,
    rating: 4.9,
    topNotes: ['Frambuaz'],
    heartNotes: ['Mango'],
    baseNotes: ['Vanilya', 'Yasemin'],
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleAddToCart = async () => {
        const res = await addToCart(user?.id ?? 1, {
            cart_id: null,
            product_id: product.id,
            quantity: quantity,
        });

        if (res.success) {
            console.log('Sepet:', res.data);
        } else {
            console.error('Sepete eklenemedi:', res.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            const res = await getProductDetail(id);

            if (!res.success) {
                // backend yoksa dummy fallback
                setProduct(dummyProduct);
                setError(res.message);
            } else {
                setProduct(res.data);
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Typography variant='h6' sx={{ mt: 4, textAlign: 'center' }}>
                Yükleniyor...
            </Typography>
        );
    }

    if (!product) {
        return (
            <Typography variant='h6' sx={{ mt: 4, textAlign: 'center' }}>
                Ürün bulunamadı.
            </Typography>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {/* ÜRÜN FOTOĞRAF */}
                <Grid item xs={12} md={5}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            height: 400,
                            width: 400,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#fafafa',
                        }}
                    >
                        <Typography color='text.secondary'>Ürün görseli yok</Typography>
                    </Paper>
                </Grid>

                {/* ÜRÜN BİLGİLERİ */}
                <Grid item xs={12} md={7}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        {product.productName}
                    </Typography>

                    <Typography variant='subtitle1' sx={{ mb: 1 }}>
                        Marka: <strong>{product.brandName}</strong>
                    </Typography>

                    <Typography variant='subtitle1' sx={{ mb: 1 }}>
                        Yoğunluk: <strong>{product.category?.concentrationName}</strong>
                    </Typography>

                    <Typography variant='subtitle1' sx={{ mb: 2 }}>
                        Sezon: <strong>{product.category?.season}</strong>
                    </Typography>

                    <Typography variant='h5' color='primary' fontWeight='bold' sx={{ mb: 3 }}>
                        {product.price} TL
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography variant='subtitle1'>Adet:</Typography>

                        <TextField select size='small' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} sx={{ width: 100 }}>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                                <MenuItem key={val} value={val}>
                                    {val}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* FAVORİ / SEPET */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <IconButton sx={{ bgcolor: '#f4f4f4' }}>
                            <FavoriteBorderIcon />
                        </IconButton>

                        <Button variant='contained' size='large' endIcon={<ShoppingCartIcon />} sx={{ px: 4, borderRadius: 2 }} onClick={handleAddToCart}>
                            Sepete Ekle
                        </Button>
                    </Box>

                    {/* NOTALAR */}
                    <Typography variant='h6' sx={{ mb: 1 }}>
                        Koku Notaları
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant='subtitle2'>Üst Nota</Typography>
                        {product.topNotes?.map((note) => (
                            <Chip key={note} label={note} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant='subtitle2'>Orta Nota</Typography>
                        {product.heartNotes?.map((note) => (
                            <Chip key={note} label={note} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant='subtitle2'>Alt Nota</Typography>
                        {product.baseNotes?.map((note) => (
                            <Chip key={note} label={note} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>

                    {/* AÇIKLAMA */}
                    <Typography variant='h6' sx={{ mb: 1 }}>
                        Ürün Açıklaması
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        {product.category?.accord}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
