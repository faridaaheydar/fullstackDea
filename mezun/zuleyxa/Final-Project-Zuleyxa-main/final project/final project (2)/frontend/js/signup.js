document.getElementById('myForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageBox = document.getElementById('registerMessage');


  try {
    const response = await fetch('http://localhost:8025/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageBox.textContent = "Registration completed successfully!";
      messageBox.style.color = "green";
      setTimeout(() => window.location.href = "login.html", 1500);
    } else {
      messageBox.textContent = data.message || "An error occurred.";
      messageBox.style.color = "red";
    }

  } catch (error) {
    console.error("Network error:", error);
    messageBox.textContent = "Oops! A network error occurred.";
    messageBox.style.color = "red";
  }
});

function changeToPsPage() {
  window.location.href = "/html/shop.html"
}

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFormValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      isFormValid = false;
    } else if (input.checkValidity()) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      isFormValid = false;
    }
  });

  if (isFormValid) {
    console.log("Form göndərilə bilər");
  }
});

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
