import "./styles.css";
import "../node_modules/modern-normalize";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { makeImagesCards } from "./templates";
import { Notify } from "notiflix";
const axios = require("axios").default;
import throttle from "lodash.throttle";

const form = document.querySelector("#search-form");
const boxGallery = document.querySelector(".gallery");
const btnPause = document.querySelector(".pause");
const btnToStart = document.querySelector(".start")

// const btnLoadMore = document.querySelector(".load-more");

let nameImages = "";
let page = 1;
let totalPages = 0;

const options =
  "key=31187211-d453cf6c0705ee9af6400cbd4&min_height=1200&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&";
const baseUrl = "https://pixabay.com/api/";

async function getImage(event) {
  event.preventDefault();
  // btnLoadMore.classList.remove("active");
  btnPause.classList.remove("active");
  btnToStart.classList.remove("active");
  boxGallery.innerHTML = ``;
  page = 1;

  nameImages = `q=${form.querySelector("input").value}`;

  try {
    const response = await axios.get(
      `${baseUrl}?${options}` + `page=${page}&${nameImages}`
    );

    if (response.data.hits.length === 0) {
      Notify.failure(
        "Sorry, there are no images matching your search query. Please try again.",
        { width: "500px", distance: "50px", fontSize: "24px" }
      );
      return;
    }

    Notify.info(`Hooray! We found ${response.data.totalHits} images.`, {
      width: "500px",
      distance: "50px",
      fontSize: "24px",
    });
    totalPages = Math.ceil(response.data.totalHits / 40);

    boxGallery.innerHTML = `${makeImagesCards(response.data.hits)}`;

    // btnLoadMore.classList.add("active");
  } catch (error) {
    Notify.failure(error, {
      width: "500px",
      distance: "50px",
      fontSize: "24px",
    });
  }
}

function onImageClick(event) {
  event.preventDefault();

  if (!event.target.hasAttribute("alt")) {
    return;
  }

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
}

async function loadMore() {
  try {
        page += 1;

      if (totalPages < page) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results.",
        { width: "500px", distance: "50px", fontSize: "24px" }
      );
      // btnLoadMore.classList.remove("active");
      return;
    }

    const response = await axios.get(
      `${baseUrl}?${options}` + `page=${page}&${nameImages}`
    );

    boxGallery.insertAdjacentHTML(
      "beforeend",
      `${makeImagesCards(response.data.hits)}`
    );

     
  } catch (error) {
    Notify.failure(error, {
      width: "500px",
      distance: "50px",
      fontSize: "24px",
    });
  }
}

function onGalleryScroll(event) {
  const { height: cardHeight } =
    boxGallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });

  btnPause.classList.add("active");
    btnToStart.classList.add("active");

}

async function infinityScroll() {
  const { height: cardHeight } =
    boxGallery.firstElementChild.getBoundingClientRect();

  if (
    document.querySelector("body").getBoundingClientRect().bottom <
    cardHeight * 5
  ) {
    loadMore();
  }
}

function onPauseClick(event) {
  window.scrollBy({
    top: 0,
  });
  // window.removeEventListener("scroll", onGalleryScroll);
  window.addEventListener("scroll", onGalleryScroll);

}

function toStart() {
window.scrollTo({
    top: document.querySelector("body").getBoundingClientRect().top,
  });
  window.removeEventListener("scroll", onGalleryScroll);
}
     
  

form.addEventListener("submit", getImage);
boxGallery.addEventListener("click", onImageClick);

window.addEventListener("scroll", throttle(infinityScroll, 500));
window.addEventListener("scroll", onGalleryScroll);

btnPause.addEventListener("click", onPauseClick);
btnToStart.addEventListener("click", toStart)

// btnLoadMore.addEventListener("click", onLoadMoreClick);
