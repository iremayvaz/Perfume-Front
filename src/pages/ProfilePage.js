import React from 'react';
import { useAuth } from "../auth/AuthContext";
import {
    Container,
    Paper,
    Box,
    Typography,
    Avatar,
    Divider,
    Grid,
    Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return <Typography variant="h6" textAlign="center" mt={5}>Kullanıcı bulunamadı...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                {/* Üst Kısım: Avatar ve İsim */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            fontSize: '2rem',
                            mb: 2
                        }}
                    >
                        {user.firstName?.[0]}{user.lastName?.[0]}
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color="textSecondary">
                        Hesap Profili
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Bilgi Listesi */}
                <Grid container spacing={3}>
                    <Grid item xs={12} xl={12} display="flex" alignItems="center">
                        <PersonIcon sx={{ color: 'action.active', mr: 2 }} />
                        <Box>
                            <Typography variant="caption" display="block" color="textSecondary">
                                TAM AD
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {user.firstName} {user.lastName}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} xl={12} display="flex" alignItems="center">
                        <MailOutlineIcon sx={{ color: 'action.active', mr: 2 }} />
                        <Box>
                            <Typography variant="caption" display="block" color="textSecondary">
                                E-POSTA ADRESİ
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {user.mail}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ProfilePage;