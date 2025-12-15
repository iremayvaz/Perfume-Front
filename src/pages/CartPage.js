import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { removeFromCart, updateCartItemQuantity, viewCart } from '../api/cartApi';

export default function CartPage({ isOrderHistoryPage = false }) {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const total = items.reduce((acc, item) => acc + item.subTotal, 0);

    const onIncrease = async (itemId) => {
        const prevItems = [...items];

        setItems((prev) => prev.map((i) => (i.itemId === itemId ? { ...i, quantity: i.quantity + 1, subTotal: (i.quantity + 1) * i.unitPriceSnapshot } : i)));

        const target = prevItems.find((i) => i.itemId === itemId);
        const newQty = target.quantity + 1;

        const res = await updateCartItemQuantity(user?.id ?? 1, itemId, newQty);

        if (!res.success) {
            // ❌ rollback
            setItems(prevItems);
        } else {
            setItems(res.data.cartItems);
        }
    };

    const onDecrease = async (itemId) => {
        const prevItems = [...items];
        const target = prevItems.find((i) => i.itemId === itemId);

        if (target.quantity === 1) return;

        setItems((prev) => prev.map((i) => (i.itemId === itemId ? { ...i, quantity: i.quantity - 1, subTotal: (i.quantity - 1) * i.unitPriceSnapshot } : i)));

        const res = await updateCartItemQuantity(user?.id ?? 1, itemId, target.quantity - 1);

        if (!res.success) {
            // ❌ rollback
            setItems(prevItems);
        } else {
            setItems(res.data.cartItems);
        }
    };

    const handleRemoveProduct = async (itemId) => {
        const res = await removeFromCart(user?.id ?? 1, itemId);

        if (res.success) {
            const refreshed = await viewCart(user?.id ?? 1);
            setItems(refreshed.data);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            const res = await viewCart(user?.id ?? 1);
            setItems(res.data ?? []);
            setLoading(false);
        };

        fetchCart();
    }, [user?.id]);

    if (loading) {
        return (
            <Typography textAlign='center' mt={4}>
                Sepet yükleniyor...
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant='h4' fontWeight='bold' mb={3}>
                Sepetim
            </Typography>

            {items.length === 0 && <Typography color='text.secondary'>Sepetiniz boş.</Typography>}

            <Box display='flex' flexDirection='column' gap={2}>
                {items.map((item) => (
                    <Card
                        key={item.itemId}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            gap: 2,
                        }}
                    >
                        <CardContent sx={{ flex: 1, p: 0 }}>
                            <Typography variant='h6'>{item.productName}</Typography>

                            <Typography variant='body2' color='text.secondary'>
                                Birim Fiyat: {item.unitPriceSnapshot} {item.currency}
                            </Typography>

                            <Typography variant='subtitle1' fontWeight='bold'>
                                Ara Toplam: {item.subTotal} {item.currency}
                            </Typography>
                        </CardContent>

                        <Quantity isEditable={!isOrderHistoryPage} itemId={item.itemId} itemQuantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease} />

                        {!isOrderHistoryPage && (
                            <IconButton color='error' onClick={() => handleRemoveProduct(item.itemId)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        )}
                    </Card>
                ))}
            </Box>

            {items.length > 0 && (
                <Typography variant='h5' textAlign='right' mt={3} fontWeight='bold'>
                    Toplam: {total} TRY
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
