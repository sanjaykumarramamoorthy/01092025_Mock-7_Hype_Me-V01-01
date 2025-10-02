const topHeader = document.querySelector(".seller-products .top-header");

const filters = document.querySelectorAll(".filter-group button");

const filterSlide = document.querySelector(".filters");
const filterBtn = document.querySelector(".filter-slide-btn");
const filterClose = document.querySelector(".filter-close");

const backdrop = document.querySelector(".backdrop");

const track = document.querySelector(".range-track");

const minRange = document.querySelector("#minRange");
const maxRange = document.querySelector("#maxRange");

const minPrice = document.querySelector("#min-range-val");
const maxPrice = document.querySelector("#max-range-val");

const gap = 10;

let currFilter;

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    filter.classList.toggle("expand");
  });
});

filterBtn.addEventListener("click", () => {
  filterSlide.classList.add("show");
  backdrop.classList.add("active");
});

filterClose.addEventListener("click", () => {
  filterSlide.classList.remove("show");
  backdrop.classList.remove("active");
});

backdrop.addEventListener("click", (e) => {
  backdrop.classList.remove("active");
  filterSlide.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", () => {
  track.style.left = `${minRange.value}%`;
  track.style.right = `${100 - parseInt(maxRange.value)}%`;
});

const updateTrack = () => {
  track.style.left = `${parseInt(minRange.value)}%`;
  track.style.right = `${100 - parseInt(maxRange.value)}%`;
  minPrice.innerText = (minRange.value / 100) * 1000;
  maxPrice.innerText = (maxRange.value / 100) * 1000;
};

minRange.addEventListener("input", () => {
  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);

  if (maxVal - minVal < gap) {
    minRange.value = maxVal - gap;
    minVal = maxVal - gap;
  }

  updateTrack();
});

maxRange.addEventListener("input", () => {
  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);

  if (maxVal - minVal < gap) {
    maxRange.value = minVal + gap;
    maxVal = minVal + gap;
  }

  updateTrack();
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

const cardsGrid = document.querySelector(".products-grid");

let prodsData;

const searchItem = sessionStorage.getItem("search");

let fetchedData = null;

async function fetchData() {
  const resp = await fetch("http://taskapi.devdews.com/api/products");
  const data = await resp.json();
  fetchedData = data;
  return data;
}
fetchData();

minRange.addEventListener("change", (e) => {
  masterFilter();
});

maxRange.addEventListener("change", (e) => {
  masterFilter();
});

function priceFilter(data) {
  let minVal = minRange.value * 10;
  let maxVal = maxRange.value * 10;
  return data.filter((item) => {
    if (parseInt(item.price) >= minVal && parseInt(item.price) <= maxVal)
      return item;
  });
}

const conditions = document.querySelectorAll("#new-shoes,#used-shoes");

const prodsByCondition = {
  new: getRandomProducts(products, 15),
  used: getRandomProducts(products, 6),
};

conditions.forEach((con) => {
  con.addEventListener("change", () => {
    masterFilter();
  });
});

function conditionFilter() {
  let filtered;
  const checked = Array.from(conditions).filter((item) => item.checked);
  if (checked.length === 0 || checked.length === conditions.length) {
    filtered = fetchedData;
    console.log("all");
    return filtered;
  } else if (checked[0].value === "new") {
    filtered = fetchedData.filter((item, index) => {
      if (prodsByCondition["new"].includes(index)) return item;
    });
    return filtered;
  } else {
    console.log("used");
    filtered = fetchedData.filter((item, index) => {
      if (prodsByCondition["used"].includes(index)) return item;
    });
    return filtered;
  }
}
// function searchFilter() {
//   if (searchItem) {
//     if (searchItem !== "price") {
//       const filtered = prodsData.filter(
//         (item) =>
//           item.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
//           item.model.toLowerCase().includes(searchItem.toLowerCase())
//       );
//       addPages(filtered);
//       currFilter = filtered;
//       pageData = filtered;
//       insertPageData(1, filtered);
//       if (filtered.length === 0) {
//         topHeader.style.display = "none";
//         cardsGrid.innerHTML = `<p style='color: white;text-align: center'>No products found for "${searchItem}".</p>`;
//         cardsGrid.style.display = "block";
//         productBrand[0].innerText = "";
//         return;
//       }
//       productBrand.forEach((item) => {
//         item.innerText = capitalize(filtered[0].brand) + " Shoes";
//       });
//     }
//   }
// }

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
          shoe.parentElement.querySelector(".card-header").innerText
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

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
