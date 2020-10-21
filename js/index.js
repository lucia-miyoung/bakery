"use strict";

const slidesBox = document.querySelector(".slides__box");
const slidesList = document.querySelector(".slides__list");
const slides = document.querySelector(".slides"); //ul
const slide = document.querySelectorAll(".slide"); //li
const slideCount = slide.length;
const slideWidth = slide[0].getBoundingClientRect().width;
// console.log(slideWidth); 1280
const slidesAllsize = slideWidth * slide.length;
slides.style.width = slidesAllsize + "px";
const prevBtn = document.querySelector(".prev__button");
const nextBtn = document.querySelector(".next__button");
const slidesPage = document.querySelector(".slides__page >ul");
let currentIdx = 0;
slides.style.transition = "0s";
let firstChild = slides.firstElementChild; //li => background-1
let lastChild = slides.lastElementChild; //li => background-5
let cloneFirst = firstChild.cloneNode(true); //li => background-1 복사본
let cloneLast = lastChild.cloneNode(true); //li => background-5 복사본
let autoTimer = undefined;
slides.appendChild(cloneFirst);
slides.insertBefore(cloneLast, firstChild);

//다음 버튼 누를때, 슬라이드 이동
// nextBtn.addEventListener("click", () => {
//   if (currentIdx < slideCount) {
//     onMoveSlide(currentIdx + 1);
//   }
//   if (currentIdx === slide.length) {
//     setTimeout(() => {
//       slides.style.transition = "0s";
//       slides.style.transform = "translateX(0px)";
//     }, 501);
//     currentIdx = 0;
//   }
// });

// //이전 버튼 누를때, 슬라이드 이동
// prevBtn.addEventListener("click", () => {
//   if (currentIdx > 0) {
//     onMoveSlide(currentIdx - 1);
//   }

//   if (currentIdx === 0) {
//     setTimeout(() => {
//       slides.style.transition = "0s";
//       slides.style.transform = "translateX(" + -1 * slidesAllsize + "px)";
//     }, 501);
//     currentIdx = slideCount;
//   }
// });

// 슬라이드 하단 페이저버튼 누를시 해당 슬라이드로 이동
// slidesPage.addEventListener("click", (e) => {
//   if (!(e.target.nodeName == "LI")) {
//     return;
//   }
//   const pageNumber = e.target.dataset.id;
//   onMoveSlide(pageNumber);
// });

/* notice */
const labelCheck = document.querySelector(
  ".notice__wrapper input[type='checkbox']"
);
const notice = document.querySelector(".notice");
const noticeCloseBtn = document.querySelector(".fa-times");

noticeCloseBtn.addEventListener("click", () => {
  const isChecked = labelCheck.checked ? true : false;
  if (!isChecked) {
    alert("체크박스를 체크해주세요.");
    return;
  }
  notice.style.display = "none";
});

// ul자식요소로 슬라이드 갯수만큼 li 생성하기
let pageNum = 1;
let pageBtn;
for (let i = 0; i < slideCount; i++) {
  pageBtn = document.createElement("li");
  pageBtn.setAttribute("class", "page__button");
  pageBtn.setAttribute("data-id", pageNum++);
  slidesPage.appendChild(pageBtn);
}

const controllBtn = document.querySelector(".slides__button");

//슬라이드에 마우스 올라갈시 자동 슬라이드 멈춤
slidesList.addEventListener("mouseenter", () => {
  onStopTimer();
});

//슬라이드에서 마우스 빠져나올시, 자동 슬라이드 다시 시작
slidesList.addEventListener("mouseleave", () => {
  startAutoSlide();
});

//자동 슬라이드 멈추는 함수
function onStopTimer() {
  clearInterval(autoTimer);
}

const menubarMenu = document.querySelector(".menubar__menu");
const menubarMenuRect = menubarMenu.getBoundingClientRect();

document.addEventListener("scroll", () => {
  if (window.scrollY > menubarMenuRect.top) {
    menubarMenu.classList.add("active");
  } else {
    menubarMenu.classList.remove("active");
  }
});

/* mid-slides  */

const midSlides = document.querySelector(".mid__slides > ul");
const midPreBtn = document.querySelector(".mid__slide__button > .prev__button");
const midNextBtn = document.querySelector(
  ".mid__slide__button > .next__button"
);
const midSlideRect = 250;
let moveIndex = 0;
let slideMargin = 20;
let midSlideCount = 11;

/* 판매하는 상품들 진열하는데, 중복되지 않게 나열하기*/
let randomArray = [];
for (let j = 0; j < midSlideCount; j++) {
  for (let k = 0; k < j; k++) {
    let random = Math.floor(Math.random() * midSlideCount) + 1;
    if (randomArray.indexOf(random) === -1) {
      randomArray.push(random);
    }
  }
}

/* mid-slide 아이템 생성하기 */
function createMidSlides(number) {
  for (let i = 0; i < number; i++) {
    midSlides.innerHTML += `
      <li class="mid__slide">
         <img src="../images/bread-${randomArray[i]}.jpg" alt="" />
      </li>
      `;
  }
}

createMidSlides(midSlideCount);



function onModeMidSlide(num) {
  midSlides.style.transform = "translateX(" + -1 * num * midWidth + "px)";
  moveIndex = num;
}
/* 이전, 다음버튼 누르면 옆으로 이동 (자동슬라이드X) */
const midWidth = midSlideRect + slideMargin;
const midSlidesSize = midSlideCount * midWidth;
midSlides.style.width = midSlidesSize + "px";

midNextBtn.addEventListener("click", () => {
  if (moveIndex < midSlideCount - 5) {
    onModeMidSlide(moveIndex + 1);
  }
});

midPreBtn.addEventListener("click", () => {
  if (moveIndex > 0) {
    onModeMidSlide(moveIndex - 1);
  }
});

//버튼 누르지 않고, 자동으로 슬라이드 넘기기
function startAutoSlide() {
  autoTimer = setInterval(() => {
    if (currentIdx < slideCount) {
      onMoveSlide(currentIdx + 1);
    }
    if (currentIdx === slide.length) {
      setTimeout(() => {
        slides.style.transition = "0s";
        slides.style.transform = "translateX(0px)";
      }, 401);
      currentIdx = 0;
    }
  }, 4000);
}

startAutoSlide();


// 슬라이드 이동하는 함수 & 페이저도 순서 맞게 함께 이동
const pager = document.querySelectorAll(".slides__page > ul li");
function onMoveSlide(number) {
  slides.style.transition = "transform 500ms ease-in";
  slides.style.transform = "translateX(" + -1 * number * slideWidth + "px)";
  currentIdx = number;

  pager.forEach((page) => {
    page.classList.remove("active");
  });
  pager[number - 1].classList.add("active");
}
onMoveSlide(1);