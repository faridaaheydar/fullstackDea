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
const token = localStorage.getItem("token");
const apiUrl = "http://localhost:8084";


const billingForm = document.getElementById("billingForm");
const paymentForm = document.getElementById("paymentForm");
const placeOrderBtn = document.querySelector(".place-order-btn");


paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!billingForm.checkValidity() || !paymentForm.checkValidity()) {
        alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
        return;
    }

    const orderRequest = {
        customer: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value,
            zip: document.getElementById("zip").value,
            phone: document.getElementById("tel").value,
            email: document.getElementById("email").value,
        },
        payment: {
            cardNumber: document.getElementById("cardNumber").value,
            expMonth: document.getElementById("expMonth").value,
            expYear: document.getElementById("expYear").value,
            cvv: document.getElementById("cvv").value
        },
        totalAmount: parseFloat(document.getElementById("total").textContent.replace("$", "")),
        products: JSON.parse(sessionStorage.getItem("cartItems") || "[]")
    };


    if (!token) {
        alert("Zəhmət olmasa əvvəlcə daxil olun.");
        window.location.href = "../Login/index.html";
        return;
    }

    fetch(`${apiUrl}/order/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderRequest)
    })
    .then(res => {
        if (!res.ok) throw new Error("Sifariş alınmadı");
        return res.json();
    })
    .then(data => {
        alert("Sifariş uğurla tamamlandı!");
        sessionStorage.removeItem("cartItems");
        window.location.href = "/thank-you.html";
    })
    .catch(err => {
        console.error("Sifariş xətası:", err);
        alert("Sifariş zamanı xəta baş verdi.");
    });
});
