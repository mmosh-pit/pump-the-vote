import * as React from "react";
import Image from "next/image";
import currencyFormatter from "@/lib/currencyFormatter";
import { abbreviateNumber } from "@/lib/abbreviateNumber";
import ProjectCardTimer from "./ProjectCardTimer";

type Props = {
  image: string;
  name: string;
  symbol: string;
  description: string;
  price: string;
  launchDate: Date;
  supply: number;
  soldInPresale: number;
  fdv: number;
};

const ProjectCard = ({
  image,
  price,
  name,
  launchDate,
  symbol,
  description,
  supply,
  soldInPresale,
  fdv,
}: Props) => {
  return (
    <div className="w-full h-[250px] sm:w-[350px] sm:h-[350px] relative">
      <div className="w-full h-[250px] sm:w-[350px] sm:h-[350px] my-2 home-community-card-image">
        <Image
          src={image}
          alt="community-image"
          layout="fill"
          className="rounded-lg"
        />
      </div>

      <div className="w-[100%] flex justify-end absolute top-[10px] right-[5px]">
        <p className="text-white text-smv xl:text-sm max-w-[22%]">
          Time to Listing
        </p>

        <ProjectCardTimer launchDate={launchDate} />
      </div>

      <div className="max-h-[50%] absolute bottom-[5px] right-[5px] left-[5px] flex flex-col rounded-lg bg-[#00000082] p-2">
        <div className="flex flex-col mb-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-white font-bold text-lgv xl:text-lg">{name}</p>
              <p className="text-smv xl:text-sm font-bold">{symbol}</p>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <p className="text-xs">{description}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex md:flex-row w-full justify-between mr-[4px]">
            <div className="flex justify-between w-[45%]">
              <p className="text-white text-smv xl:text-sm font-extralight">
                Listing Price
              </p>
              <p className="text-smv xl:text-sm font-light">
                {currencyFormatter(Number(price))}
              </p>
            </div>

            <div className="flex justify-between w-[45%]">
              <p className="text-white text-smv xl:text-sm font-extralight">
                Total Supply
              </p>
              <p className="text-smv xl:text-sm font-light">
                {abbreviateNumber(supply)}
              </p>
            </div>
          </div>

          <div className="flex md:flex-row w-full justify-between mr-[4px] mt-2">
            <div className="flex justify-between w-[45%]">
              <p className="text-white text-smv xl:text-sm font-extralight">
                Sold in Presale
              </p>
              <p className="text-smv xl:text-sm font-light">
                {abbreviateNumber(soldInPresale)}
              </p>
            </div>

            <div className="flex justify-between w-[45%]">
              <p className="text-white text-smv xl:text-sm font-extralight">
                FDV
              </p>
              <p className="text-smv xl:text-sm font-light">
                {abbreviateNumber(fdv)}{" "}
                <span className="text-tinyv xl:text-tiny font-bold">usdc</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
