document.getElementById("addBtn").addEventListener("click", () => {
    window.location.href = '../new-product/index.html';
  });

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in.");
    window.location.href = "../Login/Login.html";
    return;
  }

  fetch("http://localhost:8082/product/my-products", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("productGrid");
      const products = data.productList || [];

      if (products.length === 0) {
        container.innerHTML = `<p>No products found.</p>`;
        return;
      }

      container.innerHTML = `
        <table class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td><img src="${p.imageUrl}" alt="${p.name}" style="width: 60px; height: auto;"></td>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>
                <td>
  <button class="btn btn-sm btn-warning me-2" onclick="openEditModal(${p.id}, '${p.name}', '${p.price}', '${p.description}', '${p.imageUrl}', '${p.categoryId || ''}')">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
</td>

           
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    })
    .catch(err => {
      document.getElementById("productGrid").innerHTML = `<p class="text-danger">Error loading products</p>`;
      console.error(err);
    });
});

function openEditModal(id, name, price, description, imageUrl, categoryId) {
  document.getElementById("productModalTitle").textContent = "Edit Product";
  document.getElementById("productId").value = id;
  document.getElementById("productName").value = name;
  document.getElementById("imageUrlInput").value = imageUrl;
document.querySelector("#productModal .modal-body img").src = imageUrl;

  document.getElementById("productPrice").value = price;
  document.getElementById("productDescription").value = description;
  document.getElementById("productCategory").value = categoryId;
  
  const imageBox = document.querySelector("#productModal .modal-body img");
  imageBox.src = imageUrl;
  imageBox.alt = name;

  const productModal = new bootstrap.Modal(document.getElementById("productModal"));
  productModal.show();
}


document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const productId = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const description = document.getElementById("productDescription").value;
  const categoryId = document.getElementById("productCategory").value;

  const imageUrlInput = document.getElementById("imageUrlInput").value;
  const imageUrl = imageUrlInput.trim() === "" 
      ? document.querySelector("#productModal .modal-body img").src 
      : imageUrlInput;

  const formData = new URLSearchParams();
  formData.append("productId", productId);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("imageUrl", imageUrl); 
  formData.append("categoryId", categoryId);

  const res = await fetch("http://localhost:8082/product/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + token
    },
    body: formData
  });

  if (res.ok) {
    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
    window.location.reload();
  } else {
    alert("❌ Update failed");
  }
});

function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  const token = localStorage.getItem("token");

  fetch(`http://localhost:8082/product/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    })
    .then(() => {
      alert("✅ Product deleted successfully.");
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("❌ Delete failed.");
    });
}
