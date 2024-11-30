// script.js

let users = [];
let editingUserIndex = null;

// Hàm mở form thêm người dùng
function openAddForm() {
  document.getElementById("userForm").style.display = "flex";
  document.getElementById("formTitle").innerText = "Thêm Người Dùng";
  document.getElementById("userFormElement").reset();
  editingUserIndex = null;
}

// Hàm đóng form
function closeForm() {
  document.getElementById("userForm").style.display = "none";
}

// Hàm thêm/sửa người dùng
function submitForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  if (editingUserIndex !== null) {
    // Sửa thông tin người dùng
    users[editingUserIndex] = { username, email, role, status };
  } else {
    // Thêm người dùng mới
    users.push({ username, email, role, status });
  }

  updateUserTable();
  closeForm();
}

// Cập nhật bảng người dùng
function updateUserTable() {
  const tableBody = document.getElementById("userTable");
  tableBody.innerHTML = '';

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.status}</td>
      <td>
        <button onclick="editUser(${index})">Sửa</button>
        <button onclick="toggleUserStatus(${index})">${user.status === 'Khóa' ? 'Mở khóa' : 'Khóa'}</button>
        <button onclick="deleteUser(${index})">Xóa</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Chỉnh sửa người dùng
function editUser(index) {
  const user = users[index];

  document.getElementById("username").value = user.username;
  document.getElementById("email").value = user.email;
  document.getElementById("role").value = user.role;
  document.getElementById("status").value = user.status;

  document.getElementById("formTitle").innerText = "Sửa Người Dùng";
  document.getElementById("userForm").style.display = "flex";
  editingUserIndex = index;
}

// Khóa/Mở khóa người dùng
function toggleUserStatus(index) {
  users[index].status = users[index].status === "Khóa" ? "Kích hoạt" : "Khóa";
  updateUserTable();
}

// Xóa người dùng
function deleteUser(index) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
    users.splice(index, 1);
    updateUserTable();
  }
}

// Khởi tạo bảng người dùng ban đầu
updateUserTable();
