document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 7);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.querySelector('.days').innerText = days < 10 ? '0' + days : days;
            countdownElement.querySelector('.hours').innerText = hours < 10 ? '0' + hours : hours;
            countdownElement.querySelector('.minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            countdownElement.querySelector('.seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "EXPIRED";
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

});
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
