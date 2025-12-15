import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8ecf5 100%)' }}>
            <AppBar position='static' sx={{ background: '#ee94e6ff' }}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Perfume Store
                    </Typography>
                    <Button color='inherit' onClick={() => navigate('/cart')}>
                        Sepetim
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 240 }}>
                    <List>
                        <ListItem button>
                            <ListItemText primary='Ana Sayfa' onClick={() => navigate('/')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Ürünler' onClick={() => navigate('/')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Sepet' onClick={() => navigate('/cart')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Siparişlerim' onClick={() => navigate('/orders')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Hakkımızda' onClick={() => navigate('/')} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Container maxWidth='lg' sx={{ py: 4 }}>
                <Outlet />
            </Container>

            <Box sx={{ textAlign: 'center', py: 3, color: '#555' }}>© 2025 PerfumeStore — All Rights Reserved</Box>
        </Box>
    );
}
