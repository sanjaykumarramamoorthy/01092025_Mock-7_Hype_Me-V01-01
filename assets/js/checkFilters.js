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

  function displayBrands(list) {
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
        filterProductsByBrands(allStatuses);
      });
    });
  }

  displayBrands(brands.slice(0, 5));

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

function filterProductsByBrands(allStatuses) {
  const checkedBrands = allStatuses
    .filter((status) => status.checked)
    .map((status) => status.brand);
  if (checkedBrands.length === 0) {
    if (newShoes.checked && usedShoes.checked) {
      applyConditionFilter("all");
    } else if (newShoes.checked) {
      applyConditionFilter("new");
    } else if (usedShoes.checked) {
      applyConditionFilter("used");
    } else {
      applyConditionFilter("all");
    }
    return;
  }
  const filtered = currFilter.filter((item) =>
    checkedBrands.includes(item.brand.toLowerCase())
  );
  let priceFiltered = filtered.filter(
    (item) =>
      item.price >= minRange.value * 10 && item.price <= maxRange.value * 10
  );
  addPages(priceFiltered);
  pageData = priceFiltered;
  insertPageData(1, priceFiltered);
}
