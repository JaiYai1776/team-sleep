// Import the required modules
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs"; // Make sure ProductList is exported correctly

// Initialize the data source and product list
const dataSource = new ProductData("tents");
const productListElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, productListElement);

productList.init();
