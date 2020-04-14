import axios from "axios";
import APIKey from "../config";

export const getLatLng = (address) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKey}`
    )
    .then(({ data: { results } }) => {
      return results[0].geometry.location;
    });
};

export const getAddress = (coordinate) => {
  console.log("this is coordinate >>>>", coordinate.lat);

  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat}, ${coordinate.lng}
      &key=${APIKey}`
    )
    .then(({ data: { results } }) => {
      console.log("this is address >>>>", results);
    });
};
