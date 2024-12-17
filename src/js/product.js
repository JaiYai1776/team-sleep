import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Get the product ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
/* function renderProductListing(products) {
  const productList = document.querySelector(".product-list");
  if (!productList) {
    Error("Product list container not found!");
    return;
  }

  productList.innerHTML = products
    .map((product) => {
      const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
      const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
      const discountPercentage =
        (discountAmount / product.SuggestedRetailPrice) * 100;

      return `
        <div class="product-card ${isDiscounted ? "discounted" : ""}">
          ${isDiscounted ? `<div class="sale-flag">ON SALE</div>` : ""}
          <h2>${product.Name}</h2>
          <img src="${product.Image}" alt="${product.Name}" />
          <p>Price: $${product.FinalPrice.toFixed(2)}</p>
          ${
            isDiscounted
              ? `<p class="discount-tag">
                   Save $${discountAmount.toFixed(2)} (${discountPercentage.toFixed(1)}%)
                 </p>`
              : ""
          }
          <a href="product.html?id=${product.Id}">View Details</a>
        </div>
      `;
    })
    .join("");
}
*/
// Function to render the product details

async function renderProductDetail() {
  const productDetailElement = document.getElementById("product-detail");

  if (!productId) {
    productDetailElement.innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);

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
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    `;
    productDetailElement.innerHTML = productDetailHtml;

    // Attach event listener for "Add to Cart" button
    document.getElementById("addToCart").addEventListener("click", () => {
      addToCart(product);
    });
  } catch (error) {
    productDetailElement.innerHTML = `<p>Error loading product details. Please try again later.</p>`;
  }
}

// Function to add a product to the cart// Function to add a product to the cart
function addToCart(product) {
  let cart = getLocalStorage("so-cart") || [];

  // Check if the product already exists in the cart
  const existingItem = cart.find((item) => item.Id === product.Id);
  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1; // Increment quantity
  } else {
    cart.push({ ...product, Quantity: 1 }); // Add new item with Quantity = 1
  }

  // Save the updated cart to localStorage
  setLocalStorage("so-cart", cart);

  // Update the cart count and display the confirmation message
  updateCartCount();
  displayAddToCartMessage();
}

// Render product details on page load
renderProductDetail();

function displayAddToCartMessage() {
  const message = document.createElement("div");
  message.className = "add-to-cart-message";
  message.textContent = "Item added to cart!";

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}
