export const dummyProducts = [
  { id: 1, name: 'Dior Sauvage', brand: 'Dior', price: 2200, intensity: 'Eau de Parfum' },
  { id: 2, name: 'Chanel Bleu', brand: 'Chanel', price: 2100, intensity: 'Eau de Toilette' },
  { id: 3, name: 'Tom Ford Black Orchid', brand: 'Tom Ford', price: 2500, intensity: 'Parfum' },
  { id: 4, name: 'Creed Aventus', brand: 'Creed', price: 3300, intensity: 'Eau de Parfum' },
  { id: 5, name: 'Versace Eros', brand: 'Versace', price: 1900, intensity: 'Eau de Toilette' },
];

export function getProducts(filters = {}) {
  let products = [...dummyProducts];
  if (filters.brand) {
    products = products.filter(p => p.brand === filters.brand);
  }
  if (filters.intensity) {
    products = products.filter(p => p.intensity === filters.intensity);
  }
  if (filters.minPrice !== undefined && filters.minPrice !== '') {
    products = products.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
    products = products.filter(p => p.price <= filters.maxPrice);
  }
  return products;
}
