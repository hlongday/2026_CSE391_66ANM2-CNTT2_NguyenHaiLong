// 1. Khởi tạo mảng lưu trữ dữ liệu
let students = [];
let sortType = 0; // 0: mặc định, 1: tăng dần, 2: giảm dần

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

// Các element mới bài 1.2
const searchInput = document.getElementById('txtSearch');
const filterRank = document.getElementById('selFilterRank');
const sortHeader = document.getElementById('sortScore');

// 2. Hàm xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm render (Cải tiến để lọc và sắp xếp)
function renderTable() {
    let keyword = searchInput.value.toLowerCase();
    let rankTarget = filterRank.value;

    // Lọc dữ liệu
    let filteredList = students.filter(student => {
        const matchName = student.name.toLowerCase().includes(keyword);
        const matchRank = (rankTarget === "Tất cả") || (getRank(student.score) === rankTarget);
        return matchName && matchRank;
    });

    // Sắp xếp dữ liệu
    if (sortType === 1) {
        filteredList.sort((a, b) => a.score - b.score);
    } else if (sortType === 2) {
        filteredList.sort((a, b) => b.score - a.score);
    }

    // Vẽ bảng
    tableBody.innerHTML = "";
    let totalScore = 0;

    if (filteredList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Không có kết quả</td></tr>';
    } else {
        filteredList.forEach((student, index) => {
            totalScore += student.score;
            const rank = getRank(student.score);
            const rowClass = student.score < 5 ? 'highlight-yellow' : '';

            // Tìm index gốc để xóa cho đúng
            const originalIndex = students.indexOf(student);

            const row = `
                <tr class="${rowClass}">
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.score.toFixed(1)}</td>
                    <td>${rank}</td>
                    <td><button class="btn-delete" data-index="${originalIndex}">Xóa</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Cập nhật thống kê dựa trên danh sách đang hiển thị
    const avg = filteredList.length > 0 ? (totalScore / filteredList.length).toFixed(2) : 0;
    summaryArea.innerHTML = `Tổng số sinh viên: ${filteredList.length} | Điểm trung bình: ${avg}`;
}

// 4. Hàm xử lý thêm sinh viên (Giữ nguyên từ 1.1)
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ name, score });
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    renderTable();
}

// --- 5. SỰ KIỆN ---

btnAdd.addEventListener('click', addStudent);

scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Event Delegation cho nút Xóa
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
});

// Sự kiện Tìm kiếm & Lọc (Bài 1.2)
searchInput.addEventListener('input', renderTable);
filterRank.addEventListener('change', renderTable);

// Sự kiện Sắp xếp khi click vào header "Điểm" (Bài 1.2)
sortHeader.addEventListener('click', () => {
    const icon = document.getElementById('sortIcon');
    if (sortType === 0 || sortType === 2) {
        sortType = 1; // Tăng dần
        icon.innerHTML = "▲";
    } else {
        sortType = 2; // Giảm dần
        icon.innerHTML = "▼";
    }
    renderTable();
});