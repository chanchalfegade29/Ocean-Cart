/* =====================================================
   OceanCart - Premium E-commerce JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initMobileMenu();
    initCartSidebar();
    initHeroSlider();
    initProductFilters();
    initFlashCountdown();
    initQuickView();
    initToast();
    initBackToTop();
    initLiveChat();
    initDarkMode();
    initSearchBar();
    initQuantityControls();
    initWishlist();
    initNewsletterForm();
    initSmoothScroll();
    initAnimations();
    initViewAllButtons();
    initMobileWishlist();
});

/* ==================== Mobile Wishlist ==================== */
function initMobileWishlist() {
    const mobileWishlistBtn = document.getElementById('mobileWishlistBtn');
    
    if (mobileWishlistBtn) {
        mobileWishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWishlist();
        });
    }
}

/* ==================== View All Products ==================== */
function initViewAllButtons() {
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show all products by removing any filters
            const allProductCards = document.querySelectorAll('.product-card');
            allProductCards.forEach(card => {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            });
            
            // Reset search input
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Reset category dropdown
            const searchCategory = document.getElementById('searchCategory');
            if (searchCategory) {
                searchCategory.value = 'all';
            }
            
            // Reset filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(filterBtn => {
                filterBtn.classList.remove('active');
                if (filterBtn.getAttribute('data-filter') === 'all') {
                    filterBtn.classList.add('active');
                }
            });
            
            // Count total products
            const totalProducts = allProductCards.length;
            window.showToast && window.showToast(`Showing all ${totalProducts} products`);
            
            // Scroll to products section with offset for header
            const productsSection = document.getElementById('flash-deals') || document.querySelector('.flash-deals-section') || document.querySelector('.products-grid');
            if (productsSection) {
                const headerOffset = 100;
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== Preloader ==================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1000);
    });
    
    // Fallback - hide after 3 seconds
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 3000);
}

/* ==================== Mobile Menu ==================== */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

/* ==================== Cart Sidebar ==================== */
function initCartSidebar() {
    const cartBtn = document.getElementById('cartBtn');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    cartBtn.addEventListener('click', openCart);
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
    
    // Cart item quantity controls
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.qty-btn.minus');
        const plusBtn = item.querySelector('.qty-btn.plus');
        const qtyValue = item.querySelector('.qty-value');
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(qtyValue.textContent);
            if (value > 1) {
                qtyValue.textContent = value - 1;
                updateCartTotals();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(qtyValue.textContent);
            if (value < 10) {
                qtyValue.textContent = value + 1;
                updateCartTotals();
            }
        });
    });
    
    // Remove cart items
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                cartItem.remove();
                updateCartCount();
                updateCartTotals();
            }, 300);
        });
    });
}

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCount = document.getElementById('cartCount');
    const mobileCartBadge = document.querySelector('.cart-nav .badge');
    const headerCartSpan = document.querySelector('.cart-header span');
    
    const count = cartItems.length;
    
    if (cartCount) cartCount.textContent = count;
    if (mobileCartBadge) mobileCartBadge.textContent = count;
    if (headerCartSpan) headerCartSpan.textContent = `(${count} items)`;
}

function updateCartTotals() {
    // This would normally calculate from actual cart data
    // For demo purposes, we'll just show the animation
    const totalElement = document.querySelector('.cart-row.total span:last-child');
    if (totalElement) {
        totalElement.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            totalElement.style.animation = '';
        }, 300);
    }
}

/* ==================== Hero Slider ==================== */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000;
    
    function showSlide(index) {
        // Handle bounds
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSection.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    heroSection.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    }
}

/* ==================== Product Filters ==================== */
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.products-section .product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter products
            productCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==================== Flash Deals Countdown ==================== */
function initFlashCountdown() {
    const hoursEl = document.getElementById('flash-hours');
    const minsEl = document.getElementById('flash-mins');
    const secsEl = document.getElementById('flash-secs');
    
    // Set end time (8 hours from now)
    let endTime = new Date();
    endTime.setHours(endTime.getHours() + 8);
    endTime.setMinutes(endTime.getMinutes() + 45);
    endTime.setSeconds(endTime.getSeconds() + 30);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            // Reset countdown
            endTime = new Date();
            endTime.setHours(endTime.getHours() + 8);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = mins.toString().padStart(2, '0');
        secsEl.textContent = secs.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ==================== Quick View Modal ==================== */
function initQuickView() {
    const quickviewBtns = document.querySelectorAll('.action-btn.quickview');
    const quickviewModal = document.getElementById('quickviewModal');
    const quickviewClose = document.getElementById('quickviewClose');
    const quickviewOverlay = quickviewModal.querySelector('.quickview-overlay');
    
    function openQuickview(productCard) {
        // Get product info
        const image = productCard.querySelector('.product-image img').src;
        const category = productCard.querySelector('.product-category').textContent;
        const name = productCard.querySelector('.product-name a').textContent;
        const price = productCard.querySelector('.current-price').textContent;
        const originalPrice = productCard.querySelector('.original-price');
        
        // Update modal content
        const modalImage = quickviewModal.querySelector('.quickview-main-image img');
        const modalCategory = quickviewModal.querySelector('.product-category');
        const modalTitle = quickviewModal.querySelector('.product-title');
        const modalPrice = quickviewModal.querySelector('.current-price');
        const modalOriginal = quickviewModal.querySelector('.original-price');
        
        modalImage.src = image;
        modalCategory.textContent = category;
        modalTitle.textContent = name;
        modalPrice.textContent = price;
        if (originalPrice && modalOriginal) {
            modalOriginal.textContent = originalPrice.textContent;
            modalOriginal.style.display = 'inline';
        } else if (modalOriginal) {
            modalOriginal.style.display = 'none';
        }
        
        // Show modal
        quickviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeQuickview() {
        quickviewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    quickviewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            openQuickview(productCard);
        });
    });
    
    quickviewClose.addEventListener('click', closeQuickview);
    quickviewOverlay.addEventListener('click', closeQuickview);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickview();
        }
    });
    
    // Thumbnail gallery
    const thumbnails = document.querySelectorAll('.quickview-thumbnails img');
    const mainImage = document.querySelector('.quickview-main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src.replace('w=100', 'w=500');
        });
    });
    
    // Color options
    const colorBtns = document.querySelectorAll('.quickview-details .color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const qtyMinus = document.querySelector('.quickview-details .qty-btn.minus');
    const qtyPlus = document.querySelector('.quickview-details .qty-btn.plus');
    const qtyInput = document.querySelector('.quickview-details .quantity-selector input');
    
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', function() {
            let value = parseInt(qtyInput.value);
            if (value > 1) {
                qtyInput.value = value - 1;
            }
        });
        
        qtyPlus.addEventListener('click', function() {
            let value = parseInt(qtyInput.value);
            if (value < 10) {
                qtyInput.value = value + 1;
            }
        });
    }
}

/* ==================== Toast Notification ==================== */
function initToast() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .quickview-details .add-to-cart');
    const toast = document.getElementById('toast');
    const toastClose = toast.querySelector('.toast-close');
    
    function showToast(message = 'Product added to cart') {
        const toastContent = toast.querySelector('.toast-content p');
        toastContent.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add animation to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Update cart count
            const cartCount = document.getElementById('cartCount');
            const currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Animate cart icon
            const cartBtn = document.getElementById('cartBtn');
            cartBtn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                cartBtn.style.animation = '';
            }, 500);
            
            // Show toast
            showToast('Product added to cart');
        });
    });
    
    toastClose.addEventListener('click', function() {
        toast.classList.remove('show');
    });
    
    // Export showToast for external use
    window.showToast = showToast;
}

/* ==================== Back to Top ==================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==================== Live Chat Widget ==================== */
function initLiveChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatMinimize = document.getElementById('chatMinimize');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    const chatBadge = document.querySelector('.chat-badge');
    
    function toggleChat() {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            chatBadge.style.display = 'none';
            chatInput.focus();
        }
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.innerHTML = `<p>${message}</p><span class="time">Just now</span>`;
            userMsg.style.textAlign = 'right';
            chatMessages.appendChild(userMsg);
            
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate agent response
            setTimeout(() => {
                const agentMsg = document.createElement('div');
                agentMsg.className = 'chat-message agent';
                agentMsg.innerHTML = `<p>Thank you for your message! Our team will get back to you shortly. 😊</p><span class="time">Just now</span>`;
                chatMessages.appendChild(agentMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    chatToggle.addEventListener('click', toggleChat);
    chatMinimize.addEventListener('click', toggleChat);
    
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

/* ==================== Dark Mode ==================== */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

/* ==================== Search Bar ==================== */
function initSearchBar() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const searchCategory = document.getElementById('searchCategory');
    
    if (!searchInput) return;
    
    // Search suggestions data
    const suggestions = [
        'Wireless Headphones',
        'Smart Watch',
        'Running Shoes',
        'Cotton T-Shirt',
        'Coffee Maker',
        'Yoga Mat',
        'Skincare Set',
        'Laptop Stand',
        'Air Purifier',
        'Denim Jacket'
    ];
    
    searchInput.addEventListener('focus', function() {
        // Could show recent searches or suggestions
    });
    
    // Function to filter and display products
    function filterProducts(query) {
        const allProductCards = document.querySelectorAll('.product-card');
        const selectedCategory = searchCategory ? searchCategory.value : 'all';
        const searchTerm = query.toLowerCase().trim();
        
        let matchCount = 0;
        
        allProductCards.forEach(card => {
            const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const productCategory = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
            const cardCategory = card.getAttribute('data-category') || '';
            
            // Check if product matches search term
            const matchesSearch = searchTerm === '' || 
                productName.includes(searchTerm) || 
                productCategory.includes(searchTerm);
            
            // Check if product matches selected category
            const matchesCategory = selectedCategory === 'all' || 
                cardCategory === selectedCategory ||
                productCategory.includes(selectedCategory);
            
            // Show or hide based on both filters
            if (matchesSearch && matchesCategory) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show toast with results
        if (searchTerm !== '') {
            if (matchCount > 0) {
                window.showToast && window.showToast(`Found ${matchCount} product(s) for: "${query}"`);
            } else {
                window.showToast && window.showToast(`No products found for: "${query}"`);
            }
            
            // Scroll to products section with offset for header
            const productsSection = document.getElementById('flash-deals') || document.querySelector('.flash-deals-section') || document.querySelector('.products-grid');
            if (productsSection) {
                const headerOffset = 100;
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        return matchCount;
    }
    
    // Function to reset search and show all products
    function resetSearch() {
        const allProductCards = document.querySelectorAll('.product-card');
        allProductCards.forEach(card => {
            card.style.display = '';
        });
    }
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            filterProducts(query);
        } else {
            resetSearch();
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Real-time search as user types (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                filterProducts(query);
            } else if (query.length === 0) {
                resetSearch();
            }
        }, 300);
    });
    
    // Filter when category changes
    if (searchCategory) {
        searchCategory.addEventListener('change', function() {
            const query = searchInput.value.trim();
            const selectedCategory = this.value;
            
            // Filter products based on category selection
            const allProductCards = document.querySelectorAll('.product-card');
            let matchCount = 0;
            
            allProductCards.forEach(card => {
                const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
                const productCategory = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
                const cardCategory = card.getAttribute('data-category') || '';
                
                // Check if product matches search term
                const searchTerm = query.toLowerCase();
                const matchesSearch = searchTerm === '' || 
                    productName.includes(searchTerm) || 
                    productCategory.includes(searchTerm);
                
                // Check if product matches selected category
                const matchesCategory = selectedCategory === 'all' || 
                    cardCategory === selectedCategory ||
                    productCategory.includes(selectedCategory);
                
                // Show or hide based on both filters
                if (matchesSearch && matchesCategory) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.3s ease';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show toast with category filter results
            if (selectedCategory !== 'all') {
                const categoryName = this.options[this.selectedIndex].text;
                if (matchCount > 0) {
                    window.showToast && window.showToast(`Showing ${matchCount} product(s) in ${categoryName}`);
                } else {
                    window.showToast && window.showToast(`No products found in ${categoryName}`);
                }
                
                // Scroll to products section with offset for header
                const productsSection = document.getElementById('flash-deals') || document.querySelector('.flash-deals-section') || document.querySelector('.products-grid');
                if (productsSection) {
                    const headerOffset = 100;
                    const elementPosition = productsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // If "All Categories" selected, show all (or filter by search term if present)
                if (query === '') {
                    resetSearch();
                    window.showToast && window.showToast('Showing all products');
                } else {
                    filterProducts(query);
                }
            }
        });
    }
    
    // Clear search button (optional - add X button to clear search)
    searchInput.addEventListener('search', function() {
        if (this.value === '') {
            resetSearch();
        }
    });
}

/* ==================== Quantity Controls ==================== */
function initQuantityControls() {
    // General quantity controls for product pages
    const quantityControls = document.querySelectorAll('.quantity-control:not(.cart-item .quantity-control)');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.qty-btn.minus');
        const plusBtn = control.querySelector('.qty-btn.plus');
        const valueEl = control.querySelector('.qty-value') || control.querySelector('input');
        
        if (!minusBtn || !plusBtn || !valueEl) return;
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(valueEl.value || valueEl.textContent);
            if (value > 1) {
                if (valueEl.value !== undefined) {
                    valueEl.value = value - 1;
                } else {
                    valueEl.textContent = value - 1;
                }
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(valueEl.value || valueEl.textContent);
            if (value < 99) {
                if (valueEl.value !== undefined) {
                    valueEl.value = value + 1;
                } else {
                    valueEl.textContent = value + 1;
                }
            }
        });
    });
}

/* ==================== Wishlist ==================== */
function initWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistClose = document.getElementById('wishlistClose');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const addAllToCartBtn = document.getElementById('addAllToCartBtn');
    const clearWishlistBtn = document.getElementById('clearWishlistBtn');
    
    // Wishlist data
    window.wishlistItems = window.wishlistItems || [];
    
    // Open wishlist sidebar
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWishlist();
        });
    }
    
    // Close wishlist
    if (wishlistClose) {
        wishlistClose.addEventListener('click', closeWishlist);
    }
    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', closeWishlist);
    }
    
    // Add all to cart
    if (addAllToCartBtn) {
        addAllToCartBtn.addEventListener('click', function() {
            if (window.wishlistItems.length === 0) {
                window.showToast && window.showToast('Your wishlist is empty!');
                return;
            }
            
            window.wishlistItems.forEach(item => {
                const existingItem = cartItems.find(i => i.name === item.name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({
                        id: Date.now() + Math.random(),
                        name: item.name,
                        variant: item.category,
                        price: item.price,
                        quantity: 1,
                        image: item.image
                    });
                }
            });
            
            updateCartDisplay();
            window.showToast && window.showToast(`${window.wishlistItems.length} items added to cart!`);
        });
    }
    
    // Clear wishlist
    if (clearWishlistBtn) {
        clearWishlistBtn.addEventListener('click', function() {
            if (window.wishlistItems.length === 0) {
                window.showToast && window.showToast('Your wishlist is already empty!');
                return;
            }
            
            window.wishlistItems = [];
            renderWishlist();
            updateWishlistCount();
            
            // Reset all heart icons
            document.querySelectorAll('.action-btn.wishlist').forEach(btn => {
                const icon = btn.querySelector('i');
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.style.background = '';
                btn.style.color = '';
            });
            
            window.showToast && window.showToast('Wishlist cleared!');
        });
    }
    
    // Initialize wishlist buttons on products
    initWishlistButtons();
}

function openWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    
    wishlistSidebar.classList.add('active');
    wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderWishlist();
}

function closeWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    
    wishlistSidebar.classList.remove('active');
    wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function initWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.action-btn.wishlist');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const productCard = this.closest('.product-card');
            
            if (!productCard) return;
            
            const name = productCard.querySelector('.product-name a')?.textContent || 'Product';
            const priceText = productCard.querySelector('.current-price')?.textContent || '$0';
            const price = parseFloat(priceText.replace('$', ''));
            const image = productCard.querySelector('.product-image img')?.src || '';
            const category = productCard.querySelector('.product-category')?.textContent || '';
            
            if (icon.classList.contains('far')) {
                // Add to wishlist
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#EF4444';
                this.style.color = '#fff';
                
                window.wishlistItems.push({
                    id: Date.now(),
                    name: name,
                    price: price,
                    image: image,
                    category: category
                });
                
                window.showToast && window.showToast('Added to wishlist ❤️');
            } else {
                // Remove from wishlist
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = '';
                this.style.color = '';
                
                window.wishlistItems = window.wishlistItems.filter(item => item.name !== name);
                
                window.showToast && window.showToast('Removed from wishlist');
            }
            
            updateWishlistCount();
            renderWishlist();
        });
    });
}

function renderWishlist() {
    const container = document.getElementById('wishlistItems');
    if (!container) return;
    
    if (!window.wishlistItems || window.wishlistItems.length === 0) {
        container.innerHTML = `
            <div class="wishlist-empty">
                <i class="far fa-heart"></i>
                <p>Your wishlist is empty</p>
                <span>Add items you love to your wishlist. Review them anytime and easily move them to cart.</span>
            </div>
        `;
        return;
    }
    
    container.innerHTML = window.wishlistItems.map(item => `
        <div class="wishlist-item" data-name="${item.name}">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
                <h4>${item.name}</h4>
                <p>${item.category}</p>
                <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="wishlist-item-actions">
                <button class="wishlist-add-cart" title="Add to Cart"><i class="fas fa-shopping-cart"></i></button>
                <button class="wishlist-remove" title="Remove"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    // Attach event listeners
    container.querySelectorAll('.wishlist-item').forEach(item => {
        const name = item.dataset.name;
        
        item.querySelector('.wishlist-add-cart').addEventListener('click', function() {
            const wishlistItem = window.wishlistItems.find(i => i.name === name);
            if (wishlistItem) {
                const existingItem = cartItems.find(i => i.name === name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({
                        id: Date.now(),
                        name: wishlistItem.name,
                        variant: wishlistItem.category,
                        price: wishlistItem.price,
                        quantity: 1,
                        image: wishlistItem.image
                    });
                }
                updateCartDisplay();
                window.showToast && window.showToast(`${name} added to cart!`);
            }
        });
        
        item.querySelector('.wishlist-remove').addEventListener('click', function() {
            window.wishlistItems = window.wishlistItems.filter(i => i.name !== name);
            renderWishlist();
            updateWishlistCount();
            
            // Update the heart icon on the product card
            document.querySelectorAll('.product-card').forEach(card => {
                const productName = card.querySelector('.product-name a')?.textContent;
                if (productName === name) {
                    const btn = card.querySelector('.action-btn.wishlist');
                    const icon = btn.querySelector('i');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    btn.style.background = '';
                    btn.style.color = '';
                }
            });
            
            window.showToast && window.showToast('Removed from wishlist');
        });
    });
}

function updateWishlistCount() {
    const count = window.wishlistItems ? window.wishlistItems.length : 0;
    
    // Update header badge
    const wishlistCountBadge = document.getElementById('wishlistCount');
    if (wishlistCountBadge) {
        wishlistCountBadge.textContent = count;
    }
    
    // Update header count text
    const wishlistHeaderCount = document.getElementById('wishlistHeaderCount');
    if (wishlistHeaderCount) {
        wishlistHeaderCount.textContent = `(${count} items)`;
    }
    
    // Update mobile nav badge
    const mobileWishlistCount = document.getElementById('mobileWishlistCount');
    if (mobileWishlistCount) {
        mobileWishlistCount.textContent = count;
    }
}

/* ==================== Newsletter Form ==================== */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate subscription
            this.querySelector('button').innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            this.querySelector('button').disabled = true;
            this.querySelector('input').disabled = true;
            
            window.showToast && window.showToast('Thank you for subscribing!');
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.querySelector('button').innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                this.querySelector('button').disabled = false;
                this.querySelector('input').disabled = false;
                this.querySelector('input').value = '';
            }, 3000);
        }
    });
}

/* ==================== Smooth Scroll ==================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==================== Scroll Animations ==================== */
function initAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.category-card, .product-card, .testimonial-card, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 31, 63, 0.15)';
        } else {
            header.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    });
}

/* ==================== CSS Animation Keyframes ==================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

/* ==================== Utility Functions ==================== */
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Get random items from array
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/* ==================== Console Welcome Message ==================== */
console.log(`
%c🌊 OceanCart - Premium E-commerce Platform

%cThank you for visiting OceanCart!
Built with ❤️ using HTML, CSS & JavaScript

%cFeatures:
• Modern Navy Blue & Sky Blue Theme
• Fully Responsive Design
• Dark Mode Support
• Interactive Product Filters
• Live Chat Widget
• Smooth Animations

`, 
'font-size: 20px; font-weight: bold; color: #001F3F;',
'font-size: 14px; color: #87CEEB;',
'font-size: 12px; color: #00BFFF;'
);

/* ==================== Checkout System ==================== */
// Cart data structure
let cartItems = [
    { id: 1, name: 'Wireless Headphones Pro', variant: 'Color: Black', price: 149.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
    { id: 2, name: 'Smart Watch Series 5', variant: 'Size: 44mm', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { id: 3, name: 'Running Shoes Ultra', variant: 'Size: 10 | Color: Red', price: 129.99, quantity: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' }
];

// Promo codes
const promoCodes = {
    'SAVE10': { type: 'percent', value: 10, description: '10% off' },
    'SAVE20': { type: 'percent', value: 20, description: '20% off' },
    'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' },
    'FLAT50': { type: 'fixed', value: 50, description: '$50 off' }
};

let appliedPromo = null;
let shippingCost = 0;
let checkoutData = {};

// Initialize Checkout
document.addEventListener('DOMContentLoaded', function() {
    initCheckout();
});

function initCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutClose = document.getElementById('checkoutClose');
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const proceedBtn = document.querySelector('.cart-buttons .btn-primary');
    
    if (!checkoutModal) return;
    
    // Open checkout modal
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCheckout();
        });
    }
    
    // Close checkout
    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckout);
    }
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', closeCheckout);
    }
    
    // Continue shopping buttons
    document.getElementById('continueShopping')?.addEventListener('click', closeCheckout);
    document.getElementById('continueShoppingBtn')?.addEventListener('click', function() {
        closeCheckout();
        resetCheckout();
    });
    
    // Step navigation
    document.getElementById('toShippingBtn')?.addEventListener('click', goToShipping);
    document.getElementById('backToCartBtn')?.addEventListener('click', goToCart);
    document.getElementById('toPaymentBtn')?.addEventListener('click', goToPayment);
    document.getElementById('backToShippingBtn')?.addEventListener('click', goToShipping);
    document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);
    document.getElementById('trackOrderBtn')?.addEventListener('click', function() {
        window.showToast && window.showToast('Order tracking feature coming soon!');
    });
    
    // Promo code
    document.getElementById('applyPromoBtn')?.addEventListener('click', applyPromoCode);
    document.getElementById('promoCodeInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyPromoCode();
    });
    
    // Shipping method change
    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', updateShippingCost);
    });
    
    // Payment method change
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
            this.closest('.payment-option').classList.add('active');
            
            // Show/hide card form based on payment method
            const paymentForm = document.querySelector('.payment-form');
            if (this.value === 'card') {
                paymentForm.style.display = 'block';
            } else {
                paymentForm.style.display = 'none';
            }
        });
    });
    
    // Card number formatting
    document.getElementById('cardNumber')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formatted;
    });
    
    // Expiry date formatting
    document.getElementById('cardExpiry')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV - numbers only
    document.getElementById('cardCvv')?.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Add to cart functionality
    initAddToCart();
}

function openCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    // Close cart sidebar
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    
    // Open checkout modal
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load cart items
    renderCheckoutCart();
    updateCheckoutTotals();
    goToStep(1);
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
}

function resetCheckout() {
    appliedPromo = null;
    shippingCost = 0;
    checkoutData = {};
    document.getElementById('promoCodeInput').value = '';
    document.getElementById('promoMessage').textContent = '';
    document.getElementById('promoMessage').className = 'promo-message';
    goToStep(1);
}

function renderCheckoutCart() {
    const container = document.getElementById('checkoutCartItems');
    if (!container) return;
    
    if (cartItems.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    container.innerHTML = cartItems.map(item => `
        <div class="checkout-cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>${item.variant}</p>
            </div>
            <div class="checkout-item-price">
                <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="qty">Qty: ${item.quantity}</div>
            </div>
        </div>
    `).join('');
}

function updateCheckoutTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    // Calculate discount
    if (appliedPromo) {
        if (appliedPromo.type === 'percent') {
            discount = subtotal * (appliedPromo.value / 100);
        } else if (appliedPromo.type === 'fixed') {
            discount = appliedPromo.value;
        } else if (appliedPromo.type === 'shipping') {
            shippingCost = 0;
        }
    }
    
    const taxRate = 0.08;
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * taxRate;
    const total = taxableAmount + shippingCost + tax;
    
    // Update step 1 summary
    document.getElementById('checkoutSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkoutDiscount').textContent = '-$' + discount.toFixed(2);
    document.getElementById('checkoutShipping').textContent = shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2);
    document.getElementById('checkoutTax').textContent = '$' + tax.toFixed(2);
    document.getElementById('checkoutTotal').textContent = '$' + total.toFixed(2);
    
    // Update step 3 mini summary
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('summaryItemCount').textContent = itemCount;
    document.getElementById('summarySubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summaryShipping').textContent = shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2);
    document.getElementById('summaryDiscount').textContent = '-$' + discount.toFixed(2);
    document.getElementById('summaryTotal').textContent = '$' + total.toFixed(2);
    
    // Store for later
    checkoutData.subtotal = subtotal;
    checkoutData.discount = discount;
    checkoutData.shipping = shippingCost;
    checkoutData.tax = tax;
    checkoutData.total = total;
}

function applyPromoCode() {
    const input = document.getElementById('promoCodeInput');
    const message = document.getElementById('promoMessage');
    const code = input.value.trim().toUpperCase();
    
    if (!code) {
        message.textContent = 'Please enter a promo code';
        message.className = 'promo-message error';
        return;
    }
    
    if (promoCodes[code]) {
        appliedPromo = promoCodes[code];
        message.textContent = `✓ Promo code applied: ${appliedPromo.description}`;
        message.className = 'promo-message success';
        updateCheckoutTotals();
        window.showToast && window.showToast('Promo code applied successfully!');
    } else {
        message.textContent = '✗ Invalid promo code';
        message.className = 'promo-message error';
        appliedPromo = null;
        updateCheckoutTotals();
    }
}

function updateShippingCost() {
    const selected = document.querySelector('input[name="shippingMethod"]:checked');
    if (!selected) return;
    
    switch (selected.value) {
        case 'standard':
            shippingCost = 0;
            break;
        case 'express':
            shippingCost = 9.99;
            break;
        case 'overnight':
            shippingCost = 19.99;
            break;
    }
    
    // Check if free shipping promo is applied
    if (appliedPromo && appliedPromo.type === 'shipping') {
        shippingCost = 0;
    }
    
    checkoutData.shippingMethod = selected.value;
    updateCheckoutTotals();
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-content').forEach(el => el.classList.add('hidden'));
    
    // Show target step
    document.getElementById(`checkoutStep${step}`).classList.remove('hidden');
    
    // Update step indicators
    document.querySelectorAll('.checkout-step').forEach(el => {
        const stepNum = parseInt(el.dataset.step);
        el.classList.remove('active', 'completed');
        if (stepNum < step) {
            el.classList.add('completed');
        } else if (stepNum === step) {
            el.classList.add('active');
        }
    });
}

function goToCart() {
    goToStep(1);
}

function goToShipping() {
    if (cartItems.length === 0) {
        window.showToast && window.showToast('Your cart is empty!');
        return;
    }
    goToStep(2);
    updateShippingCost();
}

function goToPayment() {
    // Validate shipping form
    const form = document.getElementById('shippingForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        window.showToast && window.showToast('Please fill in all required fields');
        return;
    }
    
    // Store shipping data
    checkoutData.firstName = document.getElementById('firstName').value;
    checkoutData.lastName = document.getElementById('lastName').value;
    checkoutData.email = document.getElementById('email').value;
    checkoutData.phone = document.getElementById('phone').value;
    checkoutData.address = document.getElementById('address').value;
    checkoutData.city = document.getElementById('city').value;
    checkoutData.state = document.getElementById('state').value;
    checkoutData.zipCode = document.getElementById('zipCode').value;
    checkoutData.country = document.getElementById('country').value;
    
    updateCheckoutTotals();
    goToStep(3);
}

function placeOrder() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validate card details if paying by card
    if (paymentMethod === 'card') {
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        
        if (!cardName || cardNumber.length < 16 || !cardExpiry || cardCvv.length < 3) {
            window.showToast && window.showToast('Please fill in all card details correctly');
            return;
        }
    }
    
    // Show loading state
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Generate order number
        const orderNumber = 'OC-2026-' + Math.random().toString(36).substr(2, 5).toUpperCase();
        
        // Store order data
        checkoutData.orderNumber = orderNumber;
        checkoutData.paymentMethod = paymentMethod;
        
        // Update confirmation page
        document.getElementById('orderNumber').textContent = '#' + orderNumber;
        document.getElementById('confirmEmail').textContent = checkoutData.email;
        document.getElementById('finalTotal').textContent = '$' + checkoutData.total.toFixed(2);
        
        // Payment method display
        const paymentLabels = {
            card: 'Credit/Debit Card ending in ' + document.getElementById('cardNumber').value.slice(-4),
            paypal: 'PayPal',
            applepay: 'Apple Pay',
            googlepay: 'Google Pay'
        };
        document.getElementById('paymentMethodDisplay').textContent = paymentLabels[paymentMethod];
        
        // Shipping address
        document.getElementById('shippingAddress').textContent = 
            `${checkoutData.firstName} ${checkoutData.lastName}, ${checkoutData.address}, ${checkoutData.city}, ${checkoutData.state} ${checkoutData.zipCode}, ${checkoutData.country}`;
        
        // Order items list
        const orderItemsList = document.getElementById('orderItemsList');
        orderItemsList.innerHTML = cartItems.map(item => `
            <div class="order-item">
                <span class="order-item-name">${item.name} × ${item.quantity}</span>
                <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        // Reset button
        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
        
        // Go to confirmation
        goToStep(4);
        
        // Clear cart
        cartItems = [];
        updateCartDisplay();
        
        window.showToast && window.showToast('Order placed successfully! 🎉');
    }, 2000);
}

function updateCartDisplay() {
    // Update cart count in header
    const cartBadges = document.querySelectorAll('.header-action .badge, .mobile-bottom-nav .badge');
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadges.forEach(badge => {
        badge.textContent = itemCount;
    });
    
    // Update cart header
    const cartHeader = document.querySelector('.cart-header h3 span');
    if (cartHeader) {
        cartHeader.textContent = `(${itemCount} items)`;
    }
    
    // Update cart sidebar items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 30px; color: var(--gray);">Your cart is empty</p>';
        } else {
            cartItemsContainer.innerHTML = cartItems.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-variant">${item.variant}</p>
                        <div class="cart-item-price">
                            <span class="price">$${item.price.toFixed(2)}</span>
                            <div class="quantity-control">
                                <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
            
            // Re-attach event listeners
            attachCartItemListeners();
        }
    }
    
    // Update cart totals
    updateCartSidebarTotals();
}

function updateCartSidebarTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    const cartTotals = document.querySelector('.cart-totals');
    if (cartTotals) {
        cartTotals.innerHTML = `
            <div class="cart-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-row">
                <span>Shipping</span>
                <span class="free">FREE</span>
            </div>
            <div class="cart-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="cart-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }
}

function attachCartItemListeners() {
    document.querySelectorAll('.cart-item').forEach(item => {
        const id = parseInt(item.dataset.id);
        const minusBtn = item.querySelector('.qty-btn.minus');
        const plusBtn = item.querySelector('.qty-btn.plus');
        const removeBtn = item.querySelector('.cart-item-remove');
        
        minusBtn?.addEventListener('click', () => updateCartItemQuantity(id, -1));
        plusBtn?.addEventListener('click', () => updateCartItemQuantity(id, 1));
        removeBtn?.addEventListener('click', () => removeCartItem(id));
    });
}

function updateCartItemQuantity(id, delta) {
    const item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeCartItem(id);
        } else {
            updateCartDisplay();
        }
    }
}

function removeCartItem(id) {
    cartItems = cartItems.filter(i => i.id !== id);
    updateCartDisplay();
    window.showToast && window.showToast('Item removed from cart');
}

function initAddToCart() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const name = productCard.querySelector('.product-name a')?.textContent || 'Product';
            const priceText = productCard.querySelector('.current-price')?.textContent || '$0';
            const price = parseFloat(priceText.replace('$', ''));
            const image = productCard.querySelector('.product-image img')?.src || '';
            const category = productCard.querySelector('.product-category')?.textContent || '';
            
            // Check if item already in cart
            const existingItem = cartItems.find(i => i.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: Date.now(),
                    name: name,
                    variant: category,
                    price: price,
                    quantity: 1,
                    image: image
                });
            }
            
            updateCartDisplay();
            window.showToast && window.showToast(`${name} added to cart!`);
        });
    });
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateCartDisplay();
        attachCartItemListeners();
    }, 100);
});

