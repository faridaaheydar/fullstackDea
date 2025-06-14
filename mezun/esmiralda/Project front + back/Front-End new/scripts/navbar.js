async function loadNavbar() {
  const navbarDiv = document.querySelector('.header');
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true" && username) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${username}`
      );
      if (!response.ok) {
        throw new Error("Can't get user's data");
      }

      const userData = await response.json();
      const nickname = userData.nickname || username;

      navbarDiv.innerHTML = `
        <div class="header">
          <div class="logo">E-commerce</div>
          <div class="nav-links">
            <a href="./index.html">Home</a>
            <a href="./contact.html">Contact</a>
            <a href="./about.html">About</a>
            <a href="./shop.html"><button class="shop-btn">Shop</button></a>
          </div>
          <div class="search-bar">
            <input type="text" placeholder="What are you looking for?" />
            <img src="fotolar/search.png" alt="Search" width="20" />
          </div>
          <div style="justify-content: space-between;" class="user-section d-flex align-items-center">
            <div class="mx-2">
              <a href="./cart.html"><img src="fotolar/cart.png" alt="Cart" width="20px"></a>
            </div>
            <div class="d-flex align-items-center">
              <a href="./account.html"><img src="fotolar/person.png" alt="User" width="20px"></a>
              <span>${nickname}</span>
            </div>
            <div class="mx-3">
              <button onclick="logout()" class="logout-btn">Log Out</button>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      console.error("Error in loading user's data", err);
      logout();
    }
  } else {
    navbarDiv.innerHTML = `
      <div class="header">
        <div class="logo">E-commerce</div>
        <div class="nav-links">
          <a href="./index.html">Home</a>
          <a href="./contact.html">Contact</a>
          <a href="./about.html">About</a>
          <a href="./sign up.html">Sign Up</a>
          <a href="./shop.html"><button class="shop-btn">Shop</button></a>

        </div>
        <div class="search-bar">
          <input type="text" placeholder="What are you looking for?" />
        </div>
        <div class="user-section">
          <span>Guest</span>
        </div>
        <div>
          <a href="./login.html"><button class="logout-btn">Log In</button></a>
        </div>
      </div>
    `;
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", loadNavbar);
