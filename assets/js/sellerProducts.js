const cardsGrid = document.querySelector(".products-grid");

fetch("http://127.0.0.1:5500/assets/json/products.json")
  .then((resp) => resp.json())
  .then((data) => {
    for (let i = 0; i < data.length - 1; i++) {
      cardsGrid.innerHTML += `<div class="card">
            <div class="card-img">
              <img src="${data[i].img}" alt="" />
            </div>
            <h2 class="card-header">${data[i].name}</h2>
            <div class="card-desc">
              <span class="price">$${data[i].price}.00</span>
            </div>
          </div>`;
    }
  });

const loggedIn = localStorage.getItem("loggedIn");

const profImg = document.querySelector(".profile-img");

if (loggedIn === "true") {
  profImg.src = "./assets/images/channels4_profile.jpg";
} else {
  profImg.src = "./assets/images/default-profile-pic.jpg";
}

const signUpBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");

const askSignUp = document.querySelector("dialog.ask-signup");
const dialogLoginBtn = document.getElementById("dialog-login-btn");

signUpBtn.addEventListener("click", () => {
  sessionStorage.setItem("openSignUp", true);
  window.location.href = "index.html";
}
);

loginBtn.addEventListener("click", () => {
  sessionStorage.setItem("openLogin", true);
  window.location.href = "index.html";
});

const logout = document.querySelector("#logout-btn");

logout.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "index.html";
});

const sellBtn = document.querySelector(".sell-btn");
sellBtn.addEventListener("click", () => {
  if (loggedIn === "true") {
    window.location.href = "myproducts.html";
  } else {
    askSignUp.showModal();
    dialogLoginBtn.focus();
  }
});
dialogLoginBtn.addEventListener("click", () => {
  askSignUp.close();
  sessionStorage.setItem("openLogin", true);
  window.location.href = "index.html";
});

const dialogCancelBtn = document.getElementById("dialog-cancel-btn");
dialogCancelBtn.addEventListener("click", () => {
  askSignUp.close();
});