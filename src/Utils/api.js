import axios from 'axios';
import APIKey from '../config';

export const getLatLng = (address) => {
  console.log(address);
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKey}`
    )
    .then(({ data: { results } }) => {
      return results[0].geometry.location;
    });
};

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
