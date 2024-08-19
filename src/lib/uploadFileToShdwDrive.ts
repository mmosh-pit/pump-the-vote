import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { v4 as uuidv4 } from "uuid";
import Config from "@/anchor/web3Config.json";

export const pinFileToShadowDrive = async (jsonData: any) => {
  try {
    const privateKey = process.env.NEXT_PUBLIC_SHDW_PRIVATE!;
    const private_buffer = bs58.decode(privateKey);
    const private_arrray = new Uint8Array(
      private_buffer.buffer,
      private_buffer.byteOffset,
      private_buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT,
    );
    const keypair = Keypair.fromSecretKey(private_arrray);
    const drive = await new ShdwDrive(
      new Connection(Config.mainRpcURL),
      new NodeWallet(keypair),
    ).init();

    const accounts = await drive.getStorageAccounts();
    const acc = accounts[0].publicKey;

    const blobData = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const fileName = uuidv4() + ".json";
    const file = new File([blobData], fileName, { type: "application/json" });

    const upload = await drive.uploadFile(acc, file);
    return upload.finalized_locations[0];
  } catch (error) {
    console.log("error", error);
    return "";
  }
};

export const pinFileToShadowDriveUrl = async (jsonData: any) => {
  try {
    const privateKey: any = process.env.NEXT_PUBLIC_SHDW_PRIVATE;
    let private_buffer = bs58.decode(privateKey);
    let private_arrray = new Uint8Array(
      private_buffer.buffer,
      private_buffer.byteOffset,
      private_buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT,
    );
    const keypair = Keypair.fromSecretKey(private_arrray);
    const drive = await new ShdwDrive(
      new Connection(Config.mainRpcURL),
      new NodeWallet(keypair),
    ).init();

    const accounts = await drive.getStorageAccounts();
    const acc = accounts[0].publicKey;

    const blobData = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const fileName = uuidv4() + ".json";
    const file = new File([blobData], fileName, { type: "application/json" });

    const upload = await drive.uploadFile(acc, file);
    return upload.finalized_locations[0];
  } catch (error) {
    console.log("error", error);
    return "";
  }
};
