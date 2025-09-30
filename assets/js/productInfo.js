const shoes = {
  Jordan5: "1",
  Supernal: "2",
  Adidas: "3",
  LowOne: "4",
};

const preview = document.querySelector(".img-preview-container img");

const views = document.querySelectorAll(".view img");

const shoeId = shoes[sessionStorage.getItem("selected")];

const clickedItem = sessionStorage.getItem("shoe");

const clickedItemPrice = sessionStorage.getItem("shoe-price");
if (clickedItemPrice) {
  document.querySelector(
    ".product-info .prod-price"
  ).innerText = `$${clickedItemPrice}.00`;
  sessionStorage.removeItem("shoe-price");
}

if (clickedItem) {
  preview.src = clickedItem;
  views.forEach((view, index) => {
    view.src = clickedItem;
    view.style.transform = `rotate(${index * 90}deg)`;
    view.addEventListener("mouseover", () => {
      preview.src = view.src;
      preview.style.transform = `rotate(${index * 90}deg)`;
      preview.parentElement.style.overflow = "hidden";
      if (index === 1 || index === 3) {
        preview.style.transform = `rotate(${index * 90}deg) scale(0.65)`;
      }
    });
  });
} else {
  preview.src = `./assets/images/Single Product Images/shoe${shoeId}.jpg`;
  views.forEach((view, index) => {
    view.src = `./assets/images/Single Product Images/sh${shoeId}-v${
      index + 1
    }.jpg`;
    view.addEventListener("mouseover", () => {
      preview.src = view.src;
    });
  });
}

const shoeNames = document.querySelectorAll(
  ".breadcrumbs .shoe-name,.product-name .shoe-name"
);

const shoeBrand = sessionStorage.getItem("brand");
if (shoeBrand) {
  shoeNames.forEach((shoe) => {
    shoe.innerText = shoeBrand;
  });
}

const likeHearts = document.querySelectorAll(".like-hearts");
likeHearts.forEach((heart) => {
  const imgs = heart.querySelectorAll("img");
  heart.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (isLoggedIn !== "true") {
      askSignUp.showModal();
      dialogLoginBtn.focus();
      return;
    }

    imgs.forEach((img) => {
      img.classList.remove("active");
    });
    heart.classList.toggle("active");
    const targetImg = heart.classList.contains("active") ? imgs[1] : imgs[0];
    targetImg.classList.toggle("active");
  });
});

const shoeCards = document.querySelectorAll(".card-item");

shoeCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    sessionStorage.setItem("selected", card.dataset.item);
    sessionStorage.removeItem("shoe");
    sessionStorage.setItem("brand", card.querySelector("img").alt);
    sessionStorage.setItem(
      "shoe-price",
      card.querySelector(".price").innerText.slice(1).split(".")[0]
    );
    window.location.href = "./product-info.html";
  });
});

const isLoggedIn = localStorage.getItem("loggedIn");

const profileDD = document.querySelector(".profile .dropdown-caret");

const loginDD = document.querySelector(".prof-dd.login");
const logoutDD = document.querySelector(".prof-dd.logout");

profileDD.addEventListener("click", (e) => {
  if (isLoggedIn === "true") {
    logoutDD.classList.toggle("active");
    loginDD.classList.remove("active");
  } else {
    loginDD.classList.toggle("active");
    logoutDD.classList.remove("active");
  }
});

const profDDns = document.querySelectorAll(".prof-dd");

document.addEventListener("click", (e) => {
  if (!loginDD.contains(e.target) && e.target !== profileDD) {
    loginDD.classList.remove("active");
  }
  if (!logoutDD.contains(e.target) && e.target !== profileDD) {
    logoutDD.classList.remove("active");
  }
});
const profImg = document.querySelector(".profile-img");

if (isLoggedIn === "true") {
  profImg.src = "./assets/images/channels4_profile.jpg";
} else {
  profImg.src = "./assets/images/default-profile-pic.jpg";
}

const signUpBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");

signUpBtn.addEventListener("click", () => {
  sessionStorage.setItem("openSignUp", true);
  window.location.href = "index.html";
});

loginBtn.addEventListener("click", () => {
  sessionStorage.setItem("openLogin", true);
  window.location.href = "index.html";
});

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "index.html";
});

const askSignUp = document.querySelector(".ask-signup");
const dialogLoginBtn = document.querySelector("#dialog-login-btn");
const dialogCancelBtn = document.querySelector("#dialog-cancel-btn");

const sellBtn = document.querySelector(".sell-btn");
sellBtn.addEventListener("click", () => {
  if (isLoggedIn === "true") {
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
dialogCancelBtn.addEventListener("click", () => {
  askSignUp.close();
});

const prodBuyBtn = document.querySelector(".main-content .buy-btn");

prodBuyBtn.addEventListener("click", () => {
  if (isLoggedIn === "true") {
    window.location.href = "chats-page.html";
  } else {
    askSignUp.showModal();
    dialogLoginBtn.focus();
  }
});

const sellerInfoTriggers = document.querySelectorAll(
  ".manfr-logo, .manfr-name"
);

sellerInfoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    window.location.href = "seller-products.html";
  });
});
