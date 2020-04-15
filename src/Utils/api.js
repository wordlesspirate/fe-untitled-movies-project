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
