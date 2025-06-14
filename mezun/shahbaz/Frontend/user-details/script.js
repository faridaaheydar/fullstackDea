
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("🔒 Giriş tələb olunur. Zəhmət olmasa əvvəlcə login olun.");
        window.location.href = "../Login/index.html";
        return;
    }

    try {
        const res = await fetch("http://localhost:8082/user/my-info", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (res.ok) {
           
            const infoContainer = document.querySelector('.user-info');
            infoContainer.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
          
                <p><strong>Email:</strong> ${data.email}</p>
            `;
        } else {
            alert("❌ Məlumat alınarkən xəta baş verdi: " + (data.message || "Token etibarsızdır."));
            window.location.href = "../Login/index.html";
        }
    } catch (err) {
        console.error(err);
        alert("❌ Serverə qoşulmaq mümkün olmadı");
    }
});

