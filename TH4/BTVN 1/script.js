 const form = document.getElementById('regForm');
        const passInput = document.getElementById('password');
        const nameInput = document.getElementById('fullname');

        // 1. Tiện ích thông báo lỗi
        const showError = (id, msg) => {
            const parent = document.getElementById(id).closest('.form-group');
            parent.classList.add('error');
            if(msg) parent.querySelector('.error-msg').innerText = msg;
        };
        const clearError = (id) => {
            document.getElementById(id).closest('.form-group').classList.remove('error');
        };

        // 2. Đếm ký tự Họ tên
        nameInput.addEventListener('input', () => {
            const len = nameInput.value.length;
            document.getElementById('nameCount').innerText = `${len}/50`;
            clearError('fullname');
        });

        // 3. Hiện/Ẩn mật khẩu
        document.getElementById('togglePass').addEventListener('click', function() {
            const type = passInput.type === 'password' ? 'text' : 'password';
            passInput.type = type;
            this.innerText = type === 'password' ? '👁️' : '🙈';
        });

        // 4. Kiểm tra độ mạnh mật khẩu (Strength Meter)
        passInput.addEventListener('input', () => {
            const val = passInput.value;
            const bar = document.getElementById('strengthBar');
            const txt = document.getElementById('strengthText');
            let score = 0;

            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            if (val === "") {
                bar.style.width = "0%";
                txt.innerText = "";
            } else if (score <= 1) {
                bar.style.width = "33%"; bar.style.background = "#dc3545";
                txt.innerText = "Yếu"; txt.style.color = "#dc3545";
            } else if (score <= 3) {
                bar.style.width = "66%"; bar.style.background = "#ffc107";
                txt.innerText = "Trung bình"; txt.style.color = "#ffc107";
            } else {
                bar.style.width = "100%"; bar.style.background = "#28a745";
                txt.innerText = "Mạnh"; txt.style.color = "#28a745";
            }
            clearError('password');
        });

        // 5. Hàm validate chi tiết
        const vName = () => {
            const val = nameInput.value.trim();
            if (val.length < 3) { showError('fullname', "Họ tên phải ít nhất 3 ký tự"); return false; }
            clearError('fullname'); return true;
        };

        const vEmail = () => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(document.getElementById('email').value)) { 
                showError('email'); return false; 
            }
            clearError('email'); return true;
        };

        const vPass = () => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!regex.test(passInput.value)) { 
                showError('password', "Cần ít nhất 8 ký tự, 1 hoa, 1 thường, 1 số"); return false; 
            }
            clearError('password'); return true;
        };

        const vConfirm = () => {
            const confirm = document.getElementById('confirmPassword').value;
            if (confirm !== passInput.value || confirm === "") { 
                showError('confirmPassword'); return false; 
            }
            clearError('confirmPassword'); return true;
        };

        // 6. Xử lý khi Blur (Rời khỏi ô nhập)
        nameInput.onblur = vName;
        document.getElementById('email').onblur = vEmail;
        passInput.onblur = vPass;
        document.getElementById('confirmPassword').onblur = vConfirm;

        // 7. Submit Form
        form.onsubmit = (e) => {
            e.preventDefault();
            const isValid = vName() & vEmail() & vPass() & vConfirm();
            
            if (isValid) {
                document.getElementById('formBox').style.display = 'none';
                document.getElementById('success-box').style.display = 'block';
                document.getElementById('welcomeMsg').innerText = `Chào mừng ${nameInput.value}!`;
            }
        };