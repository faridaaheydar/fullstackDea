document.addEventListener("DOMContentLoaded", () => {
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  function calculateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    subtotalEl.textContent = `$${total.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  calculateCartTotal();
});
