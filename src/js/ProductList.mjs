import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      const filteredProducts = this.filterProducts(products);
      this.renderList(filteredProducts);
    } catch (error) {
      console.error('Error initializing product list:', error);
    }
  }

  filterProducts(products) {
    const targetIds = ["880RR", "985RF", "985PR", "344YJ"];
    return products.filter(product => targetIds.includes(product.Id));
  }

  renderList(products) {
    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }

  extractBrand(productName) {
    if (!productName) return 'Unknown Brand';
    const brand = productName.split(' ')[0];
    return brand;
  }
}

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
  const discountPercentage = ((discountAmount / product.SuggestedRetailPrice) * 100).toFixed(1);

  return `
    <li class="product-card ${isDiscounted ? 'discounted' : ''}">
      <a href="/product_pages/index.html?id=${product.Id}">
        ${isDiscounted ? `<span class="sale-flag">SALE</span>` : ''}
        <img src="${product.Image}" alt="${product.Name}" class="product-image"/>
        <h3 class="card__brand">${product.Brand?.Name || 'Brand not available'}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        
        ${isDiscounted ? 
          `<p class="original-price">Was: $${product.SuggestedRetailPrice.toFixed(2)}</p>` 
          : ''
        }
        
        <p class="product-card__price">Now: $${product.FinalPrice.toFixed(2)}</p>

        ${isDiscounted ? 
          `<p class="discount-tag">Save $${discountAmount.toFixed(2)} (${discountPercentage}%)</p>` 
          : ''
        }
      </a>
    </li>
  `;
}

/*
return `
<li class="product-card ${isDiscounted ? "discounted" : ""}">
  <a href="/product_pages/index.html?id=${product.Id}">
    <img src="${product.Image}" alt="${product.Name}" class="product-image" />
    <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">
      ${isDiscounted ? `<span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>` : ""}
      $${product.FinalPrice.toFixed(2)}
    </p>
  </a>
</li>
`;
}
*/