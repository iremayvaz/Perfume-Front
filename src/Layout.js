import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, InputBase, Badge, Drawer, List, ListItem, ListItemText, Divider, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export default function Layout() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = (e) => {
        e.stopPropagation(); // Butona tıklanmasını engelle, sadece logout çalışsın
        setOpen(false);
        logout();
    };

    const navigateTo = (path) => {
        navigate(path);
        setOpen(false);
    };

    // Profil butonuna tıklama mantığı
    const handleProfileClick = () => {
        if (!user) {
            console.log("Kullanıcı yok, giriş sayfasına yönlendiriliyor...");
            navigate('/sign-in');
        } else {
            console.log("Kullanıcı zaten giriş yapmış.");
            navigate('profile')
            // İsterseniz burada '/profile' sayfasına yönlendirme yapabilirsiniz.
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#EFF4FF', fontFamily: '"Inter", sans-serif' }}>
            {/* Header */}
            <AppBar position='sticky' elevation={1} sx={{ bgcolor: '#F08AD0', color: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between', gap: 2, py: 1 }}>

                    {/* Sol Kısım: Menu + Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant='h6'
                            component="div"
                            sx={{ fontWeight: 600, letterSpacing: 0.5, cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
                            onClick={() => navigate('/')}
                        >
                            Perfume Store
                        </Typography>
                    </Box>

                    {/* Sağ Kısım: İkonlar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Anasayfa Butonu */}
                        <Button
                            color='inherit'
                            onClick={() => navigate('/')}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 4,
                                px: 2,
                                minWidth: 'auto',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            <Badge badgeContent={0} color="error">
                                <HomeIcon />
                            </Badge>
                        </Button>

                        {/* Sepet Butonu */}
                        <Button
                            color='inherit'
                            onClick={() => navigate('/cart')}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 4,
                                px: 2,
                                minWidth: 'auto',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, mr: 1 }}>
                                SEPETİM
                            </Typography>
                            <Badge badgeContent={0} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </Button>

                        {/* Profil Butonu (Tıklanabilir Alan) */}
                        <Button
                            color="inherit"
                            onClick={handleProfileClick}
                            sx={{
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                ml: 0.5,
                                bgcolor: 'rgba(255,255,255,0.2)',
                                px: 2,
                                py: 0.8,
                                borderRadius: 5,
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                            }}
                        >
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(255,255,255,0.3)' }}>
                                <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
                            </Avatar>
                            <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', lg: 'block' } }}>
                                {user ? 'Profilim' : 'Giriş Yap'}
                            </Typography>
                        </Button>

                        {/* Çıkış Yap Butonu (Sadece giriş yapmışsa görünür) */}
                        {user && (
                            <IconButton
                                color="inherit"
                                onClick={handleLogout}
                                title="Çıkış Yap"
                                sx={{
                                    ml: 0.5,
                                    '&:hover': { bgcolor: 'rgba(255,0,0,0.1)' }
                                }}
                            >
                                <LogoutIcon sx={{ transform: 'rotate(180deg)' }} />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Yan Menü (Drawer) */}
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ p: 3, bgcolor: '#F08AD0', color: 'white' }}>
                        <Typography variant="h6" fontWeight="bold">Menü</Typography>
                        <Typography variant="caption">
                            {user ? `Merhaba, ${user.firstName || 'Kullanıcı'}` : 'Hoş geldiniz'}
                        </Typography>
                    </Box>
                    <List sx={{ flexGrow: 1 }}>
                        <ListItem button onClick={() => navigateTo('/')}><ListItemText primary='Ana Sayfa' /></ListItem>
                        <ListItem button onClick={() => navigateTo('/')}><ListItemText primary='Ürünler' /></ListItem>
                        <ListItem button onClick={() => navigateTo('/cart')}><ListItemText primary='Sepet' /></ListItem>
                        {user && <ListItem button onClick={() => navigateTo('/orders')}><ListItemText primary='Siparişlerim' /></ListItem>}
                        {!user && <ListItem button onClick={() => navigateTo('/sign-in')}><ListItemText primary='Giriş Yap' /></ListItem>}
                    </List>
                    {user && (
                        <>
                            <Divider />
                            <ListItem button onClick={handleLogout}>
                                <LogoutIcon color="error" sx={{ mr: 2 }} />
                                <ListItemText primary='Çıkış Yap' primaryTypographyProps={{ color: 'error', fontWeight: 'bold' }} />
                            </ListItem>
                        </>
                    )}
                </Box>
            </Drawer>

            {/* Sayfa İçeriği */}
            <Container maxWidth='xl' sx={{ py: 4, minHeight: '80vh' }}>
                <Outlet />
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ py: 4, bgcolor: 'white', textAlign: 'center', borderTop: '1px solid #e2e8f0', color: '#64748b' }}>
                <Typography variant="body2">© 2025 Perfume Store. Tüm hakları saklıdır.</Typography>
            </Box>
        </Box>
    );
}