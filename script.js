// Open cart modal
const cart = document.querySelector("#cart");

// Add products to cart
const addToCart = document.getElementsByClassName("add-to-cart");
const productRow = document.getElementsByClassName("product-row");

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  var title = cartItem.getElementsByClassName("product-title")[0].innerText;
  var price = cartItem.getElementsByClassName("product-price")[0].innerText;

  addItemToCart(price, title);
  updateCartPrice();
}

function addItemToCart(price, title) {
  var productRow = document.createElement("div");
  productRow.classList.add("product-row");
  var productRows = document.getElementsByClassName("product-rows")[0];

  var cartRowItems = `  
<div class="d-flex w-50">  <img src="images/veg-icon.png" alt="" style="height: 20px; width: 20px" />
<p class ="product-title mb-0">${title}</p>
</div>
 <input class="product-quantity" type="number" value="1" max="10">
 <span class ="cart-price ms-2">${price}</span>
  <button class="btn text-danger"><i class="bi bi-trash3 remove-btn"></i></button>
`;

  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);

  productRow
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeItem);
  productRow
    .getElementsByClassName("product-quantity")[0]
    .addEventListener("change", changeQuantity);
  updateCartPrice();
}

// Remove products from cart
const removeBtn = document.getElementsByClassName("remove-btn");
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener("click", removeItem);
}

function removeItem(event) {
  btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartPrice();
}

// Update quantity input
var quantityInput = document.getElementsByClassName("product-quantity")[0];

for (var i = 0; i < quantityInput; i++) {
  input = quantityInput[i];
  input.addEventListener("change", changeQuantity);
}

function changeQuantity(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartPrice();
}

// Update total price
function updateCartPrice() {
  var total = 0;
  var productRows = document.getElementsByClassName("product-row");
  for (var i = 0; i < productRows.length; i++) {
    var cartRow = productRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("product-quantity")[0];
    var price = parseFloat(priceElement.innerHTML.replace("Rs. ", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    total = Math.round(total * 100) / 100;
  }
  document.getElementsByClassName("cart-quantity")[0].textContent = i++;
  document.getElementsByClassName("total-price")[0].innerText = +total;
}

// Add event listener to "Continue" button in offcanvas
const continueBtns = document.querySelectorAll(".add-to-cart");

continueBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    continueBtnClicked(event);
  });
});

function continueBtnClicked(event) {
  const clickedBtn = event.currentTarget;
  const productCard = clickedBtn.closest('.card');
  const productTitle = productCard.querySelector(".product-title").innerText;
  const selectedWeight = productCard.querySelector('input[name="weight"]:checked').value;
  const selectedWeightElement = productCard.querySelector(`input[value="${selectedWeight}"]`);
  const productPrice = selectedWeightElement.nextElementSibling.querySelector('.quantity-price').innerText;

  addItemToCart(productPrice, `${productTitle} (${selectedWeight})`);
  updateCartPrice();
}