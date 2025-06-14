document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageBox = document.getElementById('registerMessage');

  fetch('http://localhost:8025/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Username or password is incorrect!');
      }
      return response.json();
    })
    .then(data => {
      console.log('Backend response data:', data);

      const token = data.access_token;
      console.log('Token:', token);

      if (token) {
        localStorage.setItem('jwtToken', token);
        messageBox.textContent = "You have successfully logged in!";
        messageBox.style.color = "green";
        setTimeout(() => window.location.href = "index.html", 1500);
      } else {
        alert("Token not received");
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      alert(error.message || "Unknown error occurred.");
    });
});



function changeToPsPage() {
  window.location.href = "/html/shop.html"
}

const token = localStorage.getItem("jwtToken");

const signup = document.getElementById("signup");
const logoutBtn = document.getElementById("btn-logout");
const lastli = document.getElementById("lastli");
const search = document.getElementById("Search11");

if (token) {
  signup.style.display = "inline";
  logoutBtn.style.display = "inline";
  lastli.style.display = "inline";
  search.innerText += "logged";

  search.style.marginLeft = "0px";

} else {
  logoutBtn.style.display = "none";
  lastli.style.display = "none";

  search.style.marginLeft = "350px";
}
