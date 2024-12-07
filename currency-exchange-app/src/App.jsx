import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [currency, setCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!currency) {
      setError("Please enter a valid currency code.");
      return;
    }

    try {
      setError("");

    
      const response = await axios.get(
        `https://open.er-api.com/v6/latest/USD`
      );

      const rates = response.data.rates;
      if (rates[currency.toUpperCase()]) {
        setExchangeRate(rates[currency.toUpperCase()]);
      } else {
        setExchangeRate(null);
        setError("Currency not found.");
      }
    } catch (err) {
      setError("Error fetching exchange rates. Please try again.");
      setExchangeRate(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Currency Exchange Rates</h1>
      <div>
        <input
          type="text"
          placeholder="Enter currency code (e.g., USD)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "300px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
          }}
        >
          Search
        </button>
      </div>
      {exchangeRate !== null && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            color: "#333",
          }}
        >
          <p>
            <strong>
              1 USD = {exchangeRate} {currency.toUpperCase()}
            </strong>
          </p>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
