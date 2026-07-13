import { products } from '../data/products.js';
import { ProductCard } from '../components/ProductCard.js';

export function Home() {
    const page = document.createElement('div');
    
    // Header section
    const header = document.createElement('div');
    header.innerHTML = `
        <h1 class="title">Featured Collection</h1>
        <p class="subtitle">Discover our premium selection of carefully curated products.</p>
    `;
    page.appendChild(header);

    // Products grid
    const grid = document.createElement('div');
    grid.className = 'product-grid';
    
    products.forEach(product => {
        const card = ProductCard(product);
        grid.appendChild(card);
    });
    
    page.appendChild(grid);
    
    return page;
}
