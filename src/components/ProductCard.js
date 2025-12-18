import React from 'react';
import { useNavigate } from 'react-router-dom';
import {addToCart} from "../api/cartApi";
import {useAuth} from "../auth/AuthContext";

function ProductCard({ products = [] }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const addAsync = async (productId) => {
        await addToCart(user.id, {product_id: productId, quantity: 1});
    }

    if (products.length === 0) {
        return (
            <div className="text-center text-slate-500 py-10">
                Hiç ürün bulunamadı.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <article
                    key={product.id}
                    className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col overflow-hidden border border-slate-100 dark:border-slate-700 group cursor-pointer"
                    //onClick={() => navigate(`/product-detail/${product.id}`)}
                >
                    {/* Ürün Görseli */}
                    <div className="relative p-6 bg-white flex justify-center items-center h-56">
                        <button
                            className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Favoriye eklendi:', product.id);
                            }}
                        >
                            <span className="material-icons-outlined">favorite_border</span>
                        </button>
                        <img
                            alt={product.name}
                            className="max-h-full object-contain transform group-hover:scale-105 transition duration-500"
                            src={product.image ?? 'https://productimages.hepsiburada.net/s/121/424-600/110000071160168.jpg/format:webp'}
                        />
                    </div>

                    {/* Ürün Detayları */}
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1 truncate">
                            {product.brand} {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-2 text-sm text-yellow-500">
                            <span className="material-icons text-sm">star</span>
                            <span className="text-slate-500 dark:text-slate-400">{product.rating || 0}</span>
                        </div>

                        <div className="mt-auto">
                            <p className="text-primary font-bold text-xl mb-3">{product.price} TL</p>
                            <button
                                className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition shadow-md shadow-blue-200 dark:shadow-none"
                                onClick={async (e) => {
                                    await addAsync(product.id);
                                    console.log('Sepete eklendi:', product);
                                }}
                            >
                                SEPETE EKLE <span className="material-icons-outlined text-sm">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default ProductCard;