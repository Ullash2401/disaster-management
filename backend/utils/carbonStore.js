// utils/carbonStore.js

let totalBytes = 0;
let totalCO2 = 0;

let lastRequest = {
  route: "",
  bytes: 0,
  co2: 0,
};

const addEntry = (route, bytes, co2) => {
  totalBytes += bytes;
  totalCO2 += co2;

  lastRequest = {
    route,
    bytes,
    co2,
  };
};

const getStats = () => {
  return {
    totalBytes,
    totalCO2,
    lastRequest,
  };
};

module.exports = { addEntry, getStats };