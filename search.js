// Search functionality
function initSearch() {
    // Enter key search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchResults();
        }
    });
}

function searchResults() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#resultsTable tr');
    let foundCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
            row.style.animation = 'highlight 2s ease';
            foundCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    if (searchTerm) {
        // Show search result statistics
        const searchBox = document.querySelector('.search-box');
        let resultMsg = document.getElementById('searchResultMsg');
        
        if (!resultMsg) {
            resultMsg = document.createElement('div');
            resultMsg.id = 'searchResultMsg';
            resultMsg.style.marginTop = '1rem';
            resultMsg.style.padding = '0.75rem';
            resultMsg.style.borderRadius = '5px';
            resultMsg.style.background = '#e8f5e8';
            resultMsg.style.color = '#2d5016';
            searchBox.parentNode.insertBefore(resultMsg, searchBox.nextSibling);
        }
        
        resultMsg.innerHTML = `Found <strong>${foundCount}</strong> results for "<strong>${searchInput.value}</strong>"`;
        
        // Fade out result message after 3 seconds
        setTimeout(() => {
            resultMsg.style.opacity = '0';
            resultMsg.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (resultMsg.parentNode) {
                    resultMsg.parentNode.removeChild(resultMsg);
                }
            }, 500);
        }, 3000);
    }
}