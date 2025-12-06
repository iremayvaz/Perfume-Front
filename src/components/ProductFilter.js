import React from 'react';

function ProductFilter({ brands, intensities, filters, onFilterChange, onFilterSubmit }) {
  return (
    <form onSubmit={onFilterSubmit} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      <select name="brand" value={filters.brand} onChange={onFilterChange}>
        <option value=''>Tüm Markalar</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select>
      <select name="intensity" value={filters.intensity} onChange={onFilterChange}>
        <option value=''>Tüm Yoğunluklar</option>
        {intensities.map(intensity => <option key={intensity} value={intensity}>{intensity}</option>)}
      </select>
      <input name="minPrice" type="number" placeholder="Min Fiyat" value={filters.minPrice} onChange={onFilterChange} style={{ width: 100 }} />
      <input name="maxPrice" type="number" placeholder="Max Fiyat" value={filters.maxPrice} onChange={onFilterChange} style={{ width: 100 }} />
      <button type="submit">Filtrele</button>
    </form>
  );
}

export default ProductFilter;
