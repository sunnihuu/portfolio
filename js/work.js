/**
 * Work page category filtering
 * Handles project filtering by category (graphics, computational, product)
 */
document.addEventListener('DOMContentLoaded', function() {
  const categoryLinks = document.querySelectorAll('.work__category');
  const projectItems = document.querySelectorAll('.work__item');
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for items
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all project items
  projectItems.forEach(item => {
    observer.observe(item);
  });
  
  // Category filtering
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all categories
      categoryLinks.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked category
      this.classList.add('active');
      
      // Get the category from href (e.g., #all, #graphics, etc.)
      const category = this.getAttribute('href').substring(1);
      
      // Filter projects with animation
      projectItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'flex';
          item.classList.remove('animate-in');
          
          // Re-trigger animation with smoother timing
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 60);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
