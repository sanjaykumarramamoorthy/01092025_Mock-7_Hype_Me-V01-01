const switches = document.querySelectorAll(
  ".header-main .buy-btn, .header-main .sell-btn"
);

const isLoggedIn = localStorage.getItem("loggedIn");

switches.forEach((btn) => {
  btn.addEventListener("click", () => {
    switches.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.classList.contains("buy-btn")) {
      window.location.href = "index.html";
    } else if (isLoggedIn === "true") {
      window.location.href = "myproducts.html";
    }
  });
});
