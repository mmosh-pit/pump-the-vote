import * as React from "react";
import { useAtom } from "jotai";

import { data, isDrawerOpen } from "@/store";
import Banner from "./common/Banner";
import MembersList from "./Home/MembersList";
import CoinsList from "./Home/CoinsList";
import HomeSearch from "./Home/HomeSearch";

const HomePage = () => {
  const [currentUser] = useAtom(data);
  const [isDrawerShown] = useAtom(isDrawerOpen);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center background-content ${
        isDrawerShown ? "z-[-1]" : ""
      }`}
    >
      <Banner />
      <div className="self-center md:max-w-[50%] max-w-[80%]">
        <h5 className="text-center text-white font-goudy font-normal mb-[3vmax] mt-[1vmax]">
          {currentUser?.profile?.name
            ? `Welcome Home, ${currentUser?.profile?.name}`
            : "Howdy Stranger!"}
        </h5>

        <p className="text-center text-base">
          {currentUser?.profile?.name
            ? "A MMOSH is a decentralized, permissionless and composable virtual world available through various access devices and software platforms"
            : "Welcome to MMOSH, the social protocol for connected communities. Make Money Fun!"}
        </p>
      </div>

      <div className="lg:w-[20%] md:w-[30%] sm:w-[40%] w-[50%] self-center flex justify-center my-8">
        <HomeSearch placeholder="Type your search terms" />
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between mt-8 overflow-y-auto md:max-h-[600px] pb-12 py-8">
        <MembersList />

        <CoinsList />
      </div>
    </div>
  );
};

export default HomePage;
