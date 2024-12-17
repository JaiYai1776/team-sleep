import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Get the product ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function renderProductDetail() {
  const productDetailElement = document.getElementById("product-detail");

  if (!productId) {
    productDetailElement.innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    const products = await dataSource.getData();
    const product = products.find((item) => item.Id === productId);

    if (!product) {
      productDetailElement.innerHTML = `<p>Product not found.</p>`;
      return;
    }

    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
    const discountPercentage =
      (discountAmount / product.SuggestedRetailPrice) * 100;

    const productDetailHtml = `
      <h1>${product.Name}</h1>
      <img src="${product.Image}" alt="${product.Name}" />
      <p>${product.DescriptionHtmlSimple}</p>
      <p>Price: $${product.FinalPrice.toFixed(2)}</p>
      ${
        isDiscounted
          ? `<p class="discount-indicator">
              You save: $${discountAmount.toFixed(2)} (${discountPercentage.toFixed(1)}%)!
             </p>`
          : ""
      }
      <button id="addToCart" class="add-to-cart-button" data-id="${product.Id}">Add to Cart</button>
    `;

    productDetailElement.innerHTML = productDetailHtml;

    document.getElementById("addToCart").addEventListener("click", () => {
      addToCart(product);
    });
  } catch (error) {
    productDetailElement.innerHTML = `<p>Error loading product details. Please try again later.</p>`;
  }
}

function addToCart(product) {
  let cart = getLocalStorage("so-cart") || [];

  const existingItem = cart.find((item) => item.Id === product.Id);
  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    cart.push({ ...product, Quantity: 1 });
  }

  setLocalStorage("so-cart", cart);
  updateCartCount();
  displayAddToCartMessage();
}

function displayAddToCartMessage() {
  const message = document.createElement("div");
  message.className = "add-to-cart-message";
  message.textContent = "Item added to cart!";

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

renderProductDetail();
