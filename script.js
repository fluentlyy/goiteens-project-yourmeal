let itemsArray = [];
let itemsQuantity = document.querySelector(".items__quantity");
let cartList = document.querySelector(".cart__items");
let totalPriceElement = document.querySelector(".price");

let totalPrice = 0;
function addToCart(cardId) {
  let card = document.getElementById(cardId);
  let cardName = card.querySelector(".card__name").textContent;
  let cardWeight = card.querySelector(".card__weight").textContent;
  let cardPrice = parseInt(
    card.querySelector(".card__price").textContent.replace("₴", "")
  );
  let cardImage = card.querySelector(".card__img").src;

  let existingItem = itemsArray.find((item) => item.id === cardId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    itemsArray.push({
      id: cardId,
      name: cardName,
      weight: cardWeight,
      price: cardPrice,
      image: cardImage,
      quantity: 1,
    });
  }

  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";

  itemsArray.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");

    cartItem.innerHTML = `
    <img class='cart__item-img' src="${item.image}" alt="${item.name}" />
    <div class="cart__item-content">
      <p class="cart-item__name">${item.name}</p>
      <p class="cart-item__weight">${item.weight}</p>
      <p class="cart-item__price">${item.price}</p>
    </div>
    <div class="cart__item-quantity">
      <button onclick="changeQuantity(${item.id}, -1)" class="quantity__remove">-</button>
      <span class="quantity">${item.quantity}</span>
      <button onclick="changeQuantity(${item.id}, 1)" class="quantity__add">+</button>
    </div>
    `;

    cartList.appendChild(cartItem);
  });

  let totalItems = itemsArray.reduce((total, item) => total + item.quantity, 0);
  totalPrice = itemsArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  totalPriceElement.textContent = totalPrice + "₴";
  itemsQuantity.textContent = totalItems;

  let cartDelivery = document.querySelector(".cart__delivery");
  if (totalPrice >= 1000) {
    cartDelivery.style.display = "flex";
  } else {
    cartDelivery.style.display = "none";
  }
}

function changeQuantity(itemId, value) {
  let item = itemsArray.find((i) => i.id === itemId);
  if (item) {
    item.quantity += value;
  }
  if (item.quantity <= 0) {
    itemsArray = itemsArray.filter((i) => i.id !== itemId);
  }

  updateCart();
}

function toggleCart() {
  let cart = document.querySelector(".main__cart");
  let cartShowItems = cart.querySelector(".cart__items");
  let cartShowPrice = cart.querySelector(".total__price");
  let cartShowBut = cart.querySelector(".cart__but");
  let cartShowDelivery = cart.querySelector(".cart__delivery");
  let openCart = cart.classList.toggle("open");
  if (openCart) {
    cartShowItems.style.display = "block";
    cartShowPrice.style.display = "flex";
    cartShowBut.style.display = "block";
  } else {
    cartShowItems.style.display = "none";
    cartShowPrice.style.display = "none";
    cartShowBut.style.display = "none";
  }
  if (!openCart) {
    cartShowDelivery.style.display = "none";
  }
}

document.querySelector(".cart__title").addEventListener("click", function () {
  if (window.innerWidth <= 768) {
    toggleCart();
  }
});
