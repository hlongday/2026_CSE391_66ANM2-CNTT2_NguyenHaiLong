# BTTH03: JS nền tảng, DOM & Sự kiện

**Đối tượng:** Sinh viên chưa học lý thuyết JavaScript

---

## 1. MỤC TIÊU HỌC TẬP
Sau buổi lab, sinh viên có thể:
- Mô tả được JavaScript là gì, chạy ở đâu, khác HTML/CSS ở điểm nào.
- Viết được các đoạn JS đơn giản (Biến, toán tử, if/else, hàm).
- Thao tác với DOM (Lấy phần tử, đổi nội dung, style, lắng nghe sự kiện).
- Nhận biết thư viện jQuery.

---

## 2. CẤU TRÚC THỜI GIAN BUỔI LAB
- 03 tiết thực hành.

---

## 3. HOẠT ĐỘNG 1 (45’): GIỚI THIỆU JS & CÚ PHÁP CƠ BẢN

### 3.1. Chuẩn bị file HTML & JS
*(Sinh viên tạo file `lab-js-basic.html` và `main.js` như yêu cầu)*

### 3.2. Nhiệm vụ cho sinh viên

#### Bước 1: Mở file & Quan sát bằng Console
> **Câu hỏi:**
> - **Em thấy dòng thông báo nào trong console?**
>   - *Trả lời:* Dòng chữ "Hello from JavaScript!".
> - **Điều này cho em biết JavaScript đang làm gì khi trang web được tải?**
>   - *Trả lời:* JavaScript được trình duyệt thực thi ngay lập tức khi file HTML nạp đến thẻ `<script>`.

#### Bước 2: “JavaScript là gì?” (Tra cứu nhanh)
> **a) JavaScript chạy ở đâu?**
> - *Trả lời:* Chạy ở cả hai (Trình duyệt - Client side và Server - môi trường Node.js).
>
> **b) Vai trò của bộ ba:**
> - **HTML:** Chịu trách nhiệm về cấu trúc và nội dung (Khung xương).
> - **CSS:** Chịu trách nhiệm về định dạng và thẩm mỹ (Lớp áo).
> - **JavaScript:** Chịu trách nhiệm về hành vi và tính tương tác (Bộ não).

#### Bước 3: Thử nghiệm biến & kiểu dữ liệu trong Console
> **Câu hỏi:**
> - **Kết quả `typeof age`:** `number`
> - **Kết quả `typeof name`:** `string`
> - **Kết quả `typeof isStudent`:** `boolean`
>
> **Mô tả ngắn gọn:**
> - `number` là: Kiểu số (nguyên hoặc thập phân).
> - `string` là: Kiểu chuỗi văn bản (đặt trong ngoặc).
> - `boolean` là: Kiểu đúng/sai (`true`/`false`).

#### Bước 4: Viết đoạn script tính tuổi
> **Câu hỏi:**
> - **Dòng log hiển thị gì sau khi em sửa thông tin?**
>   - *Trả lời:* "Xin chào, mình là [Tên], năm nay mình [Tuổi] tuổi."
> - **Nếu em quên dấu `;` hoặc quên dấu `+`, điều gì xảy ra?**
>   - *Trả lời:* Trình duyệt sẽ báo lỗi **Uncaught SyntaxError** (Lỗi cú pháp).

---

## 4. HOẠT ĐỘNG 2 (40’): CẤU TRÚC ĐIỀU KHIỂN & HÀM

#### Bước 1: Đoán trước – chạy sau
> **a) Nếu `score = 9`, dự đoán:** "Giỏi"
> **b) Nếu `score = 6`, dự đoán:** "Trung bình"
>
> **So sánh thực tế:**
> - Kết quả thực tế khớp với dự đoán nếu viết đúng thứ tự `if/else`.

#### Bước 2: Mô tả lại if/else bằng lời
> - **Mô tả:** `if/else` giống như các ngã rẽ trên đường. Nếu thỏa mãn điều kiện A thì đi hướng 1, nếu không thì xét tiếp điều kiện B để đi hướng 2.

#### Bước 3: Làm việc với hàm
> **Giá trị hàm `tinhDiemTrungBinh(8, 7, 9)` trả về:** `8`
>
> **Cấu trúc một hàm:**
> - **Tên hàm:** `tinhDiemTrungBinh`
> - **Tham số:** `m1, m2, m3`
> - **Thân hàm:** Phần nằm trong `{}` thực hiện tính toán.
> - **Giá trị trả về:** Kết quả sau từ khóa `return`.

---

## 5. HOẠT ĐỘNG 3 (40’): THAO TÁC DOM & SỰ KIỆN

#### Bước 1: Đọc & giải thích
> - **`document.getElementById("status")`:** Tìm phần tử HTML thông qua ID để JS có thể tác động.
> - **Sự kiện "click":** Kích hoạt khi người dùng nhấn chuột trái vào phần tử.

#### Bước 2: Thử nghiệm nút đổi màu nền
> - **Ví dụ khác:** `document.body.style.fontSize = "20px";` (Phóng to chữ).

#### Bước 3: Xử lý sự kiện input
> - **Khác nhau:** `input` chạy liên tục khi gõ phím, `click` chỉ chạy khi bấm chuột.
> - **Xóa hết nội dung:** Ô `greeting` sẽ chỉ hiện "Xin chào, !".

#### Bước 4: Liên hệ khái niệm DOM

> **Mô tả DOM:** Là một mô hình dạng cây đại diện cho các thẻ HTML, giúp JS có thể truy cập và sửa đổi nội dung/định dạng của trang web.

---

## 6. KẾT THÚC (15’): GIỚI THIỆU JQUERY & PHẢN TƯ

### 6.1. Nhìn nhanh jQuery
> - **Giống nhau:** Đều dùng để xử lý sự kiện và DOM.
> - **Khác nhau:** jQuery viết ngắn hơn bằng ký hiệu `$()`.
> - **Ý chính về jQuery:** >   1. Viết code JavaScript nhanh và ngắn gọn hơn.
>   2. Hỗ trợ tốt các hiệu ứng và gọi dữ liệu (Ajax).