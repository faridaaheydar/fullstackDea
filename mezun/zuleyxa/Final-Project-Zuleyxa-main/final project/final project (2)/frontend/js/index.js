$(document).ready(function () {

  $("#myCarousel").carousel();

  $(".item1").click(function () {
    $("#myCarousel").carousel(0);
  });
  $(".item2").click(function () {
    $("#myCarousel").carousel(1);
  });
  $(".item3").click(function () {
    $("#myCarousel").carousel(2);
  });

  $(".item4").click(function () {
    $("#myCarousel").carousel(3);
  });

  $(".item5").click(function () {
    $("#myCarousel").carousel(4);
  });


});


const token = localStorage.getItem("jwtToken");


if (token) {
  document.getElementById("signup").style.display = "inline";
  document.getElementById("btn-logout").style.display = "inline";
  document.getElementById("lastli").style.display = "inline";
  document.getElementById("seller-label").innerText += "logged";
} else {
  document.getElementById("signup").style.display = "inline";
  document.getElementById("btn-logout").style.display = "none";
  document.getElementById("lastli").style.display = "none";
  document.getElementById("seller-label").style.display = "none";
  document.getElementById("cart1").style.display = "none";
  document.getElementById("usicon").style.display = "none";
}

document.getElementById("btn-logout").addEventListener("click", function () {

  localStorage.removeItem("jwtToken");

});

function changeToPsPage() {
  window.location.href = "/html/shop.html"
}



function changeToPsPage2() {
  window.location.href = "/html/User details.html"
}


function changeToPsPage4() {
  window.location.href = "/html/Cart.html"
}

