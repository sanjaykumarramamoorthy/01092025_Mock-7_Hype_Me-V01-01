const closeBtns = document.querySelectorAll(
  ".photos-modal-container .modal-close,.photos-modal-container button.cancel"
);

const ImgModal = document.querySelector(".photos-modal-container");

const DetailsModal = document.querySelector(".product-details-modal");

const ImgSelectBtn = document.querySelector(".prod-photo-big");

const submitBtn = document.querySelector(".buttons .submit-btn");

const sectionStatus = {
  photos: false,
  details: false,
  moreDetails: false,
  reviewDetails: false,
};

let pageData = {};

ImgSelectBtn.addEventListener("click", () => {
  ImgModal.showModal();
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    ImgModal.close();
    document.body.style.overflow = "";
    document.body.style.height = "";
  });
});

const bigImgUpload = document.querySelector(".img-preview-large");
const smallImgUploads = document.querySelectorAll(".img-item");

bigImgUpload.addEventListener("click", () => {
  const fileInput = bigImgUpload.querySelector(".img-upload");
  fileInput.click();
  fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (file) {
      bigImgUpload.querySelector("img").src = URL.createObjectURL(file);
      smallImgUploads[0].querySelector("img").src = URL.createObjectURL(file);
      document.querySelector("#mandatory-img").innerText = 1;
      document
        .querySelector(".photos-modal-container button.save")
        .removeAttribute("disabled");
      smallImgUploads[0].querySelector(".selected-mark").style.display =
        "block";
      smallImgUploads[0].querySelector("img").style.backgroundColor = "white";
    }
  });
});

smallImgUploads.forEach((img) => {
  img.addEventListener("click", (e) => {
    const fileInput = e.currentTarget.querySelector(".img-upload");
    fileInput.click();
    const imgItem = img.querySelector("img");
    fileInput.addEventListener("change", (f) => {
      let file = f.target.files[0];
      if (file) {
        imgItem.src = URL.createObjectURL(file);
        console.log(file)
        bigImgUpload.querySelector("img").src = URL.createObjectURL(file);
        imgItem.style.backgroundColor = "white";
        imgItem.style.outline = "1px solid #eee";
        img.querySelector(".selected-mark").style.display = "block";
      }
      if (
        document.querySelector(".img-item:first-child img.selected-mark").style
          .display === "block"
      ) {
        document.querySelector("#mandatory-img").innerText = 1;
        document
          .querySelector(".photos-modal-container button.save")
          .removeAttribute("disabled");
      }
    });
  });
});

const detailsAddBtn = document.getElementById("details-add-btn");

detailsAddBtn.addEventListener("click", () => {
  DetailsModal.showModal();
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
});

const modalClose = document.querySelectorAll(
  ".product-details-modal .modal-close, .product-details-modal button.cancel"
);

modalClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    DetailsModal.close();
    document.body.style.overflow = "";
    document.body.style.height = "";
  });
});

function updateSubmitButton() {
  if (Object.values(sectionStatus).every((status) => status === true)) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "");
  }
}

const moreDetailsModal = document.querySelector(".more-details-modal");
const revDetailsModal = document.querySelector(".review-details-modal");

const moreDetailsAddBtn = document.getElementById("add-more-details-btn");
const revDetailsBtn = document.getElementById("review-details-btn");

moreDetailsAddBtn.addEventListener("click", () => {
  moreDetailsModal.showModal();
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
});

revDetailsBtn.addEventListener("click", () => {
  revDetailsModal.showModal();
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
  document.querySelector(".details-card:last-child .tick-icon").src =
    "http://127.0.0.1:5500/assets/images/Add Products/completed tick.png";
  sectionStatus.reviewDetails = true;
  updateSubmitButton();
});

const moreDetailsCloseBtns = document.querySelectorAll(
  ".more-details-modal .modal-close,.more-details-modal button.cancel"
);

const revDetailsCloseBtns = document.querySelectorAll(
  ".review-details-modal .modal-close"
);

moreDetailsCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    moreDetailsModal.close();
    document.body.style.overflow = "";
    document.body.style.height = "";
  });
});

revDetailsCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    revDetailsModal.close();
    document.body.style.overflow = "";
    document.body.style.height = "";
  });
});

const editBtn = document.querySelector(".review-details-modal button.edit");

const editFields = document.querySelectorAll(
  ".review-details-modal .form-row input"
);

editBtn.addEventListener("click", () => {
  editFields.forEach((field) => {
    field.removeAttribute("disabled");
    field.style.border = "1px solid lightblue";
    revDetailsModal.querySelector(`#name`).focus();
  });
});

const saveBtn = document.querySelector(".review-details-modal button.save");

saveBtn.addEventListener("click", () => {
  editFields.forEach((field) => {
    field.setAttribute("disabled", "");
    field.style.border = "";
  });
  setTimeout(() => {
    revDetailsModal.close();
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, 500);
});

const prodImgSmall = document.querySelector(".prod-img-small");

const ImgsSaveBtn = document.querySelector(
  ".photos-modal-container button.save"
);

const modalImgs = document.querySelectorAll(
  ".img-small-container .img-item .prod-img-placeholder"
);

const editModal = document.querySelector(".edit-modal");

ImgsSaveBtn.addEventListener("click", () => {
  ImgModal.close();
  document.body.style.overflow = "";
  document.body.style.height = "";
  editModal.style.display = "block";

  prodImgSmall.querySelectorAll(".small-img").forEach((item, index) => {
    const img = document.createElement("img");
    img.src = modalImgs[index].src;
    pageData[`img${index + 1}`] = modalImgs[index].src;
    img.style.padding = "5px";
    img.style.border = "1px solid #eee";
    if (modalImgs[index].src.startsWith("blob")) {
      img.classList.add("img-saved");
    }
    item.innerHTML = "";
    item.appendChild(img);
    if (index === 0) {
      ImgSelectBtn.querySelector("img").src = modalImgs[index].src;
      ImgSelectBtn.style.width = "auto";
      ImgSelectBtn.style.margin = "1vw 0";
      ImgSelectBtn.style.paddingBottom = "10px";
    }
  });
  prodImgSmall.querySelectorAll(".small-img").forEach((item) => {
    item.removeEventListener("click", () => {
      ImgSelectBtn.querySelector("img").src = item.querySelector("img").src;
    });
  });
  prodImgSmall.querySelectorAll(".small-img").forEach((item) => {
    item.addEventListener("click", () => {
      ImgSelectBtn.querySelector("img").src = item.querySelector("img").src;
    });
  });
  document.getElementById("imgs-selected-count").innerText =
    prodImgSmall.querySelectorAll(".small-img .img-saved").length;
  console.log(prodImgSmall.querySelectorAll(".small-img .img-saved").length);
  document.querySelector(".product-photos img.tick-icon").src =
    "http://127.0.0.1:5500/assets/images/Add Products/completed tick.png";
  sectionStatus.photos = true;
  updateSubmitButton();
});

editModal.addEventListener("click", () => {
  ImgModal.showModal();
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
});

const fields = document.querySelectorAll(
  ".product-details-modal .form-row select, .product-details-modal .form-row input"
);

const prodDetailsSaveBtn = document.querySelector(
  ".product-details-modal button.save"
);

const descFields = document.querySelectorAll(
  ".details-card:first-child .desc-item"
);

const statusIcons = document.querySelectorAll(
  ".product-details .details-title .tick-icon"
);

prodDetailsSaveBtn.addEventListener("click", () => {
  let filledMandatory = true;
  for (let i = 0; i < 6; i++) {
    let item = fields[i];
    if (item.value === "") {
      item.style.outline = "1px solid red";
      filledMandatory = false;
    } else {
      item.style.outline = "";
    }
  }
  checkStatus(filledMandatory);
  DetailsModal.close();
  document.body.style.overflow = "";
  document.body.style.height = "";
  updateSubmitButton();

  descFields.forEach((field, index) => {
    if (fields[index].id === "price" && fields[index].value !== "") {
      field.querySelector(".value").innerText = `$${fields[index].value}`;
      pageData[fields[index].id] = fields[index].value;
      return;
    }
    field.querySelector(".value").innerText = fields[index].value;
  });
  document.getElementById("added-details-count").innerText = Array.from(
    fields
  ).filter((item) => item.value !== "").length;
  detailsAddBtn.innerText = "Edit";
});

function checkStatus(status) {
  if (status === false) {
    statusIcons.forEach((icon) => {
      if (icon.classList.contains("warning-icon")) {
        icon.classList.add("active");
        return;
      }
      icon.classList.remove("active");
    });
    sectionStatus.details = false;
  } else {
    statusIcons.forEach((icon) => {
      if (icon.classList.contains("completed-tick")) {
        icon.classList.add("active");
        return;
      }
      icon.classList.remove("active");
      sectionStatus.details = true;
    });
  }
}

const moreFields = document.querySelectorAll(
  ".more-details-modal .form-row select, .more-details-modal .form-row input"
);

const moreDetailsSaveBtn = document.querySelector(
  ".more-details-modal button.save"
);

const moreDescFields = document.querySelectorAll(
  ".details-card.additional .desc-item"
);

moreDetailsSaveBtn.addEventListener("click", () => {
  moreDetailsModal.close();
  document.body.style.overflow = "";
  document.body.style.height = "";

  moreDescFields.forEach((field, index) => {
    field.querySelector(".value").innerText = moreFields[index].value;
    pageData[moreFields[index].id] = moreFields[index].value;
  });
  document.getElementById("more-details-added-count").innerText = Array.from(
    moreFields
  ).filter((item) => item.value !== "").length;
  moreDetailsAddBtn.innerText = "Edit";
  document.querySelector(".details-card.additional .tick-icon").src =
    "http://127.0.0.1:5500/assets/images/Add Products/completed tick.png";
  sectionStatus.moreDetails = true;
  updateSubmitButton();
});

ImgSelectBtn.addEventListener("click", () => {
  makeImgsDraggable(ImgModal);
});

function makeImgsDraggable(targetModal) {
  const imgItems = targetModal.querySelectorAll(
    ".img-item img.prod-img-placeholder"
  );
  let draggedImg = null;
  imgItems.forEach((img) => {
    img.setAttribute("draggable", true);
    img.style.cursor = "grab";
    img.addEventListener("dragstart", () => {
      draggedImg = img;
    });

    img.addEventListener("dragover", (e) => {
      e.preventDefault();
      img.parentElement.classList.add("over");
    });

    img.addEventListener("dragleave", () => {
      img.parentElement.classList.remove("over");
    });

    img.addEventListener("drop", (e) => {
      e.preventDefault();
      img.parentElement.classList.remove("over");

      if (draggedImg && draggedImg !== img) {
        const tempSrc = draggedImg.src;
        draggedImg.src = img.src;
        img.src = tempSrc;
      }
    });
  });
}

const pageClose = document.querySelector(".main-content > .close-btn");

pageClose.addEventListener("click", () => {
  window.location.href = "./selling-info.html";
});

const loggedIn = localStorage.getItem("loggedIn");

const profImg = document.querySelector(".profile-img");

if (loggedIn === "true") {
  profImg.src = "./assets/images/channels4_profile.jpg";
} else {
  profImg.src = "./assets/images/default-profile-pic.jpg";
}

const smallImgs = document.querySelectorAll(".prod-img-small .small-img img");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(pageData)
});
