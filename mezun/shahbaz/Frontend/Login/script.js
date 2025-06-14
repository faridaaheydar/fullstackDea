
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.account-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginMessage = document.createElement("p");
        loginMessage.style.marginTop = "10px";
        loginMessage.style.fontWeight = "bold";
        form.appendChild(loginMessage);

        try {
            const res = await fetch('http://localhost:8082/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                loginMessage.innerText = "✅ Login successful!";
                loginMessage.style.color = "green";

             
                setTimeout(() => {
                    window.location.href = "";
                }, 1000);
            } else {
                loginMessage.innerText = "❌ " + (data.message || "Login failed");
                loginMessage.style.color = "red";
            }
        } catch (err) {
            loginMessage.innerText = "❌ Serverə qoşulmaq mümkün olmadı";
            loginMessage.style.color = "red";
        }
    });
});

