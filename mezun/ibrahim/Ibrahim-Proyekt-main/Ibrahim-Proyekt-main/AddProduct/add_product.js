document.getElementById("createProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Login required.");
    window.location.href = "../Login/Login.html";
    return;
  }

  const form = e.target;
  const data = {
    categoryId: form.category.value,
    name: form.brand.value + " " + form.model.value,
    description: form.description.value,
    price: form.price.value,
    imageUrl: form["image-url"].value
  };

  const res = await fetch("http://localhost:8084/product/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + token
    },
    body: new URLSearchParams(data)
  });

  const result = document.getElementById("resultMessage");
  if (res.ok) {
    result.textContent = "✅ Product created!";
    result.style.color = "green";
    form.reset();
  } else {
    const err = await res.text();
    result.textContent = "❌ Error: " + err;
    result.style.color = "red";
  }
});
