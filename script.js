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
let currentUser = null; // 當前登入用戶
let customerData = null; // 客戶資料

// DOM 元素
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const loginSection = document.getElementById('loginSection');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutBtn = document.getElementById('checkoutBtn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    loadCustomerData();
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

    // 結帳按鈕
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('購物車是空的！');
            return;
        }
        if (!currentUser) {
            alert('請先登入才能結帳！');
            return;
        }
        openCheckoutModal();
    });

    // 關閉結帳模態框
    closeModal.addEventListener('click', () => {
        closeCheckoutModal();
    });

    // 點擊模態框外部關閉
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
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

// ==================== 登入功能 ====================

// LINE 登入
function loginWithLine() {
    // 注意：實際應用中需要配置 LINE Login API
    // 這裡使用模擬登入流程
    const lineUserId = 'line_' + Date.now();
    const lineUserName = 'LINE用戶_' + Math.floor(Math.random() * 1000);
    
    // 模擬 LINE OAuth 流程
    const mockLineUser = {
        id: lineUserId,
        name: lineUserName,
        email: lineUserId + '@line.example.com',
        provider: 'LINE',
        picture: null
    };
    
    handleLoginSuccess(mockLineUser);
}

// Google 登入
function loginWithGoogle() {
    // 注意：實際應用中需要配置 Google OAuth API
    // 這裡使用模擬登入流程
    const googleUserId = 'google_' + Date.now();
    const googleUserName = 'Google用戶_' + Math.floor(Math.random() * 1000);
    
    // 模擬 Google OAuth 流程
    const mockGoogleUser = {
        id: googleUserId,
        name: googleUserName,
        email: googleUserId + '@gmail.com',
        provider: 'Google',
        picture: null
    };
    
    handleLoginSuccess(mockGoogleUser);
}

// 處理登入成功
function handleLoginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateLoginUI();
    
    // 載入已儲存的客戶資料
    loadCustomerData();
    
    alert(`歡迎，${user.name}！`);
}

// 登出
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateLoginUI();
    alert('已成功登出');
}

// 檢查登入狀態
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateLoginUI();
        } catch (e) {
            console.error('載入用戶資料失敗', e);
        }
    }
}

// 更新登入UI
function updateLoginUI() {
    if (currentUser) {
        loginSection.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
    } else {
        loginSection.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

// ==================== 客戶資料管理 ====================

// 載入客戶資料
function loadCustomerData() {
    if (!currentUser) return;
    
    const savedData = localStorage.getItem(`customerData_${currentUser.id}`);
    if (savedData) {
        try {
            customerData = JSON.parse(savedData);
            fillCustomerForm();
            displayCustomerInfo();
        } catch (e) {
            console.error('載入客戶資料失敗', e);
        }
    }
}

// 儲存客戶資料
function saveCustomerData() {
    if (!currentUser) return;
    
    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value,
        address: document.getElementById('customerAddress').value,
        note: document.getElementById('customerNote').value,
        userId: currentUser.id,
        provider: currentUser.provider,
        updatedAt: new Date().toISOString()
    };
    
    customerData = formData;
    localStorage.setItem(`customerData_${currentUser.id}`, JSON.stringify(formData));
    displayCustomerInfo();
}

// 填寫客戶表單
function fillCustomerForm() {
    if (!customerData) return;
    
    document.getElementById('customerName').value = customerData.name || '';
    document.getElementById('customerPhone').value = customerData.phone || '';
    document.getElementById('customerEmail').value = customerData.email || currentUser.email || '';
    document.getElementById('customerAddress').value = customerData.address || '';
    document.getElementById('customerNote').value = customerData.note || '';
}

// 顯示客戶資訊
function displayCustomerInfo() {
    const displayInfo = document.getElementById('customerDisplayInfo');
    if (customerData && customerData.name) {
        displayInfo.innerHTML = `
            <p><strong>已儲存的客戶資料：</strong></p>
            <p>姓名：${customerData.name}</p>
            <p>電話：${customerData.phone}</p>
            <p>Email：${customerData.email}</p>
        `;
        displayInfo.classList.add('show');
    } else {
        displayInfo.classList.remove('show');
    }
}

// ==================== 結帳功能 ====================

// 開啟結帳模態框
function openCheckoutModal() {
    // 載入客戶資料
    if (customerData) {
        fillCustomerForm();
        displayCustomerInfo();
    } else {
        // 如果已登入，預填Email
        if (currentUser && currentUser.email) {
            document.getElementById('customerEmail').value = currentUser.email;
        }
    }
    
    // 顯示訂單摘要
    updateOrderSummary();
    
    checkoutModal.classList.add('show');
}

// 關閉結帳模態框
function closeCheckoutModal() {
    checkoutModal.classList.remove('show');
}

// 更新訂單摘要
function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>NT$ ${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });
    
    orderSummary.innerHTML = html;
    orderTotal.textContent = total.toLocaleString();
}

// LINE Pay 付款
function proceedToLinePay() {
    const form = document.getElementById('customerForm');
    
    // 驗證表單
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // 儲存客戶資料
    saveCustomerData();
    
    // 建立訂單資料
    const orderData = {
        orderId: 'ORD' + Date.now(),
        userId: currentUser.id,
        userProvider: currentUser.provider,
        customer: {
            name: customerData.name,
            phone: customerData.phone,
            email: customerData.email,
            address: customerData.address,
            note: customerData.note
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // 儲存訂單到 LocalStorage（實際應用中應該發送到後端）
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // 模擬 LINE Pay 支付流程
    // 注意：實際應用中需要整合 LINE Pay API
    simulateLinePayPayment(orderData);
}

// 模擬 LINE Pay 支付
function simulateLinePayPayment(orderData) {
    // 顯示支付處理中
    const payBtn = document.getElementById('linePayBtn');
    payBtn.disabled = true;
    payBtn.innerHTML = '<span>處理中...</span>';
    
    // 模擬支付處理時間
    setTimeout(() => {
        // 模擬支付成功
        const paymentResult = {
            success: true,
            transactionId: 'TXN' + Date.now(),
            orderId: orderData.orderId,
            amount: orderData.total,
            paidAt: new Date().toISOString()
        };
        
        // 更新訂單狀態
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.orderId === orderData.orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = 'paid';
            orders[orderIndex].payment = paymentResult;
            localStorage.setItem('orders', JSON.stringify(orders));
        }
        
        // 清空購物車
        cart = [];
        updateCartUI();
        
        // 關閉模態框和購物車
        closeCheckoutModal();
        cartSidebar.classList.remove('open');
        
        // 顯示成功訊息
        alert(`付款成功！\n\n訂單編號：${orderData.orderId}\n交易編號：${paymentResult.transactionId}\n總金額：NT$ ${orderData.total.toLocaleString()}\n\n感謝您的購買！我們會盡快為您處理訂單。`);
        
        payBtn.disabled = false;
        payBtn.innerHTML = '<span>💳</span> LINE Pay 付款';
    }, 2000);
}
