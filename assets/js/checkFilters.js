let brands;

fetch("http://taskapi.devdews.com/api/products")
  .then((resp) => resp.json())
  .then((data) => {
    brands = [...new Set(data.map((item) => item.brand.toLowerCase()))];
    renderBrandsFilter(brands);
  });

function renderBrandsFilter(brands) {
  const filterContainer = document.querySelector(".brand-filter .filter-body");
  filterContainer.innerHTML = `
  <div class='search-bar flexbox'>
    <img src="./assets/images/Product List/brand-search.png" alt="" class="search-icon"/>
    <input type="text" placeholder="Search" class="search-input brand-search" />
  </div>
    <div class="brands-list"></div>
    <a href="#" class="show-more more-link" style="color:#7b40db;">${
      brands.length - 5
    } More</a>
  `;

  const brandsList = filterContainer.querySelector(".brands-list");
  const showMore = filterContainer.querySelector(".show-more");
  let showingAll = false;
  let checkedBrands = new Set();
  const brandCheckboxes = brandsList.getElementsByTagName("input");

  Array.from(brandCheckboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedBrands = Array.from(brandCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);
    });
  });

  function displayBrands() {
    let list = brands.slice(0, 5);
    brandsList.innerHTML = "";
    list.forEach((brand) => {
      const checked = checkedBrands.has(brand) ? "checked" : "";
      brandsList.innerHTML += `
        <label>
          <input type="checkbox" value="${brand}" ${checked} />
          ${brand}
        </label>
      `;
    });
    brandsList.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.addEventListener("change", function () {
        if (this.checked) {
          checkedBrands.add(this.value);
        } else {
          checkedBrands.delete(this.value);
        }
        const allStatuses = Array.from(
          brandsList.querySelectorAll('input[type="checkbox"]')
        ).map((b) => ({
          brand: b.value,
          checked: b.checked,
        }));
        brandsFilterContainer = brandsList;
        masterFilter();
      });
    });
  }

  displayBrands();

  showMore.addEventListener("click", (e) => {
    e.preventDefault();
    if (!showingAll) {
      displayBrands(brands);
      showMore.style.display = "none";
      showingAll = true;
    }
  });

  filterContainer
    .querySelector(".brand-search")
    .addEventListener("input", function () {
      const val = this.value.toLowerCase();
      const filtered = brands.filter((b) => b.toLowerCase().includes(val));
      displayBrands(filtered.slice(0, showingAll ? filtered.length : 5));
      showMore.style.display = showingAll || filtered.length <= 5 ? "none" : "";
      showMore.textContent = `${filtered.length - 5} More`;
    });
}

let brandsFilterContainer;

function brandsFilter() {
  const statuses = Array.from(
    brandsFilterContainer.querySelectorAll('input[type="checkbox"]')
  ).map((b) => ({
    brand: b.value,
    checked: b.checked,
  }));
  let filtered = statuses.filter((item) => item.checked);
  if (filtered.length === 0) return fetchedData;  
  return fetchedData.filter((item) => filtered.includes(item.brand.toLowerCase()));
}

function masterFilter() {
  let fil1 = conditionFilter();
  console.log(fil1);
  let fil2 = priceFilter(fil1);
  console.log(fil2);
  let fil3 = brandsFilter(fil2)
  console.log(fil3)
  // let fil3 = brandsFilter(fil2)
}