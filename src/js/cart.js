import { updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const productList = document.querySelector(".product-list");

  if (!productList) {
    Error("Product list container not found!");
    return;
  }

  // If the cart is empty, show a message
  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  // Map cart items to HTML
  const htmlItems = cartItems.map(
    (item) => `
    <li class="cart-card">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors ? item.Colors[0]?.ColorName : "N/A"}</p>
      <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
      <button class="remove-item" data-id="${item.Id}">X</button>
    </li>
  `,
  );

  // Inject the HTML into the product list
  productList.innerHTML = htmlItems.join("");

  // Attach event listeners to the "X" buttons
  const removeButtons = productList.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.dataset.id;
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const updatedCart = cartItems.filter((item) => item.Id !== itemId);

  localStorage.setItem("so-cart", JSON.stringify(updatedCart));

  renderCartContents(); // Re-render the cart items
  updateCartCount(); // Update the cart count
  updateCartTotal(); // Update the total price
}

function updateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartFooterElement = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector("#cart-total-amount");

  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0,
    );
    cartTotalElement.textContent = total.toFixed(2); // Update the total price
    cartFooterElement.classList.remove("hide");
  } else {
    cartFooterElement.classList.add("hide");
  }
}

// Initial call to render the cart when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  updateCartCount();
  updateCartTotal();
});
