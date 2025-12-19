import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import {filterProducts, getProducts} from '../api/productApi';
import { dummyProducts } from '../data/products';

function HomePage() {
    const [filters, setFilters] = useState({
        brand: '',
        concentration: '',
        topNotes: '',
        heartNotes: '',
        baseNotes: '',
        minPrice: '',
        maxPrice: ''
    });

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    // Ürün listesinden unique marka ve yoğunlukları al
    const brands = [...new Set(products?.map((p) => p.brand).filter(Boolean))];
    const concentrations = [...new Set(products?.map((p) => p.concentration).filter(Boolean))];

    const topNotes = [...new Set(products?.flatMap((p) => {
        if (Array.isArray(p.topNotes)) return p.topNotes;
        if (typeof p.topNotes === 'string') return p.topNotes.split(',').map(n => n.trim());
        return [];
    }).filter(Boolean))].sort();

    const heartNotes = [...new Set(products?.flatMap((p) => {
        if (Array.isArray(p.heartNotes)) return p.heartNotes;
        if (typeof p.heartNotes === 'string') return p.heartNotes.split(',').map(n => n.trim());
        return [];
    }).filter(Boolean))].sort();

    const baseNotes = [...new Set(products?.flatMap((p) => {
        if (Array.isArray(p.baseNotes)) return p.baseNotes;
        if (typeof p.baseNotes === 'string') return p.baseNotes.split(',').map(n => n.trim());
        return [];
    }).filter(Boolean))].sort();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        setError('');

        const apiFilters = {
            ...filters,
            minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
            maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        };

        const res = await filterProducts(apiFilters);

        if (!res.success) {
            setError(res.message);
            return;
        }

        setProducts(res.data);
    };

    useEffect(() => {
        const loadProducts = async () => {
            const res = await getProducts();

            if (!res.success) {
                setProducts(dummyProducts);
                return;
            }
            setProducts(res.data);
        };

        loadProducts();
    }, []);

    return (
        // HTML tasarımındaki <main> yapısı kullanılıyor
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full min-h-screen bg-background-light dark:bg-background-dark">

            <ProductFilter
                brands={brands}
                concentrations={concentrations}
                topNotes={topNotes}
                heartNotes={heartNotes}
                baseNotes={baseNotes}
                filters={filters}
                onFilterChange={handleChange}
                onFilterSubmit={handleFilter}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <ProductCard products={products} />
        </main>
    );
}

export default HomePage;