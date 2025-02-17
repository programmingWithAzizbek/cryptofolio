import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Details() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setData(response.data);
        }
      })
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=1`
      )
      .then((response) => {
        if (response.status == 200) {
          const prices = response.data.prices.map((item) => ({
            time: new Date(item[0]).toLocaleTimeString(),
            price: item[1],
          }));
          setChartData(prices);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!data) {
    return (
      <div className="text-white text-center text-2xl py-10">Loading...</div>
    );
  }

  return (
    <div className="bg-[#14161A] min-h-screen text-white">
      <Header />
      <main>
        <div className="flex justify-between px-6">
          <div className="max-w-[480px] w-full">
            <div className="flex flex-col items-center">
              <img
                src={data.image?.large}
                alt={data.name}
                className="w-[200px]"
              />
              <h2 className="text-5xl font-bold my-5 font-monserrat">
                {data.name}
              </h2>
            </div>
            <p className="text-lg text-gray-300">
              {data.description?.en.split(". ")[0]}.
            </p>
            <p className="text-xl mt-4">Rank: {data.market_cap_rank}</p>
            <p className="text-xl">
              Current Price: ₹{data.market_data?.current_price?.inr}
            </p>
          </div>

          <div className="max-w-[1292px] w-full mt-10 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">
              Price (Past 1 Day) in INR
            </h3>
            <LineChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
