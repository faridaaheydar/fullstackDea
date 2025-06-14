const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:8084/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const message = document.getElementById('loginMessage');
    const data = await res.json();

    if (res.ok) {
      
        localStorage.setItem('token', data.token);

        message.innerText = "✅ Login successful!";
        message.style.color = "green";
window.location.href = "../Index/index.html";

    } else {
        message.innerText = "❌ " + (data.message || "Login failed");
        message.style.color = "red";
    }
});
