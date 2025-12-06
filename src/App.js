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
            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<HomePage />} />
                <Route path='product-detail/:id' element={<ProductDetailPage />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='orders' element={<OrdersPage />} />
                <Route path='order-detail/:id' element={<CartPage isOrderHistoryPage={true} />} />
            </Route>
            <Route path='sign-in' element={<SignInPage />} />
        </Routes>
    );
}

export default App;
