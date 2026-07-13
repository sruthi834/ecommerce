import { getProductById } from '../data/products.js';
import { addToCart } from '../store.js';

export function ProductDetails(productId) {
    const page = document.createElement('div');
    const product = getProductById(productId);

    if (!product) {
        page.innerHTML = `
            <div class="empty-state">
                <h2>Product Not Found</h2>
                <p>The product you are looking for does not exist.</p>
                <a href="/" class="primary-btn" data-link style="margin-top: 2rem;">Back to Home</a>
            </div>
        `;
        return page;
    }

    page.innerHTML = `
        <div class="product-details">
            <div>
                <img src="${product.image}" alt="${product.title}" class="details-image" />
            </div>
            <div class="details-info">
                <span class="product-category">${product.category}</span>
                <h1 class="title" style="font-size: 3rem;">${product.title}</h1>
                <div class="details-price">$${product.price.toFixed(2)}</div>
                <p class="details-description">${product.description}</p>
                
                <button class="primary-btn add-to-cart-action">
                    <i data-feather="shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    const addBtn = page.querySelector('.add-to-cart-action');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addToCart(product);
            const originalText = addBtn.innerHTML;
            addBtn.innerHTML = `<i data-feather="check"></i> Added`;
            if (window.feather) window.feather.replace();
            
            setTimeout(() => {
                addBtn.innerHTML = originalText;
                if (window.feather) window.feather.replace();
            }, 1500);
        });
    }

    return page;
}
