document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:8082/product/get-all")
    .then(res => res.json())
    .then(data => {
      const products = data.productList || [];
      const grid = document.querySelector(".product-grid");
      grid.innerHTML = "";

      if (products.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
      }

      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p class="price">${product.price}$</p>
          <div class="rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="far fa-star"></i> (0)
          </div>
          <button class="add-to-cart">Add to Cart</button>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
      document.querySelector(".product-grid").innerHTML = `<p style="color: red;">Server error.</p>`;
    });

  const grid = document.querySelector(".product-grid");

  grid.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const card = event.target.closest(".product-card");
    const name = card.querySelector("h3").textContent;
    const price = parseFloat(card.querySelector(".price").textContent);
    const imageUrl = card.querySelector("img").src;

    const newItem = {
      name,
      price,
      imageUrl,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === newItem.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart!");
  }
});


  const ratingStars = document.querySelectorAll('.rating-filter .stars');
  ratingStars.forEach(starsDiv => {
    starsDiv.addEventListener('click', () => {
      ratingStars.forEach(s => s.classList.remove('selected-rating'));
      starsDiv.classList.add('selected-rating');
      console.log("Selected rating:", starsDiv.children.length);
    });
  });

  const subscribeButton = document.querySelector('.subscribe-box button');
  const subscribeInput = document.querySelector('.subscribe-box input');

  subscribeButton.addEventListener('click', () => {
    const email = subscribeInput.value;
    if (email && email.includes('@') && email.includes('.')) {
      alert(`You subscribed with "${email}"`);
      subscribeInput.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });

  const mainNavLinks = document.querySelectorAll('.main-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const currentActive = document.querySelector('.main-nav a.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      e.target.classList.add('active');
    });
  });
});
