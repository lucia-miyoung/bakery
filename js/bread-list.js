"use strict";

loadItem().then((products) => {
  showProducts(products);
  onClickEventProduct(products);
  onSearchProduct(products);  
});

function loadItem() {
  return fetch("./data/data.json")
    .then((response) => response.json())
    .then((json) => json.products);
}


function makeProduct(items) {
  return `<li class="item__wrap" data-type ="${items.type}">
    <a href="#" class="item">
        <div class="dessert__item">
            <img src="${items.image}"/>
        </div>
        <div class="dessert__explain">
            <span>${items.name}</span>
            <span>${items.price}</span>
        </div>
        <div class="dessert__detail">
        <button type="button" class="show__info">상세사항 </button>
        <button type="button" class="add__cart" data-name="${items.name}">장바구니 담기 </button>
        </div>
    </a>
</li>`;
}

function onShowMessageCart(items) {
    const breadItem = document.querySelector('.bread__item');
        breadItem.addEventListener('click', (e) =>{
          if(e.target.className=="add__cart") {
            alert(`${e.target.dataset.name}을/를 장바구니에 담았습니다.`);
          }
    });
}


const breadItem = document.querySelector(".bread__item");
function showProducts(items) {
  breadItem.innerHTML = items.map((item) => makeProduct(item)).join("");
  onShowMessageCart(items);
  onGoShoppingCart(items);
}

const choiceBtn = document.querySelector(".dessert__choice__list");

function onClickEventProduct(items) {
  choiceBtn.addEventListener("click", (event) => {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    onButtonItems(event, value);
  });

  const searchBtn = document.querySelector('.search__button');
  searchBtn.addEventListener('click',(event) =>{
        onSearchProduct(event, items);
  });

  const searchInput = document.querySelector(".search__input");
  searchInput.addEventListener('input', () =>{
    const searchPreview = document.querySelector('.search__preview');
    searchPreview.classList.add('open');
  });
  
  searchInput.addEventListener('keypress', (event) =>{
    if(event.key ==="Enter") {
      onSearchProduct(event, items);
    }
  });
}

function onButtonItems(event, value) {
  const itemList = document.querySelectorAll(".item__wrap");
  breadItem.classList.add("animation");

  setTimeout(() => {
    itemList.forEach((item) => {
      const itemDataset = item.dataset;
      breadItem.classList.add("animation");
      if (value === "all" || itemDataset.type === value) {
        item.classList.remove("invisible");
      } else {
        item.classList.add("invisible");
      }
    });
    breadItem.classList.remove("animation");
  }, 300);

  const dessertTitle = document.querySelectorAll(".dessert__title");
  dessertTitle.forEach((title) => {
    title.classList.remove("active");
    event.target.classList.add("active");
  });
}

function onSearchProduct(event,items) {
    const itemList =document.querySelectorAll('.item__wrap');
    const searchInput = document.querySelector(".search__input");
    const eachWords = searchInput.value.trim();
    const breadItem = document.querySelector('.bread__item');
      itemList.forEach(item => {
        const itemTitle=item.querySelector('.dessert__explain').textContent;
        if(itemTitle.indexOf(eachWords) > -1){
          item.classList.remove('invisible');
        }
        else{
          item.classList.add('invisible');
        }
       });
     
    searchInput.value='';
    searchInput.focus();
}


const searchInput = document.querySelector('.search__input');
const searchPreview = document.querySelector('.search__preview');
const previewInput = document.querySelector('.preview__input');
let idNum =0;
let createCnt =0;


/* 검색 목록 보여주기 & 삭제하기  */
function onAddSearchList(input) {
  if(input.value==='') {
    return;
  }
  previewInput.innerHTML+=
  `<li class="preview" data-id="${idNum}"><span>${input.value}</span>
  <button class="search__delete"><i class="fas fa-times" data-id="${idNum}"></i></button></li>`;
  idNum++;
  createCnt++;
}
let deleteCnt=0;
previewInput.addEventListener('click', (event) =>{
  const id = event.target.dataset.id;
    if(event.target.nodeName==='I' && id) {
      const removedItem = document.querySelector(`.preview[data-id="${id}"]`);
      removedItem.remove();
      deleteCnt++;
        if(deleteCnt === createCnt) {
          searchPreview.classList.remove('open');
        }
    }
   
});


const searchBtn = document.querySelector('.search__button');
  searchBtn.addEventListener('click',(e) =>{
    if(searchInput.value ==='') {
      alert('상품을 입력해주세요.');
      searchInput.focus();
      return;
    }
    searchInput.focus();
    searchInput.value="";
    onAddSearchList(searchInput);
});

searchInput.addEventListener('keypress', (e) =>{
  if(e.key==="Enter") {
    onAddSearchList(searchInput);
  }
});




/* 장바구니 이동 */

function onGoShoppingCart(items) {
    let carts = document.querySelectorAll('.add__cart');
    carts.forEach((cart,index) => {
        cart.addEventListener('click', () =>{
            cartNumbers(items[index]);
            totalCost(items[index]);
        })

    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart__count').textContent=productNumbers;
}

}

function cartNumbers(item) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers); // string으로 들어온거 숫자로 바꿔줌 (계산을 위해)
    localStorage.setItem('cartNumbers',1);

    /* 아무것도 없으면 NaN으로 뜨니까 제어문 작성 */
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart__count').textContent=productNumbers+1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart__count').textContent=1;
    }
    setItems(item);
}
function setItems(item) {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems); //json을 자바스크립트로 변환
    // console.log('My cartItems are' , cartItems);

    //같은값 누르면 그 속성에 1개씩 올라가기
    if(cartItems !==null) {
      item.inCart=parseInt(item.inCart); 
      if(cartItems = {
            ...cartItems,
            [item.name] : item
        })
        cartItems[item.name].inCart += 1;
    }else {
       item.inCart=parseInt(item.inCart);
        item.inCart =1;
        cartItems = {
            [item.name] : item
        }
    }
  

    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
    //stringify : 자바스트립트 값이나 객체를 json 문자열로 변환.
}

function totalCost(item){
    let itemPrice = item.price.replace(/,/g,'').replace(/원/g, '');
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null) {
        itemPrice=parseInt(itemPrice);
    cartCost=parseInt(cartCost);
     localStorage.setItem('totalCost', cartCost + itemPrice);
    }else {
     localStorage.setItem('totalCost', itemPrice);

    }
  
}

onLoadCartNumbers();

/*
function onChangeQuantity(e) {
  let cartItems = localStorage.getItem('itemsInCart');
  cartItems = JSON.parse(cartItems);
  let quantityContainer = document.querySelector('.product__quantity span');
  if(e.target.classList[2]==="down") {
    quantityContainer.textContent =
    `
    ${cartItems.inCart-1}
    `;

  }
}
*/