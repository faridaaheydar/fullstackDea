function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tbody = document.querySelector("tbody");
    const subtotalElement = document.querySelector(".table2 tr:nth-child(1) td.td3");
    const totalElement = document.querySelector(".table2 tr:nth-child(3) td.td3");

    tbody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const price = parseFloat(item.price);
        let quantity = parseInt(item.quantity);

        if (isNaN(price) || price < 0) {

            price = 0;
        }
        if (isNaN(quantity) || quantity < 1) {

            quantity = 1;
        }

        const subtotal = price * quantity;
        total += subtotal;

        const tr = document.createElement("tr");
        tr.className = "tr1";
        tr.innerHTML = `
        <td class="td1">${item.name}</td>
        <td class="td1">${price.toFixed(2)}$</td>
        <td class="td1"><input type="number" min="1" value="${quantity}" onchange="updateQuantity(${index}, this.value)" /></td>
        <td class="td1">${subtotal.toFixed(2)}$</td>
        <td class="td1"><button class="remove-button" onclick="removeItem(${index})">Remove</button></td>
      `;
        tbody.appendChild(tr);
    });

    if (subtotalElement) subtotalElement.textContent = `${total.toFixed(2)}$`;
    if (totalElement) totalElement.textContent = `${total.toFixed(2)}$`;
}

function updateQuantity(index, newQty) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const qty = parseInt(newQty);
    cart[index].quantity = qty < 1 || isNaN(qty) ? 1 : qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

window.onload = renderCart;


function changeToPsPage6() {
    window.location.href ="/html/Cartdetails.html"
}