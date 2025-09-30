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
