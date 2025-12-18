import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsync, registerAsync } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';

function SignInPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // true = Login modu, false = Register modu
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [info, setInfo] = useState({
        email: '',
        password: '',
        name: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLoginMode) {
            login(info.email,
                  info.password);
        } else {
            const res = await registerAsync({
                email: info.email,
                password: info.password,
                name: info.name,
            });
            if (res.success) {
                // Kayıt başarılı -> Giriş moduna dön
                alert('Kayıt başarılı, lütfen giriş yapınız.');
                setIsLoginMode(true);
                setInfo({ email: '', password: '', name: '' });
            } else {
                setError(res.message);
            }
        }
    };

    return (
        <div className="bg-background-light min-h-screen flex items-center justify-center p-4 relative font-sans text-text-main-light">
            {/* Arka plan efektleri */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl transform translate-x-1/3"></div>
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Giriş Kartı */}
            <div className="relative z-10 w-full max-w-[480px] bg-white rounded-xl shadow-lg p-10 md:p-12 border border-gray-100">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-primary mb-4">
                        <span className="material-icons-outlined text-2xl">local_florist</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
                        {isLoginMode ? 'Hoş Geldiniz' : 'Hesap Oluştur'}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {isLoginMode ? 'E-ticaret hesabınıza giriş yapın' : 'Yeni bir hesap oluşturun'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Kayıt Modunda İsim Alanı */}
                    {!isLoginMode && (
                        <div className="space-y-1">
                            <label className="sr-only" htmlFor="name">İsim</label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                    id="name"
                                    name="name"
                                    placeholder="Ad Soyad"
                                    type="text"
                                    value={info.name}
                                    onChange={handleChange}
                                    required={!isLoginMode}
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Alanı */}
                    <div className="space-y-1">
                        <label className="sr-only" htmlFor="email">Email</label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                type="email"
                                value={info.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Şifre Alanı */}
                    <div className="space-y-1">
                        <label className="sr-only" htmlFor="password">Şifre</label>
                        <div className="relative group">
                            <input
                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 pr-12"
                                id="password"
                                name="password"
                                placeholder="Şifre"
                                required
                                type={showPassword ? "text" : "password"}
                                value={info.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                            >
                                <span className="material-icons-outlined text-xl">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Buton */}
                    <button
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 px-4 rounded-lg shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-200 flex items-center justify-center gap-2 group"
                        type="submit"
                    >
                        {isLoginMode ? 'GİRİŞ YAP' : 'KAYIT OL'}
                        <span className="material-icons-outlined text-lg transition-transform group-hover:translate-x-1">
                            {isLoginMode ? 'login' : 'person_add'}
                        </span>
                    </button>

                    {/* Mod Değiştirme Linki */}
                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setError('');
                                setInfo({ email: '', password: '', name: '' });
                            }}
                            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors uppercase tracking-wide"
                        >
                            {isLoginMode ? 'HESABIN YOK MU? KAYIT OL' : 'ZATEN HESABIN VAR MI? GİRİŞ YAP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;