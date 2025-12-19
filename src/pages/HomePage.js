import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import {filterProducts, getFilterOptionsAsync, getProducts} from '../api/productApi';
import { dummyProducts } from '../data/products';

function HomePage() {
    const [filters, setFilters] = useState({
        brand: '',
        concentration: '',
        topNotes: '',
        heartNotes: '',
        baseNotes: ''
    });

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const [filterOptions, setFilterOptions] = useState({
        brands: [],
        concentrations: [],
        topNotes: [],
        heartNotes: [],
        baseNotes: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        setError('');

        const res = await filterProducts(filters);

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

            const optionsRes = await getFilterOptionsAsync();
            if (optionsRes.success) {
                setFilterOptions(optionsRes.data);
            }
        };

        loadProducts();
    }, []);

    return (
        // HTML tasarımındaki <main> yapısı kullanılıyor
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full min-h-screen bg-background-light dark:bg-background-dark">

            <ProductFilter
                brands={filterOptions.brands}
                concentrations={filterOptions.concentrations}
                topNotes={filterOptions.topNotes}
                heartNotes={filterOptions.heartNotes}
                baseNotes={filterOptions.baseNotes}
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