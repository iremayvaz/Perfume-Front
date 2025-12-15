import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { Container, Typography, Box } from '@mui/material';
import { getProducts } from '../api/productApi';
import { dummyProducts } from '../data/products';

function HomePage() {
    const [filters, setFilters] = useState({
        brand: '',
        intensity: '',
        minPrice: '',
        maxPrice: '',
    });

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    console.log({ products });

    const brands = [...new Set(products?.map((p) => p.brand))];
    const intensities = [...new Set(products?.map((p) => p.intensity))];

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

        const res = await getProducts(apiFilters);

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
                // backend yoksa dummy fallback
                setProducts(dummyProducts);
                return;
            }

            setProducts(res.data);
        };

        loadProducts();
    }, []);

    return (
        <Container maxWidth='lg' sx={{ mt: 6 }}>
            <ProductFilter brands={brands} intensities={intensities} filters={filters} onFilterChange={handleChange} onFilterSubmit={handleFilter} />

            {error && (
                <Typography color='error' mt={2}>
                    {error}
                </Typography>
            )}

            <Box mt={4}>
                <ProductCard products={products} />
            </Box>
        </Container>
    );
}

export default HomePage;
