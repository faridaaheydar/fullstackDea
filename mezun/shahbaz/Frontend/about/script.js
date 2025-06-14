document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const cartCountElement = document.querySelector('.cart-count');
    let cartItemCount = 0;

    function addToCart() {
        cartItemCount++;
        cartCountElement.textContent = cartItemCount;
        console.log(`Sepete ürün eklendi. Toplam: ${cartItemCount}`);
    }

    // Bir butona tıklayarak sepeti güncelleme örneği (HTML'de böyle bir buton yok, eklemek gerekebilir)
    // const addButton = document.getElementById('add-to-cart-button');
    // if (addButton) {
    //     addButton.addEventListener('click', addToCart);
    // }

    // Footer abone ol kutusundaki icona tıklama olayı (örnek)
    const subscribeIcon = document.querySelector('.subscribe-box .fa-paper-plane');
    const subscribeInput = document.querySelector('.subscribe-box input');

    if (subscribeIcon) {
        subscribeIcon.addEventListener('click', () => {
            const email = subscribeInput.value;
            if (email && email.includes('@')) {
                alert(`Teşekkürler, ${email} adresinizle abone oldunuz!`);
                subscribeInput.value = '';
            } else {
                alert('Geçerli bir e-posta adresi giriniz.');
            }
        });
    }

    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.style.outline = '1px solid var(--primary-color)';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.style.outline = 'none';
        });
    }
});