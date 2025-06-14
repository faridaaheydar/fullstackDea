document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const profileIcon = document.getElementById("profileIcon");
  const authLinks = document.getElementById("authLinks");

  if (token) {
    profileIcon.style.display = "inline";
    authLinks.style.display = "none";
  } else {
    profileIcon.style.display = "none";
    authLinks.style.display = "inline";
  }
});
