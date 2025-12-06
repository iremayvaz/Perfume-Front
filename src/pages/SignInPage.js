import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';

export default function SignInPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await login(email, password);

        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                px: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 3,
                }}
            >
                <Typography variant='h5' fontWeight='bold' mb={1} textAlign='center'>
                    Hoş Geldiniz
                </Typography>
                <Typography variant='body2' mb={3} textAlign='center' color='text.secondary'>
                    E-ticaret hesabınıza giriş yapın
                </Typography>

                <TextField label='Email' fullWidth margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} />

                <TextField
                    label='Şifre'
                    fullWidth
                    margin='normal'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {error && (
                    <Typography color='error' mt={1}>
                        {error}
                    </Typography>
                )}

                <Button variant='contained' fullWidth sx={{ mt: 3, py: 1.2, borderRadius: 2 }} endIcon={<Login />} onClick={handleLogin}>
                    Giriş Yap
                </Button>
            </Paper>
        </Box>
    );
}
