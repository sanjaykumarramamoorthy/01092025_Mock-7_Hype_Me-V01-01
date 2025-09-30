const pagination = document.querySelector(".pagination");

const prevPgBtn = document.querySelector(".page-prev-btn");
const nextPgBtn = document.querySelector(".page-next-btn");

let currPage = "1";

let totalPgs;

nextPgBtn.addEventListener("click", () => {
  const currPg = pagination.querySelector(".page-item.active");
  const nextPg = currPg.nextElementSibling;
  if (currPg.nextElementSibling) {
    nextPg.classList.add("active");
    currPg.classList.remove("active");
    currPage = nextPg.innerText;
    updatePage(nextPg);
  }
});

prevPgBtn.addEventListener("click", () => {
  const currPg = pagination.querySelector(".page-item.active");
  const prevPg = currPg.previousElementSibling;
  if (currPg.previousElementSibling) {
    prevPg.classList.add("active");
    currPg.classList.remove("active");
    currPage = prevPg.innerText;
    updatePage(prevPg);
  }
});

let pageData;

function addPages(totalData) {
  prevPgBtn.style.visibility = "hidden";
  nextPgBtn.style.visibility = "";
  pagination.innerHTML = "";
  if (totalData.length <= 15) {
    document.querySelector(".pagination-bar").style.display = "none";
    return;
  }
  document.querySelector(".pagination-bar").style.display = "";
  pageData = totalData;
  let pageDataLimit = 15;
  let range = Math.ceil(totalData.length / pageDataLimit);
  totalPgs = range;
  for (let i = 1; i <= range; i++) {
    const pg = document.createElement("li");
    pg.classList.add("page-item");
    pg.innerText = i;
    pagination.appendChild(pg);
  }
  pagination.querySelector("li:first-child").classList.add("active");
  const pages = document.querySelectorAll(".page-item");
  pages.forEach((page) => {
    page.addEventListener("click", (e) => {
      pages.forEach((p) => p.classList.remove("active"));
      page.classList.add("active");
      updatePage(page);
    });
  });
}

function updatePage(page) {
  const currPg = page.innerText;
  if (currPg === "1") {
    prevPgBtn.style.visibility = "hidden";
  } else {
    prevPgBtn.style.visibility = "";
  }
  if (currPg === `${totalPgs}`) {
    nextPgBtn.style.visibility = "hidden";
  } else {
    nextPgBtn.style.visibility = "";
  }
  insertPageData(parseInt(currPg), pageData);
}

function insertPageData(pg, data) {
  let start = 15 * (pg - 1);
  cardsGrid.innerHTML = "";
  if(!pageData) {
    pageData = data;
  }
  for (let i = start; i < 15 * pg; i++) {
    if ( i >= pageData.length) {
      return;
    }
    cardsGrid.innerHTML += `<div class="card">
            <div class="card-img">
              <img src="http://127.0.0.1:5500/assets/images/Shoes/shoe-${
                i % 35 === 0 ? 13 : i % 35
              }.jpg" alt="" />
            </div>
            <h2 class="card-header">${data[i].model}</h2>
            <div class="card-desc">
              <span class="price">$${data[i].price}.00</span>
            </div>
          </div>`;
  }
}
