import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { data, status, userWeb3Info, web3InfoLoading } from "@/store";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Banner = () => {
  const [userStatus] = useAtom(status);
  const [currentUser] = useAtom(data);
  const [profileInfo] = useAtom(userWeb3Info);
  const [isLoading] = useAtom(web3InfoLoading);

  const wallet = useAnchorWallet();

  const hasProfile = !!profileInfo?.profile.address;
  const hasInvitation = !!profileInfo?.activationToken;

  const renderComponent = React.useCallback(() => {
    if (!currentUser?.telegram?.id) {
      return (
        <div className="max-w-[95%] md:max-w-[60%] grid grid-cols-2 justify-items-center">
          <div className="flex flex-col justify-around items-center max-w-[75%]">
            <div className="flex flex-col items-center mb-8">
              <p className="text-sm text-white text-center mt-4">
                Create your own Coins and Build your own Communities on
                Telegram! Start by activating MMOSH Bot.
              </p>
            </div>

            <a href="https://t.me/mmoshbot" target="_blank">
              <button className="relative bg-[#CD068E] rounded-md px-6 py-4 mt-2">
                <p className="text-sm text-white">Activate Bot</p>
              </button>
            </a>
          </div>

          <div
            className="w-full flex justify-center items-center py-4"
            id="banner-image-container"
          >
            <div className="relative w-[8vmax] h-[8vmax] rounded-full">
              <Image
                src="https://storage.googleapis.com/mmosh-assets/telegram.png"
                alt="invitation"
                layout="fill"
              />
            </div>
          </div>
        </div>
      );
    }

    if (!wallet?.publicKey) {
      return (
        <div className="max-w-[95%] md:max-w-[60%] grid grid-cols-2 justify-items-center">
          <div className="flex flex-col justify-around items-center max-w-[75%]">
            <div className="flex flex-col items-center mb-8">
              <p className="text-sm text-white text-center mt-4">
                Create, Join and Build connected crypto communities on Telegram!
                Next, connect your Solana Wallet
              </p>
            </div>

            <WalletMultiButton
              startIcon={undefined}
              style={{
                position: "relative",
                background: "#CD068E",
                padding: "0 2em",
                borderRadius: 15,
              }}
            >
              <p className="text-sm text-white">Connect Wallet</p>
            </WalletMultiButton>
          </div>

          <div
            className="w-full flex justify-center items-center py-4"
            id="banner-image-container"
          >
            <div className="relative w-[8vmax] h-[8vmax] rounded-full">
              <Image
                src="https://storage.googleapis.com/mmosh-assets/solana.png"
                alt="invitation"
                layout="fill"
              />
            </div>
          </div>
        </div>
      );
    }

    if (!hasProfile) {
      return (
        <div className="max-w-[95%] md:max-w-[60%] grid grid-cols-2 justify-items-center">
          <div className="flex flex-col justify-around items-center max-w-[75%]">
            <p className="text-sm text-white text-center">
              Congratulations! You're now connected to the MMOSH as a Guest. To
              create your own coins and build your own communities, become a
              Member of the DAO
            </p>

            <a
              href={`${process.env.NEXT_PUBLIC_APP_MAIN_URL}/create/create_profile`}
            >
              <button className="bg-[#CD068E] relative rounded-md px-6 py-4">
                <p className="text-sm text-white">Create a Profile NFT</p>
              </button>
            </a>
          </div>

          <div
            className="w-full flex justify-center items-center py-4"
            id="banner-image-container"
          >
            <div className="relative w-[8vmax] h-[8vmax]">
              <Image
                src="https://storage.googleapis.com/mmosh-assets/lion.png"
                alt="invitation"
                layout="fill"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-[95%] md:max-w-[60%] grid grid-cols-2 justify-items-center">
        <div className="flex flex-col justify-around items-center">
          <div className="max-w-[75%]">
            <p className="text-sm text-white text-center">
              Welcome to MMOSH DAO, {currentUser?.profile?.name}, join us in our
              Members Only Community on Telegram
            </p>
            <p className="text-sm text-white text-center">
              You can get an invitation from a current member. Find one in the
              Membership Directory, or ask around in our main Telegram group.
            </p>
          </div>

          <a href="https://t.me/mmoshpit" target="_blank">
            <button className="relative bg-[#CD068E] rounded-md px-6 py-4">
              <p className="text-sm text-white">Join Us!</p>
            </button>
          </a>
        </div>

        <div
          className="w-full flex justify-center items-center py-4"
          id="banner-image-container"
        >
          <div className="relative w-[8vmax] h-[8vmax]">
            <Image
              src="https://storage.googleapis.com/mmosh-assets/lion.png"
              alt="invitation"
              layout="fill"
            />
          </div>
        </div>
      </div>
    );
  }, [currentUser, userStatus, wallet?.publicKey, hasProfile, hasInvitation]);

  if (isLoading) return <></>;

  return (
    <div className="w-full flex justify-center py-12 bg-[#080536]">
      {renderComponent()}
    </div>
  );
};

export default Banner;
