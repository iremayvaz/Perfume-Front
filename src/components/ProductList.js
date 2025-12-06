import React from 'react';

function ProductList({ products = [] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
          <h2 style={{ marginBottom: 8 }}>{product.name}</h2>
          <div><b>Marka:</b> {product.brand}</div>
          <div><b>Yoğunluk:</b> {product.intensity}</div>
          <div><b>Fiyat:</b> {product.price} TL</div>
        </div>
      ))}
      {products.length === 0 && <div>Hiç ürün yok.</div>}
    </div>
  );
}

export default ProductList;
