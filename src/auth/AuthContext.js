import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsync as loginApi, registerAsync as registerApi } from '../api/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // 🔐 LOGIN
    const login = async (email, password) => {
        const res = await loginApi({ email, password });

        if (!res.success) {
            return res;
        }

        const { accessToken, refreshToken } = res.data;

        const userData = { id: 1, email, accessToken, refreshToken };

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        navigate('/');

        return { success: true };
    };

    // 📝 REGISTER
    const register = async (payload) => {
        const res = await registerApi(payload);

        if (!res.success) {
            return res;
        }

        navigate('/sign-in');
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        navigate('/sign-in');
    };

    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
};
