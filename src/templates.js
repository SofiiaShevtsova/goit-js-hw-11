export const makeImagesCards = (array) => {
  const imagesCards = array
    .map((image) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px"/>
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
          ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
          ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
          ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
          ${downloads}
    </p>
  </div>
</div> `;
    })
    .join("");

  return imagesCards;
};
