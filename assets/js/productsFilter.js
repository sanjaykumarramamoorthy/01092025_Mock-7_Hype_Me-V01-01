const filters = document.querySelectorAll(".filter-group button");

const topHeader = document.querySelector(".seller-products .top-header");

let currFilter;

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    filter.classList.toggle("expand");
  });
});

const filterSlide = document.querySelector(".filters");

const filterBtn = document.querySelector(".filter-slide-btn");

const backdrop = document.querySelector(".backdrop");

filterBtn.addEventListener("click", () => {
  filterSlide.classList.add("show");
  backdrop.classList.add("active");
});

const filterClose = document.querySelector(".filter-close");

filterClose.addEventListener("click", () => {
  filterSlide.classList.remove("show");
  backdrop.classList.remove("active");
});

backdrop.addEventListener("click", (e) => {
  backdrop.classList.remove("active");
  filterSlide.classList.remove("show");
});

const minRange = document.querySelector("#minRange");
const maxRange = document.querySelector("#maxRange");

const track = document.querySelector(".range-track");

document.addEventListener("DOMContentLoaded", () => {
  track.style.left = `${minRange.value}%`;
  track.style.right = `${100 - parseInt(maxRange.value)}%`;
});

minRange.addEventListener("input", (e) => {
  let minVal = parseInt(e.currentTarget.value);
  let maxVal = parseInt(maxRange.value);

  if (minVal > maxVal) {
    minRange.value = maxVal;
    minVal = maxVal;
  }
});

maxRange.addEventListener("input", (e) => {
  let maxVal = parseInt(e.currentTarget.value);
  let minVal = parseInt(minRange.value);

  if (maxVal < minVal) {
    maxRange.value = minVal;
    maxVal = minVal;
  }
});

const gap = 10;

const minPrice = document.querySelector("#min-range-val");
const maxPrice = document.querySelector("#max-range-val");

minRange.addEventListener("input", (e) => {
  if (parseInt(maxRange.value) - parseInt(e.currentTarget.value) < gap) {
    minRange.value = parseInt(maxRange.value) - gap;
  } else {
    track.style.left = `${parseInt(minRange.value)}%`;
    track.style.right = `${100 - parseInt(maxRange.value) + 1}%`;
    minPrice.innerText = (minRange.value / 100) * 1000;
  }
});

maxRange.addEventListener("input", (e) => {
  if (parseInt(e.currentTarget.value) - parseInt(minRange.value) < gap) {
    maxRange.value = parseInt(minRange.value) + gap;
  } else {
    track.style.left = `${parseInt(minRange.value)}%`;
    track.style.right = `${100 - parseInt(maxRange.value) + 1}%`;
    maxPrice.innerText = (maxRange.value / 100) * 1000;
  }
});

function getRandomProducts(arr, count) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const products = Array.from({ length: 35 }, (_, i) => i + 1);
const random15 = getRandomProducts(products, 15);

const cardsGrid = document.querySelector(".products-grid");

let prodsData;

const searchItem = sessionStorage.getItem("search");

fetch("http://taskapi.devdews.com/api/products")
  .then((resp) => resp.json())
  .then((data) => {
    prodsData = data;
    currFilter = data;
    if (searchItem) {
      searchFilter();
      return;
    }
    showProducts(data);
    if (sessionStorage.getItem("selectedBudget") !== null) {
      const range = JSON.parse(sessionStorage.getItem("selectedBudget"));
      applyPriceFilter(range.min, range.max);
      minRange.value = Number(range.min) / 10;
      maxRange.value = Number(range.max) / 10;
      track.style.left = `${parseInt(minRange.value)}%`;
      track.style.right = `${100 - parseInt(maxRange.value) + 1}%`;
      minPrice.innerText = minRange.value * 10;
      maxPrice.innerText = maxRange.value * 10;
    } else applyPriceFilter(50, 600);
  })
  .catch((err) => {
    cardsGrid.innerHTML = `<p style='color: white;text-align: center'>Failed to load products.</p>`;
    console.error("Fetch error:", err);
  });

function showProducts(data) {
  for (let i = 0; i < 15 && i < data.length; i++) {
    cardsGrid.innerHTML += `<div class="card">
            <div class="card-img">
              <img src="http://127.0.0.1:5500/assets/images/Shoes/shoe-${
                i + 1
              }.jpg" alt="" />
            </div>
            <h2 class="card-header">${data[i].model}</h2>
            <div class="card-desc">
              <span class="price">$${data[i].price}.00</span>
            </div>
          </div>`;
  }
}

const priceRangeMin = document.querySelector("#minRange");

const priceRangeMax = document.querySelector("#maxRange");

priceRangeMin.addEventListener("change", (e) => {
  applyPriceFilter(e.currentTarget.value * 10, priceRangeMax.value * 10);
});

priceRangeMax.addEventListener("change", (e) => {
  applyPriceFilter(priceRangeMin.value * 10, e.currentTarget.value * 10);
});

function applyPriceFilter(minVal, maxVal) {
  cardsGrid.innerHTML = "";
  topHeader.style.display = "flex";
  cardsGrid.style.display = "grid";
  let products = (currFilter || prodsData).filter(
    (item) => item.price >= minVal && item.price <= maxVal
  );
  addPages(products);
  pageData = products;
  insertPageData(1, products);
}

const newShoesList = getRandomProducts(products, 15);
const oldShoesList = getRandomProducts(products, 6);

const productBrand = document.querySelectorAll(".product-brand");

function applyConditionFilter(condition) {
  if (condition === "all") {
    currFilter = prodsData;
    let filtered = prodsData.filter(
      (item) =>
        item.price >= minRange.value * 10 && item.price <= maxRange.value * 10
    );
    pageData = filtered;
    addPages(filtered);
    insertPageData(1, filtered);
    productBrand.forEach((item) => {
      item.innerText = "All Shoes";
    });
    return;
  } else if (condition === "new") {
    let newShoes = prodsData.filter((item, index) =>
      newShoesList.includes(index)
    );

    let filtered = newShoes.filter(
      (item) =>
        item.price >= minRange.value * 10 && item.price <= maxRange.value * 10
    );
    currFilter = newShoes;
    addPages(filtered);
    pageData = filtered;
    insertPageData(1, filtered);
    productBrand.forEach((item) => {
      item.innerText = "New Shoes";
    });
    return;
  } else if (condition === "used") {
    let usedShoes = prodsData.filter((item, index) =>
      oldShoesList.includes(index)
    );
    let filtered = usedShoes.filter(
      (item) =>
        item.price >= minRange.value * 10 && item.price <= maxRange.value * 10
    );
    currFilter = usedShoes;
    addPages(filtered);
    pageData = filtered;
    insertPageData(1, filtered);
    productBrand.forEach((item) => {
      item.innerText = "Used Shoes";
    });
    return;
  } else {
    currFilter = prodsData;
    let filtered = prodsData.filter(
      (item) =>
        item.price >= minRange.value * 10 && item.price <= maxRange.value * 10
    );
    addPages(filtered);
    pageData = filtered;
    insertPageData(1, filtered);
    productBrand.forEach((item) => {
      item.innerText = "All Shoes";
    });
  }
}

const newShoes = document.querySelector("#new-shoes");
const usedShoes = document.querySelector("#used-shoes");

const condition = document.querySelectorAll("#new-shoes,#used-shoes");

condition.forEach((item) => {
  item.addEventListener("change", (e) => {
    if (newShoes.checked && usedShoes.checked) {
      applyConditionFilter("all");
    } else if (newShoes.checked) {
      applyConditionFilter("new");
    } else if (usedShoes.checked) {
      applyConditionFilter("used");
    } else {
      applyConditionFilter("all");
    }
  });
});

const observer = new MutationObserver(() => {
  if (cardsGrid.children.length === 0) {
    cardsGrid.innerHTML = `<p style='color: white;text-align: center;grid-column: span 3;'>No products found for this filter.</p>`;
  } else {
    const prods = document.querySelectorAll(".card-img");
    Array.from(prods).forEach((shoe) => {
      shoe.onclick = null;
      shoe.addEventListener("click", () => {
        sessionStorage.setItem("shoe", shoe.querySelector("img").src);
        sessionStorage.setItem(
          "brand",
          shoe.parentElement.querySelector('.card-header').innerText
        );
        sessionStorage.setItem(
          "shoe-price",
          shoe.parentElement
            .querySelector(".price")
            .innerText.slice(1)
            .split(".")[0]
        );
        window.location.href = "./product-info.html";
      });
    });
  }
});

observer.observe(cardsGrid, { childList: true });

const prodsBrand = document.querySelectorAll(".product-brand");

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function searchFilter() {
  if (searchItem) {
    if (searchItem !== "price") {
      const filtered = prodsData.filter(
        (item) =>
          item.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.model.toLowerCase().includes(searchItem.toLowerCase())
      );
      addPages(filtered);
      currFilter = filtered;
      pageData = filtered;
      insertPageData(1, filtered);
      if (filtered.length === 0) {
        topHeader.style.display = "none";
        cardsGrid.innerHTML = `<p style='color: white;text-align: center'>No products found for "${searchItem}".</p>`;
        cardsGrid.style.display = "block";
        prodsBrand[0].innerText = "";
        return;
      }
      prodsBrand.forEach((item) => {
        item.innerText = capitalize(filtered[0].brand) + " Shoes";
      });
    }
  }
}
