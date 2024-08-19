import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import Config from "@/anchor/web3Config.json";

export const pinImageToShadowDrive = async (file: File) => {
  try {
    const blob = file.slice(0, file.size, "image/png");
    const updatedFileName = new File(
      [blob],
      `${file.name.replace(".png", "")}-${new Date()}.png`,
      { type: "image/png" },
    );

    const privateKey: any = process.env.NEXT_PUBLIC_SHDW_PRIVATE;
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

    const upload = await drive.uploadFile(acc, updatedFileName);
    return upload.finalized_locations[0];
  } catch (error) {
    console.log("shadow drive upload error: ", error);
    return "";
  }
};
