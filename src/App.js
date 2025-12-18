import Layout from './Layout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
    return (
        <Routes>
            {/* 1. ADIM: Layout artık ProtectedRoute DIŞINDA. */}
            {/* Böylece giriş yapmayanlar da Header'ı ve Footer'ı görebilir. */}
            <Route path='/' element={<Layout />}>

                {/* Herkese Açık Sayfalar (Login zorunluluğu yok) */}
                <Route index element={<HomePage />} />
                <Route path='product-detail/:id' element={<ProductDetailPage />} />

                {/* Sadece Üyelere Özel Sayfalar (ProtectedRoute İÇİNDE) */}
                {/* Giriş yapmamış biri buraya girmeye çalışırsa Login sayfasına atılır */}
                <Route
                    path='cart'
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='orders'
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='order-detail/:id'
                    element={
                        <ProtectedRoute>
                            <CartPage isOrderHistoryPage={true} />
                        </ProtectedRoute>
                    }
                />
            </Route>

            {/* Login Sayfası */}
            <Route path='sign-in' element={<SignInPage />} />
        </Routes>
    );
}

export default App;