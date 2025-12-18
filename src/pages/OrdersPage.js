import React, { useEffect, useState } from 'react';
import { Card, CardContent, Button, Typography, Box, CircularProgress, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { viewOrders } from '../api/orderApi';

export default function OrdersPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return; // Kullanıcı yoksa çekme
            setLoading(true);
            const res = await viewOrders(user.id);
            if (res.success) { // Backend'den gelen veri
                setOrders(res.data);
            } else {
                console.error("Siparişler alınamadı:", res.message);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    const navigateToOrderDetailsPage = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
            <Typography variant='h4' fontWeight='bold' mb={3}>
                Geçmiş Siparişler
            </Typography>

            {orders.length === 0 ? ( // Sipariş var mı?
                <Typography color="text.secondary">Henüz siparişiniz bulunmuyor.</Typography>
            ) : (
                <Box display='flex' flexDirection='column' gap={2}>
                    {orders.map((order) => (
                        <Card
                            key={order.code}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 2,
                                borderLeft: '6px solid #1976d2'
                            }}
                        >
                            <CardContent sx={{ p: 0 }}>
                                <Typography variant='h6'>
                                    {order.code}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    Tarih: {new Date(order.createdAt).toLocaleDateString()}
                                </Typography>
                                <Chip
                                    label={order.state}
                                    size="small"
                                    color={order.state === 'CREATED' ? 'success' : 'default'}
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>

                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant='h6' fontWeight='bold' color="primary">
                                    {order.totalPrice} TL
                                </Typography>
                                {/* order.id yoksa detay butonu çalışmayabilir. Backend DTO kontrol edilmeli */}
                                <Button
                                    variant='outlined'
                                    size="small"
                                    onClick={() => navigateToOrderDetailsPage(order.id || order.code)}
                                    sx={{ mt: 1 }}
                                >
                                    Detay
                                </Button>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}