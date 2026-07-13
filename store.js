// A simple state management store for the Cart

let cart = [];
const listeners = [];

export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
}

function notify() {
    listeners.forEach(listener => listener(cart));
}

export function getCart() {
    return cart;
}

export function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    notify();
}

export function updateQuantity(id, quantity) {
    if (quantity <= 0) {
        removeFromCart(id);
        return;
    }
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = quantity;
        notify();
    }
}

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    notify();
}

export function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
