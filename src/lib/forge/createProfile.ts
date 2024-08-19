import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

import { Connectivity as UserConn } from "@/anchor/user";
import { web3Consts } from "@/anchor/web3Consts";
import { pinImageToShadowDrive } from "../uploadImageToShdwDrive";
import { MintResultMessage } from "@/models/mintResultMessage";
import { CreateProfileParams } from "@/models/createProfileParams";
import { getTotalMints } from "./getTotalMints";
import { getUsername } from "./getUsername";
import { updateUserData } from "./updateUserData";
import { updateTotalMints } from "./updateTotalMints";
import { pinFileToShadowDrive } from "../uploadFileToShdwDrive";

export const createProfile = async ({
  wallet,
  image,
  form,
  profileInfo,
  preview,
}: CreateProfileParams): Promise<MintResultMessage> => {
  try {
    const seniority = (await getTotalMints()) + 1;
    const genesisProfile = web3Consts.genesisProfile;
    const activationToken = new PublicKey(profileInfo.activationToken);

    let fullname = form.name;
    if (form.lastName.length > 0) {
      fullname = fullname + " " + form.lastName;
    }

    const body = {
      name: fullname,
      symbol: form.username,
      description: form.description,
      image: "",
      enternal_url: process.env.NEXT_PUBLIC_APP_MAIN_URL + "/" + form.username,
      family: "MMOSH",
      collection: "MMOSH Profile Collection",
      attributes: [
        {
          trait_type: "Primitive",
          value: "Profile",
        },
        {
          trait_type: "Ecosystem",
          value: "Genesis MMOSH",
        },
        {
          trait_type: "Gen",
          value: profileInfo.generation,
        },
        {
          trait_type: "Seniority",
          value: seniority,
        },
        {
          trait_type: "Full Name",
          value: fullname,
        },
        {
          trait_type: "Username",
          value: form.username,
        },
        {
          trait_type: "Adjective",
          value: form.descriptor,
        },
        {
          trait_type: "Noun",
          value: form.noun,
        },
        {
          trait_type: "Pronoun",
          value: form.pronouns,
        },
      ],
    };

    const profileLineage = profileInfo.profileLineage;

    // get promoter name
    if (profileLineage.promoter.length > 0) {
      let promoter: any = await getUsername(profileLineage.promoter);
      if (promoter != "") {
        body.attributes.push({
          trait_type: "Source",
          value: promoter,
        });
        body.attributes.push({
          trait_type: "Promoter",
          value: promoter,
        });
      } else {
        body.attributes.push({
          trait_type: "Source",
          value: profileLineage.promoter,
        });
        body.attributes.push({
          trait_type: "Promoter",
          value: profileLineage.promoter,
        });
      }
      body.attributes.push({
        trait_type: "Promoter_Profile",
        value: profileLineage.promoterprofile,
      });
    }

    // get scout name
    if (profileLineage.scout.length > 0) {
      let scout: any = await getUsername(profileLineage.scout);
      if (scout != "") {
        body.attributes.push({
          trait_type: "Scout",
          value: scout,
        });
      } else {
        body.attributes.push({
          trait_type: "Scout",
          value: profileLineage.scout,
        });
      }
      body.attributes.push({
        trait_type: "Scout_Profile",
        value: profileLineage.scoutprofile,
      });
    }

    // get recruiter name
    if (profileLineage.recruiter.length > 0) {
      let recruiter: any = await getUsername(profileLineage.recruiter);
      if (recruiter != "") {
        body.attributes.push({
          trait_type: "Recruiter",
          value: recruiter,
        });
      } else {
        body.attributes.push({
          trait_type: "Recruiter",
          value: profileLineage.recruiter,
        });
      }
      body.attributes.push({
        trait_type: "Recruiter_Profile",
        value: profileLineage.recruiterprofile,
      });
    }

    // get originator name
    if (profileLineage.originator.length > 0) {
      let originator: any = await getUsername(profileLineage.originator);
      if (originator != "") {
        body.attributes.push({
          trait_type: "Originator",
          value: originator,
        });
      } else {
        body.attributes.push({
          trait_type: "Originator",
          value: profileLineage.originator,
        });
      }
      body.attributes.push({
        trait_type: "Originator_Profile",
        value: profileLineage.originatorprofile,
      });
    }

    if (image) {
      const imageUri = await pinImageToShadowDrive(image);
      body.image = imageUri;
      if (imageUri === "") {
        return {
          message:
            "We’re sorry, there was an error while trying to uploading image. please try again later.",
          type: "error",
        };
      }
    } else {
      body.image = preview;
    }

    const shadowHash: any = await pinFileToShadowDrive(body);

    console.log("Resulting shadow hash: ", shadowHash);

    if (shadowHash === "") {
      return {
        message:
          "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
        type: "error",
      };
    }
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
    const env = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
    const userConn: UserConn = new UserConn(env, web3Consts.programID);
    const res = await userConn.mintProfileByActivationToken({
      name: form.username.substring(0, 15),
      symbol: form.username.substring(0, 10).toUpperCase(),
      uriHash: shadowHash,
      activationToken,
      genesisProfile,
      commonLut: web3Consts.commonLut,
    });

    if (res.Ok) {
      const params = {
        username: form.username,
        bio: form.description,
        pronouns: form.pronouns,
        name: fullname,
        image: body.image,
        descriptor: form.descriptor,
        nouns: form.noun,
        seniority: seniority,
      };

      await updateUserData(params, wallet.publicKey.toString());
      await updateTotalMints(seniority);

      return {
        type: "success",
        message:
          "Congrats! Your profile has been minted, granting you full membership in MMOSH DAO.",
        data: params,
      };
    } else {
      console.log("Response: ", res);
      return {
        type: "error",
        message:
          "We’re sorry, there was an error while trying to mint your profile. Check your wallet and try again.",
      };
    }
  } catch (err) {
    console.error("Got error: ", err);
    return {
      type: "error",
      message: "Something wrong happened, please contact support",
    };
  }
};
