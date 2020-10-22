'use strict';


/* cart page js */
function displayCart() {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products__wrapper');
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartItems && productContainer) {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
      let itemPrice = item.price.replace(/,/g,'').replace(/원/g, '');
            productContainer.innerHTML +=
            `
            <li class="product">
            <div class="product__image">
                <img src="${item.image}" alt="">
                <span>${item.name}</span>
            </div>
            <span class="product__price">${item.price}</span>
            <span class="product__quantity data-name="${item.name}"><i class="fas fa-arrow-alt-circle-left down" ></i> 
            <span>${item.inCart}</span> 
                <i class="fas fa-arrow-alt-circle-right up"></i></span>
            <span class="product__total">${item.inCart * itemPrice}원</span>
            <button type="button" class="product__delete"> <i class="fas fa-times"></i>
            </button>  
        </li>
            `;
        });
        productContainer.innerHTML += 
        `
        <div class="total__container">
            <span> Total price : </span>
            <h4> ${cartCost}원 </h4>
        </div>    
        `;
    } else if(cartItems==null){
      productContainer.innerHTML = 
      `
      <div class="no-data">
          <span> 장바구니에 담긴 상품이 없습니다. </span>
      </div>
      `;
  
    }
    // let increase = document.querySelector('.product__quantity');
    // increase.addEventListener('click', (e) =>{
    //   onChangeQuantity(e); 
    // });
  
  }
  
  displayCart();
  
const cartCount = document.querySelector('.cart__count');
let cartNumbers = localStorage.getItem('cartNumbers');
cartNumbers=parseInt(cartNumbers);
if(cartNumbers > 0) {
  cartCount.textContent=cartNumbers;
}else {
  cartCount.textContent=0;
}