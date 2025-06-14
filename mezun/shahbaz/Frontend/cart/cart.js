document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('.cart-table tbody');
  const subtotalDisplay = document.getElementById('cart-subtotal-display');
  const totalDisplay = document.getElementById('cart-total-display');
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="product-info">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <span>${item.name}</span>
        </td>
        <td class="product-price">${item.price.toFixed(2)}$</td>
        <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}" /></td>
        <td class="product-subtotal">${subtotal.toFixed(2)}$</td>
        <td><button class="remove-item-btn" data-index="${index}">Remove</button></td>
      `;
      cartTableBody.appendChild(row);
    });

    subtotalDisplay.textContent = `${total.toFixed(2)}$`;
    totalDisplay.textContent = `${total.toFixed(2)}$`;
  }

  cartTableBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const index = e.target.getAttribute('data-index');
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems[index].quantity = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    }
  });

  cartTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
      const index = e.target.getAttribute('data-index');
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    }
  });

  loadCart();
});
  const proceedBtn = document.querySelector(".proceed-to-checkout-btn");
  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      window.location.href = "../checkout/index.html";
    });
  }
