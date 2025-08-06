// Mostrar botão de adcionar carrinho
const addButton = document.querySelectorAll(".add");
const selectQuant = document.querySelectorAll(".select-quant");
const increment = document.querySelectorAll(".increment");
const decrement = document.querySelectorAll(".decrement");
const quant = document.querySelectorAll(".quant");
const cart = document.querySelector(".thing");
const itemName = document.querySelectorAll(".item-name");
const priceItem = document.querySelectorAll(".price");
const finalPrice = document.querySelector(".final-price");
const countItems = document.querySelector('.cart-items-quant');

let quantities = Array.from(quant).map(() => 0); // inicializa um array de quantidades

let cartItens = {};

// Acionando os botãoes de Quantidade
addButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    selectQuant.forEach((select) => {
      select.classList.add("hidden");
      
      
    });

    selectQuant[index].classList.remove("hidden");
    
  });
});

// Jogando os elementos no carrinho
function addOnCart(index) {
  let line = priceItem[index].textContent.replace(",", ".").trim();
  let result = parseFloat(line) * quantities[index].toFixed(2);

  if (!cartItens[index]) {
    const template = `<div class="selected-item" data-index="${index}">
        <h3>${itemName[index].textContent}</h3>
        <div class="total-price">
          <span class="quant-product">${quantities[index]}x</span>
          <span class="product-price">$${priceItem[index].textContent}</span>
          <span class="Total">$${result}</span>
          <span class="remove">x</span>
        </div>
      </div>`;

    const parser = new DOMParser();
    const htmlText = parser.parseFromString(template, "text/html");
    const newIten = htmlText.querySelector(".selected-item");
    cart.appendChild(newIten);
    sumPrices();
    sumProducts()
    cartItens[index] = newIten;

    //removendo itens
    newIten.querySelector(".remove").addEventListener("click", () => {
      cart.removeChild(newIten);
      quantities[index] = 0;
      quant[index].textContent = "0";
      delete cartItens[index];
      sumPrices();
      sumProducts()
    });



  } else {
    const existingItem = cartItens[index];
    existingItem.querySelector(
      ".quant-product"
    ).textContent = `${quantities[index]}x`;
    existingItem.querySelector(
      ".product-price"
    ).textContent = `R$${priceItem[index].textContent}`;
    existingItem.querySelector(".Total").textContent = `R$${result}`;
    sumPrices();
    sumProducts();
  }
}

function sumPrices(){
  let total = 0;
  const allTotals = document.querySelectorAll('.Total');

  allTotals.forEach(span =>{
    let value = span.textContent
    .replace('R$', '')
    .replace('$', '')
    .replace(',', '.')
    .trim();

    total += parseFloat(value);
  })

  finalPrice.textContent = `R$${total.toFixed(2).replace('.', ',')}`
}

function sumProducts(){
  let total = 0;
  const allProducts = document.querySelectorAll('.quant-product');

  allProducts.forEach((span) =>{
    let value = span.textContent
    .replace('R$', '')
    .replace('$', '')
    .replace(',', '.')
    .trim();

    total += parseFloat(value);
  })

  countItems.textContent = `${total}`

}

// botões de aumentar e diminuir quntidade
increment.forEach((element, index) => {
  element.addEventListener("click", () => {
    quantities[index]++;
    quant[index].textContent = `${quantities[index]}`;
    addOnCart(index);
  });
});

decrement.forEach((elemento, index) => {
  elemento.addEventListener("click", () => {
    if (quantities[index] > 0) {
      quantities[index]--;
      quant[index].textContent = `${quantities[index]}`;
      addOnCart(index);
    }
  });
});

