// 1. Khởi tạo mảng lưu trữ dữ liệu
let students = [];

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

// 2. Hàm xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm render (Vẽ lại bảng dựa trên mảng students)
function renderTable() {
    tableBody.innerHTML = "";
    let totalScore = 0;

    students.forEach((student, index) => {
        totalScore += student.score;
        const rank = getRank(student.score);
        const rowClass = student.score < 5 ? 'highlight-yellow' : '';

        const row = `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Cập nhật thống kê
    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    summaryArea.innerHTML = `Tổng số sinh viên: ${students.length} | Điểm trung bình: ${avg}`;
}

// 4. Hàm xử lý thêm sinh viên
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm vào mảng
    students.push({ name, score });

    // Reset form
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    renderTable();
}

// 5. Sự kiện khi click nút Thêm
btnAdd.addEventListener('click', addStudent);

// 6. Xử lý phím Enter tại ô nhập điểm
scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// 7. Event Delegation cho nút Xóa
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); // Xóa phần tử khỏi mảng
        renderTable(); // Vẽ lại bảng
    }
});