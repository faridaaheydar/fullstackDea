function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showMessage(text, type = 'success') {
    const box = document.getElementById('messageBox');
    box.textContent = text;
    box.className = `alert-box alert-${type}`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !phone || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        showMessage('Your message has been sent successfully!', 'success');

        form.reset();
    });
});
function changeToPsPage() {
    window.location.href = "/html/shop.html"
}

const token = localStorage.getItem("jwtToken");
if (token) {
    document.getElementById("signup").style.display = "inline";
    document.getElementById("btn-logout").style.display = "inline";
    document.getElementById("lastli").style.display = "inline";
    document.getElementById("seller-label").innerText += "logged";
  } else {
    document.getElementById("btn-logout").style.display = "none";
    document.getElementById("lastli").style.display = "none";

  }