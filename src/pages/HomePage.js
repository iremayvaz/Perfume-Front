import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { dummyProducts, getProducts } from '../data/products';
import { Container, Typography, Paper, Box } from '@mui/material';

const brands = [...new Set(dummyProducts.map((p) => p.brand))];
const intensities = [...new Set(dummyProducts.map((p) => p.intensity))];

function HomePage() {
    const [filters, setFilters] = useState({ brand: '', intensity: '', minPrice: '', maxPrice: '' });
    const [products, setProducts] = useState(getProducts());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const apifilters = {
            ...filters,
            minPrice: filters.minPrice === '' ? undefined : parseInt(filters.minPrice),
            maxPrice: filters.maxPrice === '' ? undefined : parseInt(filters.maxPrice),
        };
        setProducts(getProducts(apifilters));
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 6 }}>
            <ProductFilter brands={brands} intensities={intensities} filters={filters} onFilterChange={handleChange} onFilterSubmit={handleFilter} />
            <ProductCard products={products} />
        </Container>
    );
}

export default HomePage;
