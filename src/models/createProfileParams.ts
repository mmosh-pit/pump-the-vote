import { AnchorWallet } from "@solana/wallet-adapter-react";
import { ProfileForm } from "./profileForm";
import { ProfileInfo } from "./profileInfo";

export type CreateProfileParams = {
  profileInfo: ProfileInfo;
  form: ProfileForm;
  image: File | null;
  preview: string;
  wallet: AnchorWallet;
};
