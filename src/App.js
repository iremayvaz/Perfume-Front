import Layout from './Layout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import {Route, Routes} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './auth/ProtectedRoute';
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/product-detail/:id' element={<ProductDetailPage/>}/>
                <Route
                    path='/cart'
                    element={
                        <ProtectedRoute>
                            <CartPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/orders'
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/order-detail/:id'
                    element={
                        <ProtectedRoute>
                            <CartPage isOrderHistoryPage={true} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                    }
                />
            </Route>

            <Route path='/sign-in' element={<SignInPage />} />
        </Routes>
    );
}

export default App;