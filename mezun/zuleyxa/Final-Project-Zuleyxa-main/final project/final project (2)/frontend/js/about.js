function changeToPsPage() {
  window.location.href = "/html/shop.html"
}

const token = localStorage.getItem("jwtToken");
if (token) {
  document.getElementById("signup").style.display = "inline";
  document.getElementById("btn-logout").style.display = "inline";
  document.getElementById("lastli").style.display = "inline";
  document.getElementById("seller-label").innerText += "logged";
} else {
  document.getElementById("btn-logout").style.display = "none";
  document.getElementById("lastli").style.display = "none";

}