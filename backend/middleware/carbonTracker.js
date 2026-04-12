let carbonStats = {
  totalBytes: 0,
  totalCO2: 0,
  lastRequest: null,
};

// expose global updater
global.updateCarbonStats = (bytes, co2, route) => {
  carbonStats.totalBytes += bytes;
  carbonStats.totalCO2 += co2;
  carbonStats.lastRequest = {
    route,
    bytes,
    co2,
    time: new Date(),
  };
};

const carbonTracker = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseSize =
      res.getHeader("content-length") || JSON.stringify(res.body || "").length;

    const bytes = Number(responseSize);
    const co2 = bytes * 0.00000015;

    console.log("🌱 Route:", req.method, req.originalUrl);
    console.log("📦 Bytes:", bytes);
    console.log("🌍 CO₂:", co2);

    global.updateCarbonStats(bytes, co2, req.originalUrl);
  });

  next();
};

module.exports = { carbonTracker, carbonStats };