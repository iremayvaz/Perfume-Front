import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { dummyProducts } from '../data/products';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CartPage({ cartItems = dummyProducts, isOrderHistoryPage = false, onIncrease = () => {}, onDecrease = () => {}, onRemove = () => {} }) {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        if (isOrderHistoryPage && id) {
            // fetch order details by id from backend in real scenario
            setProducts(cartItems);
        } else {
            // fetch cart items from backend in real scenario
            setProducts(cartItems);
        }
    }, [isOrderHistoryPage, id]);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant='h4' fontWeight='bold' mb={3}>
                {isOrderHistoryPage ? 'Sipariş Detayı' : 'Sepetim'}
            </Typography>

            {products.length === 0 && <Typography color='text.secondary'>{isOrderHistoryPage ? 'Henüz siparişiniz yok.' : 'Sepetiniz boş.'}</Typography>}

            <Box display='flex' flexDirection='column' gap={2}>
                {products.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            gap: 2,
                        }}
                    >
                        {/* Küçültülmüş ürün görseli */}
                        <CardMedia component='img' sx={{ width: 64, height: 64, borderRadius: 1, objectFit: 'cover' }} image={item.image} alt={item.name} />

                        {/* Ürün bilgileri */}
                        <CardContent sx={{ flex: 1, p: 0 }}>
                            <Typography variant='h6'>{item.name}</Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Marka: {item.brand}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Yoğunluk: {item.intensity}
                            </Typography>
                            <Typography variant='subtitle1' fontWeight='bold' mt={0.5}>
                                {item.price} TL
                            </Typography>
                        </CardContent>

                        {/* Adet */}
                        <Quantity isEditable={!isOrderHistoryPage} itemId={item.id} itemQuantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease} />

                        {/* Sepetten çıkar */}
                        {!isOrderHistoryPage && (
                            <IconButton color='error' onClick={() => onRemove(item.id)} sx={{ ml: 1 }}>
                                <DeleteForeverIcon />
                            </IconButton>
                        )}
                    </Card>
                ))}
            </Box>

            {products.length > 0 && (
                <Typography variant='h5' textAlign='right' mt={3} fontWeight='bold'>
                    Toplam: {total} TL
                </Typography>
            )}
        </Box>
    );
}

const Quantity = ({ isEditable, itemId, itemQuantity, onIncrease = () => {}, onDecrease = () => {} }) => {
    return isEditable ? (
        <Box display='flex' alignItems='center' gap={1}>
            <IconButton onClick={() => onDecrease(itemId)}>
                <RemoveIcon fontSize='small' />
            </IconButton>
            <Typography fontWeight='bold' width={20} textAlign='center'>
                {itemQuantity}
            </Typography>

            <IconButton onClick={() => onIncrease(itemId)}>
                <AddIcon fontSize='small' />
            </IconButton>
        </Box>
    ) : (
        <Typography fontWeight='bold' width={20} textAlign='center'>
            {itemQuantity}
        </Typography>
    );
};
