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
// const btnLoadMore = document.querySelector(".load-more");

let nameImages = "";
let page = 1;
let totalHits = 0;

const options =
  "key=31187211-d453cf6c0705ee9af6400cbd4&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&";
const baseUrl = "https://pixabay.com/api/";

async function getImage(event) {
  event.preventDefault();
  // btnLoadMore.classList.remove("active");
  boxGallery.innerHTML = ``;
  page = 1;

  nameImages = `q=${form.querySelector("input").value}`;

  try {
    const response = await axios.get(
      `${baseUrl}?${options}` + `page=${page}&${nameImages}`
    );
    Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    totalHits = response.data.totalHits - 40;

    if (response.data.hits.length === 0) {
      Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
      return;
    }

    boxGallery.innerHTML = `${makeImagesCards(response.data.hits)}`;
    // btnLoadMore.classList.add("active");
  } catch (error) {
    Notify.failure(error);
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

async function onLoadMoreClick() {
  try {
    page += 1;

    const response = await axios.get(
      `${baseUrl}?${options}` + `page=${page}&${nameImages}`
    );

    boxGallery.insertAdjacentHTML(
      "beforeend",
      `${makeImagesCards(response.data.hits)}`
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (totalHits < 400) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      // btnLoadMore.classList.remove("active");
      return;
    }
    totalHits -= 40;
  }
}

async function infinityScroll() {
  const { height: cardHeight } =
    boxGallery.firstElementChild.getBoundingClientRect();
  // console.log(document.querySelector("body").getBoundingClientRect().bottom);
  // window.scrollBy({
  //   top: cardHeight * 2,
  //   behavior: "smooth",
  // });

  if (
    document.querySelector("body").getBoundingClientRect().bottom <
    cardHeight * 5
  ) {
    onLoadMoreClick();
  }
}

form.addEventListener("submit", getImage);
boxGallery.addEventListener("click", onImageClick);
document.addEventListener("scroll", throttle(infinityScroll, 500));
// btnLoadMore.addEventListener("click", onLoadMoreClick);
