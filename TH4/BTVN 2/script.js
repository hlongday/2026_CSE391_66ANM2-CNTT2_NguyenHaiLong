let currentStep = 1;
const totalSteps = 3;

const form = document.getElementById('multiStepForm');
const steps = document.querySelectorAll('.step-content');
const circles = document.querySelectorAll('.step-circle');
const progressFill = document.getElementById('progress-fill');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// --- HÀM VALIDATE THEO BƯỚC ---
function validateStep(step) {
    let isValid = true;
    const currentStepEl = document.getElementById(`step-${step}`);
    const inputs = currentStepEl.querySelectorAll('input, select');

    inputs.forEach(input => {
        const group = input.parentElement;
        group.classList.remove('invalid');

        if (step === 1) {
            if (input.id === 'fullname' && input.value.trim().length < 3) isValid = false;
            if (input.id === 'dob' && !input.value) isValid = false;
            if (input.id === 'gender' && !input.value) isValid = false;
        }

        if (step === 2) {
            if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) isValid = false;
            if (input.id === 'password' && input.value.length < 8) isValid = false;
            if (input.id === 'confirmPassword' && input.value !== document.getElementById('password').value) isValid = false;
        }

        if (!isValid) group.classList.add('invalid');
    });

    return isValid;
}

// --- CẬP NHẬT GIAO DIỆN ---
function updateUI() {
    // Ẩn/hiện các bước
    steps.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentStep - 1);
    });

    // Cập nhật Progress Bar
    circles.forEach((c, idx) => {
        c.classList.toggle('active', idx < currentStep);
    });
    const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = progressWidth + '%';

    // Cập nhật Nút bấm
    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    if (currentStep === totalSteps) {
        nextBtn.innerText = "Gửi đăng ký";
        showSummary();
    } else {
        nextBtn.innerText = "Tiếp theo";
    }
}

// --- HIỂN THỊ TÓM TẮT Ở BƯỚC 3 ---
function showSummary() {
    const summary = document.getElementById('summary-data');
    summary.innerHTML = `
        <p><b>Họ tên:</b> ${document.getElementById('fullname').value}</p>
        <p><b>Ngày sinh:</b> ${document.getElementById('dob').value}</p>
        <p><b>Giới tính:</b> ${document.getElementById('gender').value}</p>
        <p><b>Email:</b> ${document.getElementById('email').value}</p>
    `;
}

// --- SỰ KIỆN ---
nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        if (validateStep(currentStep)) {
            currentStep++;
            updateUI();
        }
    } else {
        alert("🎉 Đăng ký thành công!");
        location.reload();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
});

// Xóa lỗi khi người dùng nhập lại
form.addEventListener('input', (e) => {
    e.target.parentElement.classList.remove('invalid');
});

updateUI(); // Khởi tạo lần đầu