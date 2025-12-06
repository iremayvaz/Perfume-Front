import React from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const dummyOrders = [
    {
        id: 1,
        date: '2025-01-12',
        total: 4200,
        itemsCount: 3,
    },
    {
        id: 2,
        date: '2025-02-03',
        total: 1800,
        itemsCount: 1,
    },
    {
        id: 3,
        date: '2025-03-22',
        total: 5600,
        itemsCount: 4,
    },
];

export default function OrdersPage({ orders = dummyOrders, onViewDetails = () => {} }) {
    const navigate = useNavigate();

    const navigateToOrderDetailsPage = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
            <Typography variant='h4' fontWeight='bold' mb={3}>
                Geçmiş Siparişler
            </Typography>

            <Box display='flex' flexDirection='column' gap={2}>
                {orders.map((order) => (
                    <Card
                        key={order.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                        }}
                    >
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant='h6'>Sipariş #{order.id}</Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Tarih: {order.date}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Ürün Sayısı: {order.itemsCount}
                            </Typography>
                        </CardContent>

                        <Typography variant='h6' fontWeight='bold'>
                            {order.total} TL
                        </Typography>

                        <Button variant='contained' onClick={() => navigateToOrderDetailsPage(order.id)} sx={{ ml: 2 }}>
                            Detay Görüntüle
                        </Button>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
