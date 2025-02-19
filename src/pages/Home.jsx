import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import greenEye from "../assets/images/green-eye.png";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const save = useCallback(
    (id) => {
      navigate(`/details/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "USD",
              order: "gecko_desc",
              per_page: 10,
              page: page,
              sparkline: false,
              price_change_percentage: "24h",
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const results = data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(results);
  }, [search, data]);

  return (
    <div>
      <Header />

      <section className="bg-image">
        <div className="max-w-7xl w-full mx-auto px-6 pt-[69px]">
          <h1 className="font-bold text-6xl font-monserrat text-button text-center">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-text text-center font-medium text-sm font-monserrat mt-4">
            Get all the Info regarding your favorite Crypto Currency
          </p>
          <div className="mt-5">
            <Swiper
              className="w-7xl"
              spaceBetween={30}
              slidesPerView={4}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              {filteredData.map((coin) => (
                <SwiperSlide
                  key={coin.id}
                  className="w-[250px] flex justify-center items-center pt-5"
                >
                  <div className="text-center w-full">
                    <img
                      className="w-20 h-20 mx-auto"
                      src={coin.image}
                      alt={coin.name}
                    />
                    <div className="flex justify-center gap-1">
                      <p className="text-white uppercase">{coin.symbol}</p>
                      <p className="text-red-500">
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </p>
                    </div>
                    <p className="text-white text-xl">
                      ${coin.current_price.toFixed(2)}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="bg-section">
        <div className="max-w-7xl w-full mx-auto px-6 py-4">
          <h2 className="font-normal text-3xl font-monserrat text-white text-center">
            Cryptocurrency Prices by Market Cap
          </h2>
          <input
            type="text"
            placeholder="Search For a Crypto Currency..."
            className="w-full px-3.5 py-5 border border-border rounded text-placeholder font-roboto text-base mt-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="w-full mt-5">
            {filteredData.map((coin) => (
              <div key={coin.id} className="bg-div rounded-b flex">
                <div className="max-w-[445px] w-full p-4 flex items-center gap-x-4 border-b border-hr">
                  <img src={coin.image} alt={coin.name} className="w-[50px]" />
                  <div className="flex flex-col">
                    <strong className="uppercase text-white">
                      {coin.symbol}
                    </strong>
                    <small className="text-text">{coin.name}</small>
                  </div>
                </div>
                <div className="max-w-[264px] w-full flex justify-end items-center border-b border-hr">
                  <strong className="text-white">
                    ${coin.current_price.toFixed(2)}
                  </strong>
                </div>
                <div className="max-w-[260px] w-full flex justify-start pl-32 items-center gap-x-4 border-b border-hr">
                  <button
                    onClick={() => save(coin.id)}
                    className="cursor-pointer"
                  >
                    <img src={greenEye} alt="View" />
                  </button>
                  <strong
                    className={
                      coin.market_cap_change_percentage_24h < 0
                        ? "text-minus"
                        : "text-plus"
                    }
                  >
                    {coin.market_cap_change_percentage_24h.toFixed(2)}%
                  </strong>
                </div>
                <div className="max-w-[263px] w-full flex justify-end items-center px-4 border-b border-hr">
                  <strong className="text-white">
                    ${(coin.market_cap / 1_000_000).toFixed(2)}M
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <Pagination
              count={10}
              page={page}
              onChange={(e, value) => setPage(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#87ceeb",
                  backgroundColor: "#3A3B3F",
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
