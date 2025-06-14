document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert("Zəhmət olmasa, əvvəlcə daxil olun!");
        window.location.href = '/login.html';
        return;
    }

    fetch('http://localhost:8025/user/details', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                console.log("User details:", data);


                document.getElementById('NameId').textContent = data.name || "Name not found";
                document.getElementById('em').textContent = data.email || "Email not found";
                document.getElementById('usn').textContent = data.username || "Username not found";
            } catch (err) {
                console.error("Parsing error, raw response text:", text);
                alert("İstifadəçi məlumatı alınmadı");
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            alert(error.message);
        });
});

function changeToPsPage3(){
    window.location.href="/html/Mycomputer.html"
}