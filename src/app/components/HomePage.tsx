import * as React from "react";
import { useAtom } from "jotai";

import { isDrawerOpen } from "@/store";
import MembersList from "./Home/MembersList";
import CoinsList from "./Home/CoinsList";
import SearchIcon from "@/assets/icons/SearchIcon";

const HomePage = () => {
  const [isDrawerShown] = useAtom(isDrawerOpen);

  const [searchText, setSearchText] = React.useState("");

  const executeSearch = React.useCallback(() => {}, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center background-content ${
        isDrawerShown ? "z-[-1]" : ""
      }`}
    >
      <div className="flex md:flex-row justify-between items-center w-full mt-16 px-4">
        <div className="flex">
          <div className="flex items-center bg-[#F4F4F4] bg-opacity-[0.15] border-[1px] border-[#C2C2C230] rounded-full p-1 backdrop-filter backdrop-blur-[5px]">
            <div className="bg-[#3C00FF] rounded-full px-8 py-4">
              <p className="text-white font-bold text-base">PTV Price</p>
            </div>
            <p className="text-white font-bold text-base ml-4 px-8">$ 12</p>
          </div>

          <div className="flex items-center mx-4 bg-[#F4F4F4] bg-opacity-[0.15] border-[1px] border-[#C2C2C230] rounded-full p-1 backdrop-filter backdrop-blur-[5px]">
            <div className="bg-[#3C00FF] rounded-full px-8 py-4">
              <p className="text-white font-bold text-base">PTV FDV</p>
            </div>
            <p className="text-white font-bold text-base ml-4 px-8">$ 234,2</p>
          </div>

          <div className="flex items-center bg-[#F4F4F4] bg-opacity-[0.15] border-[1px] border-[#C2C2C230] rounded-full p-1 backdrop-filter backdrop-blur-[5px]">
            <div className="bg-[#3C00FF] rounded-full px-8 py-4">
              <p className="text-white font-bold text-base">PTV TVL</p>
            </div>
            <p className="text-white font-bold text-base ml-4 px-8">$ 232</p>
          </div>
        </div>

        <h4 className="text-center text-white font-goudy font-normal  self-center">
          Leaderboard
        </h4>

        <div className="w-[33%]">
          <div className="flex items-center bg-[#01062326] border-[1px] border-[#C2C2C230] rounded-full p-1 backdrop-filter backdrop-blur-[5px]">
            <button
              className="flex bg-[#3C00FF] rounded-full p-2 items-center"
              onClick={executeSearch}
            >
              <SearchIcon />
            </button>

            <input
              placeholder="Type your search terms"
              className="ml-4 w-full bg-transparent outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  executeSearch();
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between mt-8 overflow-y-auto md:max-h-[70%] pb-12 py-8">
        <CoinsList />

        <MembersList />
      </div>
    </div>
  );
};

export default HomePage;
