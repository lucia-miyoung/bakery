"use strict";

const loginForm = document.querySelector(".login__form");
const submitBtn = document.querySelector(".login__submit");
const inputs = document.querySelectorAll(".container input");

submitBtn.addEventListener("click", () => {
  const id = loginForm.querySelector(".id");
  const password = loginForm.querySelector(".password");
  if (id.value.trim().length === 0 || password.value.trim().length === 0) {
    alert("아이디와 비밀번호를 확인해주세요.");
    if (id.value.trim().length === 0) {
      id.focus();
    } else if (password.value.trim().length === 0) {
      password.focus();
    }
  } else {
    alert("로그인 되었습니다.");
    id.value = "";
    password.value = "";
    id.focus();
  }
});

// transform: translate(-10%, -108%) scale(0.9);

inputs.forEach((input, index) => {
  const placeholders = document.querySelectorAll(".placeholder");

  input.addEventListener("focus", () => {
    placeholders[index].style.transform = `translate(-5%, -108%) scale(0.9)`;
  });
  input.addEventListener("blur", () => {
    if (input.value.trim().length <= 0) {
      placeholders[index].style.transform = `translate(0%, 0%) scale(1)`;
    }
  });
});

const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login");
const findId = document.querySelector(".find-id");
const findPw = document.querySelector(".find-password");
const searchIdBtn = document.querySelector("#search-id");
const searchPwBtn = document.querySelector("#search-password");
const cancelBtnId = document.querySelector(".cancel-button-id");
const cancelBtnPw = document.querySelector(".cancel-button-pw");

searchIdBtn.addEventListener("click", () => {
  wrapper.style.transform = `translateX(-100%)`;
  findId.style.display = "block";
});

searchPwBtn.addEventListener("click", () => {
  wrapper.style.transform = `translateX(-100%)`;
  findId.style.display = "none";
});

cancelBtnId.addEventListener("click", () => {
  wrapper.style.transform = `translateX(0%)`;
  findId.style.display = "block";
});

cancelBtnPw.addEventListener("click", () => {
  wrapper.style.transform = `translateX(0%)`;
  findId.style.display = "none";
});
