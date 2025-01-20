let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSection = document.getElementById("cart-section");

function toggleCart() {
  cartSection.classList.toggle("visible");
}

document.querySelectorAll(".btn-shop").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-name");
    const productPrice = parseFloat(button.getAttribute("data-price"));
    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <span>
                <button class="decrease" data-name="${item.name}">-</button>
                ${item.quantity}
                <button class="increase" data-name="${item.name}">+</button>
            </span>
        `;
    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Add event listeners for newly created buttons
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () =>
      decrease(button.getAttribute("data-name"))
    );
  });
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () =>
      increase(button.getAttribute("data-name"))
    );
  });
}

function decrease(productName) {
  const item = cart.find((item) => item.name === productName);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.name !== productName);
    }
    updateCart();
  }
}

function increase(productName) {
  const item = cart.find((item) => item.name === productName);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

function clearCart() {
  cart = [];
  updateCart();
}

function closeCart() {
  cartSection.classList.remove("visible");
}
