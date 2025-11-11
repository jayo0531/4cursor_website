// 產品數據
const products = [
    {
        id: 1,
        name: "經典草莓蛋糕",
        category: "birthday",
        price: 680,
        description: "新鮮草莓搭配香濃鮮奶油，經典不敗的生日蛋糕選擇",
        image: "🍓"
    },
    {
        id: 2,
        name: "巧克力熔岩蛋糕",
        category: "dessert",
        price: 450,
        description: "濃郁巧克力外層，切開後流出溫熱的巧克力熔岩",
        image: "🍫"
    },
    {
        id: 3,
        name: "夢幻婚禮蛋糕",
        category: "wedding",
        price: 3500,
        description: "多層次設計，精緻花朵裝飾，為您的特別日子增添浪漫",
        image: "💐"
    },
    {
        id: 4,
        name: "抹茶紅豆蛋糕",
        category: "dessert",
        price: 520,
        description: "日式風味，抹茶與紅豆的完美結合",
        image: "🍵"
    },
    {
        id: 5,
        name: "彩虹生日蛋糕",
        category: "birthday",
        price: 750,
        description: "繽紛彩虹層次，讓生日派對更加歡樂",
        image: "🌈"
    },
    {
        id: 6,
        name: "提拉米蘇",
        category: "dessert",
        price: 480,
        description: "義式經典，咖啡與奶香的絕妙搭配",
        image: "☕"
    },
    {
        id: 7,
        name: "聖誕限定蛋糕",
        category: "seasonal",
        price: 880,
        description: "節慶限定，充滿聖誕氣氛的特別蛋糕",
        image: "🎄"
    },
    {
        id: 8,
        name: "水果塔蛋糕",
        category: "dessert",
        price: 550,
        description: "新鮮季節水果，清爽不膩的完美選擇",
        image: "🍇"
    },
    {
        id: 9,
        name: "雙層婚禮蛋糕",
        category: "wedding",
        price: 2800,
        description: "優雅雙層設計，適合小型婚禮的完美選擇",
        image: "💒"
    },
    {
        id: 10,
        name: "黑森林蛋糕",
        category: "birthday",
        price: 650,
        description: "德國經典，巧克力與櫻桃的經典組合",
        image: "🍒"
    },
    {
        id: 11,
        name: "檸檬起司蛋糕",
        category: "dessert",
        price: 420,
        description: "清新檸檬香，搭配濃郁起司，酸甜平衡",
        image: "🍋"
    },
    {
        id: 12,
        name: "萬聖節限定蛋糕",
        category: "seasonal",
        price: 720,
        description: "搞怪造型，為萬聖節派對增添趣味",
        image: "🎃"
    },
    {
        id: 13,
        name: "藍莓乳酪蛋糕",
        category: "dessert",
        price: 490,
        description: "新鮮藍莓與香濃乳酪的完美融合",
        image: "🫐"
    },
    {
        id: 14,
        name: "三層豪華婚禮蛋糕",
        category: "wedding",
        price: 4500,
        description: "豪華三層設計，精緻裝飾，適合大型婚禮",
        image: "👰"
    },
    {
        id: 15,
        name: "芒果慕斯蛋糕",
        category: "dessert",
        price: 560,
        description: "熱帶風情，新鮮芒果製成的清爽慕斯",
        image: "🥭"
    },
    {
        id: 16,
        name: "情人節限定蛋糕",
        category: "seasonal",
        price: 680,
        description: "浪漫設計，為您傳達愛意",
        image: "💝"
    },
    {
        id: 17,
        name: "香草千層蛋糕",
        category: "dessert",
        price: 580,
        description: "層層疊疊的香草風味，口感豐富",
        image: "🌿"
    },
    {
        id: 18,
        name: "兒童生日蛋糕",
        category: "birthday",
        price: 650,
        description: "可愛造型，讓小朋友的生日更加難忘",
        image: "🎈"
    }
];

// 購物車
let cart = [];
let currentFilter = 'all';

// DOM 元素
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// 設置事件監聽器
function setupEventListeners() {
    // 分類篩選
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderProducts();
        });
    });

    // 購物車圖標
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    // 關閉購物車
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // 點擊外部關閉購物車
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });
}

// 渲染產品
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">NT$ ${product.price}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // 實現瀑布式布局效果
    applyMasonryLayout();
}

// 瀑布式布局
function applyMasonryLayout() {
    const cards = document.querySelectorAll('.product-card');
    const grid = document.querySelector('.products-grid');
    
    // 使用 CSS Grid 的自動填充功能，但調整卡片高度以創造瀑布效果
    cards.forEach((card, index) => {
        // 隨機高度變化，創造更自然的瀑布效果
        const randomHeight = Math.random() * 50 + 0;
        card.style.marginTop = `${randomHeight}px`;
    });
}

// 獲取分類名稱
function getCategoryName(category) {
    const names = {
        'birthday': '生日蛋糕',
        'wedding': '婚禮蛋糕',
        'dessert': '甜點',
        'seasonal': '季節限定',
        'all': '全部'
    };
    return names[category] || category;
}

// 加入購物車
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
        
        // 顯示加入成功動畫
        showAddToCartAnimation();
    }
}

// 從購物車移除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 更新購物車UI
function updateCartUI() {
    // 更新購物車數量
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // 更新購物車內容
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">購物車是空的</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">NT$ ${item.price} x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }

    // 更新總計
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

// 顯示加入購物車動畫
function showAddToCartAnimation() {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// 結帳功能
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('購物車是空的！');
                return;
            }
            alert(`感謝您的購買！\n總金額：NT$ ${cartTotal.textContent}\n\n我們會盡快為您處理訂單。`);
            cart = [];
            updateCartUI();
            cartSidebar.classList.remove('open');
        });
    }
});
