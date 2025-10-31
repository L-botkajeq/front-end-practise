// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    
    // Gallery item click events - open modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const imageUrl = this.style.backgroundImage.slice(5, -2); // Extract URL from background-image
            
            document.getElementById('modalBody').innerHTML = `
                <div style="text-align: center;">
                    <img src="${imageUrl}" alt="${title}" class="modal-image">
                    <h4>${title}</h4>
                    <p>This photo captures the exciting moments of athletes during the competition.</p>
                    <p>Photo taken: ${new Date().toLocaleDateString()}</p>
                </div>
            `;
            modal.style.display = 'flex';
        });
    });
}