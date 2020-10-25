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
            <span class="product__quantity" >
            <i class="fas fa-arrow-alt-circle-left down" data-name="${item.name}"></i> 
                <span>${item.inCart}</span> 
            <i class="fas fa-arrow-alt-circle-right up" data-name="${item.name}"></i></span>
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
            <h4 class="all__total"> ${cartCost}원 </h4>
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

const cartProduct = document.querySelectorAll('.product');
let cartItems = localStorage.getItem('itemsInCart');
let cartCost = localStorage.getItem('totalCost');
let productNumbers = localStorage.getItem('cartNumbers');
cartItems =  JSON.parse(cartItems);
let eachItems;

cartProduct.forEach((product,index) => {
eachItems= Object.values(cartItems);
  product.addEventListener('click', (event) => {
    onChangeItemCount(event, index);

    })
  
});


function onChangeItemCount(event, index) {
  const quantity = event.target.parentNode.querySelector('span');  
  const eachTotal = event.target.parentNode.parentNode.querySelector('.product__total');
  const allTotal = document.querySelector('.all__total');
  cartCount.textContent=cartNumbers;
  let item = eachItems[index];
  console.log(item);
    let itemPrice = item.price.replace(/,/g,'').replace(/원/g, '');
    item.inCart = parseInt(item.inCart);
    itemPrice=parseInt(itemPrice);
    productNumbers = parseInt(productNumbers);
    cartCost=parseInt(cartCost);
    if(cartItems !==null ) {
    if(eachItems = {
      ...eachItems, [item.name] : item 
    })

    if(event.target.classList[2]==='up') {
      if(item.inCart<10) {
        eachItems[item.name].inCart += 1;
        quantity.textContent = item.inCart;
        cartCost += itemPrice;
        productNumbers += 1;
        eachTotal.textContent = `${itemPrice * item.inCart}원`;
        allTotal.textContent = cartCost + '원';
      }else {
        alert('상품당 10개까지 주문 가능합니다.');
        return;
      }
    }else if(event.target.classList[2] ==='down') {
      if(item.inCart > 1 )  {

      eachItems[item.name].inCart -= 1;
    quantity.textContent = item.inCart;
    cartCost -= itemPrice;
    
    productNumbers -= 1;
    eachTotal.textContent = `${itemPrice * item.inCart}원`;
    allTotal.textContent = cartCost + '원';
    } else {
      alert('1개 이상부터 주문 가능합니다.');
      return;
     }
    }
  
  }else {
    item.inCart = parseInt(item.inCart);
    item.inCart=1;
    cartItems = {
      [item.name] :item
    }
  }

    localStorage.setItem('itemsInCart', JSON.stringify(eachItems));
    localStorage.setItem('totalCost', cartCost);
    localStorage.setItem('cartNumbers', productNumbers);
}
