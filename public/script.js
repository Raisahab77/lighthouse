document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const searchInput = document.querySelector('input[name="search"]');
    const filterSelect = document.querySelector('select[name="filter"]');

    function updateLogs() {
        const searchValue = searchInput.value;
        const filterValue = filterSelect.value;
        const url = new URL(window.location);
        url.searchParams.set('search', searchValue);
        url.searchParams.set('filter', filterValue);
        url.searchParams.delete('page');

        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newTable = doc.querySelector('table');
                const pagination = doc.querySelector('.mt-4.flex.justify-between.items-center');
                document.querySelector('table').outerHTML = newTable.outerHTML;
                document.querySelector('.mt-4.flex.justify-between.items-center').outerHTML = pagination.outerHTML;
                history.pushState(null, '', url);
            });
    }

    searchInput.addEventListener('input', updateLogs);
    filterSelect.addEventListener('change', updateLogs);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateLogs();
    });
});

function toggleDetails(index) {
    const detailsRow = document.getElementById(`details-${index}`);
    detailsRow.classList.toggle('expanded');
    const row = document.getElementById(`row-${index}`);
    row.classList.toggle('reversed');
}

function toggleTheme() {
    const html = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check if there's a saved theme in localStorage
    let savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme) {
        // If no saved theme, use system default
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply the saved theme
    if (savedTheme === 'dark') {
        html.classList.add('dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    // Toggle theme and save the preference to localStorage
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        
    } else {
        localStorage.setItem('theme', 'light');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

// Initial theme setup based on localStorage or system default
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'dark') {
            html.classList.add('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            html.classList.remove('dark');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            html.classList.add('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            html.classList.remove('dark');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }
});
