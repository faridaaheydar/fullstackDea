document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("table tbody");
  const apiUrl = "http://localhost:8025/computers/all";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      tableBody.innerHTML = "";
      data.forEach(computer => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${computer.id}</td>
          <td>${computer.brand}</td>
          <td>${computer.model}</td>
          <td>${computer.category}</td>
          <td><img src="${computer.image}" alt="${computer.model}" width="100"></td>
          <td>${computer.price} $</td>
          <td>${computer.rating}/5</td>
          <td>
            <button class="btnn1" onclick="editComputer(${computer.id})">Redaktə et</button>
            <button class="btnn2" onclick="deleteComputer(${computer.id})">Sil</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
      tableBody.innerHTML = `<tr><td colspan="8">Məlumat yüklənərkən xəta baş verdi.</td></tr>`;
    });
});

window.deleteComputer = function (id) {
  if (confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Silmək üçün əvvəlcə daxil olun!");
      return;
    }

    fetch(`http://localhost:8025/computers/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Delete failed");


        const row = [...document.querySelectorAll("tbody tr")]
          .find(tr => tr.children[0].textContent.trim() == id.toString());
        if (row) row.remove();

        alert("Məhsul uğurla silindi!");
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        alert("Məhsul silinərkən xəta baş verdi.");
      });
  }
};

window.editComputer = function (id) {
  fetch(`http://localhost:8025/computers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then(data => {
      localStorage.setItem("editProduct", JSON.stringify(data));
      window.location.href = "/html/CreateProduct.html";
    })
    .catch(err => {
      console.error("Error loading edit data:", err);
      alert("Redaktə üçün məlumat yüklənərkən xəta baş verdi.");
    });
};


document.getElementById("btn-logout").addEventListener("click", () => {
  localStorage.removeItem("jwtToken");
  alert("Uğurla logout oldunuz.");
  window.location.href = "/index.html";
});
