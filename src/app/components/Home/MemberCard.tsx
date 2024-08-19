import * as React from "react";
import axios from "axios";
import Image from "next/image";

import TwitterDarkIcon from "@/assets/icons/TwitterDarkIcon";
import TelegramDarkIcon from "@/assets/icons/TelegramDarkIcon";
import { User } from "@/models/user";

type Props = {
  user: User;
};

const MemberCard = ({ user }: Props) => {
  const [guildSize, setGuildSize] = React.useState(0);

  const getGuildSize = React.useCallback(async () => {
    const result = await axios.get(
      `/api/get-guild-count?address=${user.profilenft}`,
    );

    const { promotors, scouts, recruitors, originators } = result.data;

    const size = promotors + scouts + recruitors + originators;

    setGuildSize(size);
  }, [user.profilenft]);

  React.useEffect(() => {
    getGuildSize();
  }, [user.profilenft]);

  return (
    <div
      className="flex bg-[#030007] bg-opacity-40 px-2 py-2 rounded-2xl"
      id="border-gradient-container"
      key={user.profile.username}
    >
      <div className="self-center max-w-[30%] mr-8">
        <div className="relative w-[6vmax] h-[6vmax]">
          <Image
            src={user.profile.image}
            alt="Profile Image"
            className="rounded-full"
            layout="fill"
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-start">
        <div>
          <p className="text-white text-sm">
            {user.profile.name} • <span className="text-gray-500">Member</span>
          </p>
          <p className="text-sm">@{user.profile.username}</p>
        </div>

        <div className="my-2 flex flex-col">
          <p className="text-white text-sm text-dots md:w-[12vmax] w-[8vmax]">
            {user.profile.bio}
          </p>
          <a
            className="text-[#FF00C7] text-sm"
            href={`https://mmosh.app/${user.profile.username}`}
          >
            mmosh.app/{user.profile.username}
          </a>
        </div>

        <div className="w-[100%] flex justify-between items-center py-2 rounded-3xl mt-2">
          <div className="flex items-center">
            <p className="text-white text-xs">Guild Size</p>

            <div className="w-[3vmax] py-1 flex justify-center items-center text-center bg-[#584C6E] bg-opacity-40 rounded-full ml-4">
              <p className="text-white text-sm">{guildSize}</p>
            </div>
          </div>

          <div className="flex mr-8 justify-between">
            {user.twitter?.username && (
              <a
                className="cursor-pointer"
                href={`https://twitter.com/${user.twitter.username}`}
              >
                <TwitterDarkIcon />
              </a>
            )}

            {user.telegram?.username && (
              <a
                className="cursor-pointer ml-2"
                href={`https://t.me/${user.telegram.username}`}
              >
                <TelegramDarkIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
