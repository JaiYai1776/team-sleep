export default class ProductData {
  constructor(category) {
    this.category = category;
    this.endpoint = `../json/${category}.json`;
  }

  /**
   * Fetches product data from the endpoint.
   * @returns {Array} An array of product objects.
   */
  async getData() {
    try {
      const response = await fetch(this.endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${this.endpoint}`);
      }
      const data = await response.json();
      return this.transformData(data);
    } catch (error) {
      console.error('Error loading product data:', error);
      return [];
    }
  }

  /**
   * Transforms the raw product data to ensure compatibility with the ProductList.
   * @param {Array} data - The raw product data.
   * @returns {Array} Transformed product data.
   */
  transformData(data) {
    return data.map(product => ({
      Id: product.Id,
      Name: product.Name || 'Unnamed Product',
      NameWithoutBrand: product.NameWithoutBrand || 'No name available',
      Image: product.Image || 'images/default-product.jpg',
      SuggestedRetailPrice: product.SuggestedRetailPrice || 0,
      FinalPrice: product.FinalPrice || product.SuggestedRetailPrice || 0,
      SizesAvailable: product.SizesAvailable || {},
      Colors: product.Colors || [],
      Brand: product.Brand || { Name: 'Brand not available' }, // Added Brand
      DescriptionHtmlSimple: product.DescriptionHtmlSimple || 'No description available.' // Added Description
    }));
  }
}
