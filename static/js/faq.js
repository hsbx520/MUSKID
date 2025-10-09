export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq__item');
  
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    
    // Add staggered animation delay
    item.style.setProperty('--delay', `${index * 20}ms`);
    
    // Click handler
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}