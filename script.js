const apiUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjm7pyJBpoQZxkk-xI-VxxfBmt-A2kMPTIS2M6QjiKI94ep2a-tmr6SwgDtU0Bhz1pHDiMj4WQUj67yH3wiMO9W2qTybCEC-VotiirQgFwjwtjgooN2N3S8I3HYeNO365CMyYzpF7VipR_x1yLu8f_yhlz5seF9V8OsfbF_5a17iBSi3n5t8d1PBeHubP_S4JyqB6zDVvPI_REWGRyhE-e5pSbsgk6d1h9NEVHcEKoqpnhb98gLg7AbE24-kwM8AWpHUtJ0KaZEZC8_2rf0_VSxZtL78g&lib=MByQUU7ZBKPN1rGRndmXKfL39OhQh-6NI";

document.addEventListener("DOMContentLoaded", fetchData);
document.getElementById("dataForm").addEventListener("submit", handleSubmit);

function fetchData() {
  fetch(`${apiUrl}&action=read`)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("dataTable");
      table.innerHTML = "";
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td>
            <button class="edit-btn" onclick='editData(${JSON.stringify(row)})'>Edit</button>
            <button class="delete-btn" onclick='deleteData("${row.id}")'>Hapus</button>
          </td>
        `;
        table.appendChild(tr);
      });
    })
    .catch(err => console.error("Gagal fetch data:", err));
}

function handleSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const action = id ? "update" : "create";

  fetch(`${apiUrl}&action=${action}`, {
    method: "POST",
    body: JSON.stringify({ id, name, email }),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("dataForm").reset();
      fetchData();
    })
    .catch(err => console.error("Gagal submit:", err));
}

function editData(row) {
  document.getElementById("id").value = row.id;
  document.getElementById("name").value = row.name;
  document.getElementById("email").value = row.email;
}

function deleteData(id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    fetch(`${apiUrl}&action=delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(() => fetchData())
      .catch(err => console.error("Gagal hapus data:", err));
  }
}
