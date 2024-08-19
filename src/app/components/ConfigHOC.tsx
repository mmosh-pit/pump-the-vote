"use client";
import Script from "next/script";
import { useAtom } from "jotai";

import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { settings } from "@/store";

const ConfigHOC = ({ children }: { children: React.ReactNode }) => {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_CLUSTER!;
  const pathname = usePathname();
  const [isOnSettings] = useAtom(settings);

  const WalletProvider = dynamic(() => import("@/lib/ClientWalletProvider"), {
    ssr: false,
  });

  const getClassName = () => {
    if (pathname.includes("create")) return "common-bg";

    if (pathname !== "/" || isOnSettings) {
      return "bg-profile";
    }

    return "common-bg";
  };

  return (
    <>
      <Script
        async
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://telegram.org/js/telegram-widget.js?22"
      ></Script>
      <Script
        async
        strategy="beforeInteractive"
        type="text/javascript"
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
      ></Script>
      <ConnectionProvider
        endpoint={endpoint}
        config={{ confirmTransactionInitialTimeout: 120000 }}
      >
        <WalletProvider autoConnect>
          <div className={getClassName()}>{children}</div>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default ConfigHOC;
