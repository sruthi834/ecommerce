import { getCartCount, subscribe } from '../store.js';

export function Header() {
    const header = document.createElement('header');
    
    function render() {
        const count = getCartCount();
        header.innerHTML = `
            <div class="header-content">
                <a href="/" class="logo" data-link>Aura.</a>
                <nav class="nav-links">
                    <a href="/" class="nav-item" data-link>
                        <i data-feather="home"></i> Home
                    </a>
                    <a href="/cart" class="nav-item" data-link>
                        <i data-feather="shopping-cart"></i> Cart
                        ${count > 0 ? `<span class="cart-badge">${count}</span>` : ''}
                    </a>
                </nav>
            </div>
        `;
        
        // Re-initialize feather icons for newly rendered content
        if (window.feather) {
            window.feather.replace();
        }
    }

    render();
    
    // Subscribe to cart changes to re-render header badge
    const unsubscribe = subscribe(() => {
        render();
    });

    // Cleanup method if header is removed (though typically it stays)
    header.onDestroy = unsubscribe;

    return header;
}
