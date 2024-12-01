import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    const filteredProducts = this.filterProducts(products);
    this.renderList(filteredProducts);
  }

  filterProducts(products) {
    // Filter only the four products needed based on IDs
    const targetIds = ["880RR", "985RF", "985PR", "344YJ"];
    return products.filter(product => targetIds.includes(product.Id));
  }

  renderList(products) {
    // Use the productCardTemplate function defined below
    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }
}

// Define the productCardTemplate function outside the class
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?id=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}
