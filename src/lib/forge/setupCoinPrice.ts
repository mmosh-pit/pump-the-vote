import { ExponentialCurve } from "@/anchor/curve/curves";
import { percent } from "@strata-foundation/spl-utils";
import * as anchor from "@coral-xyz/anchor";

export const calculatePrice = (
  coinValue: number,
  currentSupply: number,
  multiValue: number,
) => {
  const curveConfig = new ExponentialCurve(
    {
      c: new anchor.BN(coinValue), // c = 1
      b: new anchor.BN(0),
      // @ts-ignore
      pow: Number(multiValue),
      // @ts-ignore
      frac: 1,
    },
    0,
    0,
  );

  return curveConfig.buyTargetAmount(
    Number(currentSupply),
    percent(0)!,
    percent(0)!,
  );
};

const calculatePriceForCurve = (
  curveConfig: ExponentialCurve,
  coinSupply: number,
) => {
  const labels = [];
  const data = [];
  const totalSupply = Number(coinSupply) * 10;
  const currentSupply = Number(coinSupply);

  for (
    let index = currentSupply;
    index <= totalSupply;
    index += currentSupply
  ) {
    labels.push(index);
    const num = curveConfig.buyWithBaseAmount(
      Number(index),
      percent(0)!,
      percent(0)!,
    );

    data.push(num);
  }

  return {
    labels,
    data,
  };
};

export const getCoinPrice = (
  coinSupply: number,
  coinInitPrice: string,
  coinType: string,
  mulValue: number,
) => {
  const initPrice = 1000000000000;
  const basePrice = calculatePrice(initPrice, coinSupply, mulValue);
  const coinValue = (Number(coinSupply) / basePrice) * initPrice;

  const curveConfig = new ExponentialCurve(
    {
      c: new anchor.BN(coinType == "linear" ? 0 : coinValue), // c = 1
      b: new anchor.BN(
        Number(
          coinInitPrice.length > 0
            ? coinInitPrice
            : coinType == "linear"
              ? 1
              : 0,
        ) * initPrice,
      ),
      // @ts-ignore
      pow: Number(mulValue),
      // @ts-ignore
      frac: 1,
    },
    0,
    0,
  );

  const res = calculatePriceForCurve(curveConfig, coinSupply);
  res;

  return {
    ...res,
    coinPrice: curveConfig.buyWithBaseAmount(
      Number(coinSupply),
      percent(0)!,
      percent(0)!,
    ),
  };
};
