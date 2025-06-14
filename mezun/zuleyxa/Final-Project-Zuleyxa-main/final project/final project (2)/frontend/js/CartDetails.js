document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("orderForm");
    const successMessage = document.getElementById("successMessage");
  

    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      successMessage.style.display = "block";
      successMessage.textContent = "Order submitted successfully! Thank you for your purchase.";
      successMessage.style.backgroundColor = "#d4edda";
      successMessage.style.color = "#155724";
      successMessage.style.fontWeight = "600";
      successMessage.style.padding = "15px";
      successMessage.style.borderRadius = "5px";
      successMessage.style.textAlign = "center";
      successMessage.style.marginTop = "15px";
  
      form.reset();
  
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    });
  

    function renderCartDetails() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  

      const subtotalSpan = document.querySelector(".summary > div:nth-child(1) span:nth-child(2)");
      const shippingSpan = document.querySelector(".summary > div:nth-child(2) span:nth-child(2)");
      const totalSpan = document.querySelector(".summary > div:nth-child(3) span:nth-child(2)");
  
      let subtotal = 0;
  
      cart.forEach(item => {
        let price = parseFloat(item.price);
        let qty = parseInt(item.quantity);
        if (isNaN(price) || price < 0) price = 0;
        if (isNaN(qty) || qty < 1) qty = 1;
        subtotal += price * qty;
      });
 
      const shippingCost = subtotal > 0 ? 0 : 0;
  
      if (subtotalSpan) subtotalSpan.textContent = subtotal.toFixed(2) + "$";
      if (shippingSpan) shippingSpan.textContent = shippingCost === 0 ? "FREE" : shippingCost.toFixed(2) + "$";
      if (totalSpan) totalSpan.textContent = subtotal.toFixed(2) + "$"; 
    }
  

    renderCartDetails();
  });
  