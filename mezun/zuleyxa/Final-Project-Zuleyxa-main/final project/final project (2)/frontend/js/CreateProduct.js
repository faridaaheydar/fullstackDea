document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const messageEl = document.getElementById("formMessage");
    const preview = document.getElementById("preview");

    const editData = JSON.parse(localStorage.getItem("editProduct"));

    if (editData) {
        form.setAttribute("data-id", editData.id);
        document.getElementById("brand").value = editData.brand;
        document.getElementById("model").value = editData.model;
        document.getElementById("category").value = editData.category;
        document.getElementById("description").value = editData.description;
        document.getElementById("price").value = editData.price;
        document.getElementById("rating").value = editData.rating;
        document.getElementById("image").value = editData.image;

        preview.src = editData.image;
        preview.style.display = "block";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        messageEl.textContent = "";

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            messageEl.textContent = "Please login first to create or update a product.";
            messageEl.style.color = "red";
            return;
        }

        const id = form.getAttribute("data-id");

        const productData = {
            brand: document.getElementById("brand").value.trim(),
            model: document.getElementById("model").value.trim(),
            category: document.getElementById("category").value.trim(),
            description: document.getElementById("description").value.trim(),
            price: parseFloat(document.getElementById("price").value),
            rating: parseFloat(document.getElementById("rating").value),
            image: document.getElementById("image").value.trim()
        };

        fetch(`http://localhost:8025/computers/${id ? 'update/' + id : 'add'}`, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                alert(id ? "Məhsul yeniləndi!" : "Yeni məhsul əlavə olundu!");
                localStorage.removeItem("editProduct");
                window.location.href = "/html/Mycomputer.html";
            })
            .catch(error => {
                console.error("Error:", error);
                messageEl.textContent = "Xəta baş verdi: " + error.message;
                messageEl.style.color = "red";
            });
    });

    form.addEventListener("reset", function () {
        preview.src = "";
        preview.style.display = "none";
    });

    document.getElementById("image").addEventListener("input", () => {
        const url = document.getElementById("image").value.trim();
        if (url) {
            preview.src = url;
            preview.style.display = "block";
            preview.onerror = () => {
                preview.style.display = "none";
            };
        } else {
            preview.src = "";
            preview.style.display = "none";
        }
    });
});
