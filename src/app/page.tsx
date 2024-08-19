"use client";

import * as React from "react";
import axios from "axios";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";

import { UserStatus, data, incomingWallet, settings, status } from "../store";
import HomePage from "./components/HomePage";
import { fetchUserData } from "../lib/fetchUserData";

export default function Home() {
  const searchParams = useSearchParams();
  const rendered = React.useRef(false);
  const [___, setIncomingWalletToken] = useAtom(incomingWallet);
  const [__, setUserStatus] = useAtom(status);
  const [_, setUserData] = useAtom(data);
  const [isOnSettings] = useAtom(settings);
  const wallet = useAnchorWallet();

  const getUserData = React.useCallback(async () => {
    const result = await fetchUserData(wallet!);

    setUserData(result.data);

    const hasTelegram = !!result.data?.telegram;

    if (!hasTelegram) {
      setUserStatus(UserStatus.noAccount);
      return;
    }

    const hasBotAccount = await axios.get(
      `/api/check-bot-account?telegramId=${result.data.telegram.id}`,
    );

    if (!hasBotAccount) {
      setUserStatus(UserStatus.noAccount);
      return;
    }

    setUserStatus(UserStatus.fullAccount);
  }, [wallet]);

  const renderComponent = () => {
    return <HomePage />;
  };

  React.useEffect(() => {
    if (wallet?.publicKey) {
      getUserData();
    }
  }, [wallet]);

  React.useEffect(() => {
    if (!rendered.current) {
      const param = searchParams.get("socialwallet");

      if (param) {
        setIncomingWalletToken(param);
      }
      rendered.current = true;
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {renderComponent()}
    </div>
  );
}
