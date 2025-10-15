/* scripts/app.js
   - Renders article cards from an array (template literals)
   - Lazy loads images (IntersectionObserver fallback)
   - Opens/closes modal with article details
   - Favorites saved in localStorage
   - Newsletter form validated and subscribers saved to localStorage
   - Uses template literals exclusively to build HTML content
*/


// document.addEventListener('DOMContentLoaded', init);

// const articles = [
//   {
//     id: 'a1',
//     title: 'Stewardship of Tithing Funds',
//     summary: 'Court ruling acknowledges Church integrity.',
//     image: 'images/image1.png',
//     content: 'The Church of Jesus Christ of Latter-day Saints has long maintained the highest standards of financial stewardship. Recent court rulings have acknowledged the integrity and transparency of the church\'s handling of tithing funds, reinforcing the trust members place in church leadership to wisely manage sacred donations for the building of the kingdom of God.'
//   },
//   {
//     id: 'a2',
//     title: 'Harmonizing Sacred Past and Future',
//     summary: 'A look at the Salt Lake Temple\'s renovation.',
//     image: 'images/image2.jpeg',
//     content: 'The renovation of the Salt Lake Temple represents a careful balance between preserving its sacred history and preparing it for future generations. This comprehensive project includes seismic upgrades, accessibility improvements, and mechanical system updates while maintaining the temple\'s iconic architectural features and spiritual significance.'
//   },
//   {
//     id: 'a3',
//     title: 'Guide — The Name of the Church',
//     summary: 'The Church of Jesus Christ of Latter-day Saints.',
//     image: 'images/images3.jpg',
//     content: 'President Russell M. Nelson has emphasized the importance of using the correct name of the Church as revealed by the Lord. The full name, The Church of Jesus Christ of Latter-day Saints, emphasizes the central role of Jesus Christ in the restored gospel and helps distinguish the church from other organizations.'
//   },
//   {
//     id: 'a4',
//     title: '"Change the World" President Johnson',
//     summary: 'Tells global audience on organization anniversary.',
//     image: 'images/image4.jpg',
//     content: 'In a powerful address marking an important organizational anniversary, President Johnson encouraged members worldwide to actively work toward positive change in their communities. His message emphasized that individual actions, guided by faith and compassion, can create ripples of goodness that transform societies and bring hope to those in need.'
//   }
// ];

// Current filter state
// let currentFilter = 'all'; // 'all' or 'favorites'

// --- Initialization
// function init() {
//   renderArticles();
//   setupEventListeners();
//   lazyLoadImages();
//   loadFavoritesUI();
//   updateFavoriteCounter();
//   initBackToTop();
//   initFavoritesFilter();
// }

// --- Render articles using template literals (only)
// function renderArticles(filterType = 'all') {
//   const container = document.querySelector('.articles-card');
//   const emptyState = document.getElementById('emptyFavs');
  
//   if (!container) return;

//   let articlesToRender = articles;
  
  // Filter logic
  // if (filterType === 'favorites') {
  //   const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
  //   articlesToRender = articles.filter(a => favs.includes(a.id));
    
  //   // Show empty state if no favorites
  //   if (articlesToRender.length === 0) {
  //     container.style.display = 'none';
  //     if (emptyState) emptyState.style.display = 'block';
  //     return;
  //   }
  // }
  
  // Hide empty state and show articles
//   container.style.display = 'grid';
//   if (emptyState) emptyState.style.display = 'none';

//   const html = articlesToRender.map(a => `
//     <article class="article-card" data-id="${a.id}">
//       <img class="card-img" src="${a.image}" alt="${escapeHtml(a.title)}" loading="lazy" decoding="async" />
//       <div class="card-body">
//         <h3>${escapeHtml(a.title)}</h3>
//         <p>${escapeHtml(a.summary)}</p>
//       </div>
//       <div class="card-actions">
//         <button class="btn-learn" data-id="${a.id}">Learn more</button>
//         <button class="btn-fav" aria-label="Add to favorites" data-id="${a.id}">☆</button>
//       </div>
//     </article>
//   `).join('');

//   container.innerHTML = `${html}`;
  
//   // Re-apply favorite stars after rendering
//   loadFavoritesUI();
// }

// // --- Simple escape helper
// function escapeHtml(str) {
//   return String(str).replace(/[&<>"']/g, function(m){
//     return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
//   });
// }

// // --- Event listeners with delegation
// function setupEventListeners() {
//   const container = document.querySelector('.articles-card');
//   if (container) {
//     container.addEventListener('click', (e) => {
//       const learn = e.target.closest('.btn-learn');
//       const fav = e.target.closest('.btn-fav');
//       if (learn) {
//         openArticleModal(learn.dataset.id);
//         return;
//       }
//       if (fav) {
//         toggleFavorite(fav.dataset.id, fav);
//         return;
//       }
//     });
//   }

//   // Modal controls
//   const modal = document.getElementById('articleModal');
//   if (modal) {
//     modal.querySelector('.modal-close').addEventListener('click', closeArticleModal);
//     modal.addEventListener('click', (e) => { if (e.target === modal) closeArticleModal(); });
//     document.addEventListener('keydown', (e) => { 
//       if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeArticleModal(); 
//     });
//   }

//   // Newsletter form
//   const form = document.getElementById('newsletterForm');
//   if (form) form.addEventListener('submit', handleNewsletterSubmit);
// }

// // --- Modal open/close
// function openArticleModal(id) {
//   const article = articles.find(a => a.id === id);
//   if (!article) return;
//   const modal = document.getElementById('articleModal');
//   modal.setAttribute('aria-hidden', 'false');
//   modal.querySelector('#modalTitle').textContent = article.title;
//   modal.querySelector('#modalBody').textContent = article.content;
//   modal.querySelector('.modal-panel').focus();
// }

// function closeArticleModal() {
//   const modal = document.getElementById('articleModal');
//   modal.setAttribute('aria-hidden', 'true');
//   modal.querySelector('#modalTitle').textContent = '';
//   modal.querySelector('#modalBody').textContent = '';
// }

// // --- Favorites (localStorage)
// function toggleFavorite(id, btnEl) {
//   let favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
//   const exists = favs.includes(id);
  
//   if (exists) {
//     favs = favs.filter(x => x !== id);
//     btnEl.textContent = '☆';
//   } else {
//     favs.push(id);
//     btnEl.textContent = '★';
//   }
  
//   localStorage.setItem('ldsfavs', JSON.stringify(favs));
//   updateFavoriteCounter();
  
//   // If currently showing favorites and item was unfavorited, re-render
//   if (currentFilter === 'favorites' && exists) {
//     renderArticles('favorites');
//   }
// }

// function loadFavoritesUI() {
//   const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
//   favs.forEach(id => {
//     const btn = document.querySelector(`.btn-fav[data-id="${id}"]`);
//     if (btn) btn.textContent = '★';
//   });
// }

// // --- Update favorite counter
// function updateFavoriteCounter() {
//   const counter = document.getElementById('favCount');
//   if (!counter) return;
  
//   const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
//   const count = favs.length;
//   counter.textContent = `${count} favorite${count !== 1 ? 's' : ''}`;
// }

// // --- Initialize favorites filter buttons
// function initFavoritesFilter() {
//   const showAllBtn = document.getElementById('showAllBtn');
//   const showFavsBtn = document.getElementById('showFavsBtn');
  
//   if (!showAllBtn || !showFavsBtn) return;
  
//   showAllBtn.addEventListener('click', () => {
//     currentFilter = 'all';
//     renderArticles('all');
//     showAllBtn.classList.add('active');
//     showAllBtn.setAttribute('aria-pressed', 'true');
//     showFavsBtn.classList.remove('active');
//     showFavsBtn.setAttribute('aria-pressed', 'false');
//   });
  
//   showFavsBtn.addEventListener('click', () => {
//     currentFilter = 'favorites';
//     renderArticles('favorites');
//     showFavsBtn.classList.add('active');
//     showFavsBtn.setAttribute('aria-pressed', 'true');
//     showAllBtn.classList.remove('active');
//     showAllBtn.setAttribute('aria-pressed', 'false');
//   });
// }

// // --- Back to Top button functionality
// function initBackToTop() {
//   const backToTopBtn = document.getElementById('backToTop');
//   if (!backToTopBtn) return;
  
//   // Show/hide button based on scroll position
//   window.addEventListener('scroll', () => {
//     if (window.pageYOffset > 300) {
//       backToTopBtn.classList.add('visible');
//     } else {
//       backToTopBtn.classList.remove('visible');
//     }
//   });
  
//   // Smooth scroll to top
//   backToTopBtn.addEventListener('click', () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   });
// }

// // --- Lazy load images (IntersectionObserver)
// function lazyLoadImages() {
//   const imgs = document.querySelectorAll('img[loading="lazy"], .card-img[data-src]');
//   if ('IntersectionObserver' in window) {
//     const observer = new IntersectionObserver((entries, obs) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const img = entry.target;
//           if (img.dataset && img.dataset.src) {
//             img.src = img.dataset.src;
//             delete img.dataset.src;
//           }
//           obs.unobserve(img);
//         }
//       });
//     }, { rootMargin: '100px 0px' });

//     imgs.forEach(img => observer.observe(img));
//   } else {
//     imgs.forEach(img => {
//       if (img.dataset && img.dataset.src) {
//         img.src = img.dataset.src;
//         delete img.dataset.src;
//       }
//     });
//   }
// }

// // --- Newsletter form handler (validate, store in localStorage)
// function handleNewsletterSubmit(e) {
//   e.preventDefault();
//   const name = document.getElementById('subscriberName').value.trim();
//   const email = document.getElementById('subscriberEmail').value.trim();
//   const msg = document.getElementById('newsletterMsg');

//   if (name.length < 2) {
//     msg.textContent = `Please enter your name (2+ characters).`;
//     msg.style.color = '#c00';
//     return;
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     msg.textContent = `Please enter a valid email address.`;
//     msg.style.color = '#c00';
//     return;
//   }

//   const subscribers = JSON.parse(localStorage.getItem('ldsSubscribers') || '[]');
//   subscribers.push({ name, email, date: new Date().toISOString() });
//   localStorage.setItem('ldsSubscribers', JSON.stringify(subscribers));

//   msg.textContent = `Thanks, ${name}! You are subscribed.`;
//   msg.style.color = '#084';
//   e.target.reset();
// }

// const toggleBtn = document.querySelector('.menu-toggle');
// const nav = document.querySelector('.nav-items');

// toggleBtn.addEventListener('click', () => {
//     nav.classList.toggle('show');
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const currentPage = window.location.pathname.split("/").pop();
//   const links = document.querySelectorAll("header nav.nav-items a");

//   links.forEach(link => {
//     if (link.getAttribute("href").includes(currentPage)) {
//       link.classList.add("active");
//     }
//   });
// });



/* =======================================================
   scripts/app.js
   Purpose:
   - Render article cards dynamically
   - Manage favorites with localStorage
   - Handle modal, newsletter, and back-to-top button
   - Lazy load images
   - Apply active link highlighting and responsive nav toggle
========================================================= */

(() => {
  // --- Article Data ---
  const articles = [
    {
      id: 'a1',
      title: 'Stewardship of Tithing Funds',
      summary: 'Court ruling acknowledges Church integrity.',
      image: 'images/image1.png',
      content:
        "The Church of Jesus Christ of Latter-day Saints has long maintained the highest standards of financial stewardship. Recent court rulings have acknowledged the integrity and transparency of the church's handling of tithing funds, reinforcing the trust members place in church leadership to wisely manage sacred donations for the building of the kingdom of God.",
    },
    {
      id: 'a2',
      title: 'Harmonizing Sacred Past and Future',
      summary: "A look at the Salt Lake Temple's renovation.",
      image: 'images/image2.jpeg',
      content:
        "The renovation of the Salt Lake Temple represents a careful balance between preserving its sacred history and preparing it for future generations. This comprehensive project includes seismic upgrades, accessibility improvements, and mechanical system updates while maintaining the temple's iconic architectural features and spiritual significance.",
    },
    {
      id: 'a3',
      title: 'Guide — The Name of the Church',
      summary: 'The Church of Jesus Christ of Latter-day Saints.',
      image: 'images/images3.jpg',
      content:
        'President Russell M. Nelson has emphasized the importance of using the correct name of the Church as revealed by the Lord. The full name, The Church of Jesus Christ of Latter-day Saints, emphasizes the central role of Jesus Christ in the restored gospel and helps distinguish the church from other organizations.',
    },
    {
      id: 'a4',
      title: '"Change the World" President Johnson',
      summary: 'Tells global audience on organization anniversary.',
      image: 'images/image4.jpg',
      content:
        'In a powerful address marking an important organizational anniversary, President Johnson encouraged members worldwide to actively work toward positive change in their communities. His message emphasized that individual actions, guided by faith and compassion, can create ripples of goodness that transform societies and bring hope to those in need.',
    },
  ];

  let currentFilter = 'all'; // 'all' or 'favorites'

  /* ===============================
      Initialization
  ================================ */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderArticles();
    setupEventListeners();
    lazyLoadImages();
    loadFavoritesUI();
    updateFavoriteCounter();
    initFavoritesFilter();
    initBackToTop();
    initNavToggle();
    highlightActiveLink();
  }

  /* ===============================
      Rendering and UI Helpers
  ================================ */
  function renderArticles(filterType = 'all') {
    const container = document.querySelector('.articles-card');
    const emptyState = document.getElementById('emptyFavs');
    if (!container) return;

    let articlesToRender = articles;

    // Apply filter
    if (filterType === 'favorites') {
      const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
      articlesToRender = articles.filter((a) => favs.includes(a.id));

      // Handle empty favorites
      if (articlesToRender.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }
    }

    // Show articles
    container.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = articlesToRender
      .map(
        (a) => `
      <article class="article-card" data-id="${a.id}">
        <img class="card-img" src="${a.image}" alt="${escapeHtml(a.title)}" loading="lazy" decoding="async" />
        <div class="card-body">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.summary)}</p>
        </div>
        <div class="card-actions">
          <button class="btn-learn" data-id="${a.id}">Learn more</button>
          <button class="btn-fav" aria-label="Add to favorites" data-id="${a.id}">☆</button>
        </div>
      </article>`
      )
      .join('');

    loadFavoritesUI();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])
    );
  }

  /* ===============================
      Event Setup
  ================================ */
  function setupEventListeners() {
    // Delegation for article actions
    const container = document.querySelector('.articles-card');
    if (container) {
      container.addEventListener('click', (e) => {
        const learn = e.target.closest('.btn-learn');
        const fav = e.target.closest('.btn-fav');
        if (learn) openArticleModal(learn.dataset.id);
        if (fav) toggleFavorite(fav.dataset.id, fav);
      });
    }

    // Modal
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.querySelector('.modal-close').addEventListener('click', closeArticleModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeArticleModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
          closeArticleModal();
        }
      });
    }

    // Newsletter
    const form = document.getElementById('newsletterForm');
    if (form) form.addEventListener('submit', handleNewsletterSubmit);
  }

  /* ===============================
      Modal Handling
  ================================ */
  function openArticleModal(id) {
    const article = articles.find((a) => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('#modalTitle').textContent = article.title;
    modal.querySelector('#modalBody').textContent = article.content;
    modal.querySelector('.modal-panel').focus();
  }

  function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelector('#modalTitle').textContent = '';
    modal.querySelector('#modalBody').textContent = '';
  }

  /* ===============================
      Favorites Handling
  ================================ */
  function toggleFavorite(id, btnEl) {
    let favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
    const exists = favs.includes(id);

    if (exists) {
      favs = favs.filter((x) => x !== id);
      btnEl.textContent = '☆';
    } else {
      favs.push(id);
      btnEl.textContent = '★';
    }

    localStorage.setItem('ldsfavs', JSON.stringify(favs));
    updateFavoriteCounter();

    if (currentFilter === 'favorites' && exists) renderArticles('favorites');
  }

  function loadFavoritesUI() {
    const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
    favs.forEach((id) => {
      const btn = document.querySelector(`.btn-fav[data-id="${id}"]`);
      if (btn) btn.textContent = '★';
    });
  }

  function updateFavoriteCounter() {
    const counter = document.getElementById('favCount');
    if (!counter) return;
    const favs = JSON.parse(localStorage.getItem('ldsfavs') || '[]');
    const count = favs.length;
    counter.textContent = `${count} favorite${count !== 1 ? 's' : ''}`;
  }

  /* ===============================
      Favorites Filter
  ================================ */
  function initFavoritesFilter() {
    const showAllBtn = document.getElementById('showAllBtn');
    const showFavsBtn = document.getElementById('showFavsBtn');

    if (!showAllBtn || !showFavsBtn) return;

    showAllBtn.addEventListener('click', () => {
      currentFilter = 'all';
      renderArticles('all');
      toggleActiveFilter(showAllBtn, showFavsBtn);
    });

    showFavsBtn.addEventListener('click', () => {
      currentFilter = 'favorites';
      renderArticles('favorites');
      toggleActiveFilter(showFavsBtn, showAllBtn);
    });
  }

  function toggleActiveFilter(activeBtn, inactiveBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
    inactiveBtn.classList.remove('active');
    inactiveBtn.setAttribute('aria-pressed', 'false');
  }

  /* ===============================
      Lazy Loading
  ================================ */
  function lazyLoadImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"], .card-img[data-src]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset?.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
              }
              obs.unobserve(img);
            }
          });
        },
        { rootMargin: '100px 0px' }
      );
      imgs.forEach((img) => observer.observe(img));
    } else {
      imgs.forEach((img) => {
        if (img.dataset?.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
      });
    }
  }

  /* ===============================
      Newsletter Form
  ================================ */
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('subscriberName').value.trim();
    const email = document.getElementById('subscriberEmail').value.trim();
    const msg = document.getElementById('newsletterMsg');

    if (name.length < 2) {
      return showMsg(msg, 'Please enter your name (2+ characters).', '#c00');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showMsg(msg, 'Please enter a valid email address.', '#c00');
    }

    const subscribers = JSON.parse(localStorage.getItem('ldsSubscribers') || '[]');
    subscribers.push({ name, email, date: new Date().toISOString() });
    localStorage.setItem('ldsSubscribers', JSON.stringify(subscribers));

    showMsg(msg, `Thanks, ${name}! You are subscribed.`, '#084');
    e.target.reset();
  }

  function showMsg(element, text, color) {
    element.textContent = text;
    element.style.color = color;
  }

  /* ===============================
      Back to Top Button
  ================================ */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.pageYOffset > 300);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===============================
      Navigation & Active Link
  ================================ */
  function initNavToggle() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-items');
    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
      });
    }
  }

  function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('header nav.nav-items a');
    links.forEach((link) => {
      if (link.getAttribute('href').includes(currentPage)) {
        link.classList.add('active');
      }
    });
  }
})();
