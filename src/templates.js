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
    ${likes}
      <b>Likes</b>
    </p>
    <p class="info-item">
    ${views}
      <b>Views</b>
    </p>
    <p class="info-item">
    ${comments}
      <b>Comments</b>
    </p>
    <p class="info-item">
    ${downloads}
      <b>Downloads</b>
    </p>
  </div>
</div> `;
    })
        .join("");
    
    return imagesCards
};
