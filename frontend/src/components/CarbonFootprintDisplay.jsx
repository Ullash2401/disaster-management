import { useEffect, useState } from "react";

const CarbonFootprintDisplay = () => {
  const [data, setData] = useState({
    totalBytes: 0,
    totalCO2: 0,
    lastRequest: null,
  });

  const fetchCarbon = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/carbon-stats");
      const json = await res.json();

      console.log("📡 FRONTEND RECEIVED:", json);

      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

useEffect(() => {
  (async () => {
    await fetchCarbon();
  })();

  const interval = setInterval(fetchCarbon, 3000);

  return () => clearInterval(interval);
}, []);
  return (
    <div style={{
      position: "fixed",
      bottom: 10,
      right: 10,
      background: "white",
      padding: "10px",
      borderRadius: "8px",
      zIndex: 1000
    }}>
      <h3>🌱 Carbon Tracker</h3>

      <p><strong>Total Bytes:</strong> {data.totalBytes}</p>
      <p><strong>Total CO₂:</strong> {data.totalCO2.toFixed(6)}</p>

      {data.lastRequest && (
        <>
          <hr />
          <p><strong>Last Route:</strong> {data.lastRequest.route}</p>
          <p><strong>Bytes:</strong> {data.lastRequest.bytes}</p>
          <p><strong>CO₂:</strong> {data.lastRequest.co2.toFixed(6)}</p>
        </>
      )}
    </div>
  );
};

export default CarbonFootprintDisplay;