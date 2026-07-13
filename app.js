import { Header } from './components/Header.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Add header
    const header = Header();
    app.appendChild(header);

    // Initialize router which will handle the main content area
    const router = Router(app);
    router.init();
    
    // Initialize icons if not already done
    if (window.feather) {
        window.feather.replace();
    }
});
