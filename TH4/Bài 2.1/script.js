const form = document.getElementById('regForm');

// Tiện ích hiển thị lỗi
const showError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const parent = input ? input.parentElement : document.getElementById(fieldId + '-area');
    const errorSpan = parent.querySelector('.error-msg');
    parent.classList.add('error');
    if (errorSpan) errorSpan.innerText = message;
};

const clearError = (fieldId) => {
    const input = document.getElementById(fieldId);
    const parent = input ? input.parentElement : document.getElementById(fieldId + '-area');
    parent.classList.remove('error');
};

// --- CÁC HÀM VALIDATE RIÊNG BIỆT ---

const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ]+[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/i;
    if (val.length < 3 || !regex.test(val)) {
        showError('fullname', "Tên phải ít nhất 3 ký tự và chỉ chứa chữ cái");
        return false;
    }
    clearError('fullname');
    return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
        showError('email', "Email không đúng định dạng (name@domain.com)");
        return false;
    }
    clearError('email');
    return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!regex.test(val)) {
        showError('phone', "SĐT phải gồm 10 chữ số và bắt đầu bằng số 0");
        return false;
    }
    clearError('phone');
    return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) {
        showError('password', "Mật khẩu ≥ 8 ký tự, có 1 hoa, 1 thường, 1 số");
        return false;
    }
    clearError('password');
    return true;
};

const validateConfirmPassword = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm === "" || confirm !== pass) {
        showError('confirmPassword', "Mật khẩu xác nhận không khớp");
        return false;
    }
    clearError('confirmPassword');
    return true;
};

const validateGender = () => {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
        document.getElementById('gender-area').classList.add('error');
        return false;
    }
    document.getElementById('gender-area').classList.remove('error');
    return true;
};

const validateTerms = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) {
        document.getElementById('terms').parentElement.classList.add('error');
        return false;
    }
    document.getElementById('terms').parentElement.classList.remove('error');
    return true;
};

// --- GẮN SỰ KIỆN (EVENTS) ---

// Realtime validation (Blur)
document.getElementById('fullname').addEventListener('blur', validateFullname);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('password').addEventListener('blur', validatePassword);
document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);

// Xóa lỗi khi gõ (Input)
form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.name === 'gender') {
            document.getElementById('gender-area').classList.remove('error');
        } else if (input.id === 'terms') {
             input.parentElement.classList.remove('error');
        } else {
            clearError(input.id);
        }
    });
});

// Xử lý Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Sử dụng toán tử bitwise & để ép tất cả các hàm validate phải chạy
    // (nhằm hiển thị tất cả lỗi cùng lúc cho người dùng)
    const isValid = validateFullname() & 
                    validateEmail() & 
                    validatePhone() & 
                    validatePassword() & 
                    validateConfirmPassword() & 
                    validateGender() & 
                    validateTerms();

    if (isValid) {
        document.getElementById('form-container').style.display = 'none';
        const welcome = document.getElementById('success-msg');
        welcome.style.display = 'block';
        document.getElementById('welcome').innerText = `Đăng ký thành công! Chào ${document.getElementById('fullname').value}`;
    }
});