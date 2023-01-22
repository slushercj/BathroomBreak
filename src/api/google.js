import axios from "axios";

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyALxVcQZDG7p4qh_89RmPJ8pguo-mtYyRI&location=32.715330,-117.157260&radius=8000&types=food&name=mcdonalds
export default axios.create({
  baseURL: "https://maps.googleapis.com",
  params: {
    key: "AIzaSyALxVcQZDG7p4qh_89RmPJ8pguo-mtYyRI",
  },
});
