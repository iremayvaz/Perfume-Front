import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    // Sayfa yenilendiğinde localStorage'dan user'ı oku
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Kullanıcı değiştiğinde localStorage güncelle
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = async (email, password) => {
        if (email === "demo@demo.com" && password === "123456") {
            const userData = { email };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // giriş kalıcı
            navigate("/");
            return { success: true };
        }
        return { success: false, message: "Email veya şifre yanlış" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // çıkışta temizle
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
