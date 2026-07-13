import { Home } from './pages/Home.js';
import { ProductDetails } from './pages/ProductDetails.js';
import { Cart } from './pages/Cart.js';

export function Router(appElement) {
    let currentPage = null;
    let mainContent = document.createElement('main');

    const routes = [
        { path: '/', component: Home },
        { path: '/cart', component: Cart },
        { path: /^\/product\/(.+)$/, component: ProductDetails } // Regex route for dynamic params
    ];

    function route() {
        const path = window.location.pathname;
        let match = null;

        for (const r of routes) {
            if (r.path instanceof RegExp) {
                const result = path.match(r.path);
                if (result) {
                    match = { route: r, params: result.slice(1) };
                    break;
                }
            } else if (r.path === path) {
                match = { route: r, params: [] };
                break;
            }
        }

        // Cleanup previous page if it has a onDestroy method
        if (currentPage && currentPage.onDestroy) {
            currentPage.onDestroy();
        }

        mainContent.innerHTML = '';

        if (match) {
            currentPage = match.route.component(...match.params);
            mainContent.appendChild(currentPage);
        } else {
            mainContent.innerHTML = `
                <div class="empty-state">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you are looking for does not exist.</p>
                    <a href="/" class="primary-btn" data-link style="margin-top: 2rem;">Back to Home</a>
                </div>
            `;
            currentPage = null;
        }
        
        // Ensure feather icons are replaced for newly loaded content
        if (window.feather) {
            window.feather.replace();
        }
        
        // Scroll to top on route change
        window.scrollTo(0, 0);
    }

    // Intercept link clicks
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            window.history.pushState(null, null, link.href);
            route();
        }
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', route);

    return {
        init: () => {
            appElement.appendChild(mainContent);
            route();
        },
        getMainElement: () => mainContent
    };
}
