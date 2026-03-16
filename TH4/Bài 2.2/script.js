const prices = {
    "Laptop": 20000000,
    "Điện thoại": 10000000,
    "Tai nghe": 500000
};

const form = document.getElementById('orderForm');
const displayTotal = document.getElementById('displayTotal');
const noteEl = document.getElementById('note');
const noteCount = document.getElementById('noteCount');

// --- HÀM TIỆN ÍCH ---
const showError = (id, msg) => {
    const el = document.getElementById(id);
    const parent = el.id === 'payment-area' ? el : el.parentElement;
    parent.classList.add('error');
    if (msg) parent.querySelector('.error-msg').innerText = msg;
};

const clearError = (id) => {
    const el = document.getElementById(id);
    const parent = el.id === 'payment-area' ? el : el.parentElement;
    parent.classList.remove('error');
};

// --- LOGIC TÍNH TIỀN ---
const calculateTotal = () => {
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const total = (prices[product] || 0) * qty;
    displayTotal.innerText = total.toLocaleString('vi-VN') + "đ";
};

document.getElementById('product').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// --- ĐẾM KÝ TỰ REALTIME ---
noteEl.addEventListener('input', () => {
    const len = noteEl.value.length;
    noteCount.innerText = `${len}/200`;
    if (len > 200) {
        noteCount.classList.add('limit');
        showError('note', "Ghi chú vượt quá 200 ký tự");
    } else {
        noteCount.classList.remove('limit');
        clearError('note');
    }
});

// --- VALIDATION FUNCTIONS ---
const vProduct = () => {
    if (!document.getElementById('product').value) { showError('product'); return false; }
    clearError('product'); return true;
};

const vQuantity = () => {
    const val = parseInt(document.getElementById('quantity').value);
    if (isNaN(val) || val < 1 || val > 99) { showError('quantity'); return false; }
    clearError('quantity'); return true;
};

const vDate = () => {
    const inputDate = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (!document.getElementById('deliveryDate').value || inputDate < today || inputDate > maxDate) {
        showError('deliveryDate'); return false;
    }
    clearError('deliveryDate'); return true;
};

const vAddress = () => {
    if (document.getElementById('address').value.trim().length < 10) { showError('address'); return false; }
    clearError('address'); return true;
};

const vPayment = () => {
    if (!document.querySelector('input[name="payment"]:checked')) { showError('payment-area'); return false; }
    clearError('payment-area'); return true;
};

// --- SUBMIT & MODAL ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isValid = vProduct() & vQuantity() & vDate() & vAddress() & vPayment() & (noteEl.value.length <= 200);

    if (isValid) {
        const product = document.getElementById('product').value;
        const qty = document.getElementById('quantity').value;
        const date = document.getElementById('deliveryDate').value;
        
        document.getElementById('summaryText').innerHTML = `
            <p><b>Sản phẩm:</b> ${product}</p>
            <p><b>Số lượng:</b> ${qty}</p>
            <p><b>Tổng tiền:</b> ${displayTotal.innerText}</p>
            <p><b>Ngày giao:</b> ${date}</p>
        `;
        document.getElementById('confirm-modal').style.display = 'flex';
    }
});

document.getElementById('btnCancel').onclick = () => {
    document.getElementById('confirm-modal').style.display = 'none';
};

document.getElementById('btnFinal').onclick = () => {
    alert("🎉 Đặt hàng thành công! Đơn hàng đang được xử lý.");
    location.reload(); // Reset trang
};

// Gắn blur sự kiện
document.getElementById('product').onblur = vProduct;
document.getElementById('quantity').onblur = vQuantity;
document.getElementById('deliveryDate').onblur = vDate;
document.getElementById('address').onblur = vAddress;