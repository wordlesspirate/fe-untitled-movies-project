import IMDbKey from '../movies_config';
const { extractTitleId } = require('./moviemanipulation');

export const getMovieId = (movieTitle) => {
  return fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movieTitle}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': IMDbKey,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      // console.log(response.results[0].id);

      return extractTitleId(response.results[0].id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMovieLocations = (movieId) => {
  return fetch(
    `https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=${movieId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': IMDbKey,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const addressArray = [];
      response.locations.map((location) => {
        addressArray.push(location.location);
      });

      return addressArray;
    })
    .catch((err) => {
      console.log(err);
    });
};
