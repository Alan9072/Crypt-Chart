import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "react-router-dom";
import "./CryptoDetail.css";

function CryptoDetail({ curr }) {
  const { id } = useParams(); // Get the coin ID from URL params
  const [historicalData, setHistoricalData] = useState([]);
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        // Fetching historical market data for 7 days (daily)
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${curr}&days=7`
        );
        const data = await response.json();

        // Set the historical data (format for the chart)
        const formattedData = data.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString(), // Convert timestamp to a readable date
          price: price[1].toFixed(2), // Store the price
        }));
        setHistoricalData(formattedData);

        // Fetch cryptocurrency details (for showing name, symbol, etc.)
        const detailResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const details = await detailResponse.json();
        setCryptoDetails(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [id, curr]);

  if (loading) {
    return <div style={{width:"100%",height:"calc(100vh - 1.7cm)",display:"flex"
      ,alignItems:"center",justifyContent:"center",fontSize:"1cm",backgroundColor:"black",color:"white"
    }}>Loading...</div>;
  }

  return (
    <div className="specdiv">
      <div className="bigdiv">
        <div className="maindiv">
          <img
            src={cryptoDetails.image.large}
            alt={cryptoDetails.name}
            style={{ width: "40px", height: "40px" }}
          />
          <h2 style={{ color: "white" }}>{cryptoDetails.name}</h2>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={historicalData}
            margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" stroke="white" fontSize={"10px"} />
            <YAxis domain={["auto", "auto"]} stroke="white" fontSize={"10px"} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#c736ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="otherdetails">
          <div className="desc">
            <p>Market Rank: {cryptoDetails.market_cap_rank}</p>
            <p>
              Current Price: {cryptoDetails.market_data.current_price[curr]}{" "}
              {curr.toUpperCase()}
            </p>
            <p>
              Market Cap:{" "}
              {cryptoDetails.market_data.market_cap[curr]?.toLocaleString()}{" "}
              {curr.toUpperCase()}
            </p>
            <p>
              Total Volume:{" "}
              {cryptoDetails.market_data.total_volume[curr]?.toLocaleString()}{" "}
              {curr.toUpperCase()}
            </p>
            <p>
              24h High: {cryptoDetails.market_data.high_24h[curr]}{" "}
              {curr.toUpperCase()}
            </p>
            <p>
              24h Low: {cryptoDetails.market_data.low_24h[curr]}{" "}
              {curr.toUpperCase()}
            </p>
            <p>
              Price Change (24h):{" "}
              {
              cryptoDetails.market_data.price_change_percentage_24h.toFixed(2) < 0 ? (
                  <>
                    
                    <span style={{ color: "#FF0305",display:"block" }}>{cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                  </>
                ) : (
                  <>
                
                    <span style={{ color: "#4DFF07",display:"block" }}>{cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                  </>
                )}
            </p>
            <p className="sevenday">
              Price Change (7d):{" "}
              {
              cryptoDetails.market_data.price_change_percentage_7d.toFixed(2) < 0 ? (
                  <>
                    
                    <span style={{ color: "#FF0305",display:"block" }}>{cryptoDetails.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                  </>
                ) : (
                  <>
                
                    <span style={{ color: "#4DFF07",display:"block" }}>{cryptoDetails.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                  </>
                )}
            </p>
            <p>
              Total Supply:{" "}
              {cryptoDetails.market_data.total_supply?.toLocaleString() ||
                "N/A"}
            </p>
          </div>

          <div className="textdesc">
            <h3>Description:</h3>
            <p>
              {cryptoDetails.description.en
                ? cryptoDetails.description.en.slice(0, 500)
                : "No description available."}
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoDetail;
