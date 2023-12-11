import { useOwnedCoinsWithBalances } from "../hooks";
import { SuiTxBlock } from "../sdk";

export const getAbleCoins = (coins: any, number: number, unit: number) => {
  let coinId = undefined;

  coins?.data.forEach((coin: any) => {
    if (parseInt(coin.balance) >= number * unit) {
      coinId = coin.coinObjectId;
    }
  });
  return coinId;
};

export const getAbleCoinsForSell = async <T extends "SUI" | "SHUI">(price: number | string, coinType: T, tx: SuiTxBlock, CONTRACT_PACKAGE?: string, address?: string) => {
  const { balanceProvider } = useOwnedCoinsWithBalances();

  if (coinType === "SHUI") {
    const ableCoins = await balanceProvider.value?.query.provider.getCoins({
      owner: address!,
      coinType: `${CONTRACT_PACKAGE}::shui::SHUI`,
    });

    const coinId = getAbleCoins(ableCoins, Number(price), 1);
    const [coins] = tx.splitCoins(coinId as any, [Number(price)]);
    return tx.makeMoveVec([coins]);
  } else {
    const [coins] = tx.splitSUIFromGas([Number(price)]);
    return tx.makeMoveVec([coins]);
  }
};
