import IMDdKey from '../movies_config';
const getMovieLocations = () => {
  return fetch(
    'https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=tt0944947',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': IMDdKey,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      //console.log('response in movies.js', response.locations);
      return response.locations[5].location;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getMovieLocations;
