import * as React from "react";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export type CreateCoinParams = {
  username: string;
  name: string;
  symbol: string;
  description: string;
  imageFile: File | null;
  preview: string;
  wallet: AnchorWallet;
  multiplier: number;
  supply: number;
  initialPrice: number;
  type: string;
  setMintingStatus: React.Dispatch<React.SetStateAction<string>>;
};
