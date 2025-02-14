import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import greenEye from "../assets/images/green-eye.png";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Pagination from "@mui/material/Pagination";

function Home() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24hv`
      )
      .then((response) => {
        if (response.status == 200) {
          return setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        if (response.status == 200) {
          return setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

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
              slidesPerView="4"
              centeredSlides={false}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {data.length > 0 &&
                data.map((value, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      className="w-[250px] flex justify-center items-center pt-5"
                    >
                      <div className="text-center w-full">
                        <img
                          className="w-20 h-20 mx-auto"
                          src={value.image}
                          alt=""
                        />
                        <div className=" flex justify-center gap-1">
                          <p className="justify-center flex text-white">
                            {value.symbol.toUpperCase()}
                          </p>
                          <p className="text-[red]">
                            {value.ath_change_percentage.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-white text-xl">
                          {value.price_change_24h}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
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
            placeholder="Search For a Crypto Currency.."
            className="w-full px-3.5 py-5 border border-border rounded placeholder:text-placeholder placeholder:font-normal placeholder:font-roboto placeholder:text-base text-placeholder font-normal font-roboto text-base mt-3"
          />

          <div className="w-full mt-5">
            <div className="w-full flex bg-button rounded-t px-4 py-5">
              <div className="max-w-[445px] w-full">
                <strong className="">Coin</strong>
              </div>
              <div className="max-w-[264px] w-full flex justify-end px-4">
                <strong>Price</strong>
              </div>
              <div className="max-w-[260px] w-full flex justify-end px-4">
                <strong>24h Change</strong>
              </div>
              <div className="max-w-[263px] w-full flex justify-end">
                <strong>Market Cap</strong>
              </div>
            </div>
            {data.length > 0 &&
              data.map((value, index) => {
                return (
                  <div key={index} className="bg-div rounded-b flex">
                    <div className="max-w-[445px] w-full p-4 flex items-center gap-x-4 border-b border-hr">
                      <div>
                        <img src={value.image} alt="" className="w-[50px]" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="uppercase text-white">
                          {value.symbol}
                        </strong>
                        <small className="text-text">{value.name}</small>
                      </div>
                    </div>
                    <div className="max-w-[264px] w-full flex justify-end items-center border-b border-hr">
                      <strong className="text-white">
                        ₹{value.atl_change_percentage.toFixed(2)}
                      </strong>
                    </div>
                    <div className="max-w-[260px] w-full flex justify-end pr-10 items-center gap-x-4 border-b border-hr">
                      <img src={greenEye} alt="" />
                      <strong
                        className={
                          value.market_cap_change_percentage_24h < 0
                            ? "text-minus"
                            : "text-plus"
                        }
                      >
                        {value.market_cap_change_percentage_24h < 0
                          ? value.market_cap_change_percentage_24h.toFixed(2)
                          : `+${value.market_cap_change_percentage_24h.toFixed(
                              2
                            )}`}
                        %
                      </strong>
                    </div>
                    <div className="max-w-[263px] w-full flex justify-end items-center px-4 border-b border-hr">
                      <strong className="text-white">
                        ₹{value.market_cap}M
                      </strong>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex justify-center mt-5">
            <Pagination
              count={10}
              page={page}
              onChange={(e, value) => {
                setPage(value);
              }}
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
