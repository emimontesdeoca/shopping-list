/* Gloabl vars */
var sortingType = 0;

/* Gradient stuff */
var gradientTimer;
var checkbox = document.getElementById("gradientCheckbox");

checkbox.checked = true
  ? (gradientTimer = setInterval(updateGradient, 20))
  : null;

const toggleGradient = e =>
  e.checked
    ? (gradientTimer = setInterval(updateGradient, 20))
    : clearInterval(gradientTimer);

/* Table generation stuff */
function renderProductsForTable(sorting) {
  /// Borra toda la tabla
  var myNode = document.getElementsByTagName("tbody")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  var productJSON = getAllProducts();

  if (productJSON.length != 0) {
    var head = document.getElementById("head-table");
    head.setAttribute("style", "display:contents");

    switch (sorting) {
      case 0:
        productJSON.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        break;
      case 1:
        productJSON.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        productJSON.reverse();
        break;
      case 2:
        productJSON.sort(function(a, b) {
          return b.quantity - a.quantity;
        });
        break;
      case 3:
        productJSON.sort(function(a, b) {
          return b.quantity - a.quantity;
        });
        productJSON.reverse();
        break;
      case 4:
        productJSON.sort(function(a, b) {
          return b.category - a.category;
        });
        break;
      case 5:
        productJSON.sort(function(a, b) {
          return b.category - a.category;
        });
        productJSON.reverse();
        break;
      default:
        productJSON.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        break;
        break;
    }

    var tbdy = document.getElementsByTagName("tbody")[0];
    for (var i = 0; i < productJSON.length; i++) {
      var tr = document.createElement("tr");

      /*
    <th scope="row">
        <input class="form-check-input td-checkbox" type="checkbox" value="">
    </th>
    */
      var th_checkbox = document.createElement("th");
      th_checkbox.setAttribute("scope", "row");

      var checkbox = document.createElement("input");
      checkbox.className = "form-check-input td-checkbox";
      checkbox.type = "checkbox";
      checkbox.param = productJSON[i].id;
      checkbox.id = productJSON[i].id;

      th_checkbox.appendChild(checkbox);
      tr.appendChild(th_checkbox);

      /* 
    <td class="text-center-quantity">
        <span class="badge badge-dark">Critical</span>
    </td>
    */

      var td_badge = document.createElement("td");
      td_badge.className = "text-center-quantity";

      var span_badge = document.createElement("span");

      var classBadge = "";
      var classValue = "";

      switch (productJSON[i].category) {
        case 0:
          classBadge = "badge badge-light badge-outlined";
          classValue = "None";
          break;
        case 1:
          classBadge = "badge badge-info badge-outlined";
          classValue = "Low";
          break;
        case 2:
          classBadge = "badge badge-warning badge-outlined";
          classValue = "Medium";
          break;
        case 3:
          classBadge = "badge badge-danger badge-outlined";
          classValue = "High";
          break;
        case 4:
          classBadge = "badge badge-dark badge-outlined";
          classValue = "Critical";
          break;
      }
      span_badge.className = classBadge;
      span_badge.innerHTML = classValue;

      td_badge.appendChild(span_badge);
      tr.appendChild(td_badge);

      /* 
    <td class="text-center-quantity">1</td>
    */

      var td_quantity = document.createElement("td");
      td_quantity.innerHTML = productJSON[i].quantity;
      td_quantity.className = "text-center-quantity";

      tr.appendChild(td_quantity);

      /*
        <td>Agua</td>
    */

      var td_name = document.createElement("td");
      td_name.innerHTML = productJSON[i].name;

      tr.appendChild(td_name);

      /* 
    <td>
            <button type="button" class="btn btn-outline-warning " data-toggle="modal" data-target="#productModal">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button> &nbsp; &nbsp;
            <button type="button" class="btn btn-outline-danger " data-toggle="modal" data-target="#deleteModal">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </td>
    */

      var td_btns = document.createElement("td");

      var btn_edit = document.createElement("button");
      btn_edit.type = "button";
      btn_edit.className = "btn btn-outline-warning btn-separation";
      btn_edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
      btn_edit.setAttribute("data-toggle", "modal");
      btn_edit.setAttribute("data-target", "#productModal");
      btn_edit.param = productJSON[i].id;
      btn_edit.addEventListener("click", loadEditModal, false);

      var btn_delete = document.createElement("button");
      btn_delete.type = "button";
      btn_delete.className = "btn btn-outline-danger";
      btn_delete.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
      btn_delete.param = productJSON[i].id;
      btn_delete.addEventListener("click", loadDeleteModal, false);

      td_btns.appendChild(btn_edit);
      td_btns.appendChild(btn_delete);

      tr.appendChild(td_btns);

      tbdy.appendChild(tr);
    }
  } else {
    var head = document.getElementById("head-table");
    head.setAttribute("style", "display:none");

    var th_noproducts = document.createElement("td");
    th_noproducts.innerHTML =
      'No products found, click on <i class="fa fa-plus" aria-hidden="true"></i> <b>Add</b> to create a new one!';
    th_noproducts.setAttribute("colspan", "5");
    var tbdy = document.getElementsByTagName("tbody")[0];
    tbdy.appendChild(th_noproducts);
  }
  //   tbl.appendChild(tbdy);
  //   body.appendChild(tbl);
}

var togglercounter = 0;

function toggleSelectAllProduct() {
  var yourUl = document.querySelectorAll("input[type=checkbox]");
  var c = 0;
  yourUl.forEach(function(element, i) {
    if (element.id != "gradientCheckbox") {
      if (togglercounter == 0) {
        element.checked = true;
        document.getElementById("all-icon-checkbox").className =
          "fa fa-check-square-o";
      } else {
        element.checked = false;
        if (i === yourUl.length - 2) {
          c = i + 1;
          togglercounter = 0;
          document.getElementById("all-icon-checkbox").className =
            "fa fa-square-o";
        }
      }
    }
  });
  if (c == 0) {
    togglercounter++;
  }
}

function btnDeleteSelected() {
  var yourUl = document.querySelectorAll("input[type=checkbox]");
  /// Mirar todos los checkboxes activados y borrar
  yourUl.forEach(element => {
    if (element.id != "gradientCheckbox" && element.checked) {
      var id = element.param;
      deleteProduct(id);
    }
  });
  /// Renderizar la tabla de nuevo
  renderProductsForTable();
}

/* Product buttons */
function loadEditModal() {
  /// Cargar los inputs
  var modalId = document.getElementById("add_id");
  var modalQuantity = document.getElementById("add_quantity");
  var modalName = document.getElementById("add_name");
  var modalCategory = document.getElementById("add_category");
  /// Conseguir producto por ID
  var product = getProductById(this.param);
  /// Modificar los values
  modalId.value = product[0].id;
  modalQuantity.value = product[0].quantity;
  modalName.value = product[0].name;
  modalCategory.selectedIndex = product[0].category;
}

function loadDeleteModal() {
  /// Conseguir producto por ID
  var product = getProductById(this.param);
  /// Borrar producto
  deleteProduct(product[0].id);
  /// Renderizar la tabla de nuevo
  renderProductsForTable();
}

/* Modal logic */
function clearModal() {
  var modalId = (document.getElementById("add_id").value = "X");
  var modalQuantity = (document.getElementById("add_quantity").value = "6");
  var modalName = (document.getElementById("add_name").value = "");
  var modalCategory = (document.getElementById(
    "add_category"
  ).selectedIndex = 0);
}

function createOrEditProduct() {
  /// Cargar los inputs
  var modalId = document.getElementById("add_id");
  var modalQuantity = document.getElementById("add_quantity");
  var modalName = document.getElementById("add_name");
  var modalCategory = document.getElementById("add_category");
  /// Conseguir producto por ID
  var product = getProductById(modalId.value);

  if (product.length == 1) {
    var editedProduct = product[0];

    editedProduct.category = modalCategory.selectedIndex;
    editedProduct.name = modalName.value;
    editedProduct.quantity = modalQuantity.value;

    editProduct(product[0].id, editedProduct);
  } else {
    var newProduct = new Product(
      modalQuantity.value,
      modalName.value,
      modalCategory.selectedIndex
    );

    addProduct(newProduct);
  }
  /// Limpiar modal
  clearModal();
  /// Renderizar la tabla de nuevo
  renderProductsForTable();
}

function setSorting() {
  var a = document.getElementById("select_sorting");
  sortingValue = a.selectedIndex;
  renderProductsForTable(sortingValue);
}

/* Load functions */
renderProductsForTable(sortingType);
