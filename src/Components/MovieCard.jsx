import React from 'react';

const MovieCard = ({ movieLocation, locationExtras }) => {
  return (
    <>
      <p>Location: {movieLocation}</p>
      <p>Scene Information: {locationExtras}</p>
    </>
  );
};

export default MovieCard;
