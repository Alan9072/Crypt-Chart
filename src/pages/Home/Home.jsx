import React, { useState, useEffect } from "react";
import "./Home.css";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

function Home() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-9wXcbnfp9P4zkE3CWxMzeE5Y",
      },
    };

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setArr(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Crypto Chart</h1>
        <p>
          Explore various cryptocurrencies and gain financial knowledge about
          them.
        </p>
      </div>
      <div className="cryptotable">
        <div className="tablelayout">
          <p className="rank">Rank</p>
          <p style={{ paddingLeft: "20px" }}>Coin</p>
          <p style={{ textAlign: "center" }}>Price</p>
          <p style={{ textAlign: "end" }}>Changes <div style={{fontSize:"8px"}}>(24hr)</div></p>
        </div>
        <div className="cryptolist">
          {arr.map((item) => (
            <div key={item.id} className="eachlist">
              <p className="rank">{item.market_cap_rank}</p>
              <div
                className="coin-info"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <p>
                  {item.name} ({item.symbol.toUpperCase()})
                </p>
              </div>
              <p style={{ textAlign: "center" }}>
                ${item.current_price.toLocaleString()}
              </p>
              <p className="hrchange" style={{ textAlign: "end" }}>
                {item.price_change_percentage_24h.toFixed(4) < 0 ? (
                  <>
                    <FaArrowTrendDown style={{color:"red"}}/>
                    <p style={{color:"red"}}>{item.price_change_percentage_24h.toFixed(4)}%</p>
                  </>
                ) : (
                  <>
                    <FaArrowTrendUp style={{color:"green"}}/>
                    <p style={{color:"green"}}>{item.price_change_percentage_24h.toFixed(4)}%</p>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
