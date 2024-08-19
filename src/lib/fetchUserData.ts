import { Connection } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

import { Connectivity as UserConn } from "@/anchor/user";
import { web3Consts } from "@/anchor/web3Consts";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export async function fetchUserData(wallet: AnchorWallet) {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const env = new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });

  let userConn = new UserConn(env, web3Consts.programID);
  const profileInfo = await userConn.getUserInfo();
  const profiles = profileInfo.profiles;

  if (profiles.length > 0) {
    const username = profiles[0].userinfo.username;
    const result = await axios.get(`/api/get-user-data?username=${username}`);

    return result;
  } else {
    const walletAddress = wallet?.publicKey;

    const result = await axios.get(
      `/api/get-wallet-data?wallet=${walletAddress}`,
    );

    return result;
  }
}
