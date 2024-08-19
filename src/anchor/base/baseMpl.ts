import { AnchorProvider, BN, Program, web3 } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
// import { WalletContextState } from "@solana/wallet-adapter-react";
import { BaseSpl } from "./baseSpl";
import Config from "./../web3Config.json";
import {
  PROGRAM_ID as MPL_ID,
} from "@metaplex-foundation/mpl-token-metadata";

import {
  Metaplex,
  Metadata as MetadataM,
  CreatorInput,
  UseNftInput,
  VerifyNftCollectionBuilderParams,
  CreateNftBuilderParams,
} from "@metaplex-foundation/js";

const log = console.log;

export class BaseMpl {
  connection: web3.Connection;
  mplIxs: web3.TransactionInstruction[] = [];
  mplSigns: web3.Keypair[] = [];
  metaplex: Metaplex;

  constructor(wallet: any) {
    this.connection = new web3.Connection(Config.rpcURL, "processed");
    this.metaplex = new Metaplex(this.connection);
  }

  setUpCallBack = (
    ixs: web3.TransactionInstruction[],
    signs: web3.Keypair[],
  ) => {
    if (ixs) {
      this.mplIxs.push(...ixs);
      log("ixs added to mpl : ", ixs);
    }
    if (signs) {
      log("sings added to mpl : ", signs);
      this.mplSigns.push(...signs);
    }
  };

  reinit(): void {
    // const user = this.wallet.publicKey;
    //   this.metaplex.identity().setDriver({
    //     signMessage: this.wallet.signMessage,
    //     signTransaction: this.wallet.signTransaction,
    //     signAllTransactions: this.wallet.signAllTransactions,
    //   });
    // }
    //
    // this.mplIxs = [];
  }

  static getEditionAccount(tokenId: web3.PublicKey) {
    return web3.PublicKey.findProgramAddressSync(
      [
        utf8.encode("metadata"),
        MPL_ID.toBuffer(),
        tokenId.toBuffer(),
        utf8.encode("edition"),
      ],
      MPL_ID,
    )[0];
  }

  static getMetadataAccount(tokenId: web3.PublicKey) {
    return web3.PublicKey.findProgramAddressSync(
      [utf8.encode("metadata"), MPL_ID.toBuffer(), tokenId.toBuffer()],
      MPL_ID,
    )[0];
  }

  static getCollectionAuthorityRecordAccount(
    collection: web3.PublicKey,
    authority: web3.PublicKey,
  ): web3.PublicKey {
    return web3.PublicKey.findProgramAddressSync(
      [
        utf8.encode("metadata"),
        MPL_ID.toBuffer(),
        collection.toBuffer(),
        utf8.encode("collection_authority"),
        authority.toBuffer(),
      ],
      MPL_ID,
    )[0];
  }

}
