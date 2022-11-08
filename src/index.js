import "./styles.css";
import "../node_modules/modern-normalize"

const a = 1

const options = `key=31187211-d453cf6c0705ee9af6400cbd4&q=${a}&` +
    `image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
    


// const image = {
//     webformatURL,  largeImageURL, tags, likes, views, comments, downloads,
// }

fetch(`https://pixabay.com/api/?${options}`)

// // GET request for remote image in node.js
// axios({
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   });

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// https://pixabay.com/api/
/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */