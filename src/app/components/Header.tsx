"use client";

import React from "react";
import axios from "axios";
import * as anchor from "@coral-xyz/anchor";
import { usePathname, useRouter } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { walletAddressShortener } from "@/lib/walletAddressShortener";
import { useAtom } from "jotai";
import {
  UserStatus,
  accounts,
  data,
  incomingWallet,
  isDrawerOpen,
  points,
  status,
  userWeb3Info,
  web3InfoLoading,
} from "@/store";
import useCheckMobileScreen from "@/lib/useCheckMobileScreen";
import MobileDrawer from "./MobileDrawer";
import { Connectivity as UserConn } from "../../anchor/user";
import { web3Consts } from "@/anchor/web3Consts";
import { Connection } from "@solana/web3.js";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const wallet = useAnchorWallet();
  const renderedUserInfo = React.useRef(false);
  const [__, setProfileInfo] = useAtom(userWeb3Info);
  const [___, setIsLoadingProfile] = useAtom(web3InfoLoading);
  const [userStatus] = useAtom(status);
  const [currentUser, setCurrentUser] = useAtom(data);
  const [____, setTotalAccounts] = useAtom(accounts);
  const [incomingWalletToken, setIncomingWalletToken] = useAtom(incomingWallet);
  const [isDrawerShown] = useAtom(isDrawerOpen);
  const [_____, setTotalRoyalties] = useAtom(points);
  const isMobileScreen = useCheckMobileScreen();

  const getHeaderBackground = React.useCallback(() => {
    let defaultClass =
      "w-full flex flex-col justify-center items-center py-6 px-8 ";

    if (pathname.includes("create")) {
      defaultClass += "bg-black bg-opacity-[0.56] backdrop-blur-[10px]";
    } else if (pathname !== "/") {
      defaultClass += "bg-white bg-opacity-[0.07] backdrop-blur-[2px]";
    } else if (pathname === "/") {
      defaultClass += "bg-black bg-opacity-[0.56] backdrop-blur-[2px]";
    }

    return defaultClass;
  }, [userStatus, pathname]);

  const getTotals = React.useCallback(async () => {
    const res = await axios.get("/api/get-header-analytics");

    setTotalAccounts(res.data.members);
    setTotalRoyalties(res.data.royalties);
  }, []);

  const getProfileInfo = async () => {
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
    const env = new anchor.AnchorProvider(connection, wallet!, {
      preflightCommitment: "processed",
    });

    setIsLoadingProfile(true);

    let userConn: UserConn = new UserConn(env, web3Consts.programID);

    const profileInfo = await userConn.getUserInfo();

    console.log("[HEADER] profile info: ", profileInfo);

    const genesis = profileInfo.activationTokens[0]?.genesis;
    const activation = profileInfo.activationTokens[0]?.activation;

    const totalMints = profileInfo.totalChild;

    let firstTime = true;

    if (profileInfo.activationTokens.length > 0) {
      if (profileInfo.activationTokens[0].activation != "") {
        firstTime = false;
      }
    }
    const totalChilds = totalMints;

    let quota = 0;

    if (totalChilds < 3) {
      quota = 10;
    } else if (totalChilds >= 3 && totalChilds < 7) {
      quota = 25;
    } else if (totalChilds >= 7 && totalChilds < 15) {
      quota = 50;
    } else if (totalChilds >= 15 && totalChilds < 35) {
      quota = 250;
    } else if (totalChilds >= 35 && totalChilds < 75) {
      quota = 500;
    } else {
      quota = 1000;
    }

    const profileNft = profileInfo.profiles[0];
    let username = "";
    if (profileNft?.address) {
      username = profileNft.userinfo.username;

      const res = await axios.get(`/api/get-user-data?username=${username}`);
      setCurrentUser(res.data);
    } else {
      const res = await axios.get(
        `/api/get-wallet-data?wallet=${wallet?.publicKey.toBase58()}`,
      );

      setCurrentUser(res.data);
    }

    setProfileInfo({
      generation: profileInfo.generation,
      genesisToken: genesis,
      profileLineage: profileInfo.profilelineage,
      activationToken: activation,
      solBalance: profileInfo.solBalance,
      mmoshBalance: profileInfo.oposTokenBalance,
      usdcBalance: profileInfo.usdcTokenBalance,
      firstTimeInvitation: firstTime,
      quota,
      activationTokenBalance:
        parseInt(profileInfo.activationTokenBalance) + profileInfo.totalChild ||
        0,
      profile: {
        name: username,
        address: profileNft?.address,
        image: profileNft?.userinfo.image,
      },
    });
    setIsLoadingProfile(false);
  };

  React.useEffect(() => {
    if (userStatus === UserStatus.fullAccount && pathname === "/") {
      getTotals();
    }
  }, [userStatus]);

  React.useEffect(() => {
    if (wallet?.publicKey && !renderedUserInfo.current) {
      renderedUserInfo.current = true;
      getProfileInfo();
    } else {
      setIsLoadingProfile(false);
    }
  }, [wallet]);

  React.useEffect(() => {
    if (wallet?.publicKey && incomingWalletToken !== "") {
      (async () => {
        const result = await axios.post("/api/link-social-wallet", {
          token: incomingWalletToken,
          wallet: wallet.publicKey.toString(),
        });

        setCurrentUser(result.data);
        setIncomingWalletToken("");
      })();
    }
  }, [wallet, incomingWalletToken]);

  return (
    <header className="flex flex-col">
      <div className={getHeaderBackground()}>
        <div className="flex w-full justify-between items-center mx-8">
          {isMobileScreen ? (
            <MobileDrawer />
          ) : (
            <div className="w-[33%]">
              <Image
                src="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/logo.png"
                alt="logo"
                className="ml-8"
                width={isMobileScreen ? 40 : 80}
                height={isMobileScreen ? 40 : 80}
              />
            </div>
          )}

          {!isMobileScreen && (
            <div className="flex w-[75%] justify-between items-center">
              <a
                className="text-base text-white cursor-pointer"
                onClick={() => router.replace("/")}
              >
                Leaderboard
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => router.push("/create/coins")}
              >
                Coins
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create");
                }}
              >
                Creators
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create/swap");
                }}
              >
                Swap
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create");
                }}
              >
                ATM
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create/create_coin");
                }}
              >
                Create
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create/create_profile");
                }}
              >
                Join
              </a>

              <a
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  router.push("/create/create_profile");
                }}
              >
                AI Bot
              </a>
            </div>
          )}

          <div className="flex justify-end items-center w-[33%]">
            {currentUser?.profile?.image && (
              <div
                className={`relative w-[2.5vmax] h-[2.5vmax] mr-6 ${isDrawerShown ? "z-[-1]" : ""}`}
              >
                <Image
                  src={currentUser.profile.image}
                  alt="Profile Image"
                  className="rounded-full"
                  layout="fill"
                />
              </div>
            )}

            <WalletMultiButton
              startIcon={undefined}
              style={{
                background:
                  "linear-gradient(91deg, #D858BC -3.59%, #3C00FF 102.16%)",
                padding: "0 2em",
                borderRadius: 15,
                position: "relative",
              }}
            >
              <p className="text-lg text-white">
                {wallet?.publicKey
                  ? walletAddressShortener(wallet.publicKey.toString())
                  : "Connect Wallet"}
              </p>
            </WalletMultiButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
