let isZoomed = false;
function zoomToggle() {
  const img = document.getElementById('imgproduct');
  if (!isZoomed) {
    img.style.transform = 'scale(2)';
  } else {
    img.style.transform = 'scale(1)';
  }
  isZoomed = !isZoomed;
}

function changeToPsPage(){
    window.location.href="/html/shop.html"
  }
  
  