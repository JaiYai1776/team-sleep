import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve the cart from local storage or default to an empty array
  let currentCart = getLocalStorage("so-cart");

  // Check if the data in localStorage is an array, reset if necessary
  if (!Array.isArray(currentCart)) {
    currentCart = []; // Reset to empty array
  }

  // Add the new product to the cart
  currentCart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
