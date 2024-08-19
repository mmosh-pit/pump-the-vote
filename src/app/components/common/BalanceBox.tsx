import { userWeb3Info } from "@/store";
import { useAtom } from "jotai";

const BalanceBox = () => {
  const [profileInfo] = useAtom(userWeb3Info);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="text-sm text-white">Current balance</p>
        <div className="bg-black bg-opacity-[0.2] px-1 py-2 min-w-[3vmax] mx-2 rounded-md">
          {profileInfo?.mmoshBalance || 0}
        </div>
        <p className="text-sm text-white">MMOSH</p>
      </div>

      <div className="flex items-center mt-2">
        <p className="text-sm text-white">Current balance</p>
        <div className="bg-black bg-opacity-[0.2] px-1 py-2 min-w-[3vmax] mx-2 rounded-md">
          {profileInfo?.solBalance || 0}
        </div>
        <p className="text-sm text-white">SOL</p>
      </div>
    </div>
  );
};

export default BalanceBox;
