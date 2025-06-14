
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.account-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const message = document.createElement("p");
        message.style.marginTop = "10px";
        message.style.fontWeight = "bold";
        form.appendChild(message);

        try {
            const res = await fetch('http://localhost:8082/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    username,
                    password
                })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);  
                message.innerText = "✅ Qeydiyyat uğurla tamamlandı!";
                message.style.color = "green";

                setTimeout(() => {
                    window.location.href = "/Login/index.html";
                }, 1000);
            } else {
                message.innerText = "❌ " + (data.message || "Qeydiyyat zamanı xəta baş verdi");
                message.style.color = "red";
            }
        } catch (err) {
            message.innerText = "❌ Serverə qoşulmaq mümkün olmadı";
            message.style.color = "red";
        }
    });
});

