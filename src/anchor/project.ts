import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program, web3, BN } from "@coral-xyz/anchor";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { IDL, Mmoshforge } from "./mmoshforge";
import {
  LineageInfo,
  Result,
  TxPassType,
  _MintGensisInput,
  _MintProfileByAtInput,
  _MintProfileInput,
  _MintSubscriptionToken,
  _RegisterCommonLut,
} from "./web3Types";
import Config from "./web3Config.json";
import { BaseMpl } from "./base/baseMpl";
import { web3Consts } from "./web3Consts";
import { getAssociatedTokenAddressSync, unpackAccount } from "forge-spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import { BaseSpl } from "./base/baseSpl";
import axios from "axios";

const {
  systemProgram,
  associatedTokenProgram,
  mplProgram,
  tokenProgram,
  sysvarInstructions,
  Seeds,
  oposToken,
} = web3Consts;
const log = console.log;

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Connectivity {
  programId: web3.PublicKey;
  provider: AnchorProvider;
  txis: web3.TransactionInstruction[] = [];
  extraSigns: web3.Keypair[] = [];
  multiSignInfo: any[] = [];
  program: Program<Mmoshforge>;
  mainState: web3.PublicKey;
  projectId: web3.PublicKey;
  connection: web3.Connection;
  metaplex: Metaplex;
  baseSpl: BaseSpl;

  constructor(
    provider: AnchorProvider,
    programId: web3.PublicKey,
    projectId: web3.PublicKey,
  ) {
    this.provider = provider;
    this.connection = provider.connection;
    this.programId = programId;
    this.program = new Program(IDL, this.provider);
    this.metaplex = new Metaplex(this.connection);
    this.baseSpl = new BaseSpl(this.connection);
    this.projectId = projectId;
    this.mainState = web3.PublicKey.findProgramAddressSync(
      [Seeds.mainState, projectId.toBuffer()],
      this.programId,
    )[0];
  }

  setMainState() {
    console.log("main state assign");
    this.mainState = web3.PublicKey.findProgramAddressSync(
      [Seeds.mainState, this.projectId.toBuffer()],
      this.programId,
    )[0];
    console.log("main state assign ", this.mainState.toBase58());
  }

  async mintGenesisPass(
    input: _MintGensisInput,
  ): Promise<Result<TxPassType<{ profile: string }>, any>> {
    try {
      this.reinit();
      const admin = this.provider.publicKey;
      if (!admin) throw "Wallet not found";
      console.log("test0");
      const mintKp = input.mintKp;
      console.log("test2");
      const collection = web3Consts.passCollection;
      const collectionState = this.__getCollectionStateAccount(collection);
      // const __profileCollectionInfo = await this.program.account.collectionState.fetch(collectionState)
      // const __genesisProfile = __profileCollectionInfo.genesisProfile?.toBase58()
      // if (__genesisProfile && __genesisProfile != web3.SystemProgram.programId.toBase58()) return { Ok: { signature: "", info: { profile: __profileCollectionInfo.genesisProfile?.toBase58() } } }

      const profile = mintKp.publicKey;
      console.log("profile is ", profile.toBase58());


      const { ixs: mintIxs } = await this.baseSpl.__getCreateTokenInstructions({
        mintAuthority: admin,
        mintKeypair: mintKp,
        mintingInfo: {
          tokenAmount: 1,
          tokenReceiver: admin,
        },
      });

      const mintTx = new web3.Transaction().add(...mintIxs);

      mintTx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      mintTx.feePayer = this.provider.publicKey;

      const feeEstimateMint = await this.getPriorityFeeEstimate(mintTx);
      let feeInsMint;
      if (feeEstimateMint > 0) {
        feeInsMint = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimateMint,
        });
      } else {
        feeInsMint = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      mintTx.add(feeInsMint);

      this.txis = [];
      const mintsignature = await this.provider.sendAndConfirm(mintTx, [
        mintKp,
      ]);

      await sleep(5000)
      
      const profileState = this.__getProfileStateAccount(profile);
      const profileMetadata = BaseMpl.getMetadataAccount(profile);
      const profileEdition = BaseMpl.getEditionAccount(profile);
      const collectionMetadata = BaseMpl.getMetadataAccount(collection);
      const collectionEdition = BaseMpl.getEditionAccount(collection);
      // const collectionState = this.__getCollectionStateAccount(collection)
      const adminAta = getAssociatedTokenAddressSync(profile, admin);

      console.log("test3");

      const parentMainState = web3.PublicKey.findProgramAddressSync(
        [Seeds.mainState],
        this.programId,
      )[0];

      const ix = await this.program.methods
        .mintGenesisPass(input.name, input.symbol, input.uri, input.input)
        .accounts({
          user: admin,
          userProfileAta: adminAta,
          profile,
          mainState: this.mainState,
          parentMainState,
          collection,
          mplProgram,
          profileState,
          associatedTokenProgram,
          tokenProgram,
          systemProgram,
          profileEdition,
          profileMetadata,
          collectionEdition,
          collectionMetadata,
          collectionState,
          sysvarInstructions,
        })
        .instruction();
      this.txis.push(ix);

      const tx = new web3.Transaction().add(...this.txis);
      tx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = this.provider.publicKey;

      const feeEstimate = await this.getPriorityFeeEstimate(tx);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      tx.add(feeIns);

      this.txis = [];
      const signature = await this.provider.sendAndConfirm(tx, [mintKp]);
      return {
        Ok: { signature, info: { profile: profile.toBase58() } },
      };
    } catch (e) {
      log({ error: e });
      return { Err: e };
    }
  }

  reinit() {
    this.txis = [];
    this.extraSigns = [];
    this.multiSignInfo = [];
  }

  ixCallBack = (ixs?: web3.TransactionInstruction[]) => {
    if (ixs) {
      this.txis.push(...ixs);
    }
  };

  __getProfileStateAccount(mint: web3.PublicKey | string): web3.PublicKey {
    if (typeof mint == "string") mint = new web3.PublicKey(mint);
    return web3.PublicKey.findProgramAddressSync(
      [Seeds.profileState, mint.toBuffer()],
      this.programId,
    )[0];
  }

  __getCollectionStateAccount(mint: web3.PublicKey): web3.PublicKey {
    return web3.PublicKey.findProgramAddressSync(
      [Seeds.collectionState, mint.toBuffer()],
      this.programId,
    )[0];
  }

  __getActivationTokenStateAccount(mint: web3.PublicKey): web3.PublicKey {
    return web3.PublicKey.findProgramAddressSync(
      [Seeds.activationTokenState, mint.toBuffer()],
      this.programId,
    )[0];
  }

  __getValutAccount(profile: web3.PublicKey): web3.PublicKey {
    return web3.PublicKey.findProgramAddressSync(
      [Seeds.vault, profile.toBuffer()],
      this.programId,
    )[0];
  }

  async sendProjectPrice(
    profile: any,
  ): Promise<Result<TxPassType<{ profile: string }>, any>> {
    try {
      const user = this.provider.publicKey;
      let myProfile = new anchor.web3.PublicKey(profile);
      const myProfileState = this.__getProfileStateAccount(myProfile);
      let myProfileStateInfo =
        await this.program.account.profileState.fetch(myProfileState);

      console.log("myProfileStateInfo ", myProfileStateInfo);

      const parentProfile = myProfileStateInfo.lineage.parent;

      console.log("parentProfile ", parentProfile.toBase58());

      let parentProfileStateInfo =
        await this.program.account.profileState.fetch(
          this.__getProfileStateAccount(parentProfile),
        );

      console.log("parentProfileStateInfo ", parentProfileStateInfo);

      const profileCollection = web3Consts.profileCollection;
      const profileCollectionState =
        await this.program.account.collectionState.fetch(
          this.__getCollectionStateAccount(profileCollection),
        );
      const genesisProfile = profileCollectionState.genesisProfile;

      const {
        //profiles
        // genesisProfile,
        // parentProfile,
        //
        currentGreatGrandParentProfileHolder,
        currentGgreatGrandParentProfileHolder,
        currentGrandParentProfileHolder,
        currentGenesisProfileHolder,
        currentParentProfileHolder,
        //
        //
      } = await this.__getProfileHoldersInfo(
        parentProfileStateInfo.lineage,
        parentProfile,
        genesisProfile,
        web3Consts.oposToken,
      );

      const userOposAta = getAssociatedTokenAddressSync(oposToken, user);

      const rootMainState = web3.PublicKey.findProgramAddressSync(
        [Seeds.mainState],
        this.programId,
      )[0];

      const rootMainStateInfo =
        await this.program.account.mainState.fetch(rootMainState);
      let cost = 45000 * web3Consts.LAMPORTS_PER_OPOS;

      let holdersfullInfo = [];

      holdersfullInfo.push({
        receiver: currentGenesisProfileHolder.toBase58(),
        vallue:
          cost *
          (rootMainStateInfo.mintingCostDistribution.genesis / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentParentProfileHolder.toBase58(),
        vallue:
          cost * (rootMainStateInfo.mintingCostDistribution.parent / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentGrandParentProfileHolder.toBase58(),
        vallue:
          cost *
          (rootMainStateInfo.mintingCostDistribution.grandParent / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentGreatGrandParentProfileHolder.toBase58(),
        vallue:
          cost *
          (rootMainStateInfo.mintingCostDistribution.greatGrandParent /
            100 /
            100),
      });

      holdersfullInfo.push({
        receiver: currentGgreatGrandParentProfileHolder.toBase58(),
        vallue:
          cost *
          (rootMainStateInfo.mintingCostDistribution.ggreatGrandParent /
            100 /
            100),
      });

      const holdermap: any = [];
      holdersfullInfo.reduce(function (res: any, value) {
        if (!res[value.receiver]) {
          res[value.receiver] = { receiver: value.receiver, vallue: 0 };
          holdermap.push(res[value.receiver]);
        }
        res[value.receiver].vallue += value.vallue;
        return res;
      }, {});

      for (let index = 0; index < holdermap.length; index++) {
        const element = holdermap[index];
        let createShare: any = await this.baseSpl.transfer_token_modified({
          mint: rootMainStateInfo.oposToken,
          sender: user,
          receiver: new anchor.web3.PublicKey(element.receiver),
          init_if_needed: true,
          amount: element.vallue,
        });
        for (let index = 0; index < createShare.length; index++) {
          this.txis.push(createShare[index]);
        }
      }

      const tx = new web3.Transaction().add(...this.txis);

      tx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = this.provider.publicKey;

      const feeEstimate = await this.getPriorityFeeEstimate(tx);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      tx.add(feeIns);

      this.txis = [];
      const signature = await this.provider.sendAndConfirm(tx);

      await this.storeRoyalty(
        user.toBase58(),
        [
          {
            receiver: currentGenesisProfileHolder.toBase58(),
            amount: 27000,
          },
          {
            receiver: currentParentProfileHolder.toBase58(),
            amount: 9000,
          },
          {
            receiver: currentGrandParentProfileHolder.toBase58(),
            amount: 4500,
          },
          {
            receiver: currentGgreatGrandParentProfileHolder.toBase58(),
            amount: 1350,
          },
        ],
        web3Consts.oposToken,
      );

      return {
        Ok: {
          signature,
          info: { profile: profile },
        },
      };
    } catch (error) {
      log({ error });
      return { Err: error };
    }
  }

  async setupLookupTable(
    addresses: web3.PublicKey[] = [],
  ): Promise<Result<TxPassType<{ lookupTable: string }>, any>> {
    try {
      const slot = await this.connection.getSlot();
      const [lookupTableInst, lookupTableAddress] =
        web3.AddressLookupTableProgram.createLookupTable({
          authority: this.provider.publicKey,
          payer: this.provider.publicKey,
          recentSlot: slot - 1,
        });

      const extendInstruction =
        web3.AddressLookupTableProgram.extendLookupTable({
          payer: this.provider.publicKey,
          authority: this.provider.publicKey,
          lookupTable: lookupTableAddress,
          addresses,
        });
      const freezeInstruction =
        web3.AddressLookupTableProgram.freezeLookupTable({
          lookupTable: lookupTableAddress, // The address of the lookup table to freeze
          authority: this.provider.publicKey, // The authority (i.e., the account with permission to modify the lookup table)
        });

      const transaction = new web3.Transaction().add(
        lookupTableInst,
        extendInstruction,
        freezeInstruction,
      );

      transaction.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = this.provider.publicKey;

      const feeEstimate = await this.getPriorityFeeEstimate(transaction);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      transaction.add(feeIns);

      const signature = await this.provider.sendAndConfirm(transaction as any);
      return {
        Ok: { signature, info: { lookupTable: lookupTableAddress.toBase58() } },
      };
    } catch (err) {
      log("Error: ", err);
      return { Err: err };
    }
  }

  async mintPass(
    input: _MintProfileByAtInput,
    userProfile: string,
  ): Promise<Result<TxPassType<{ profile: string }>, any>> {
    try {
      this.reinit();
      this.baseSpl.__reinit();
      const user = this.provider.publicKey;
      if (!user) throw "Wallet not found";
      let {
        name,
        symbol,
        uriHash,
        activationToken,
        genesisProfile,
        commonLut,
      } = input;
      if (typeof activationToken == "string")
        activationToken = new web3.PublicKey(activationToken);
      if (typeof genesisProfile == "string")
        genesisProfile = new web3.PublicKey(activationToken);

      console.log("mint pass 1");
      symbol = symbol ?? "";
      uriHash = uriHash ?? "";
      console.log("mint pass 2");
      const activationTokenState =
        this.__getActivationTokenStateAccount(activationToken);
      const activationTokenStateInfo =
        await this.program.account.activationTokenState.fetch(
          activationTokenState,
        );
      console.log("mint pass 3");
      const parentProfile = activationTokenStateInfo.parentProfile;
      const parentProfileStateInfo =
        await this.program.account.profileState.fetch(
          this.__getProfileStateAccount(parentProfile),
        );
      console.log("mint pass 4");
      const lut = parentProfileStateInfo.lut;
      const parentProfileNftInfo = await this.metaplex
        .nfts()
        .findByMint({ mintAddress: parentProfile, loadJsonMetadata: false });
      console.log("mint pass 4");
      const collection = parentProfileNftInfo?.collection?.address;
      if (!collection) return { Err: "Collection info not found" };
      const collectionMetadata = BaseMpl.getMetadataAccount(collection);
      const collectionEdition = BaseMpl.getEditionAccount(collection);
      const mintKp = web3.Keypair.generate();
      const profile = mintKp.publicKey;


      const { ixs: mintIxs } = await this.baseSpl.__getCreateTokenInstructions({
        mintAuthority: user,
        mintKeypair: mintKp,
        mintingInfo: {
          tokenAmount: 1,
          tokenReceiver: user,
        },
      });

      const mintTx = new web3.Transaction().add(...mintIxs);

      mintTx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      mintTx.feePayer = this.provider.publicKey;

      const feeEstimateMint = await this.getPriorityFeeEstimate(mintTx);
      let feeInsMint;
      if (feeEstimateMint > 0) {
        feeInsMint = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimateMint,
        });
      } else {
        feeInsMint = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      mintTx.add(feeInsMint);

      this.txis = [];
      const mintsignature = await this.provider.sendAndConfirm(mintTx, [
        mintKp,
      ]);

      await sleep(5000)

      const userProfileAta = getAssociatedTokenAddressSync(profile, user);
      const { ata: userActivationTokenAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: activationToken, owner: user },
          this.ixCallBack,
        );
      console.log("mint pass 6");
      const profileMetadata = BaseMpl.getMetadataAccount(profile);
      const profileEdition = BaseMpl.getEditionAccount(profile);
      const profileState = this.__getProfileStateAccount(profile);
      const parentProfileState = this.__getProfileStateAccount(parentProfile);
      const mainStateInfo = await this.program.account.mainState.fetch(
        this.mainState,
      );
      console.log("mint pass 7");
      const {
        currentGenesisProfileHolder,
        currentGrandParentProfileHolder,
        currentParentProfileHolder,
      } = await this.__getProfileHoldersInfo(
        parentProfileStateInfo.lineage,
        parentProfile,
        genesisProfile,
        mainStateInfo.oposToken,
      );

      console.log("mint pass 71", userProfile);
      console.log("mint pass 711", mainStateInfo.oposToken.toBase58());
      let myProfile = new anchor.web3.PublicKey(userProfile);
      const myProfileState = this.__getProfileStateAccount(myProfile);
      console.log("mint pass 72");
      let myProfileStateInfo =
        await this.program.account.profileState.fetch(myProfileState);
      console.log("mint pass 73");
      const profileHolderInfo = await this.__getProfileHoldersInfo(
        myProfileStateInfo.lineage,
        myProfile,
        web3Consts.genesisProfile,
        mainStateInfo.oposToken,
      );
      console.log("mint pass 74");

      console.log("mint pass 8");
      const userOposAta = getAssociatedTokenAddressSync(
        mainStateInfo.oposToken,
        user,
      );
      const parentMainState = web3.PublicKey.findProgramAddressSync(
        [Seeds.mainState],
        this.programId,
      )[0];
      console.log("mint pass 9");
      const ix = await this.program.methods
        .mintPassByAt(name, symbol, uriHash)
        .accounts({
          profile, // 1
          project: this.projectId,
          user, // 2
          oposToken: mainStateInfo.oposToken, // 3
          userProfileAta, // 5
          mainState: this.mainState, // 6
          parentMainState,
          collection, // 7
          mplProgram, // 8
          profileState, // 9
          tokenProgram, // 10
          systemProgram, // 11
          profileEdition, // 12
          activationToken, // 13
          profileMetadata, // 14
          collectionEdition, // 15
          collectionMetadata, // 16
          parentProfileState, // 17
          sysvarInstructions, // 18
          userActivationTokenAta, // 19
          associatedTokenProgram, // 20
          parentProfile,
        })
        .instruction();
      this.txis.push(ix);

      let cost = mainStateInfo.profileMintingCost.toNumber();

      let holdersfullInfo = [];

      holdersfullInfo.push({
        receiver: profileHolderInfo.currentGenesisProfileHolder.toBase58(),
        vallue:
          cost * (mainStateInfo.mintingCostDistribution.genesis / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: profileHolderInfo.currentParentProfileHolder.toBase58(),
        vallue:
          cost * (mainStateInfo.mintingCostDistribution.parent / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentGenesisProfileHolder.toBase58(),
        vallue:
          cost *
          (mainStateInfo.mintingCostDistribution.grandParent / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentParentProfileHolder.toBase58(),
        vallue:
          cost *
          (mainStateInfo.mintingCostDistribution.greatGrandParent / 100 / 100),
      });

      holdersfullInfo.push({
        receiver: currentGrandParentProfileHolder.toBase58(),
        vallue:
          cost *
          (mainStateInfo.mintingCostDistribution.ggreatGrandParent / 100 / 100),
      });

      const holdermap: any = [];
      holdersfullInfo.reduce(function (res: any, value) {
        if (!res[value.receiver]) {
          res[value.receiver] = { receiver: value.receiver, vallue: 0 };
          holdermap.push(res[value.receiver]);
        }
        res[value.receiver].vallue += value.vallue;
        return res;
      }, {});

      for (let index = 0; index < holdermap.length; index++) {
        const element = holdermap[index];
        let createShare: any = await this.baseSpl.transfer_token_modified({
          mint: mainStateInfo.oposToken,
          sender: user,
          receiver: new anchor.web3.PublicKey(element.receiver),
          init_if_needed: true,
          amount: element.vallue,
        });
        for (let index = 0; index < createShare.length; index++) {
          this.txis.push(createShare[index]);
        }
      }

      console.log("mint pass 10", commonLut);
      const commonLutInfo = await (
        await this.connection.getAddressLookupTable(
          new anchor.web3.PublicKey(commonLut),
        )
      ).value;
      console.log("mint pass 11");
      const lutsInfo = [commonLutInfo!];

      const freezeInstructions = await this.calculatePriorityFee(
        ix,
        lutsInfo,
        mintKp,
      );

      console.log("mint pass 12");
      for (let index = 0; index < freezeInstructions.length; index++) {
        const element = freezeInstructions[index];
        this.txis.push(element);
      }

      const blockhash = (await this.connection.getLatestBlockhash()).blockhash;
      const message = new web3.TransactionMessage({
        payerKey: this.provider.publicKey,
        recentBlockhash: blockhash,
        instructions: [...this.txis],
      }).compileToV0Message(lutsInfo);
      console.log("mint pass 13");
      const tx = new web3.VersionedTransaction(message);
      tx.sign([mintKp]);
      this.txis = [];
      console.log("mint pass 14");
      // const signedTx = await this.provider.wallet.signTransaction(tx as any);
      // const txLen = signedTx.serialize().length;
      // log({ txLen, luts: lutsInfo.length });

      const signature = await this.provider.sendAndConfirm(tx as any);

      await this.storeRoyalty(
        user.toBase58(),
        [
          {
            receiver: profileHolderInfo.currentGenesisProfileHolder.toBase58(),
            amount:
              (mainStateInfo.profileMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS) *
              (mainStateInfo.mintingCostDistribution.genesis / 10000),
          },
          {
            receiver: profileHolderInfo.currentParentProfileHolder.toBase58(),
            amount:
              (mainStateInfo.profileMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS) *
              (mainStateInfo.mintingCostDistribution.parent / 10000),
          },
          {
            receiver: currentGenesisProfileHolder.toBase58(),
            amount:
              (mainStateInfo.profileMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS) *
              (mainStateInfo.mintingCostDistribution.grandParent / 10000),
          },
          {
            receiver: currentParentProfileHolder.toBase58(),
            amount:
              (mainStateInfo.profileMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS) *
              (mainStateInfo.mintingCostDistribution.greatGrandParent / 10000),
          },
          {
            receiver: currentGrandParentProfileHolder.toBase58(),
            amount:
              (mainStateInfo.profileMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS) *
              (mainStateInfo.mintingCostDistribution.ggreatGrandParent / 10000),
          },
        ],
        mainStateInfo.oposToken.toBase58(),
      );

      console.log("mint pass 15");
      return {
        Ok: {
          signature,
          info: { profile: profile.toBase58() },
        },
      };
    } catch (error) {
      log({ error });
      return { Err: error };
    }
  }

  async registerCommonLut() {
    const collection = web3Consts.passCollection;
    const collectionMetadata = BaseMpl.getMetadataAccount(collection);
    const collectionEdition = BaseMpl.getEditionAccount(collection);
    const mainStateInfo = await this.program.account.mainState.fetch(
      this.mainState,
    );
    const parentMainState = web3.PublicKey.findProgramAddressSync(
      [Seeds.mainState],
      this.programId,
    )[0];

    const lookupResult = await this.setupLookupTable([
      oposToken,
      mainStateInfo.oposToken, // 1
      this.mainState, // 2
      parentMainState,
      this.programId,
      collection, // 3
      mplProgram, // 4
      tokenProgram, // 5
      systemProgram, // 6
      collectionEdition, // 7
      collectionMetadata, // 8
      sysvarInstructions, // 9
      associatedTokenProgram, // 10
    ]);

    return lookupResult;
  }

  async storeRoyalty(sender: string, receivers: any, coin: any) {
    await axios.post("/api/update-royalty", {
      sender,
      receivers,
      coin,
    });
  }

  async calculatePriorityFee(instructions: any, lutsInfo: any, mintKp: any) {
    const blockhash = (await this.connection.getLatestBlockhash()).blockhash;
    const message = new web3.TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: blockhash,
      instructions: [...this.txis],
    }).compileToV0Message(lutsInfo);

    const tx = new web3.VersionedTransaction(message);
    tx.sign([mintKp]);

    const feeEstimate = await this.getPriorityFeeEstimate(tx);
    let feeIns: any = [];
    if (feeEstimate > 0) {
      feeIns.push(
        web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        }),
      );
      feeIns.push(
        web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        }),
      );
    } else {
      feeIns.push(
        web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        }),
      );
    }

    return feeIns;
  }

  async getPriorityFeeEstimate(transaction: any) {
    try {
      const response = await fetch(Config.rpcURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "1",
          method: "getPriorityFeeEstimate",
          params: [
            {
              transaction: bs58.encode(
                transaction.serialize({
                  requireAllSignatures: false,
                  verifySignatures: false,
                }),
              ),
              options: { priorityLevel: "High" },
            },
          ],
        }),
      });
      const data = await response.json();
      console.log(
        "Fee in function for",
        "HIGH",
        " :",
        data.result.priorityFeeEstimate,
      );
      return Math.floor(data.result.priorityFeeEstimate);
    } catch (error) {
      console.log("getPriorityFeeEstimate ", error);
      return 0;
    }
  }

  async storeLineage(wallet: string, lineage: any, profile: string) {
    await axios.post("/api/save-lineage", {
      wallet,
      lineage,
      profile,
    });
  }

  async initBadge(input: {
    profile: web3.PublicKey | string;
    name?: string;
    symbol?: string;
    uri?: string;
  }): Promise<Result<TxPassType<{ subscriptionToken: string }>, any>> {
    try {
      const user = this.provider.publicKey;
      this.reinit();
      let { profile, name, symbol, uri } = input;
      symbol = symbol ?? "";
      uri = uri ?? "";
      if (typeof profile == "string") profile = new web3.PublicKey(profile);
      const profileState = this.__getProfileStateAccount(profile);
      const profileStateInfo =
        await this.program.account.profileState.fetch(profileState);

      if (profileStateInfo.activationToken) {
        let hasInvitation = await this.isCreatorInvitation(
          profileStateInfo.activationToken,
          user.toBase58(),
        );
        if (hasInvitation) {
          return {
            Ok: {
              signature: "",
              info: {
                subscriptionToken: profileStateInfo.activationToken.toBase58(),
              },
            },
          };
        }
      }

      const profileMetadata = BaseMpl.getMetadataAccount(profile);
      const profileEdition = BaseMpl.getEditionAccount(profile);
      const profileCollectionAuthorityRecord =
        BaseMpl.getCollectionAuthorityRecordAccount(profile, this.mainState);
      const { ata: userProfileAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: profile, owner: user },
          this.ixCallBack,
        );
      const activationTokenKp = web3.Keypair.generate();
      const activationToken = activationTokenKp.publicKey;
      const activationTokenMetadata =
        BaseMpl.getMetadataAccount(activationToken);
      const activationTokenState =
        this.__getActivationTokenStateAccount(activationToken);
      const userActivationTokenAta = getAssociatedTokenAddressSync(
        activationToken,
        user,
      );

      const parentCollection = web3Consts.badgeCollection;
      const parentCollectionMetadata =
        BaseMpl.getMetadataAccount(parentCollection);
      const parentCollectionEdition =
        BaseMpl.getEditionAccount(parentCollection);

      const parentMainState = web3.PublicKey.findProgramAddressSync(
        [Seeds.mainState],
        this.programId,
      )[0];

      console.log("this.projectid is ", this.projectId);

      const ix = await this.program.methods
        .initPassToken(name!, symbol!, uri)
        .accounts({
          profile,
          mainState: this.mainState,
          parentMainState,
          project: this.projectId,
          user,
          associatedTokenProgram,
          mplProgram,
          profileState,
          tokenProgram,
          systemProgram,
          profileEdition,
          userProfileAta,
          activationToken,
          profileMetadata,
          sysvarInstructions,
          activationTokenState,
          userActivationTokenAta,
          activationTokenMetadata,
          profileCollectionAuthorityRecord,
          parentCollection,
          parentCollectionMetadata,
          parentCollectionEdition,
        })
        .instruction();
      this.txis.push(ix);
      const tx = new web3.Transaction().add(...this.txis);
      tx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = this.provider.publicKey;

      const feeEstimate = await this.getPriorityFeeEstimate(tx);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      tx.add(feeIns);

      this.txis = [];
      const signature = await this.provider.sendAndConfirm(tx, [
        activationTokenKp,
      ]);
      return {
        Ok: {
          signature,
          info: { subscriptionToken: activationToken.toBase58() },
        },
      };
    } catch (e) {
      log({ error: e });
      return { Err: e };
    }
  }

  async createBadge(
    input: _MintSubscriptionToken,
  ): Promise<Result<TxPassType<any>, any>> {
    try {
      this.reinit();
      const user = this.provider.publicKey;
      if (!user) throw "Wallet not found";
      let { subscriptionToken, receiver, parentProfile, amount } = input;
      amount = amount ?? 1;

      console.log("mintBadge 1");
      let subscriptionTokenState: web3.PublicKey | null = null;
      if (!subscriptionToken) {
        if (!parentProfile) throw "Parent Profile not found";
        if (typeof parentProfile == "string")
          parentProfile = new web3.PublicKey(parentProfile);
        const parentProfileStateInfoData =
          await this.program.account.profileState.fetch(
            this.__getProfileStateAccount(parentProfile),
          );
        subscriptionToken = parentProfileStateInfoData.activationToken!;
        if (!subscriptionToken) throw "Subscription Token not initialised";
        subscriptionTokenState =
          this.__getActivationTokenStateAccount(subscriptionToken);
      } else {
        if (typeof subscriptionToken == "string")
          subscriptionToken = new web3.PublicKey(subscriptionToken);
        subscriptionTokenState =
          this.__getActivationTokenStateAccount(subscriptionToken);
      }

      console.log("mintBadge 2");

      const activationTokenStateInfo =
        await this.program.account.activationTokenState.fetch(
          subscriptionTokenState,
        );
      console.log("mintBadge 3");
      parentProfile = activationTokenStateInfo.parentProfile;
      const parentProfileState = this.__getProfileStateAccount(parentProfile);
      console.log("mintBadge 4");
      let parentProfileStateInfo =
        await this.program.account.profileState.fetch(parentProfileState);
      console.log("mintBadge 5");
      if (!receiver) receiver = user;
      if (typeof receiver == "string") receiver = new web3.PublicKey(receiver);
      const { ata: receiverAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: subscriptionToken, owner: receiver },
          this.ixCallBack,
        );
      console.log("mintBadge 6");
      // const profile = activationTokenStateInfo.parentProfile
      const profileState = this.__getProfileStateAccount(parentProfile);
      console.log("mintBadge 6");
      const { ata: minterProfileAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: parentProfile, owner: user },
          this.ixCallBack,
        );

      const ix = await this.program.methods
        .createPassToken(new BN(amount))
        .accounts({
          activationTokenState: subscriptionTokenState,
          tokenProgram,
          activationToken: subscriptionToken,
          profile: parentProfile,
          profileState,
          minterProfileAta,
          mainState: this.mainState,
          project: this.projectId,
          minter: user,
          receiverAta,
          //NOTE: Profile minting cost distributaion account
          systemProgram,
          associatedTokenProgram,
        })
        .instruction();
      this.txis.push(ix);

      const tx = new web3.Transaction().add(...this.txis);
      tx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = this.provider.publicKey;
      const feeEstimate = await this.getPriorityFeeEstimate(tx);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      tx.add(feeIns);
      this.txis = [];
      const signature = await this.provider.sendAndConfirm(tx);
      return { Ok: { signature, info: {} } };
    } catch (error) {
      log({ error });
      return { Err: error };
    }
  }

  async mintBadge(
    input: _MintSubscriptionToken,
  ): Promise<Result<TxPassType<any>, any>> {
    try {
      this.reinit();
      const user = this.provider.publicKey;
      if (!user) throw "Wallet not found";
      let { subscriptionToken, receiver, parentProfile, amount } = input;
      amount = amount ?? 1;

      let subscriptionTokenState: web3.PublicKey | null = null;
      if (!subscriptionToken) {
        if (!parentProfile) throw "Parent Profile not found";
        if (typeof parentProfile == "string")
          parentProfile = new web3.PublicKey(parentProfile);
        const parentProfileStateInfoData =
          await this.program.account.profileState.fetch(
            this.__getProfileStateAccount(parentProfile),
          );
        subscriptionToken = parentProfileStateInfoData.activationToken!;
        if (!subscriptionToken) throw "Subscription Token not initialised";
        subscriptionTokenState =
          this.__getActivationTokenStateAccount(subscriptionToken);
      } else {
        if (typeof subscriptionToken == "string")
          subscriptionToken = new web3.PublicKey(subscriptionToken);
        subscriptionTokenState =
          this.__getActivationTokenStateAccount(subscriptionToken);
      }

      console.log("test1");

      const activationTokenStateInfo =
        await this.program.account.activationTokenState.fetch(
          subscriptionTokenState,
        );
      parentProfile = activationTokenStateInfo.parentProfile;
      const parentProfileState = this.__getProfileStateAccount(parentProfile);
      let parentProfileStateInfo =
        await this.program.account.profileState.fetch(parentProfileState);
      console.log("test2");
      if (!receiver) receiver = user;
      if (typeof receiver == "string") receiver = new web3.PublicKey(receiver);
      const { ata: receiverAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: subscriptionToken, owner: receiver },
          this.ixCallBack,
        );

      // const profile = activationTokenStateInfo.parentProfile
      const profileState = this.__getProfileStateAccount(parentProfile);
      const { ata: minterProfileAta } =
        await this.baseSpl.__getOrCreateTokenAccountInstruction(
          { mint: parentProfile, owner: user },
          this.ixCallBack,
        );
      console.log("test3");
      const mainStateDetail = await this.program.account.mainState.fetch(
        this.mainState,
      );
      const profileCollection = web3Consts.passCollection;
      const profileCollectionState =
        await this.program.account.collectionState.fetch(
          this.__getCollectionStateAccount(profileCollection),
        );
      const genesisProfile = profileCollectionState.genesisProfile;
      console.log("test3");
      const { currentGenesisProfileHolder } =
        await this.__getProfileHoldersInfo(
          parentProfileStateInfo.lineage,
          parentProfile,
          genesisProfile,
          mainStateDetail.oposToken,
        );

      const ix = await this.program.methods
        .createPassToken(new BN(amount))
        .accounts({
          activationTokenState: subscriptionTokenState,
          tokenProgram,
          activationToken: subscriptionToken,
          profile: parentProfile,
          profileState,
          minterProfileAta,
          project: this.projectId,
          mainState: this.mainState,
          minter: user,
          receiverAta,
          systemProgram,
          associatedTokenProgram,
        })
        .instruction();
      this.txis.push(ix);

      // if(this.provider.publicKey != currentGenesisProfileHolder) {
      let mintPrice =
        amount *
        (mainStateDetail.invitationMintingCost.toNumber() / 1000_000_000) *
        1000_000_000;
      console.log("invitation mintPrice ", mintPrice);
      let receivedIXs: any = await this.baseSpl.transfer_token_modified({
        mint: mainStateDetail.oposToken,
        sender: this.provider.publicKey,
        receiver: currentGenesisProfileHolder,
        init_if_needed: true,
        amount: mintPrice,
      });
      for (let index = 0; index < receivedIXs.length; index++) {
        this.txis.push(receivedIXs[index]);
      }

      // }

      const tx = new web3.Transaction().add(...this.txis);

      tx.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = this.provider.publicKey;

      const feeEstimate = await this.getPriorityFeeEstimate(tx);
      let feeIns;
      if (feeEstimate > 0) {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: feeEstimate,
        });
      } else {
        feeIns = web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_400_000,
        });
      }
      tx.add(feeIns);

      this.txis = [];
      const signature = await this.provider.sendAndConfirm(tx);

      await this.storeRoyalty(
        user.toBase58(),
        [
          {
            receiver: currentGenesisProfileHolder.toBase58(),
            amount:
              amount *
              (mainStateDetail.invitationMintingCost.toNumber() /
                web3Consts.LAMPORTS_PER_OPOS),
          },
        ],
        mainStateDetail.oposToken.toBase58(),
      );

      return { Ok: { signature, info: {} } };
    } catch (error) {
      log({ error });
      return { Err: error };
    }
  }

  async isCreatorInvitation(mintAddress: web3.PublicKey, userAddress: string) {
    try {
      const mintData = await this.metaplex.nfts().findByMint({ mintAddress });
      if (
        mintData.collection?.address.toBase58() !=
        web3Consts.badgeCollection.toBase58()
      ) {
        return false;
      }
      if (mintData.creators.length == 0) {
        return false;
      }
      for (let index = 0; index < mintData.creators.length; index++) {
        if (mintData.creators[index].address.toBase58() == userAddress) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  getAddressString(pubKey: web3.PublicKey) {
    try {
      return pubKey.toBase58();
    } catch (error) {
      return "";
    }
  }

  async getProfileLineage(currentParentProfile: web3.PublicKey) {
    try {
      const profileStateInfo = await this.program.account.profileState.fetch(
        this.__getProfileStateAccount(currentParentProfile),
      );
      console.log("getProfileLineage ", profileStateInfo);
      const mainStateInfo = await this.program.account.mainState.fetch(
        this.mainState,
      );
      const {
        parentProfile,
        grandParentProfile,
        greatGrandParentProfile,
        ggreateGrandParentProfile,
        currentGreatGrandParentProfileHolder,
        currentGgreatGrandParentProfileHolder,
        currentGrandParentProfileHolder,
        currentParentProfileHolder,
      } = await this.__getProfileHoldersInfo(
        profileStateInfo.lineage,
        currentParentProfile,
        web3Consts.genesisProfile,
        mainStateInfo.oposToken,
      );

      return {
        promoter: this.getAddressString(currentParentProfileHolder),
        promoterprofile: this.getAddressString(parentProfile),
        scout: this.getAddressString(currentGrandParentProfileHolder),
        scoutprofile: this.getAddressString(grandParentProfile),
        recruiter: this.getAddressString(currentGreatGrandParentProfileHolder),
        recruiterprofile: this.getAddressString(greatGrandParentProfile),
        originator: this.getAddressString(
          currentGgreatGrandParentProfileHolder,
        ),
        originatorprofile: this.getAddressString(ggreateGrandParentProfile),
      };
    } catch (error: any) {
      return {
        promoter: "",
        promoterprofile: "",
        scout: "",
        scoutprofile: "",
        recruiter: "",
        recruiterprofile: "",
        originator: "",
        originatorprofile: "",
      };
    }
  }

  async getActivationTokenBalance(userActivationAta: web3.PublicKey) {
    try {
      const infoes = await this.connection.getTokenSupply(userActivationAta);
      return infoes.value.amount;
    } catch (error) {
      return 0;
    }
  }

  async getProfileChilds(parentProfile: web3.PublicKey) {
    try {
      const profileStateInfo = await this.program.account.profileState.fetch(
        this.__getProfileStateAccount(parentProfile),
      );
      return {
        totalChild: profileStateInfo.lineage.totalChild.toNumber(),
        generation: profileStateInfo.lineage.generation.toString(),
      };
    } catch (error: any) {
      return {
        totalChild: 0,
        generation: "0",
      };
    }
  }

  async __getProfileHoldersInfo(
    input: LineageInfo,
    parentProfile: web3.PublicKey,
    genesisProfile: web3.PublicKey,
    coinAddress: web3.PublicKey,
  ): Promise<{
    //profiles:
    parentProfile: web3.PublicKey;
    grandParentProfile: web3.PublicKey;
    greatGrandParentProfile: web3.PublicKey;
    ggreateGrandParentProfile: web3.PublicKey;
    genesisProfile: web3.PublicKey;
    //Profile holder ata
    currentParentProfileHolderAta: web3.PublicKey;
    currentGrandParentProfileHolderAta: web3.PublicKey;
    currentGreatGrandParentProfileHolderAta: web3.PublicKey;
    currentGgreatGrandParentProfileHolderAta: web3.PublicKey;
    currentGenesisProfileHolderAta: web3.PublicKey;
    // profile owners
    currentParentProfileHolder: web3.PublicKey;
    currentGrandParentProfileHolder: web3.PublicKey;
    currentGreatGrandParentProfileHolder: web3.PublicKey;
    currentGgreatGrandParentProfileHolder: web3.PublicKey;
    currentGenesisProfileHolder: web3.PublicKey;
    // opos accounts
    parentProfileHolderOposAta: web3.PublicKey;
    grandParentProfileHolderOposAta: web3.PublicKey;
    greatGrandParentProfileHolderOposAta: web3.PublicKey;
    ggreatGrandParentProfileHolderOposAta: web3.PublicKey;
    genesisProfileHolderOposAta: web3.PublicKey;
  }> {
    const grandParentProfile = input.parent;
    const greatGrandParentProfile = input.grandParent;
    const ggreateGrandParentProfile = input.greatGrandParent;

    const currentParentProfileHolderAta = (
      await this.connection.getTokenLargestAccounts(parentProfile)
    ).value[0].address;
    const currentGrandParentProfileHolderAta = (
      await this.connection.getTokenLargestAccounts(grandParentProfile)
    ).value[0].address;
    const currentGreatGrandParentProfileHolderAta = (
      await this.connection.getTokenLargestAccounts(greatGrandParentProfile)
    ).value[0].address;
    const currentGgreatGrandParentProfileHolderAta = (
      await this.connection.getTokenLargestAccounts(ggreateGrandParentProfile)
    ).value[0].address;
    const currentGenesisProfileHolderAta = (
      await this.connection.getTokenLargestAccounts(genesisProfile)
    ).value[0].address;

    const atasInfo = await this.connection.getMultipleAccountsInfo([
      currentParentProfileHolderAta,
      currentGrandParentProfileHolderAta,
      currentGreatGrandParentProfileHolderAta,
      currentGgreatGrandParentProfileHolderAta,
      currentGenesisProfileHolderAta,
    ]);

    const currentParentProfileHolder = unpackAccount(
      currentParentProfileHolderAta,
      atasInfo[0],
    ).owner;
    const currentGrandParentProfileHolder = unpackAccount(
      currentGrandParentProfileHolderAta,
      atasInfo[1],
    ).owner;
    const currentGreatGrandParentProfileHolder = unpackAccount(
      currentGreatGrandParentProfileHolderAta,
      atasInfo[2],
    ).owner;
    const currentGgreatGrandParentProfileHolder = unpackAccount(
      currentGgreatGrandParentProfileHolderAta,
      atasInfo[3],
    ).owner;
    const currentGenesisProfileHolder = unpackAccount(
      currentGenesisProfileHolderAta,
      atasInfo[4],
    ).owner;

    return {
      //profiles:
      parentProfile,
      grandParentProfile,
      greatGrandParentProfile,
      ggreateGrandParentProfile,
      genesisProfile,
      // profile holder profile ata
      currentParentProfileHolderAta,
      currentGrandParentProfileHolderAta,
      currentGreatGrandParentProfileHolderAta,
      currentGgreatGrandParentProfileHolderAta,
      currentGenesisProfileHolderAta,

      // profile holders
      currentParentProfileHolder,
      currentGrandParentProfileHolder,
      currentGreatGrandParentProfileHolder,
      currentGgreatGrandParentProfileHolder,
      currentGenesisProfileHolder,

      // profile holder oposAta
      parentProfileHolderOposAta: getAssociatedTokenAddressSync(
        coinAddress,
        currentParentProfileHolder,
      ),
      grandParentProfileHolderOposAta: getAssociatedTokenAddressSync(
        coinAddress,
        currentGrandParentProfileHolder,
      ),
      greatGrandParentProfileHolderOposAta: getAssociatedTokenAddressSync(
        coinAddress,
        currentGreatGrandParentProfileHolder,
      ),
      ggreatGrandParentProfileHolderOposAta: getAssociatedTokenAddressSync(
        coinAddress,
        currentGgreatGrandParentProfileHolder,
      ),
      genesisProfileHolderOposAta: getAssociatedTokenAddressSync(
        coinAddress,
        currentGenesisProfileHolder,
      ),
    };
  }

  async getUserNFTs(userKey: any) {
    const filters = [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 32,
          bytes: userKey, //wallet address string
        },
      },
    ];

    const accounts: any = await this.connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID, //importing from solana spl-token library
      { filters },
    );
    let mintKeys = [];
    let mintList: any = [];
    for (let i in accounts) {
      let details = accounts[i].account?.data?.parsed?.info;
      if (
        parseInt(details.tokenAmount.decimals) == 0 &&
        parseInt(details.tokenAmount.amount) > 0
      ) {
        const mintKey = new anchor.web3.PublicKey(details?.mint);
        mintKeys.push(mintKey);
      }
    }

    if (mintKeys.length > 0) {
      mintList = await this.metaplex
        .nfts()
        .findAllByMintList({ mints: mintKeys });
      console.log(mintList);
    }
    return mintList;
  }

  async getProfileMetadataByProject(uri: string) {
    try {
      const result = await axios.get(uri);

      if (result.data) {
        let userData: any = {
          seniority: "",
          project: "",
        };
        for (let index = 0; index < result.data.attributes.length; index++) {
          const element = result.data.attributes[index];
          if (element.trait_type == "Seniority") {
            userData.seniority = element.value;
          } else if (
            element.trait_type == "Community" ||
            element.trait_type == "Project"
          ) {
            userData.project = element.value;
          }
        }
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.log("metadata error", error);
      return null;
    }
  }

  async getInvitationMetdata(uri: string) {
    try {
      const result = await axios.get(uri);
      if (result.data) {
        let userData: any = {
          project: "",
        };
        for (let index = 0; index < result.data.attributes.length; index++) {
          const element = result.data.attributes[index];
          if (element.trait_type == "Community") {
            userData.project = element.value;
          }
        }
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.log("metadata error", error);
      return null;
    }
  }

  async getProjectUserInfo(projectId: String) {
    const user = this.provider.publicKey;
    if (!user) throw "Wallet not found";

    let profilelineage = {
      promoter: "",
      promoterprofile: "",
      scout: "",
      scoutprofile: "",
      recruiter: "",
      recruiterprofile: "",
      originator: "",
      originatorprofile: "",
    };
    let generation = "0";

    try {
      const mainStateInfo = await this.program.account.mainState.fetch(
        this.mainState,
      );
      console.log("mainStateInfo ", mainStateInfo);
      const passCollection = web3Consts.passCollection;

      const _userNfts = await this.getUserNFTs(user.toBase58());

      let activationTokenBalance: any = 0;
      let profiles: any = [];
      let allpasses: any = [];
      const activationTokens = [];
      let totalChild = 0;
      let seniority = 0;
      for (let i of _userNfts) {
        const nftInfo: any = i;
        const collectionInfo = i?.collection;
        if (collectionInfo?.address.toBase58() == passCollection.toBase58()) {
          const metadata = await this.getProfileMetadataByProject(i?.uri);
          console.log("metadata", metadata);
          if (metadata) {
            allpasses.push({
              name: i.name,
              address: nftInfo.mintAddress.toBase58(),
              userinfo: metadata,
            });
            if (metadata.project == projectId) {
              if (seniority == 0 || seniority > metadata.seniority) {
                profiles = [
                  {
                    name: i.name,
                    address: nftInfo.mintAddress.toBase58(),
                    userinfo: metadata,
                  },
                ];
                seniority = metadata.seniority;
              }
            }
          }
        }
      }

      if (profiles.length > 0) {
        const genesisProfile = new anchor.web3.PublicKey(profiles[0].address);
        const profileState = this.__getProfileStateAccount(genesisProfile);
        const profileStateInfo =
          await this.program.account.profileState.fetch(profileState);
        console.log("profileStateInfo ", profileStateInfo);
        let hasInvitation: any = false;
        if (profileStateInfo.activationToken) {
          hasInvitation = await this.isCreatorInvitation(
            profileStateInfo.activationToken,
            user.toBase58(),
          );
          console.log("hasInvitation ", hasInvitation);
          if (hasInvitation) {
            const userActivationAta = getAssociatedTokenAddressSync(
              profileStateInfo.activationToken,
              user,
            );
            activationTokenBalance = await this.getActivationTokenBalance(
              profileStateInfo.activationToken,
            );
          }
        }
        totalChild = profileStateInfo.lineage.totalChild.toNumber();
        generation = profileStateInfo.lineage.generation.toString();

        for (let i of _userNfts) {
          const collectionInfo = i?.collection;
          if (
            collectionInfo?.address.toBase58() ==
              web3Consts.badgeCollection.toBase58() &&
            hasInvitation &&
            i?.mintAddress == profileStateInfo.activationToken?.toBase58()
          ) {
            activationTokens.push({
              name: i.name,
              genesis: genesisProfile.toBase58(),
              activation: hasInvitation
                ? profileStateInfo.activationToken?.toBase58()
                : "",
            });
          }
        }

        if (this.getAddressString(profileState) != "") {
          const {
            parentProfile,
            grandParentProfile,
            greatGrandParentProfile,
            ggreateGrandParentProfile,
            currentGreatGrandParentProfileHolder,
            currentGgreatGrandParentProfileHolder,
            currentGrandParentProfileHolder,
            currentParentProfileHolder,
          } = await this.__getProfileHoldersInfo(
            profileStateInfo.lineage,
            genesisProfile,
            mainStateInfo.genesisProfile,
            mainStateInfo.oposToken,
          );
          profilelineage = {
            promoter: this.getAddressString(currentParentProfileHolder),
            promoterprofile: this.getAddressString(parentProfile),
            scout: this.getAddressString(currentGrandParentProfileHolder),
            scoutprofile: this.getAddressString(grandParentProfile),
            recruiter: this.getAddressString(
              currentGreatGrandParentProfileHolder,
            ),
            recruiterprofile: this.getAddressString(greatGrandParentProfile),
            originator: this.getAddressString(
              currentGgreatGrandParentProfileHolder,
            ),
            originatorprofile: this.getAddressString(ggreateGrandParentProfile),
          };
        }
      } else {
        for (let i of _userNfts) {
          if (i) {
            if (i.symbol) {
              const collectionInfo = i?.collection;
              if (
                collectionInfo?.address.toBase58() ==
                web3Consts.badgeCollection.toBase58()
              ) {
                let isCreator = false;
                console.log("i.creators", i.creators);
                for (let index = 0; index < i.creators.length; index++) {
                  if (i.creators[index].address.toBase58() == user.toBase58()) {
                    isCreator = true;
                    break;
                  }
                }
                if (isCreator) {
                  continue;
                }

                const metadata = await this.getInvitationMetdata(i?.uri);
                if (metadata) {
                  if (metadata.project != projectId) {
                    continue;
                  }
                }

                try {
                  const nftInfo: any = i;
                  console.log("token address ", nftInfo.mintAddress.toBase58());
                  const activationTokenState =
                    this.__getActivationTokenStateAccount(nftInfo.mintAddress);
                  const activationTokenStateInfo =
                    await this.program.account.activationTokenState.fetch(
                      activationTokenState,
                    );
                  console.log(
                    "activationTokenStateInfo ",
                    activationTokenStateInfo,
                  );
                  const parentProfile = activationTokenStateInfo.parentProfile;

                  activationTokens.push({
                    name: i.name,
                    genesis: parentProfile.toBase58(),
                    activation: nftInfo.mintAddress.toBase58(),
                  });

                  const generationData =
                    await this.getProfileChilds(parentProfile);
                  totalChild = generationData.totalChild;
                  generation = generationData.generation;
                  profilelineage = await this.getProfileLineage(parentProfile);
                } catch (error) {
                  console.log("error invite ", error);
                }
              }
              if (activationTokens.length > 0) {
                break;
              }
            }
          }
        }
      }
      const profileInfo = {
        profiles,
        allpasses,
        activationTokens,
        activationTokenBalance,
        totalChild: totalChild,
        profilelineage,
        generation,
        invitationPrice: mainStateInfo.invitationMintingCost.toNumber(),
        mintPrice: mainStateInfo.profileMintingCost.toNumber(),
      };
      console.log("projectInfo", profileInfo);
      return profileInfo;
    } catch (error) {
      console.log("error profile", error);
      const profiles: any = [];
      const profileInfo = {
        profiles: profiles,
        allpasses: [],
        activationTokens: profiles,
        activationTokenBalance: 0,
        totalChild: 0,
        profilelineage,
        generation,
        invitationPrice: 0,
        mintPrice: 0,
      };
      return profileInfo;
    }
  }
}
