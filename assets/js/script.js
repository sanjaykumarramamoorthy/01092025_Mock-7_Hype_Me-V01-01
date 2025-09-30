const swiper = new Swiper(".shoeCardsSwiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  scrollbar: {
    el: ".shoeCardsSwiper .swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

const carousel = new Swiper(".hero-carousel", {
  slidesPerView: 1,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const hero = document.querySelector(".hero");

const header = document.querySelector(".home-header");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.remove("scrolls");
        console.log("scrolls");
        header.style.boxShadow = "none";
      } else {
        header.classList.add("scrolls");
        console.log("hides");
        header.style.boxShadow = "";
      }
    });
  },
  {
    threshold: 0.9,
  }
);

observer.observe(hero);

const signUpTriggers = document.querySelectorAll(
  ".like-hearts,#signup-link,#signup-btn"
);

const signUpWin = document.querySelector(".sign-up-slide");

const loginWin = document.querySelector(".login-slide");

const slideCloseBtns = document.querySelectorAll(".close-btn");

const backdrop = document.querySelector(".backdrop");

let isLoggedIn = "false";

if (localStorage.getItem("loggedIn") !== null) {
  if (localStorage.getItem("loggedIn") === "true") {
    isLoggedIn = "true";
    const likeHearts = document.querySelectorAll(".like-hearts");
    likeHearts.forEach((heart) => {
      const imgs = heart.querySelectorAll("img");
      heart.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        imgs.forEach((img) => {
          img.classList.remove("active");
        });
        heart.classList.toggle("active");
        const targetImg = heart.classList.contains("active")
          ? imgs[1]
          : imgs[0];
        targetImg.classList.toggle("active");
      });
    });
  } else {
    signUpTriggers.forEach((btn) => {
      btn.addEventListener("click", openSignUpWin);
    });
  }
} else {
  signUpTriggers.forEach((btn) => {
    btn.addEventListener("click", openSignUpWin);
  });
}

function openSignUpWin(e) {
  e.stopImmediatePropagation();
  signUpWin.classList.add("active");
  backdrop.classList.add("active");
  loginWin.classList.remove("active");
}

backdrop.addEventListener("click", () => {
  signUpWin.classList.remove("active");
  loginWin.classList.remove("active");
  backdrop.classList.remove("active");
});

slideCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    signUpWin.classList.remove("active");
    loginWin.classList.remove("active");
    backdrop.classList.remove("active");
  });
});

const logInTriggers = document.querySelectorAll("#login-link,#login-btn");

logInTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    loginWin.classList.add("active");
    signUpWin.classList.remove("active");
    backdrop.classList.add("active");
  });
});

const shoeCards = document.querySelectorAll(".card-item");

shoeCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
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

const chipItems = document.querySelectorAll(".chip-item");

const signupPwdViewBtns = document.querySelectorAll(".signup .pwd img");

const signupPwdInput = document.querySelector(".signup .pwd input");

signupPwdViewBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    signupPwdViewBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    if (!signupPwdViewBtns[0].classList.contains("active")) {
      signupPwdInput.setAttribute("type", "text");
    } else {
      signupPwdInput.setAttribute("type", "password");
    }
  });
});

const loginPwdViewBtns = document.querySelectorAll(".login .pwd img");

const loginPwdInput = document.querySelector(".login .pwd input");

loginPwdViewBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginPwdViewBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    if (!loginPwdViewBtns[0].classList.contains("active")) {
      loginPwdInput.setAttribute("type", "text");
    } else {
      loginPwdInput.setAttribute("type", "password");
    }
  });
});

const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const email = data.get("email");
  const password = data.get("password");
  login(email, password);
});

async function login(email, password) {
  const mailField = document.querySelector(".login-mail");
  const passField = document.querySelector(".login-pass");
  const mailErr = mailField.querySelector(".err-msg");
  const passErr = passField.querySelector(".err-msg");
  if (mailErr) {
    mailErr.remove();
  } else if (passErr) {
    passErr.remove();
  }
  try {
    const resp = await fetch("http://taskapi.devdews.com/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!resp.ok) {
      const message = await resp.json();
      throw new Error(message.messages.error);
    } else {
      document.querySelector(".loading-message").style.display = "grid";
      signUpWin.classList.remove("active");
      loginWin.classList.remove("active");
      backdrop.classList.remove("active");
      setTimeout(() => {
        document.querySelector(".loading-message").style.display = "";
        window.location.reload();
      }, 3000);
      localStorage.setItem("loggedIn", "true");
    }
  } catch (error) {
    if (error.message.includes("Email")) {
      const msg = document.createElement("span");
      msg.innerText = "Email does not exist!";
      msg.classList.add("err-msg");
      mailField.appendChild(msg);
      return;
    } else {
      const msg = document.createElement("span");
      msg.innerText = "Incorrect Password!";
      msg.classList.add("err-msg");
      passField.appendChild(msg);
    }
  }
}

async function signup(name, email, password) {
  try {
    const resp = await fetch("http://taskapi.devdews.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (!resp.ok) {
      const mailField = document.querySelector(".field.email");
      const msg = document.createElement("span");
      msg.innerText = "Email address already exists!";
      msg.classList.add("err-msg");
      mailField.appendChild(msg);
      return;
    }
    if (document.querySelector(".err-msg"))
      document.querySelector(".err-msg").remove();
    document.querySelector(".loading-message").style.display = "grid";
    signUpWin.classList.remove("active");
    loginWin.classList.remove("active");
    backdrop.classList.remove("active");
    setTimeout(() => {
      document.querySelector(".loading-message").style.display = "";
      window.location.reload();
    }, 3000);
    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error("Error:", error);
  }
}

function validateName(name) {
  const onlyLettersSpaces = /^[A-Za-z ]+$/;
  const minLength = /^.{3,}$/;
  const noEdgeSpaces = /^(?! ).*(?<! )$/;

  if (!onlyLettersSpaces.test(name)) {
    return "Name can only contain letters and spaces.";
  }

  if (!minLength.test(name)) {
    return "Name must be at least 3 characters long.";
  }

  if (!noEdgeSpaces.test(name)) {
    return "Name cannot start or end with a space.";
  }

  return "Valid";
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(signupForm);
  const name = data.get("fullName");
  const password = data.get("password");
  const passPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const passField = document.querySelector("#pwd-pattern");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = data.get("email");
  const emailField = document.querySelector(".field.email");
  const nameField = document.querySelector(".field.name");
  let valid = true;
  const isNameValid = validateName(name);
  if (isNameValid !== "Valid") {
    valid = false;
    if (nameField.querySelector(".err-msg"))
      nameField.querySelector(".err-msg").remove();
    const msg = document.createElement("span");
    msg.innerText = isNameValid;
    msg.classList.add("err-msg");
    nameField.appendChild(msg);
  } else {
    if (nameField.querySelector(".err-msg"))
      nameField.querySelector(".err-msg").remove();
  }
  if (!passPattern.test(password)) {
    passField.style.color = "rgba(250, 87, 87, 0.884)";
    valid = false;
  } else {
    passField.style.color = "";
  }
  if (!emailPattern.test(email)) {
    const msg = document.createElement("span");
    msg.innerText = "Please enter a valid email address!";
    msg.classList.add("err-msg");
    emailField.appendChild(msg);
    valid = false;
  } else {
    if (emailField.querySelector(".err-msg"))
      emailField.querySelector(".err-msg").remove();
  }
  if (valid) {
    signup(name, data.get("email"), password);
  }
});

const logout = document.querySelector("#logout-btn");

logout.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  window.location.reload();
});

const budgetItems = document.querySelectorAll(".budget-item");

const budgetMap = {
  1: { min: 0, max: 200 },
  2: { min: 200, max: 400 },
  3: { min: 400, max: 600 },
  4: { min: 600, max: 1000 },
  5: { min: 900, max: 1000 },
};

budgetItems.forEach((item) => {
  item.addEventListener("click", () => {
    sessionStorage.setItem(
      "selectedBudget",
      JSON.stringify(budgetMap[item.dataset.budget])
    );
    sessionStorage.removeItem("search");
    window.location.href = "./product-list.html";
  });
});

chipItems.forEach((item) => {
  item.addEventListener("click", () => {
    sessionStorage.setItem("search", item.dataset.search);
    sessionStorage.removeItem("selectedBudget");
    window.location.href = "./product-list.html";
  });
});

const diamondItems = document.querySelectorAll(".brands-list .brand-item");

diamondItems.forEach((item) => {
  item.addEventListener("click", () => {
    const itemName = item.nextElementSibling.innerText;
    sessionStorage.removeItem("selectedBudget");
    sessionStorage.setItem("search", itemName);
    window.location.href = "./product-list.html";
  });
});

const searchedProduct = document.querySelector(".hero .search-input");

searchedProduct.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sessionStorage.setItem("search", searchedProduct.value);
    window.location.href = "./product-list.html";
  }
});
const userSettings = {
  username: "Malhotra Collections",
  profileImage: "./assets/images/My Products/profile-picture.png",
  firstName: "Malhotra",
  lastName: "Collections",
  country: "United States",
  city: "Texas",
  zip: "77441",
};

const savedSettings = localStorage.getItem("userSettings");

if (!savedSettings) {
  localStorage.setItem("userSettings", JSON.stringify(userSettings));
}

const viewAll = document.querySelector(".view-all");

viewAll.style.textDecoration = "none";

viewAll.addEventListener("click", () => {
  sessionStorage.removeItem("selectedBudget");
  sessionStorage.removeItem("search");
});

const openSignUp = sessionStorage.getItem("openSignUp");

if (openSignUp) {
  signUpWin.classList.add("active");
  backdrop.classList.add("active");
  loginWin.classList.remove("active");
  sessionStorage.removeItem("openSignUp");
}

const openLogin = sessionStorage.getItem("openLogin");

if (openLogin) {
  loginWin.classList.add("active");
  backdrop.classList.add("active");
  signUpWin.classList.remove("active");
  sessionStorage.removeItem("openLogin");
}
