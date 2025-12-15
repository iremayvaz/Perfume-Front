import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, InputAdornment, IconButton, Stack } from '@mui/material';
import { Visibility, VisibilityOff, Login, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';

export default function SignInPage() {
    const { login, register } = useAuth();

    const [isRegister, setIsRegister] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNum: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleLogin = async () => {
        setError('');
        const res = await login(form.email, form.password);
        if (!res.success) setError(res.message);
    };

    const handleRegister = async () => {
        setError('');

        if (!/^\d{11}$/.test(form.phoneNum)) {
            setError('Telefon numarası 11 haneli olmalıdır');
            return;
        }

        const res = await register({
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            phoneNum: form.phoneNum,
        });

        if (!res.success) setError(res.message);
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
            <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
                <Typography variant='h5' fontWeight='bold' mb={1} textAlign='center'>
                    {isRegister ? 'Kayıt Ol' : 'Hoş Geldiniz'}
                </Typography>

                <Typography variant='body2' mb={3} textAlign='center' color='text.secondary'>
                    {isRegister ? 'Yeni hesap oluşturun' : 'E-ticaret hesabınıza giriş yapın'}
                </Typography>

                <Stack spacing={2}>
                    <TextField label='Email' fullWidth value={form.email} onChange={handleChange('email')} />

                    <TextField
                        label='Şifre'
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {isRegister && (
                        <>
                            <TextField label='Ad' fullWidth value={form.firstName} onChange={handleChange('firstName')} />
                            <TextField label='Soyad' fullWidth value={form.lastName} onChange={handleChange('lastName')} />
                            <TextField label='Telefon Numarası' fullWidth value={form.phoneNum} onChange={handleChange('phoneNum')} inputProps={{ maxLength: 11 }} helperText='11 haneli olmalıdır' />
                        </>
                    )}
                </Stack>

                {error && (
                    <Typography color='error' mt={2}>
                        {error}
                    </Typography>
                )}

                <Button variant='contained' fullWidth sx={{ mt: 3, py: 1.2, borderRadius: 2 }} endIcon={isRegister ? <PersonAdd /> : <Login />} onClick={isRegister ? handleRegister : handleLogin}>
                    {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </Button>

                <Button
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError('');
                    }}
                >
                    {isRegister ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
                </Button>
            </Paper>
        </Box>
    );
}
