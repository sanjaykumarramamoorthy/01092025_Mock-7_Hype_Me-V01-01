const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "./index.html";
});
const profileDD = document.querySelector(".profile .dropdown-caret");
profileDD.addEventListener("click", () => {
  document.querySelector(".prof-dd").classList.toggle("active");
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".profile")) {
    document.querySelector(".prof-dd").classList.remove("active");
  }
});
