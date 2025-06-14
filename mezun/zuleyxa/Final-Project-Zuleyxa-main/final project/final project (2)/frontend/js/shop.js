
async function loadProducts() {
  const productsContainer = document.getElementById('Products');
  productsContainer.innerHTML = '';


  const url = 'https://dummyjson.com/products/category/laptops';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();

    const products = data.products;


    products.forEach(product => {
      productsContainer.appendChild(createProductDiv({
        name: product.title,
        price: product.price,
        image: fixImagePath(product.thumbnail)
      }));
    });


    addStaticProducts(productsContainer);


    addCartButtonsListener();

  } catch (error) {
    console.error('Error loading products:', error);
  }
}


function addStaticProducts(container) {
  const staticProducts = [
    { name: 'ASUS Everyday Laptop', price: 1100, image: '/img/laptop-min.png' },
    { name: 'Lenovo Tab M10 HD (2nd Gen)', price: 900, image: '/img/Tablet.jpg' },
    { name: 'Redragon Gaming Keyboard', price: 200, image: '/img/klav.jpg' },
    { name: 'Black Bluetooth Headphones', price: 99, image: '/img/qlq.png' }
  ];

  staticProducts.forEach(prod => {
    container.appendChild(createProductDiv(prod));
  });
}


function createProductDiv(product) {
  const div = document.createElement('div');
  div.className = 'ProductDiv';

  div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="Image2">
      <p>${product.name}</p>
      <p>${product.price}$</p>
      <button class="blackButton">add to cart</button>
  `;

  return div;
}

function fixImagePath(imagePath) {
  if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
    return '/img/' + imagePath;
  }
  return imagePath;
}


function addCartButtonsListener() {
  const buttons = document.querySelectorAll('.blackButton');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productDiv = e.target.closest('.ProductDiv');
      const name = productDiv.querySelector('p').textContent;
      const priceText = productDiv.querySelectorAll('p')[1].textContent;
      const price = parseFloat(priceText.replace('$', ''));
      const image = productDiv.querySelector('img').src;

      addToCart({ name, price, image });
    });
  });
}


function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

window.loadProducts = loadProducts;

function Click1(){
  window.location.href='/html/ProductPage.html'
}