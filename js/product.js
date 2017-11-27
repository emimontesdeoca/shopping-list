/// Objeto producto
function Product(quantity, name, category) {
  /// ID necesario para realizar cambios
  this.id =
    Math.random()
      .toString(36)
      .substring(7) || "a3k9ka";
  /// Cantidad
  this.quantity = quantity || 1;
  if (quantity < 0) {
    this.quantity = 1;
  }
  /// Nombre
  this.name = name || "product_" + this.id;
  /// Categoria
  this.category = category || 0;
}

const getAllProducts = () =>
  (json = JSON.parse(localStorage.getItem("products"))) == null ? [] : json;

const saveProductsJson = newJson =>
  localStorage.setItem("products", JSON.stringify(newJson));

function addProduct(product) {
  /// Releer el JSON
  var allProducts = getAllProducts();
  /// Add to json
  allProducts.push(product);
  /// Guardar el nuevo JSON
  saveProductsJson(allProducts);
}

function getProductById(id) {
  /// Releer el JSON
  var allProducts = getAllProducts();
  /// Filtramos por ID
  var product = allProducts.filter(x => x.id === id);
  /// Retornar producto
  return product;
}

/// Metodo editar producto
function editProduct(id, product) {
  /// Releer el JSON
  var allProducts = getAllProducts();
  // /// En la posicion donde se encuentra el objeto producto, cambiarlo
  allProducts.forEach(element => {
    if (element.id === product.id) {
      element.name = product.name;
      element.quantity = product.quantity;
      element.category = product.category;
    }
  });
  // allProducts[currentProduct] = product;
  /// Guardar el nuevo JSON
  saveProductsJson(allProducts);
}

function deleteProduct(id) {
  /// Releer el JSON
  var allProducts = getAllProducts();
  /// Hacer im splice en la posicion del producto y borrar 1
  allProducts.splice(id, 1);
  /// Guardar el nuevo JSON
  saveProductsJson(allProducts);
}
