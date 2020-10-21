"use strict";

const inputs = document.querySelectorAll(".form-wrapper > div input[type='text']");
const passwords = document.querySelectorAll(".form-wrapper > div input[type='password']");
const inputAll =[...inputs,...passwords];
const emailInput = document.querySelector("#email-input");

inputAll.forEach((input, index) => {
  const placeholder = input.nextElementSibling;
  if (!placeholder) {
    return;
  }
  input.addEventListener("focus", () => {
    placeholder.style.transform = `translate(-10%, -102%) scale(0.8)`;
  });
  input.addEventListener("blur", () => {
    if (input.value.trim().length === 0) {
      placeholder.style.transform = `translate(0%, 0%) scale(1)`;
    }
  });
});

// 이메일 계정 선택하기
const emailDetail = document.querySelector(".email__detail");

emailInput.addEventListener("change", (e) => {
  const data = e.target.options.selectedIndex;
  const options = document.querySelectorAll("#email-input > option");
  const text = options[data].textContent;
  inputEmailDetail(text);
});

function inputEmailDetail(text) {
  if (text === "직접 입력") {
    emailDetail.removeAttribute("readonly");
    emailDetail.classList.remove("disabled");
    emailDetail.value = "";
    emailDetail.focus();
    return;
  }
  emailDetail.classList.add("disabled");
  emailDetail.setAttribute("readonly", "");
  emailDetail.value = text;
}

// file 첨부 & 미리보기
const inputFile = document.querySelector("#profile__insert");
const preview = document.querySelector(".profile> img");
const deleteBtn = document.querySelector(".profile__delete");

inputFile.addEventListener("change", (event) => {
  const text = event.target.files[0];
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.setAttribute("src", reader.result);
    },
    false
  );
  if (text) {
    reader.readAsDataURL(text);
  }
});

const bagicImgPath = "/images/user.png";
deleteBtn.addEventListener("click", () => {
  const check = confirm("기본이미지로 변경하시겠습니까?");
  if (!check) {
    return;
  }
  preview.setAttribute("src", bagicImgPath);
});


/* id 유효성 검사 */
const id = document.querySelector(".id");
const idValue = id.value;
const warningId = document.querySelector(".id-form .warning");
// /^[a-zA-Z0-9]{4,12}$/; 대문자도 하려면 안에 A-Z 넣어주기

function isValidated(value) {
  const valid = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return valid.test(value);
}

function warningHTML(message) {
  return `<i class="fas fa-exclamation"></i> ${message}`;
}

function successHTML() {
  return `<i class="fas fa-check" style="color: #2d96e0;"></i>`;
}

id.addEventListener("keyup", () => {
  if (id.value.length > 0) {
    if (!isValidated(id.value)) {
      warningId.innerHTML = warningHTML(
        "아이디는 영문 소문자와 숫자 조합하여 8~16자리로 입력가능합니다."
      );
      return;
    } else {
      warningId.innerHTML = successHTML();
    }
  } else {
    warningId.innerHTML = warningHTML("아이디를 입력해주세요.");
  }
});

// 비밀번호 유효성검사
const pw = document.querySelector(".password");
const pwChk = document.querySelector(".password-check");
const warningPw = document.querySelector(".pw-check-form .warning");
pw.addEventListener("keyup", () => {
  idValidatedPW();
});

function idValidatedPW() {
  if (pw.value.length === 0) {
    warningPw.innerHTML = warningHTML("비밀번호를 입력해주세요.");
  } else if (!isValidated(pw.value) || pw.value.length > 16) {
    warningPw.innerHTML = warningHTML(
      "비밀번호는 영문 소문자와 숫자 조합하여 8~16자리로 입력가능합니다."
    );
  } else if (pw.value.length !== pwChk.value.length) {
    warningPw.innerHTML = warningHTML("비밀번호가 일치하지 않습니다.");
  } else if (pwChk.value === pw.value) {
    warningPw.innerHTML = successHTML();
    return true;
  }
  return false;
}


// 휴대폰 유효성 검사
const phoneInput = document.querySelector(".phone-form .phone");
const warningPhone = document.querySelector(".phone-form .warning");

function isValidatedPhone() {
  const input = phoneInput.value.replace(/-/g, "").replace(/[\s]/g, "");
  // console.log(input);
  if (input.length === 0) {
    warningPhone.innerHTML = warningHTML("핸드폰 번호를 입력해주세요.");
  } else if (!validatePhone(input) || input.length > 11) {
    warningPhone.innerHTML = warningHTML(
      "핸드폰 번호가 유효하지 않습니다. 숫자 11자리를 입력해주세요."
    );
  } else {
    warningPhone.innerHTML = successHTML();
    return true;
  }
  return false;
}

function validatePhone(number) {
  const phoneNum = /^01\d{9}/;
  //01로 시작하는 총 11개의 숫자
  return phoneNum.test(number);
}

phoneInput.addEventListener("keyup", () => {
  isValidatedPhone();
});

phoneInput.addEventListener("blur", () => {
  const input = phoneInput.value.replace(/-/g, "").replace(/[\s]/g, "");
  phoneInput.value = input;
});



// 이메일 유효성 검사
const inputEmail = document.querySelector(".email-form .email");
const warningEmail = document.querySelector(".email-form .warning");

function isValidatedEmail(value) {
  const check = /@/g;
  const checkPattern = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,12}$/;
  if (value.length <= 0) {
    warningEmail.innerHTML = warningHTML("이메일을 입력해주세요.");
  } else if (!checkPattern.test(value)) {
    warningEmail.innerHTML = warningHTML(
      "이메일은 영문 소문자와 숫자 조합하여 8~12자리로 입력해주세요."
    );
  } else {
    warningEmail.innerHTML = successHTML();
  }
}

inputEmail.addEventListener("keyup", () => {
  isValidatedEmail(inputEmail.value);
});

//가입하기

const complete__form = document.querySelector(".signup__complete__form");
const cancelBtn = document.querySelector(".signup__cancel");
const submitBtn = document.querySelector(".signup__submit");

cancelBtn.addEventListener("click", () => {
  const back = confirm("회원가입을 취소하시겠습니까?");
  if (!back) {
    return;
  }
  location.href = "index.html";
});

submitBtn.addEventListener("click", () => {
  isValidatedAll();
});

function isValidatedAll() {
  const idInput = document.querySelector(".id");
  const pwInput = document.querySelector(".password");
  const pwChkInput = document.querySelector(".password-check");
  const nameInput = document.querySelector(".name");
  const phoneInput = document.querySelector(".phone");
  const emailInput = document.querySelector(".email");
  const emailDetailInput = document.querySelector(".email__detail");
  const addressInput = document.querySelector(".address");
  const addressDetailInput = document.querySelector(".address__detail");
  const allInput = [
    idInput,
    pwInput,
    pwChkInput,
    nameInput,
    phoneInput,
    emailInput,
    emailDetailInput,
    addressInput,
    addressDetailInput,
  ];
  let index = 0;
  allInput.forEach((all) => {
    if (all.value == "") {
      const placeholder = all.nextElementSibling;
      if (!placeholder) {
        return;
      }
      const text = placeholder.parentNode.parentNode.querySelector(".warning");
      if (text === null) {
        return;
      }
      text.innerHTML = warningHTML(
        `${placeholder.textContent}을(를) 입력해주세요.`
      );
    } else {
      index++;
      return true;
    }
  });
  if (index === allInput.length) {
    if (
      isValidated(idInput.value) &&
      isValidated(pwInput.value) &&
      isValidatedEmail(emailInput.value) &&
      isValidatedPhone(phoneInput.value)
    ) {
      alert("회원가입이 완료되었습니다.");
      location.href = "login.html";
    } 
  } else {
    alert("빈칸을 모두 입력해주세요.");
  }
}
