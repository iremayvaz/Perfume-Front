import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import { dummyProducts, getProducts } from '../data/products';

const brands = [...new Set(dummyProducts.map(p => p.brand))];
const intensities = [...new Set(dummyProducts.map(p => p.intensity))];

function ProductPage() {
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
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1>Parfüm Mağazası</h1>
      <ProductFilter 
        brands={brands}
        intensities={intensities}
        filters={filters}
        onFilterChange={handleChange}
        onFilterSubmit={handleFilter}
      />
      <ProductList products={products} />
    </div>
  );
}

export default ProductPage;
