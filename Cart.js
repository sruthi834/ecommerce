import { getCart, getCartTotal, updateQuantity, removeFromCart, subscribe } from '../store.js';

export function Cart() {
    const page = document.createElement('div');
    
    function render() {
        const cart = getCart();
        
        const header = document.createElement('div');
        header.innerHTML = `
            <h1 class="title">Your Cart</h1>
            <p class="subtitle">Review your items and proceed to checkout.</p>
        `;
        
        page.innerHTML = '';
        page.appendChild(header);

        if (cart.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i data-feather="shopping-bag" width="64" height="64"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="/" class="primary-btn" data-link style="margin-top: 2rem;">Continue Shopping</a>
            `;
            page.appendChild(emptyState);
        } else {
            const cartContainer = document.createElement('div');
            cartContainer.className = 'cart-container';
            
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn dec-btn" data-id="${item.id}">
                                <i data-feather="minus" width="16" height="16"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn inc-btn" data-id="${item.id}">
                                <i data-feather="plus" width="16" height="16"></i>
                            </button>
                        </div>
                        <button class="quantity-btn remove-btn" data-id="${item.id}" style="color: #ef4444;" title="Remove">
                            <i data-feather="trash-2" width="18" height="18"></i>
                        </button>
                    </div>
                `;
                
                // Add event listeners for this specific item
                itemEl.querySelector('.dec-btn').addEventListener('click', () => {
                    updateQuantity(item.id, item.quantity - 1);
                });
                itemEl.querySelector('.inc-btn').addEventListener('click', () => {
                    updateQuantity(item.id, item.quantity + 1);
                });
                itemEl.querySelector('.remove-btn').addEventListener('click', () => {
                    removeFromCart(item.id);
                });
                
                cartContainer.appendChild(itemEl);
            });
            
            const totalEl = document.createElement('div');
            totalEl.className = 'cart-total';
            totalEl.innerHTML = `
                <span>Total</span>
                <span>$${getCartTotal().toFixed(2)}</span>
            `;
            
            const checkoutBtn = document.createElement('button');
            checkoutBtn.className = 'primary-btn';
            checkoutBtn.style.width = '100%';
            checkoutBtn.style.marginTop = '2rem';
            checkoutBtn.innerHTML = `Proceed to Checkout`;
            checkoutBtn.addEventListener('click', () => {
                alert('Checkout flow would start here!');
            });
            
            cartContainer.appendChild(totalEl);
            cartContainer.appendChild(checkoutBtn);
            
            page.appendChild(cartContainer);
        }

        if (window.feather) window.feather.replace();
    }

    render();
    
    // Subscribe to cart changes to re-render the page
    const unsubscribe = subscribe(() => {
        render();
    });

    // Cleanup when component is removed
    page.onDestroy = unsubscribe;

    return page;
}
