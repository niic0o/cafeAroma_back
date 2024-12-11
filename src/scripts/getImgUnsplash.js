const axios = require("axios");

const getImgUnsplash = async (apiKey, query, cantidad = 10) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=${cantidad}`;
  const response = await axios.get(url);
  const datos = response.data;
  return datos.results.map((foto) => foto.urls.regular);
};

// Uso
// getImgUnsplash("tu_api_key", "tu_query")
//   .then((imagenes) => console.log(imagenes))
//   .catch((error) => console.error(error));

module.exports = getImgUnsplash;
