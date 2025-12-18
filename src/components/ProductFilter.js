import React from 'react';

function ProductFilter({ brands, intensities, filters, onFilterChange, onFilterSubmit }) {
    return (
        <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Ürün Filtresi</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end" onSubmit={onFilterSubmit}>
                {/* Marka Seçimi */}
                <div className="flex flex-col gap-1">
                    <select
                        name="brand"
                        value={filters.brand}
                        onChange={onFilterChange}
                        className="form-select w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary focus:ring focus:ring-primary/20 transition h-10"
                    >
                        <option value="">Marka Seçiniz</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                {/* Yoğunluk Seçimi */}
                <div className="flex flex-col gap-1">
                    <select
                        name="intensity"
                        value={filters.intensity}
                        onChange={onFilterChange}
                        className="form-select w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary focus:ring focus:ring-primary/20 transition h-10"
                    >
                        <option value="">Yoğunluk Seçiniz</option>
                        {intensities.map((intensity, index) => (
                            <option key={index} value={intensity}>{intensity}</option>
                        ))}
                    </select>
                </div>

                {/* Min Fiyat */}
                <div className="flex flex-col gap-1 relative">
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={onFilterChange}
                        className="form-input w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary focus:ring focus:ring-primary/20 transition pr-8 h-10"
                        placeholder="Min Fiyat"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-bold">₺</span>
                </div>

                {/* Max Fiyat */}
                <div className="flex flex-col gap-1 relative">
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={onFilterChange}
                        className="form-input w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary focus:ring focus:ring-primary/20 transition pr-8 h-10"
                        placeholder="Max Fiyat"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-bold">₺</span>
                </div>

                {/* Filtrele Butonu */}
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-200 flex items-center justify-center gap-2 h-10"
                >
                    FİLTRELE
                </button>
            </form>
        </section>
    );
}

export default ProductFilter;