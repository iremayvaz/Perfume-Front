import { Card, CardContent, IconButton, Button, DialogActions, Dialog, DialogContent, DialogTitle, TextField, Typography, Box, CircularProgress } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { removeFromCart, updateCartItemQuantity, viewCart } from '../api/cartApi';
import { placeOrder, viewOrderDetails } from '../api/orderApi';
import { useNavigate, useParams} from 'react-router-dom'; // Yönlendirme için

export default function CartPage({ isOrderHistoryPage = false }) {
    const { user } = useAuth();
    const {id} = useParams(); // URL'den sipariş ID'sini al
    const navigate = useNavigate(); // Sayfa yönlendirmesi için
    const [updating, setUpdating] = useState({});

    console.log("LOGGED USER:", user);
    console.log("USER ID:", user?.id);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState(null);

    const [openCheckout, setOpenCheckout] = useState(false);
    const [addressForm, setAddressForm] = useState({
        city: '',
        street: '',
        detail: ''
    });

    const total = isOrderHistoryPage // Detay sayfası
        ? orderInfo?.totalPrice // ise backend'den
        : items.reduce((acc, item) => acc + item.subTotal, 0); // değilse sepet toplamı

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFinishOrder = async () => {
        if (!addressForm.city || !addressForm.street || !addressForm.detail) {
            alert("Lütfen tüm adres bilgilerini doldurun.");
            return;
        }

        const orderData = {
            shippingCity: addressForm.city,
            shippingStreet: addressForm.street,
            shippingDetail: addressForm.detail
        };

        const userId = user?.id || 1;
        const result = await placeOrder(userId, orderData); // Order'a istek

        if (result.success) {
            alert("Siparişiniz başarıyla alındı! Kod: " + result.data.orderCode);
            setItems([]); // Sepeti arayüzden temizle
            setOpenCheckout(false); // Modalı kapat
            navigate('/orders'); // Yönlendir
        } else {
            alert("Hata oluştu: " + result.message);
        }
    };

    const onIncrease = async (itemId) => {
        if (updating[itemId]) return;
        setUpdating(p => ({ ...p, [itemId]: true }));

        const target = items.find(i => i.itemId === itemId);
        const newQty = (target?.quantity ?? 0) + 1;

        const res = await updateCartItemQuantity(user?.id ?? 1, itemId, newQty);

        if (res.success) {
            const data = res.data;
            const list = Array.isArray(data) ? data : (data?.cartItems ?? []);
            setItems(list);
        }

        setUpdating(p => ({ ...p, [itemId]: false }));
    };

    const onDecrease = async (itemId) => {
        if (updating[itemId]) return;
        const target = items.find(i => i.itemId === itemId);
        if (!target || target.quantity === 1) return;

        setUpdating(p => ({ ...p, [itemId]: true }));

        const newQty = target.quantity - 1;
        const res = await updateCartItemQuantity(user?.id ?? 1, itemId, newQty);

        if (res.success) {
            const data = res.data;
            const list = Array.isArray(data) ? data : (data?.cartItems ?? []);
            setItems(list);
        }

        setUpdating(p => ({ ...p, [itemId]: false }));
    };


    const handleRemoveProduct = async (itemId) => {
        const res = await removeFromCart(user?.id ?? 1, itemId);

        if (res.success) {
            const refreshed = await viewCart(user?.id ?? 1);
            setItems(refreshed.data);
        }
    };

    useEffect(() => { // Veri çekme
        const fetchData = async () => {
            setLoading(true);

            if (isOrderHistoryPage && id) { // Sipariş Detay Sayfası
                const res = await viewOrderDetails(id);
                if (res.success) {
                    setOrderInfo(res.data);

                    const mappedItems = res.data.items.map((oi, index) => ({
                        itemId: index, // Detayda ID önemsiz
                        brand: oi.brand,
                        productName: oi.name,
                        quantity: oi.quantity,
                        unitPriceSnapshot: (oi.lineTotal / oi.quantity).toFixed(2),
                        subTotal: oi.lineTotal,
                        currency: 'TL'
                    }));
                    setItems(mappedItems);
                } else {
                    console.error("Detay alınamadı:", res.message);
                }
            } else { // Normal Sepet Sayfası
                const res = await viewCart(user?.id ?? 1);
                setItems(res.data ?? []);
            }
            setLoading(false);
        };

        fetchData();
    }, [user?.id, id, isOrderHistoryPage]);

    if (loading) {
        <Box
            display="flex"
            justifyContent="center"
            mt={5}><CircularProgress />
        </Box>;
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant='h4' fontWeight='bold' mb={3}>
                {isOrderHistoryPage ? `Sipariş Detayı` : 'Sepetim'}
            </Typography>

            {isOrderHistoryPage && orderInfo && (
                <Card sx={{ mb: 3, bgcolor: '#f5f5f5' }}>
                    <CardContent>
                        <Typography variant="h6">Sipariş Kodu: {orderInfo.code}</Typography>
                        <Typography variant="body2">Adres:</Typography>
                        <Typography variant="body2">{orderInfo.shippingStreet} {orderInfo.shippingDetail} {orderInfo.shippingCity}</Typography>
                    </CardContent>
                </Card>
            )}

            {items.length === 0 && <Typography color='text.secondary'>Liste boş.</Typography>}

            {/* Sepet Listeleme */}
            <Box display='flex' flexDirection='column' gap={2}>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            gap: 2,
                        }}
                    >
                        <CardContent sx={{ flex: 1, p: 0 }}>
                            <Typography variant='h6'>{item.brand} {item.productName}</Typography>

                            <Typography variant='body2' color='text.secondary'>
                                Birim Fiyat: {item.unitPriceSnapshot} {item.currency}
                            </Typography>

                            <Typography variant='subtitle1' fontWeight='bold'>
                                Ara Toplam: {item.subTotal} {item.currency}
                            </Typography>
                        </CardContent>

                        <Quantity
                            isEditable={!isOrderHistoryPage}
                            itemQuantity={item.quantity}
                            onIncrease={() => onIncrease(item.itemId)}
                            onDecrease={() => onDecrease(item.itemId)}
                            disabled={!!updating[item.itemId]}
                        />

                        {!isOrderHistoryPage && (
                            <IconButton color='error' onClick={() => handleRemoveProduct(item.itemId)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        )}
                    </Card>
                ))}
            </Box>

            {items.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 3 }}>
                    <Typography variant='h5' fontWeight='bold'>Toplam: {total} TRY</Typography>

                    {!isOrderHistoryPage && (
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ mt: 2, borderRadius: 2, px: 4 }}
                            onClick={() => setOpenCheckout(true)}
                        >
                            Siparişi Tamamla
                        </Button>
                    )}
                </Box>
            )}

            {/* --- ADRES GİRME MODALI (POP-UP) --- */}
            <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)} fullWidth maxWidth="sm">
                <DialogTitle>Teslimat Adresi</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Şehir"
                            name="city"
                            fullWidth
                            variant="outlined"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            label="Cadde / Sokak"
                            name="street"
                            fullWidth
                            variant="outlined"
                            value={addressForm.street}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            label="Adres Detayı (Bina No, Kapı No vb.)"
                            name="detail"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            value={addressForm.detail}
                            onChange={handleAddressChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCheckout(false)} color="error">İptal</Button>
                    <Button onClick={handleFinishOrder} variant="contained" color="primary">Siparişi Onayla</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

const Quantity = ({ isEditable, itemQuantity, onIncrease, onDecrease, disabled }) => (
    isEditable ? (
        <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={onDecrease} disabled={disabled}>
                <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography fontWeight="bold" width={20} textAlign="center">
                {itemQuantity}
            </Typography>
            <IconButton onClick={onIncrease} disabled={disabled}>
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>
    ) : (
        <Typography fontWeight="bold" width={20} textAlign="center">{itemQuantity}</Typography>
    )
);

