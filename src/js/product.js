import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Get the product ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Function to render the product details
async function renderProductDetail() {
  const productDetailElement = document.getElementById("product-detail");

  if (!productId) {
    productDetailElement.innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    // Fetch the product by ID
    const product = await dataSource.findProductById(productId);

    if (!product) {
      productDetailElement.innerHTML = `<p>Product not found.</p>`;
      return;
    }

    // Populate the product details
    const productDetailHtml = `
      <h1>${product.Name}</h1>
      <img src="${product.Image}" alt="${product.Name}" />
      <p>${product.DescriptionHtmlSimple}</p>
      <p>Price: $${product.FinalPrice}</p>
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

// Function to add a product to the cart
function addToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  alert("Product added to cart!");
}

// Render product details on page load
renderProductDetail();
