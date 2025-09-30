(function () {
  const REVIEWS_PER_PAGE = 5;
  const reviewsContainer = document.querySelector(".reviews-container");
  const paginationBar = document.querySelector(".pagination-bar");
  const paginationList = document.querySelector(".pagination");
  const prevBtn = document.querySelector(".page-prev-btn");
  const nextBtn = document.querySelector(".page-next-btn");

  if (!reviewsContainer || !paginationBar) return;

  function getStaticReviewTemplates() {
    const templates = document.querySelectorAll(".review");

    console.log(templates);
    return templates;
  }

  function clearReviews() {
    Array.from(reviewsContainer.children).forEach((child) => {
      if (child.classList && child.classList.contains("review")) child.remove();
      if (child.tagName === "HR") child.remove();
    });
  }

  function generateReviews() {
    const templates = getStaticReviewTemplates();
    const reviews = [];

    for (let i = 0; i < 52 * REVIEWS_PER_PAGE; i++) {
      const review = templates[0].cloneNode(true);
      reviews.push({ el: review, stars: 5 });
    }

    for (let i = 0; i < 12 * REVIEWS_PER_PAGE; i++) {
      const review = templates[1 % templates.length].cloneNode(true);
      reviews.push({ el: review, stars: 4 });
    }

    for (let i = 0; i < 10 * REVIEWS_PER_PAGE; i++) {
      const review = templates[2 % templates.length].cloneNode(true);
      reviews.push({ el: review, stars: 3 });
    }

    for (let i = 0; i < 15 * REVIEWS_PER_PAGE; i++) {
      const review = templates[3 % templates.length].cloneNode(true);
      reviews.push({ el: review, stars: 2 });
    }

    for (let i = 0; i < 3 * REVIEWS_PER_PAGE; i++) {
      const review = templates[4 % templates.length].cloneNode(true);
      reviews.push({ el: review, stars: 1 });
    }
    for (let i = reviews.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
    }
    return reviews;
  }

  function getReviewStars(reviewObj) {
    return reviewObj.stars;
  }

  function filterReviewsByStars(reviews, star) {
    if (star === "All") return reviews;
    return reviews.filter((r) => getReviewStars(r) === parseInt(star));
  }

  const chips = document.querySelectorAll(".ratings-filter-chips .chip");
  let selectedStar = "All";
  chips.forEach((chip) => {
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedStar = chip.innerText.trim();
      setPage(1);
    });
  });

  let currentPage = 1;
  let reviews = generateReviews();
  const totalPages = 52;

  function renderPage(page, reviews) {
    clearReviews();
    const start = (page - 1) * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    const pageReviews = reviews.slice(start, end);
    const header = reviewsContainer.querySelector(".review-header");
    let insertAfter = header;
    pageReviews.forEach((reviewObj, idx) => {
      const review = reviewObj.el;
      insertAfter.parentNode.insertBefore(review, insertAfter.nextSibling);
      insertAfter = review;
      if (idx < pageReviews.length - 1) {
        const hr = document.createElement("hr");
        insertAfter.parentNode.insertBefore(hr, insertAfter.nextSibling);
        insertAfter = hr;
      }
    });
  }

  function shuffleReviews(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function setPage(page) {
    if (page < 1) return;
    let filteredReviews = filterReviewsByStars(reviews, selectedStar);
    filteredReviews = shuffleReviews(filteredReviews);
    let filteredTotalPages = Math.ceil(
      filteredReviews.length / REVIEWS_PER_PAGE
    );
    if (selectedStar === "4") filteredTotalPages = 12;
    if (selectedStar === "3") filteredTotalPages = 10;
    if (selectedStar === "2") filteredTotalPages = 15;
    if (selectedStar === "1") filteredTotalPages = 3;
    if (selectedStar === "5" || selectedStar === "All") filteredTotalPages = 52;
    if (page > filteredTotalPages) page = filteredTotalPages;
    currentPage = page;
    renderPage(currentPage, filteredReviews);
    renderPagination(currentPage, filteredTotalPages);
  }

  function renderPagination(page, totalPages) {
    paginationList.innerHTML = "";
    let maxPages = totalPages;
    let pagesToShow = [];
    if (maxPages <= 7) {
      for (let i = 1; i <= maxPages; i++) pagesToShow.push(i);
    } else {
      if (page <= 4) {
        pagesToShow = [1, 2, 3, 4, 5, "...", maxPages];
      } else if (page >= maxPages - 3) {
        pagesToShow = [
          1,
          "...",
          maxPages - 4,
          maxPages - 3,
          maxPages - 2,
          maxPages - 1,
          maxPages,
        ];
      } else {
        pagesToShow = [1, "...", page - 1, page, page + 1, "...", maxPages];
      }
    }
    pagesToShow.forEach((p) => {
      if (p === "...") {
        const ellipsis = document.createElement("li");
        ellipsis.className = "page-ellipsis";
        ellipsis.textContent = "...";
        paginationList.appendChild(ellipsis);
      } else {
        const li = document.createElement("li");
        li.className = "page-item" + (p === page ? " active" : "");
        li.textContent = p;
        li.addEventListener("click", () => setPage(p));
        paginationList.appendChild(li);
      }
    });
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === maxPages;
  }

  prevBtn.addEventListener("click", () => setPage(currentPage - 1));
  nextBtn.addEventListener("click", () => setPage(currentPage + 1));

  setPage(1);
})();
