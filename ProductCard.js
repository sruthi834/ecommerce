import { addToCart } from '../store.js';

export function ProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">
                $${product.price.toFixed(2)}
                <button class="add-to-cart-btn" aria-label="Add to cart" title="Add to cart">
                    <i data-feather="plus"></i>
                </button>
            </div>
        </div>
    `;

    // Click on the card navigates to product details
    card.addEventListener('click', (e) => {
        // If clicking the add to cart button, don't navigate
        if (e.target.closest('.add-to-cart-btn')) {
            return;
        }
        window.history.pushState(null, null, `/product/${product.id}`);
        // Dispatch a custom event to trigger router
        window.dispatchEvent(new Event('popstate'));
    });

    // Add to cart button logic
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
        
        // Brief visual feedback
        const icon = addToCartBtn.querySelector('i');
        icon.setAttribute('data-feather', 'check');
        if (window.feather) window.feather.replace();
        
        setTimeout(() => {
            icon.setAttribute('data-feather', 'plus');
            if (window.feather) window.feather.replace();
        }, 1000);
    });

    return card;
}
