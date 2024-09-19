import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineStock } from "react-icons/ai";
import image from '../../assets/notfound.png'
import { BsSearch } from "react-icons/bs";

function Home({ curr ,query}) {
  const [arr, setArr] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
   // Add state for search query

  useEffect(() => {
    const fetchCryptoData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-9wXcbnfp9P4zkE3CWxMzeE5Y",
        },
      };

      try {
        // Fetch cryptocurrency data
        const cryptoResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
          options
        );
        const cryptoData = await cryptoResponse.json();
        setArr(cryptoData);

        // Fetch exchange rates
        const exchangeResponse = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const exchangeData = await exchangeResponse.json();
        setExchangeRates(exchangeData.rates);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const convertPrice = (price) => {
    if (curr === "usd") return price.toFixed(2);
    if (curr === "inr") return (price * (exchangeRates["INR"] || 1)).toFixed(2);
    if (curr === "eur") return (price * (exchangeRates["EUR"] || 1)).toFixed(2);
    return price.toFixed(2); // Default case
  };

  // Function to filter data based on the search query
  const filteredData = arr.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="home">

      <div className="hero">
        <h1>Crypto Chart</h1>
        <p>Explore various cryptocurrencies and gain financial knowledge about them.</p>
      </div>
      
      {/* Search Bar */}
      {/* <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for a cryptocurrency..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div> */}

      <div className="cryptotable">
        <div className="tablelayout">
          <p className="rank">Rank</p>
          <p style={{ paddingLeft: "20px" }}>Coin</p>
          <p style={{ textAlign: "center" }}>Price</p>
          <p style={{ textAlign: "end" }}>Changes <div style={{ fontSize: "8px" }}>(24hr)</div></p>
        </div>
        <div className="cryptolist">
          {
            filteredData.length > 0
          ?
           filteredData.map((item) => (
            <div key={item.id} className="eachlist">
              <p className="rank">{item.market_cap_rank}</p>
              <div className="coin-info" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <p>{item.name} ({item.symbol.toUpperCase()})</p>
              </div>
              <p style={{ textAlign: "center" }}>
                {curr === "usd" ? `$${convertPrice(item.current_price)}` :
                curr === "inr" ? `₹${convertPrice(item.current_price)}` :
                curr === "eur" ? `€${convertPrice(item.current_price)}` :
                `$${convertPrice(item.current_price)}`}
              </p>
              <p className="hrchange" style={{ textAlign: "end" }}>
                {item.price_change_percentage_24h < 0 ? (
                  <>
                    <AiOutlineStock style={{ color: "red" ,transform: "scaleX(-1)"}} />
                    <p style={{ color: "red" }}>{item.price_change_percentage_24h.toFixed(4)}%</p>
                  </>
                ) : (
                  <>
                    <AiOutlineStock style={{ color: "green" }} />
                    <p style={{ color: "green" }}>{item.price_change_percentage_24h.toFixed(4)}%</p>
                  </>
                )}
              </p>
            </div>
          ))
        :
        (
            <div className="notfound">
                <img src={image} alt="not found" />
                <h1>Not Found!</h1>
            </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Home;
