// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Simulate real-time data updates
    setInterval(() => {
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        const homeCards = document.querySelectorAll('#home .card');
        if (homeCards[0]) {
            homeCards[0].querySelector('p:nth-child(3)').textContent = 
                `Next Event: High Jump Finals (${timeString})`;
        }
    }, 60000);
    
    // Add scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
});

function initApp() {
    // Load the home section by default
    loadSection('home');
}

// Add highlight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { background-color: #e8f5e8; }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);