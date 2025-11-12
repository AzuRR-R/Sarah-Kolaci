// Google Sheets API URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbz8dP0SSr0a4PU74oanspXYWBAowgUtmXTqeRAIJ6LzTASaDU77PU95R2BpsJR71qXZZw/exec';

// Login credentials (u produkciji bi ovo trebalo biti na serveru)
const USERS = {
    'admin': 'sarah2024',
    'sarah': 'kolaci123'
};

let currentUser = null;
let allOrders = [];
let currentMonth = new Date();

// Login functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (USERS[username] && USERS[username] === password) {
        currentUser = username;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('currentUser').textContent = username;
        loadOrders();
    } else {
        document.getElementById('loginError').textContent = 'Pogrešno korisničko ime ili lozinka!';
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').textContent = '';
});

// Tab navigation
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        // Load data for specific tab
        if (tabName === 'calendar') {
            renderCalendar();
        } else if (tabName === 'stats') {
            renderStats();
        }
    });
});

// Load orders from Google Sheets
async function loadOrders() {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL);
        const data = await response.json();
        
        // Skip header row and convert to objects
        allOrders = data.slice(1).map((row, index) => ({
            id: index + 1,
            date: row[0],
            name: row[1],
            phone: row[2],
            email: row[3],
            productType: row[4],
            pickupDate: row[5],
            notes: row[6],
            status: row[7] || 'Nova',
            price: row[8] || ''
        })).reverse(); // Najnovije prvo
        
        renderOrders();
        renderCalendar();
        updateStats();
    } catch (error) {
        console.error('Greška pri učitavanju narudžbi:', error);
        alert('Greška pri učitavanju narudžbi. Provjerite internet konekciju.');
    }
}

// Render orders list
function renderOrders(filter = 'all') {
    const ordersList = document.getElementById('ordersList');
    const filteredOrders = filter === 'all' 
        ? allOrders 
        : allOrders.filter(order => order.status === filter);
    
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">Nema narudžbi</div>';
        return;
    }
    
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-item" onclick="showOrderDetails(${order.id})">
            <div class="order-header">
                <span class="order-id">#${order.id} - ${order.name}</span>
                <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
            </div>
            <div class="order-details">
                <div class="order-detail">
                    <span class="detail-label">Telefon</span>
                    <span class="detail-value">${order.phone}</span>
                </div>
                <div class="order-detail">
                    <span class="detail-label">Proizvod</span>
                    <span class="detail-value">${order.productType}</span>
                </div>
                <div class="order-detail">
                    <span class="detail-label">Datum Preuzimanja</span>
                    <span class="detail-value">${formatDate(order.pickupDate)}</span>
                </div>
                <div class="order-detail">
                    <span class="detail-label">Cijena</span>
                    <span class="detail-value">${order.price ? order.price + ' KM' : 'N/A'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    document.getElementById('totalOrders').textContent = allOrders.length;
    document.getElementById('newOrders').textContent = allOrders.filter(o => o.status === 'Nova').length;
    document.getElementById('inProgressOrders').textContent = allOrders.filter(o => o.status === 'U Pripremi').length;
    document.getElementById('readyOrders').textContent = allOrders.filter(o => o.status === 'Gotova').length;
}

// Render calendar
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('currentMonth');
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    monthDisplay.textContent = new Date(year, month).toLocaleDateString('bs-BA', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let calendarHTML = '';
    
    // Day headers
    const dayNames = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
    dayNames.forEach(day => {
        calendarHTML += `<div style="text-align: center; font-weight: 700; padding: 10px;">${day}</div>`;
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div></div>';
    }
    
    // Days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const ordersOnDay = allOrders.filter(order => {
            const pickupDate = new Date(order.pickupDate);
            return pickupDate.toISOString().split('T')[0] === dateStr;
        });
        
        const isToday = date.toDateString() === today.toDateString();
        const hasOrders = ordersOnDay.length > 0;
        
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasOrders ? 'has-orders' : ''}" 
                 onclick="showDayOrders('${dateStr}')">
                <div class="day-number">${day}</div>
                ${hasOrders ? `<div class="order-count">${ordersOnDay.length} narudžbi</div>` : ''}
            </div>
        `;
    }
    
    calendar.innerHTML = calendarHTML;
}

// Show orders for specific day
function showDayOrders(dateStr) {
    const dayOrders = document.getElementById('dayOrders');
    const ordersOnDay = allOrders.filter(order => {
        const pickupDate = new Date(order.pickupDate);
        return pickupDate.toISOString().split('T')[0] === dateStr;
    });
    
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('bs-BA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    if (ordersOnDay.length === 0) {
        dayOrders.innerHTML = `<h4>${formattedDate}</h4><p style="color: #999; margin-top: 15px;">Nema narudžbi za ovaj dan</p>`;
        return;
    }
    
    dayOrders.innerHTML = `
        <h4>${formattedDate}</h4>
        <div style="margin-top: 20px;">
            ${ordersOnDay.map(order => `
                <div class="order-item" onclick="showOrderDetails(${order.id})">
                    <div class="order-header">
                        <span class="order-id">#${order.id} - ${order.name}</span>
                        <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
                    </div>
                    <div class="order-details">
                        <div class="order-detail">
                            <span class="detail-label">Telefon</span>
                            <span class="detail-value">${order.phone}</span>
                        </div>
                        <div class="order-detail">
                            <span class="detail-label">Proizvod</span>
                            <span class="detail-value">${order.productType}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Calendar navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
});

// Show order details modal
function showOrderDetails(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    
    orderDetails.innerHTML = `
        <div style="display: grid; gap: 15px;">
            <div><strong>ID:</strong> #${order.id}</div>
            <div><strong>Ime:</strong> ${order.name}</div>
            <div><strong>Telefon:</strong> ${order.phone}</div>
            <div><strong>Email:</strong> ${order.email || 'N/A'}</div>
            <div><strong>Proizvod:</strong> ${order.productType}</div>
            <div><strong>Datum Preuzimanja:</strong> ${formatDate(order.pickupDate)}</div>
            <div><strong>Napomene:</strong> ${order.notes || 'Nema napomena'}</div>
            <div><strong>Cijena:</strong> ${order.price ? order.price + ' KM' : 'N/A'}</div>
            <div><strong>Datum Narudžbe:</strong> ${formatDate(order.date)}</div>
        </div>
    `;
    
    document.getElementById('orderStatus').value = order.status;
    document.getElementById('updateStatus').onclick = () => updateOrderStatus(orderId);
    
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Update order status (Note: This requires additional Google Apps Script setup)
function updateOrderStatus(orderId) {
    const newStatus = document.getElementById('orderStatus').value;
    const order = allOrders.find(o => o.id === orderId);
    
    if (order) {
        order.status = newStatus;
        alert(`Status narudžbe #${orderId} ažuriran na: ${newStatus}`);
        document.getElementById('orderModal').style.display = 'none';
        renderOrders();
        renderCalendar();
        updateStats();
        
        // Ovdje bi trebalo poslati update na Google Sheets
        // Za sada samo lokalno ažuriramo
    }
}

// Render statistics
function renderStats() {
    // Popular products
    const productCounts = {};
    allOrders.forEach(order => {
        productCounts[order.productType] = (productCounts[order.productType] || 0) + 1;
    });
    
    const sortedProducts = Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    document.getElementById('popularProducts').innerHTML = sortedProducts.length > 0
        ? sortedProducts.map(([product, count]) => `
            <li>
                <span>${product}</span>
                <span style="font-weight: 700; color: #FF69B4;">${count}x</span>
            </li>
        `).join('')
        : '<p style="color: #999;">Nema podataka</p>';
    
    // Total revenue
    const totalRevenue = allOrders
        .filter(o => o.price)
        .reduce((sum, o) => sum + parseFloat(o.price || 0), 0);
    
    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2) + ' KM';
    
    // Average order
    const avgOrder = allOrders.length > 0 ? totalRevenue / allOrders.length : 0;
    document.getElementById('avgOrder').textContent = avgOrder.toFixed(2) + ' KM';
}

// Filter orders
document.getElementById('statusFilter').addEventListener('change', (e) => {
    renderOrders(e.target.value);
});

// Refresh buttons
document.getElementById('refreshCalendar').addEventListener('click', loadOrders);
document.getElementById('refreshOrders').addEventListener('click', loadOrders);

// Helper function to format date
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('bs-BA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Console message
console.log('%c🎂 Sarah Kolači Admin Panel', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
