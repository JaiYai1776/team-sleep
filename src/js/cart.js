import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems)) {
    setLocalStorage("so-cart", []);
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector(".product-list");
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

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" data-id="${item.Id}">X</button>
    </li>`;
}

function removeItemFromCart(itemId) {
  // Get the current cart from localStorage
  let cart = getLocalStorage("so-cart") || [];

  // Filter out the item with the specified ID
  cart = cart.filter((item) => item.Id !== itemId);

  // Update localStorage
  setLocalStorage("so-cart", cart);

  // Re-render the cart contents
  renderCartContents();
}

// Initial call to render the cart when the page loads
renderCartContents();
