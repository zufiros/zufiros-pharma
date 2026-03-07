document.addEventListener("DOMContentLoaded", () => {
  // Loading Spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    // Hide loading spinner after page loads
    setTimeout(() => {
      loadingSpinner.classList.add('hide');
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
      }, 500);
    }, 1000);
  }

  fetch("partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;
      // Highlight active page
      const currentPath = window.location.pathname;
      const pageName = currentPath.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check exact match or index.html match for root
        if (href === pageName || (href === 'index.html' && pageName === '')) {
          link.classList.add('active');
        }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });

  fetch("partials/footer.html")
    .then(res => res.text())
    .then(html => document.getElementById("footer-placeholder").innerHTML = html);

  // Handle contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      const text = `*New Inquiry via Contact Page*%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
      const whatsappUrl = `https://wa.me/919483664224?text=${text}`;

      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }

  // Handle appointment form
  const appointmentForm = document.querySelector('form[action="#"]');
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your inquiry! Our team will contact you shortly.");
      appointmentForm.reset();
    });
  }

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Add animation classes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.card, .service-item, .about-fact, .animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Counter Animation for Statistics
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
  });

  // Contact Form Handling
  const contactFormMain = document.getElementById('contactFormMain');

  if (contactFormMain) {
    contactFormMain.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('mail').value;
      const mobile = document.getElementById('mobile').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      const text = `*New Inquiry via Home Page*%0A%0AName: ${name}%0AEmail: ${email}%0AMobile: ${mobile}%0AService: ${service}%0AMessage: ${message}`;
      const whatsappUrl = `https://wa.me/919483664224?text=${text}`;

      // Show processing state
      const submitBtn = contactFormMain.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-whatsapp me-2"></i>Redirecting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        contactFormMain.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.product-card-modern, .service-card-modern, .trust-item, .stat-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });
});
