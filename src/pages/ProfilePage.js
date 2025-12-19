import React, { useEffect, useState } from 'react';
import { useAuth } from "../auth/AuthContext";
import {
    Container, Paper, Box, Typography, Avatar, Divider, Grid, Button,
    Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, Stack
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Home as HomeIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    MailOutline as MailOutlineIcon
} from '@mui/icons-material';
import { getAddressesAsync, addAddressAsync, deleteAddressAsync } from '../api/userApi';

const addressTypes = ['HOME', 'WORK', 'SCHOOL', 'OTHER'];

function ProfilePage() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [open, setOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        address_type: 'HOME',
        shippingCity: '',
        shippingStreet: '',
        shippingDetail: ''
    });

    useEffect(() => {
        if (user?.id) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        const res = await getAddressesAsync(user.id);
        if (res.success) setAddresses(res.data);
    };

    const handleAddAddress = async () => {
        const res = await addAddressAsync(user.id, newAddress);
        if (res.success) {
            setOpen(false);
            fetchAddresses();
            setNewAddress({ address_type: 'HOME', shippingCity: '', shippingStreet: '', shippingDetail: '' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bu adresi silmek istediğinize emin misiniz?")) {
            const res = await deleteAddressAsync(id);
            if (res.success) fetchAddresses();
        }
    };

    if (!user) {
        return <Typography variant="h6" textAlign="center" mt={5}>Kullanıcı bulunamadı...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
            <Stack spacing={4} alignItems="center">

                {/* 1. Üst Kısım: Profil Bilgileri Kutusu */}
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', width: '100%' }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            mx: 'auto',
                            mb: 2,
                            fontSize: '2rem'
                        }}
                    >
                        {user.firstName?.[0]}{user.lastName?.[0]}
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 2 }}>Hesap Profili</Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1.5} alignItems="center">
                        <Box display="flex" alignItems="center">
                            <MailOutlineIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                            <Typography variant="body1">{user.mail}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                            <Typography variant="body1">{user.phoneNumber || 'Telefon eklenmemiş'}</Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* 2. Alt Kısım: Adres Yönetimi Bölümü */}
                <Box sx={{ width: '100%' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight="bold">Adreslerim</Typography>
                        <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            size="small"
                            onClick={() => setOpen(true)}
                        >
                            Yeni Adres Ekle
                        </Button>
                    </Box>

                    <Stack spacing={2}>
                        {addresses.length === 0 ? (
                            <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ py: 3 }}>
                                Henüz kayıtlı bir adresiniz bulunmuyor.
                            </Typography>
                        ) : (
                            addresses.map((addr) => (
                                <Card key={addr.id} variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Box display="flex" alignItems="center">
                                                {addr.address_type === 'HOME' ? <HomeIcon color="primary" /> :
                                                    addr.address_type === 'WORK' ? <WorkIcon color="primary" /> :
                                                        addr.address_type === 'SCHOOL' ? <SchoolIcon color="primary" /> : <LocationIcon color="primary" />}
                                                <Typography variant="subtitle2" fontWeight="bold" ml={1}>
                                                    {addr.address_type}
                                                </Typography>
                                            </Box>
                                            <IconButton size="small" onClick={() => handleDelete(addr.id)} color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Box mt={1}>
                                            <Typography variant="body2">
                                                {addr.shippingStreet}, {addr.shippingDetail}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {addr.shippingCity}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </Stack>
                </Box>
            </Stack>

            {/* Adres Ekleme Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Yeni Adres Ekle</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField
                            select
                            label="Adres Tipi"
                            value={newAddress.address_type}
                            onChange={(e) => setNewAddress({...newAddress, address_type: e.target.value})}
                        >
                            {addressTypes.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Şehir"
                            fullWidth
                            onChange={(e) => setNewAddress({...newAddress, shippingCity: e.target.value})}
                        />
                        <TextField
                            label="Sokak/Cadde"
                            fullWidth
                            onChange={(e) => setNewAddress({...newAddress, shippingStreet: e.target.value})}
                        />
                        <TextField
                            label="Detay (Bina No/Daire)"
                            fullWidth
                            multiline
                            rows={2}
                            onChange={(e) => setNewAddress({...newAddress, shippingDetail: e.target.value})}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>İptal</Button>
                    <Button onClick={handleAddAddress} variant="contained">Kaydet</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ProfilePage;