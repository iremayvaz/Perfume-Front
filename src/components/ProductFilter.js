import React from 'react';
import { Paper, Grid, TextField, MenuItem, Button, Typography, Box } from '@mui/material';

function ProductFilter({ brands, intensities, filters, onFilterChange, onFilterSubmit }) {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#fafafa' }}>
            <Typography variant='h6' fontWeight='bold' mb={2}>
                Ürün Filtresi
            </Typography>

            <Box display='flex'>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField select size='small' sx={{ width: 200 }} fullWidth label='Marka' name='brand' value={filters.brand} onChange={onFilterChange}>
                            <MenuItem value=''>Tüm Markalar</MenuItem>
                            {brands.map((b) => (
                                <MenuItem key={b} value={b}>
                                    {b}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Yoğunluk */}
                        <TextField select fullWidth size='small' sx={{ width: 200 }} label='Yoğunluk' name='intensity' value={filters.intensity} onChange={onFilterChange}>
                            <MenuItem value=''>Tüm Yoğunluklar</MenuItem>
                            {intensities.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Min fiyat */}
                        <TextField type='number' fullWidth size='small' label='Min Fiyat' name='minPrice' value={filters.minPrice} onChange={onFilterChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Max fiyat */}
                        <TextField type='number' fullWidth size='small' label='Max Fiyat' name='maxPrice' value={filters.maxPrice} onChange={onFilterChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button type='submit' variant='contained' size='medium' sx={{ px: 4, borderRadius: 2 }} onClick={onFilterSubmit}>
                            Filtrele
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

export default ProductFilter;
