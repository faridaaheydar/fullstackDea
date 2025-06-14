document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        address: document.getElementById("address").value
    };

    const response = await fetch("http://localhost:8084/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Account created successfully!");
          window.location.href = "../Login/Login.html";

    } else {
        alert("Something went wrong. Try again.");
    }
});
