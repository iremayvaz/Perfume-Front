import { dummyProducts } from '../data/products';
import axios from '../utils/axios';

export const addToCart = async (userId, cartItem) => {
    try {
        const res = await axios.post(`/add/to/${userId}`, cartItem);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return mockAddToCart(userId, cartItem);
        return {
            success: false,
            message: err.response?.data?.message || 'Sepete eklenemedi!',
        };
    }
};

const mockAddToCart = async (userId, cartItem) => {
    const product = dummyProducts.find((p) => p.id === cartItem.product_id);

    if (!product) {
        return {
            success: false,
            message: 'Ürün bulunamadı',
        };
    }

    await new Promise((r) => setTimeout(r, 300));

    const storageKey = `cart_${userId}`;
    const storedCart = JSON.parse(localStorage.getItem(storageKey));

    let cart = storedCart ?? {
        id: Date.now(),
        cartItems: [],
        total: 0,
        pricesRefreshed: false,
    };

    const existingItem = cart.cartItems.find((x) => x.productId === cartItem.product_id);

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
    } else {
        cart.cartItems.push({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: cartItem.quantity ?? 1,
            total: product.price * (product.quantity ?? 1),
        });
    }

    cart.total = cart.cartItems.reduce((sum, i) => sum + i.total, 0);

    localStorage.setItem(storageKey, JSON.stringify(cart));

    return {
        success: true,
        data: cart, // AddToCartResponse
    };
};

export const viewCart = async (userId) => {
    try {
        const res = await axios.get(`/cart/view/${userId}`);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return mockCartViewFromLocalStorage(userId);
        return {
            success: false,
            message: err.response?.data?.message || 'Sepete eklenemedi!',
        };
    }
};

const mockCartViewFromLocalStorage = (userId) => {
    const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};

    if (!userCart || !userCart.cartItems) {
        return [];
    }

    const data = userCart.cartItems.map((item, index) => {
        const unitPrice = item.price;
        const quantity = item.quantity;

        return {
            itemId: index + 1,
            productId: item.productId,
            productName: item.productName,
            quantity: quantity,

            unitPriceSnapshot: unitPrice,
            subTotal: unitPrice * quantity,

            priceLockedUntil: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 gün
            currency: 'TRY',
        };
    });

    return {
        success: true,
        data: data,
    };
};

export const removeFromCart = async (userId, itemId) => {
    try {
        const res = await axios.delete(`/cart/remove/${itemId}/from/${userId}`);
        return {
            success: true,
            message: res.data, // backend string dönüyor
        };
    } catch (err) {
        return mockRemoveFromCartFromLocalStorage(userId, itemId);
        return {
            success: false,
            message: 'Sepet ürünü bulunamadı',
        };
    }
};

const mockRemoveFromCartFromLocalStorage = (userId, itemId) => {
    const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};

    if (!userCart || !userCart.cartItems) {
        return [];
    }

    // itemId index + 1 olarak üretilmişti
    const itemIndex = itemId - 1;

    if (itemIndex < 0 || itemIndex >= userCart.cartItems.length) {
        return {
            success: false,
            message: 'Sepet ürünü bulunamadı',
        };
    }

    userCart.cartItems.splice(itemIndex, 1);

    localStorage.setItem(`cart_${userId}`, JSON.stringify(userCart));

    return {
        success: true,
        message: 'Ürün sepetten çıkarıldı (local)',
    };
};

export const updateCartItemQuantity = async (userId, itemId, quantity) => {
    try {
        const res = await axios.put(`/cart/update/${itemId}/to/${quantity}/for/${userId}`);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return mockUpdateCartItemFromLocalStorage(userId, itemId, quantity);
        return {
            success: false,
            message: 'Sepet ürünü güncellenemedi',
        };
    }
};

const mockUpdateCartItemFromLocalStorage = (userId, itemId, quantity) => {
    const cartKey = `cart_${userId}`;
    const userCart = JSON.parse(localStorage.getItem(cartKey)) || {};

    if (!userCart || !userCart.cartItems) {
        return [];
    }

    const index = itemId - 1;

    if (index < 0 || index >= userCart.cartItems.length) {
        throw new Error('Sepet ürünü bulunamadı');
    }

    if (quantity < 1 || quantity > 10) {
        throw new Error('Geçersiz adet');
    }

    userCart.cartItems[index].quantity = quantity;

    localStorage.setItem(cartKey, JSON.stringify(userCart));

    const cartItems = userCart.cartItems.map((item, idx) => {
        const unitPrice = item.price;
        const qty = item.quantity;

        return {
            itemId: idx + 1,
            productId: item.productId,
            productName: item.productName,
            quantity: qty,
            unitPriceSnapshot: unitPrice,
            subTotal: unitPrice * qty,
            currency: 'TRY',
        };
    });

    const total = cartItems.reduce((acc, i) => acc + i.subTotal, 0);

    return {
        success: true,
        data: {
            id: userCart.id,
            cartItems,
            total,
            pricesRefreshed: false,
        },
    };
};
