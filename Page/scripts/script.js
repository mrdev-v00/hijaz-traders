// ═══════════════════════════════════════════════════════
// HIJAZ TRADERS · Premium JavaScript
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ──────────────────────────────────
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll(
      'a, button, .btn, .category-card, .product-card, .filter-btn, .brand-pill, ' +
      '.nav-toggle, .theme-toggle, .img-action-btn, .gallery-thumb, ' +
      '.whatsapp-float, .back-to-top, .social-links a, input, select, textarea'
    );
    
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  } else if (cursorDot && cursorRing) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

// ─── PRODUCTS DATA ───────────────────────────────────
const isInPageFolder = window.location.pathname.includes('/Page/');
const imageBase = isInPageFolder ? 'assets/images/products/' : 'Page/assets/images/products/';

const products = [
  { id:0,  name:'Inspiron 15 3000', brand:'Dell',   specs:['Intel i5','8GB RAM','512GB SSD'],  price:'85,000', condition:'new',         category:['student','budget'],            desc:'Slim and capable — perfect for students and everyday users.', images:[imageBase + 'dell-inspiron-15-3000.jpg'] },
  { id:1,  name:'Pavilion 15',      brand:'HP',     specs:['Intel i7','16GB RAM','1TB HDD'],   price:'65,000', condition:'used',        category:['business','budget'],           desc:'Powerful and spacious storage, ideal for multitasking.', images:[imageBase + 'hp-pavilion-15.jpg'] },
  { id:2,  name:'ThinkPad E14',     brand:'Lenovo', specs:['Intel i5','8GB RAM','256GB SSD'],  price:'95,000', condition:'new',         category:['business','premium'],          desc:'Business-grade durability with MIL-SPEC tested build.', images:[imageBase + 'lenovo-thinkpad-e14.jpg'] },
  { id:3,  name:'Aspire 5',         brand:'Acer',   specs:['Intel i3','4GB RAM','1TB HDD'],    price:'45,000', condition:'refurbished', category:['student','budget'],            desc:'Budget-friendly entry laptop, certified refurbished.', images:[imageBase + 'acer-aspire-5.jpg'] },
  { id:4,  name:'Latitude 5400',    brand:'Dell',   specs:['Intel i5','16GB RAM','512GB SSD'], price:'75,000', condition:'used',        category:['business','premium'],          desc:'Corporate workhorse, light and security-ready.', images:[imageBase + 'dell-latitude-5400.jpg'] },
  { id:5,  name:'ProBook 450',      brand:'HP',     specs:['Intel i7','16GB RAM','512GB SSD'], price:'120,000',condition:'new',         category:['business','premium'],          desc:'Professional powerhouse built for demanding workloads.', images:[imageBase + 'hp-probook-450.jpg'] },
  { id:6,  name:'IdeaPad 3',        brand:'Lenovo', specs:['Intel i3','4GB RAM','256GB SSD'],  price:'40,000', condition:'new',         category:['student','budget'],            desc:'Lightweight and affordable, perfect for students on the go.', images:[imageBase + 'lenovo-ideapad-3.jpg'] },
  { id:7,  name:'Swift 3',          brand:'Acer',   specs:['Intel i5','8GB RAM','256GB SSD'],  price:'55,000', condition:'used',        category:['student','business'],          desc:'Ultralight at just 1.2kg, stunning battery life.', images:[imageBase + 'acer-swift-3.jpg'] },
  { id:8,  name:'XPS 13',           brand:'Dell',   specs:['Intel i7','16GB RAM','512GB SSD'], price:'150,000',condition:'new',         category:['premium'],                     desc:'Iconic thin-bezel display, premium build, top-tier performance.', images:[imageBase + 'dell-xps-13.jpg'] },
  { id:9,  name:'EliteBook 840',    brand:'HP',     specs:['Intel i5','8GB RAM','256GB SSD'],  price:'70,000', condition:'refurbished', category:['business'],                    desc:'HP\'s flagship business laptop, enterprise security built-in.', images:[imageBase + 'hp-elitebook-840.jpg'] },
  { id:10, name:'Yoga Slim 7',      brand:'Lenovo', specs:['Intel i7','16GB RAM','512GB SSD'], price:'130,000',condition:'new',         category:['premium','business'],          desc:'2-in-1 convertible with OLED display option.', images:[imageBase + 'lenovo-yoga-slim-7.jpg'] },
  { id:11, name:'Nitro 5',          brand:'Acer',   specs:['Intel i5','8GB RAM','512GB SSD'],  price:'90,000', condition:'new',         category:['student','premium'],           desc:'Gaming-ready with dedicated GPU, great for media too.', images:[imageBase + 'acer-nitro-5.jpg'] },
];

  // ─── SPEC ICONS ──────────────────────────────────────
  const specIconMap = {
    'Intel i3':'fa-microchip','Intel i5':'fa-microchip','Intel i7':'fa-microchip',
    '4GB RAM':'fa-memory','8GB RAM':'fa-memory','16GB RAM':'fa-memory',
    '256GB SSD':'fa-hard-drive','512GB SSD':'fa-hard-drive',
    '1TB HDD':'fa-hdd','1TB':'fa-hdd','512GB':'fa-hdd',
  };

  // ─── RENDER PRODUCTS ─────────────────────────────────
  function renderProducts(list, containerId = 'productGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:var(--s-4xl);">
          <i class="fas fa-search" style="font-size:2.5rem;color:var(--t-400);display:block;margin-bottom:var(--s-md);"></i>
          <p style="color:var(--t-400);font-size:1rem;">No laptops found. Try a different filter.</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map((p, i) => {
      const badgeCls = p.condition === 'new' ? 'badge-new' : p.condition === 'used' ? 'badge-used' : 'badge-refurbished';
      const badgeTxt = p.condition.charAt(0).toUpperCase() + p.condition.slice(1);
      const waMsg = encodeURIComponent(`Hi Hijaz Traders, I'm interested in the ${p.brand} ${p.name} (PKR ${p.price}). Is it available?`);
      const specsHtml = p.specs.map(s => {
        const icon = specIconMap[s] || 'fa-circle';
        return `<span><i class="fas ${icon}"></i>${s}</span>`;
      }).join('');
      const delay = Math.min(i % 4, 3);

      return `
        <div class="product-card reveal reveal-delay-${delay + 1}" data-condition="${p.condition}" data-category="${(p.category||[]).join(',')}" data-id="${p.id}">
          <div class="product-image">
            ${p.images && p.images.length > 0
              ? `<img src="${p.images[0]}" alt="${p.brand} ${p.name}" 
                    style="width:100%;height:100%;object-fit:contain;padding:16px;"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
                 <i class="fas fa-laptop fallback-icon" 
                    style="display:none;position:absolute;font-size:4rem;color:rgba(255,255,255,0.04);"></i>`
              : `<div class="product-placeholder"><i class="fas fa-laptop"></i></div>`
            }
            <span class="badge ${badgeCls} product-badge">${badgeTxt}</span>
            <div class="product-image-actions">
              <button class="img-action-btn quick-view-btn" data-id="${p.id}" title="Quick View">
                <i class="fas fa-eye"></i>
              </button>
              <a href="https://wa.me/923127673765?text=${waMsg}" class="img-action-btn" title="WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div class="product-body">
            <div class="product-brand">${p.brand}</div>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-specs">${specsHtml}</div>
            <div class="product-price">
              PKR ${p.price}
              <small>+ Tax</small>
            </div>
            <div class="product-actions">
              <a href="https://wa.me/923127673765?text=${waMsg}" class="btn btn-whatsapp btn-sm">
                <i class="fab fa-whatsapp"></i> Inquire
              </a>
              <button class="btn btn-ghost btn-sm quick-view-btn" data-id="${p.id}">
                Details
              </button>
            </div>
          </div>
        </div>`;
    }).join('');

    requestAnimationFrame(() => revealOnScroll());
    attachQuickViewListeners();
  }

  // ─── QUICK VIEW MODAL ─────────────────────────────────
  const modal = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('modalClose');

  function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modal) return;
    const waMsg = encodeURIComponent(`Hi Hijaz Traders, I'm interested in the ${p.brand} ${p.name} (PKR ${p.price}). Is it available?`);
    const specsHtml = p.specs.map(s => {
      const icon = specIconMap[s] || 'fa-circle';
      return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid var(--b-lo);color:var(--t-300);margin:3px;"><i class="fas ${icon}" style="font-size:0.7rem;color:var(--t-400)"></i>${s}</span>`;
    }).join('');
    const badgeCls = p.condition === 'new' ? 'badge-new' : p.condition === 'used' ? 'badge-used' : 'badge-refurbished';
    const badgeTxt = p.condition.charAt(0).toUpperCase() + p.condition.slice(1);

    modal.querySelector('.modal-product-image').innerHTML = p.images && p.images.length > 0
      ? `<img src="${p.images[0]}" alt="${p.brand} ${p.name}" style="width:100%;height:100%;object-fit:contain;padding:16px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-laptop\\' style=\\'font-size:5rem;color:rgba(255,255,255,0.04);\\'></i>';" />`
      : '<i class="fas fa-laptop"></i>';
    modal.querySelector('.modal-product-brand').textContent = p.brand;
    modal.querySelector('.modal-product-name').innerHTML = `${p.name} <span class="badge ${badgeCls}" style="font-size:0.55rem;vertical-align:middle;">${badgeTxt}</span>`;
    modal.querySelector('.modal-product-price').innerHTML = `PKR ${p.price} <small>+ Tax</small>`;
    modal.querySelector('.modal-product-desc').textContent = p.desc || `Quality ${p.condition} ${p.brand} ${p.name} available at Hijaz Traders, Regal Market Karachi.`;
    modal.querySelector('.modal-specs').innerHTML = specsHtml;
    modal.querySelector('.modal-whatsapp-link').href = `https://wa.me/923127673765?text=${waMsg}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  function attachQuickViewListeners() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(+btn.dataset.id));
    });

    // ─── CARD CLICK → PRODUCT INFO PAGE ─────────────────
    document.querySelectorAll('.product-card[data-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const detailPage = isInPageFolder
          ? `product-info.html?id=${card.dataset.id}`
          : `Page/product-info.html?id=${card.dataset.id}`;
        window.location.href = detailPage;
      });
    });
  }

  // ─── PRODUCT FILTERING ────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const productGrid = document.getElementById('productGrid');

  if (filterBtns.length && productGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter') || 'all';

    function applyFilter(filter) {
      const filtered = filter === 'all'
        ? products
        : products.filter(p =>
            p.condition === filter ||
            (p.category && p.category.includes(filter)) ||
            p.brand.toLowerCase() === filter.toLowerCase()
          );
      renderProducts(filtered);
    }

    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === urlFilter);
    });
    applyFilter(urlFilter);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });
  }

  // ─── SEARCH ──────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const q = searchInput.value.toLowerCase().trim();
        const filtered = q
          ? products.filter(p =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.specs.some(s => s.toLowerCase().includes(q))
            )
          : products;
        renderProducts(filtered);
        filterBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
      }, 280);
    });
  }

  // ─── SCROLL REVEAL ───────────────────────────────────
  function revealOnScroll() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('revealed');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ─── NAVBAR ──────────────────────────────────────────
  const navbar    = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ─── SCROLL PROGRESS ─────────────────────────────────
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
    }, { passive: true });
  }

  // ─── BACK TO TOP ─────────────────────────────────────
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ─── THEME TOGGLE ────────────────────────────────────
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ht-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ht-theme', next);
    });
  }

  // ─── SMOOTH SCROLL ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ─── ACTIVE NAV ──────────────────────────────────────
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop()?.split('?')[0];
    if (href && href === path) a.classList.add('active');
  });

  // ─── HOME PAGE FEATURED PRODUCTS ─────────────────────
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = products.filter(p => p.category?.includes('premium') || p.condition === 'new').slice(0, 4);
    renderProducts(featured, 'featuredGrid');
  }

  // ─── PRODUCT DETAIL PAGE ────────────────────────────
  const detailContainer = document.getElementById('productDetail');
  if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = productId !== null ? products.find(p => p.id === parseInt(productId)) : null;

    if (!product) {
      detailContainer.innerHTML = `
        <div class="not-found">
          <div class="container" style="text-align:center;">
            <i class="fas fa-box-open" style="font-size:5rem;color:var(--t-500);opacity:0.3;"></i>
            <h2 style="font-family:var(--f-head);font-size:2rem;margin-top:var(--s-lg);color:var(--t-200);">Product Not Found</h2>
            <p style="color:var(--t-400);margin-bottom:var(--s-lg);">The product you're looking for doesn't exist.</p>
            <a href="products.html" class="btn btn-primary btn-lg"><i class="fas fa-arrow-left"></i> Browse Products</a>
          </div>
        </div>`;
    } else {
      document.title = `${product.name} · Hijaz Traders`;
      const waLink = `https://wa.me/923127673765?text=${encodeURIComponent(`Hi Hijaz Traders, I'm interested in the ${product.brand} ${product.name} (PKR ${product.price}). Is it available?`)}`;
      
      const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;

      detailContainer.innerHTML = `
        <section class="product-detail">
          <div class="container">
            <div class="product-detail-grid">
              <div class="product-gallery">
                <div class="product-gallery-main">
                  ${mainImage 
                    ? `<img src="${mainImage}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:20px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-laptop\\' style=\\'font-size:8rem;color:rgba(255,255,255,0.04);\\'></i>';" />`
                    : `<i class="fas fa-laptop" style="font-size:8rem;color:rgba(255,255,255,0.04);"></i>`
                  }
                  <span class="badge ${product.status === 'new' ? 'badge-new' : product.status === 'used' ? 'badge-used' : 'badge-refurbished'} product-badge">${product.status === 'new' ? 'New' : product.status === 'used' ? 'Used' : 'Refurbished'}</span>
                </div>
                ${product.images && product.images.length > 1 ? `
                  <div class="product-gallery-thumbs">
                    ${product.images.map((img, i) => `
                      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-image="${img}">
                        <img src="${img}" alt="Thumbnail ${i+1}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';" />
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="product-info-detail">
                <div class="product-brand">${product.brand}</div>
                <h2>${product.name}</h2>
                <div class="product-price-large">PKR ${product.price} <small>+ Tax</small></div>
                <p style="color:var(--t-300);line-height:1.8;margin-bottom:var(--s-md);">${product.desc || product.description || `Quality ${product.status} ${product.brand} ${product.name} available at Hijaz Traders, Regal Market Karachi.`}</p>
                <div class="condition-box">
                  <i class="fas fa-info-circle"></i>
                  ${product.condition || (product.status === 'new' ? 'Brand new, sealed box' : product.status === 'used' ? 'Pre-owned, excellent condition' : 'Refurbished, fully tested')}
                </div>
                <div class="specs-grid-detail">
                  ${(product.specs || []).map(spec => {
                    const icon = typeof spec === 'string' ? (specIconMap[spec] || 'fa-circle') : (spec.icon || 'fa-circle');
                    const value = typeof spec === 'string' ? spec : spec.value;
                    const label = typeof spec === 'string' ? '' : spec.label;
                    return `
                      <div class="spec-item-detail">
                        <i class="fas ${icon}"></i>
                        <div class="spec-info">
                          ${label ? `<span class="spec-label">${label}</span>` : ''}
                          <span class="spec-value">${value}</span>
                        </div>
                      </div>`;
                  }).join('')}
                </div>
                <div style="display:flex;gap:var(--s-md);flex-wrap:wrap;margin-top:var(--s-lg);">
                  <a href="${waLink}" class="btn btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Inquire on WhatsApp</a>
                  <a href="tel:+923127673765" class="btn btn-primary btn-lg"><i class="fas fa-phone"></i> Call Now</a>
                </div>
                <a href="products.html" style="display:inline-flex;align-items:center;gap:6px;margin-top:var(--s-md);color:var(--t-400);font-size:0.85rem;"><i class="fas fa-arrow-left"></i> Back to products</a>
              </div>
            </div>
          </div>
        </section>`;

      // Gallery thumb click
      document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const imgSrc = thumb.dataset.image;
          const mainEl = document.querySelector('.product-gallery-main');
          mainEl.innerHTML = `<img src="${imgSrc}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:20px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-laptop\\' style=\\'font-size:8rem;color:rgba(255,255,255,0.04);\\'></i>';" /><span class="badge ${product.status === 'new' ? 'badge-new' : product.status === 'used' ? 'badge-used' : 'badge-refurbished'} product-badge">${product.status === 'new' ? 'New' : product.status === 'used' ? 'Used' : 'Refurbished'}</span>`;
          document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }
  }

  console.log('%cHijaz Traders · Loaded', 'color:#b8945a;font-weight:bold;font-size:14px');
});
