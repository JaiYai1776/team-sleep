import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function loadCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartElement = document.querySelector(".product-list");

  if (!cartElement) {
    console.error("Cart container not found!"); // eslint-disable-line no-console
    return;
  }

  if (cartItems.length === 0) {
    cartElement.innerHTML = "<p>Your cart is empty.</p>";
    updateOrderTotal(0);
    return;
  }

  cartElement.innerHTML = ""; // Clear previous cart items

  let cartTotal = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.FinalPrice * item.Quantity;
    cartTotal += itemTotal;

    const cartItemHtml = `
      <li class="cart-card divider">
        <a href="/product_pages/index.html?id=${item.Id}" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" class="product-image" />
        </a>
        <a href="/product_pages/index.html?id=${item.Id}">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__price">$${item.FinalPrice.toFixed(2)} x ${item.Quantity}</p>
        <p class="cart-card__quantity">Quantity: ${item.Quantity}</p>
        <p class="cart-item__total">Item Total: $${itemTotal.toFixed(2)}</p>
        <button class="remove-item" data-id="${item.Id}">Remove</button> <!-- Remove button added -->
      </li>
    `;

    cartElement.insertAdjacentHTML("beforeend", cartItemHtml);
  });

  attachRemoveEventListeners();
  updateOrderTotal(cartTotal);
}

function attachRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Remove the item with the matching ID
  cartItems = cartItems.filter((item) => item.Id !== itemId);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cartItems);

  // Reload the cart to reflect changes
  loadCart();
  updateCartCount();
}

function updateOrderTotal(total) {
  const orderTotalElement = document.querySelector(".order-total");

  if (!orderTotalElement) {
    console.error("Order total container not found!"); // eslint-disable-line no-console
    return;
  }

  orderTotalElement.textContent = `Order Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
});
