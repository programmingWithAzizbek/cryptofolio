import React from "react";
import Header from "../components/Header.jsx";

function Home() {
  return (
    <div>
      <Header />
      <section className="bg-image">
        <div></div>
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
          <div className="w-full flex mt-5">
            <div className="w-[445px]">
              <div className="w-full rounded-tl bg-button px-4 py-5">Coin</div>
            </div>
            <div className="w-[264px]">
              <div className="w-full bg-button px-4 py-5 flex justify-end">
                Price
              </div>
            </div>
            <div className="w-[260px]">
              <div className="w-full bg-button px-4 py-5 flex justify-end">
                24h Change
              </div>
            </div>
            <div className="w-[263px]">
              <div className="w-full rounded-tr bg-button px-4 py-5 flex justify-end">
                Market Cap
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
