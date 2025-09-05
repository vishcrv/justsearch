// justsearch - clean youtube extension


function transformYouTubeHomepage() {
    if (window.location.pathname === '/') {
        // hides only the homepage video grid, keep search results area
        document.querySelectorAll('ytd-rich-grid-renderer').forEach(el => el.style.display = 'none');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', transformYouTubeHomepage);
} else {
    transformYouTubeHomepage();
}

// also run when navigating (for SPA behavior)
let currentPath = window.location.pathname;
const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        setTimeout(transformYouTubeHomepage, 100);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// re-run transformation when new content is added (YouTube is a SPA)
const contentObserver = new MutationObserver(() => {
    if (window.location.pathname === '/') {
        setTimeout(transformYouTubeHomepage, 100);
    }
});

contentObserver.observe(document.body, {
    childList: true,
    subtree: true
});
