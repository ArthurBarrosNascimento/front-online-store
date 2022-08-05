export async function getCategories() {
  // Implemente aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const urlFetch = await fetch(url);
  const response = await urlFetch.json();

  return response;
}

export async function getProductsFromCategoryAndQuery(categorieId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categorieId}_ID&q=${query}`;
  const urlFetch = await fetch(url);
  const response = await urlFetch.json();

  return response;
}
