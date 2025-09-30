const userName = document.querySelector("#user-name");
const zipCode = document.querySelector("#zipCode");
const profImg = document.querySelector(".prof-pic");

const userDetails = localStorage.getItem("userSettings");
if (userDetails !== null) {
  const data = JSON.parse(userDetails);
  userName.innerText = data.username;
  zipCode.innerText = data.zip;
  profImg.src = data.profileImage;
}

const cardsGrid = document.querySelector(".cards-grid");

fetch("http://127.0.0.1:5500/assets/json/products.json")
  .then((resp) => resp.json())
  .then((data) => {
    for (let i of data) {
      cardsGrid.innerHTML += `<div class="card">
            <div class="card-img">
              <img src="${i.img}" alt="" />
            </div>
            <h2 class="card-header">${i.name}</h2>
            <div class="card-desc">
              <span class="price">$${i.price}.00</span>
              <div class="views">
                <img
                  src="./assets/images/My Products/views.png"
                  alt="views icon"
                  class="views-icon"
                />
                <span class="count">34</span>
              </div>
              <div class="likes">
                <img
                  src="./assets/images/My Products/likes.png"
                  alt="heart icon"
                  class="heart-icon"
                />
                <span class="count">62</span>
              </div>
            </div>
          </div>`;
    }
  });

const reviewSection = document.querySelector(".reviews-section");
const cardSection = document.querySelector(".cards-grid");

const cardTabs = document.querySelector(".shoes-tabs");

const tabItems = [
  document.querySelectorAll(".products-reviews-tabs .tab-item"),
  document.querySelectorAll(".shoes-tabs .tab-item"),
];

const paginationSection = document.querySelector(".pagination-bar");

tabItems[0].forEach((item) =>
  item.addEventListener("click", () => {
    if (item.dataset.target === "user-reviews") {
      cardSection.classList.remove("active");
      reviewSection.classList.add("active");
      cardTabs.classList.remove("active");
      paginationSection.classList.add("active");
    } else {
      cardSection.classList.add("active");
      reviewSection.classList.remove("active");
      cardTabs.classList.add("active");
      paginationSection.classList.remove("active");
    }
    tabItems[0].forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  })
);

tabItems[1].forEach((item) =>
  item.addEventListener("click", () => {
    if ((item.dataset.target = "new-shoes")) {
      const reversed = Array.from(cardSection.children).reverse();
      cardSection.innerHTML = "";
      reversed.forEach((card) => cardSection.appendChild(card));
    }
    tabItems[1].forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  })
);

const chipItems = document.querySelectorAll(".chip");

chipItems.forEach((chip) => {
  chip.addEventListener("click", () => {
    chipItems.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
  });
});

const prodAddBtn = document.querySelector(".prod-add-button");
prodAddBtn.addEventListener("click", () => {
  window.location.href = "./add-product.html";
});