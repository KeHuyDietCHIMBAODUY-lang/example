/**
 * FASHION LANDING PAGE - INTERACTIVE JAVASCRIPT LOGIC
 * Features: Product filtering, Add to Cart, Quick View, Countdown Timer, Toast Notification
 */

// Product Database Mock
const productsData = [
  {
    id: 1,
    name: 'Đầm Lụa Satin Cao Cấp Luxuria',
    category: 'women',
    price: 1850000,
    oldPrice: 2450000,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    rating: 5,
    reviewsCount: 42,
    image: 'images/prod_1.jpg',
    description: 'Đầm lụa Satin cao cấp phom dáng suông ôm nhẹ thanh lịch, tôn lên nét quyến rũ và sang trọng cho quý cô trong các buổi tiệc.'
  },
  {
    id: 2,
    name: 'Áo Khoác Trench Coat Beige Modern',
    category: 'women',
    price: 2950000,
    oldPrice: null,
    badge: 'Mới',
    badgeClass: 'badge-new',
    rating: 5,
    reviewsCount: 19,
    image: 'images/prod_2.jpg',
    description: 'Áo khoác Trench Coat phong cách cổ điển Châu Âu với tông màu Beige tối giản, chất liệu chống thấm mướt mịn.'
  },
  {
    id: 3,
    name: 'Túi Xách Da Bò Thật Haute Couture',
    category: 'acc',
    price: 3400000,
    oldPrice: 4100000,
    badge: 'Hot',
    badgeClass: 'badge-hot',
    rating: 5,
    reviewsCount: 64,
    image: 'images/cat_acc.jpg',
    description: 'Túi xách da bò Ý cao cấp chế tác thủ công tỉ mỉ, tích hợp quai đeo tùy chỉnh linh hoạt.'
  },
  {
    id: 4,
    name: 'Suit Nam Blazer Minimalist Black',
    category: 'men',
    price: 3850000,
    oldPrice: 4500000,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    rating: 5,
    reviewsCount: 38,
    image: 'images/cat_men.jpg',
    description: 'Bộ Blazer nam tối giản chuẩn phom dáng Ý, tôn dáng người mặc, thoáng khí phù hợp thời tiết nhiệt đới.'
  },
  {
    id: 5,
    name: 'Đầm Dạ Hội Velvet Noir Luxury',
    category: 'women',
    price: 2200000,
    oldPrice: 2800000,
    badge: 'Hot',
    badgeClass: 'badge-hot',
    rating: 5,
    reviewsCount: 27,
    image: 'images/cat_women.jpg',
    description: 'Đầm dạ hội nhung tuyết đen tuyền điểm xuyết tinh tế, mang lại thần thái quý phái trong mọi sự kiện.'
  },
  {
    id: 6,
    name: 'Kính Râm Thời Trang Urban Gold',
    category: 'acc',
    price: 990000,
    oldPrice: 1350000,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    rating: 4,
    reviewsCount: 15,
    image: 'images/cat_acc.jpg',
    description: 'Kính râm gọng kim loại mạ vàng chống tia UV400 bảo vệ mắt tuyệt đối, phong cách hiện đại.'
  }
];

// App State
let cart = [];
let wishlistCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initCountdownTimer();
  renderProducts('all');
  initFilterTabs();
  initWishlist();
  initNewsletterForm();
});

// Navbar Sticky Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Countdown Timer Flash Sale
function initCountdownTimer() {
  // Target: 2 days from current time
  const targetDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = mins < 10 ? '0' + mins : mins;
    secsEl.textContent = secs < 10 ? '0' + secs : secs;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Filter Tabs
function initFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const category = e.target.getAttribute('data-filter');
      renderProducts(category);
    });
  });
}

// Render Product Cards Dynamic
function renderProducts(filterCategory) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = filterCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === filterCategory);

  grid.innerHTML = filtered.map(prod => `
    <div class="col-12 col-sm-6 col-lg-4 mb-4">
      <div class="product-card">
        <div class="product-img-wrapper">
          <span class="product-badge ${prod.badgeClass}">${prod.badge}</span>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <div class="product-action-btns">
            <button class="action-icon-btn btn-wishlist" onclick="toggleWishlist(this)" title="Yêu thích">
              <i class="bi bi-heart"></i>
            </button>
            <button class="action-icon-btn" onclick="openQuickView(${prod.id})" title="Xem nhanh">
              <i class="bi bi-eye"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${getCategoryLabel(prod.category)}</div>
          <h3 class="product-title">${prod.name}</h3>
          <div class="product-rating">
            ${'<i class="bi bi-star-fill"></i>'.repeat(prod.rating)}
            <span class="text-muted ms-1">(${prod.reviewsCount})</span>
          </div>
          <div class="product-price-wrap">
            <span class="price-current">${formatPrice(prod.price)}</span>
            ${prod.oldPrice ? `<span class="price-old">${formatPrice(prod.oldPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="addToCart(${prod.id})">
            <i class="bi bi-bag-plus"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryLabel(cat) {
  switch (cat) {
    case 'women': return 'Thời trang Nữ';
    case 'men': return 'Thời trang Nam';
    case 'acc': return 'Phụ kiện cao cấp';
    default: return 'Bộ sưu tập';
  }
}

function formatPrice(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Shopping Cart Functions
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function updateCartQuantity(productId, change) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update navbar badge
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  // Update Drawer Content
  const drawerList = document.getElementById('cart-drawer-list');
  const drawerTotal = document.getElementById('cart-drawer-total');

  if (drawerList) {
    if (cart.length === 0) {
      drawerList.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-cart-x fs-1 mb-3"></i>
          <p>Giỏ hàng của bạn đang trống.</p>
        </div>
      `;
    } else {
      drawerList.innerHTML = cart.map(item => `
        <div class="cart-drawer-item">
          <img src="${item.image}" class="cart-drawer-img" alt="${item.name}">
          <div class="cart-drawer-details">
            <h6 class="cart-drawer-title">${item.name}</h6>
            <div class="cart-drawer-price">${formatPrice(item.price)}</div>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="btn-group btn-group-sm border" role="group">
                <button type="button" class="btn btn-light py-0 px-2" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span class="btn btn-light py-0 px-2 disabled bg-white text-dark">${item.quantity}</span>
                <button type="button" class="btn btn-light py-0 px-2" onclick="updateCartQuantity(${item.id}, 1)">+</button>
              </div>
              <button class="btn btn-link text-danger p-0 text-decoration-none" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i> Xóa
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  if (drawerTotal) {
    drawerTotal.textContent = formatPrice(totalPrice);
  }
}

// Quick View Modal
function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const modalImg = document.getElementById('qv-img');
  const modalCategory = document.getElementById('qv-category');
  const modalTitle = document.getElementById('qv-title');
  const modalPrice = document.getElementById('qv-price');
  const modalOldPrice = document.getElementById('qv-oldprice');
  const modalDesc = document.getElementById('qv-desc');
  const modalAddBtn = document.getElementById('qv-addbtn');

  if (modalImg) modalImg.src = product.image;
  if (modalCategory) modalCategory.textContent = getCategoryLabel(product.category);
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalPrice) modalPrice.textContent = formatPrice(product.price);
  if (modalOldPrice) {
    modalOldPrice.textContent = product.oldPrice ? formatPrice(product.oldPrice) : '';
  }
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addToCart(product.id);
      const modalEl = document.getElementById('quickViewModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    };
  }

  const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  quickViewModal.show();
}

// Wishlist Toggle
function initWishlist() {
  // Global handler attached to product cards
}

function toggleWishlist(btn) {
  const icon = btn.querySelector('i');
  if (icon.classList.contains('bi-heart')) {
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill', 'text-danger');
    wishlistCount += 1;
    showToast('Đã thêm vào danh sách yêu thích!');
  } else {
    icon.classList.remove('bi-heart-fill', 'text-danger');
    icon.classList.add('bi-heart');
    wishlistCount = Math.max(0, wishlistCount - 1);
    showToast('Đã xóa khỏi danh sách yêu thích.');
  }

  const wishlistBadge = document.getElementById('wishlist-badge');
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
  }
}

// Newsletter Subscription Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value.trim() !== '') {
      showToast(`Cảm ơn bạn! Mã giảm 15% đã gửi tới: ${input.value.trim()}`);
      input.value = '';
    }
  });
}

// Custom Toast Notification
function showToast(message) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = 'custom-toast';
    toast.innerHTML = `<i class="bi bi-check-circle-fill text-warning fs-5"></i> <span id="toast-msg"></span>`;
    document.body.appendChild(toast);
  }

  const msgEl = document.getElementById('toast-msg');
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
