import { CONTRACT_PACKAGE, MARKET_GLOBAL_ADDRESS } from "@/constants";
import { bytesArrayToHex, bytesArrayToU64Str, bytesArrayToString, useProvider, SuiTxBlock, useWallet } from "@game-web/base";
import type { CardItem } from "./types";

const { devInspectTransactionBlock, provider } = useProvider();

// 获取市场信息
export const getMarkets = async () => {
  const tx = new SuiTxBlock();
  return new Promise(async (resolve) => {
    try {
      tx.moveCall(`${CONTRACT_PACKAGE}::market::get_game_sales`, [MARKET_GLOBAL_ADDRESS, "0x06"]);
      const { results }: any = await devInspectTransactionBlock(tx.txBlock);
      if (Array.isArray(results) && results[0]) {
        const data = bytesArrayToString(results[0].returnValues[0][0]);
        if (data) {
          const arr = data
            .split(";")
            .filter(Boolean)
            .map((item) => {
              const [id, name, num, price, type, owner] = item.split(",");
              return {
                id,
                name,
                num,
                price,
                type,
                owner,
              };
            });
          return resolve(arr);
        }
      }
      return resolve([]);
    } catch (error) {
      return resolve([]);
    }
  });
};

// 购买游戏道具
export const buyGame = async (metaId: string, row: CardItem) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      const [coins] = tx.splitSUIFromGas([Number(row.price)]);
      tx.moveCall(
        `${CONTRACT_PACKAGE}::market::list_game_item`,
        [MARKET_GLOBAL_ADDRESS, metaId, row.owner, row.name, tx.makeMoveVec([coins]), "0x06"],
        ["0x2::sui::SUI" || `${CONTRACT_PACKAGE}::shui::SHUI`]
      );
      const { digest } = await signAndSendTxn(tx);
      console.log(digest);
      return resolve([]);
    } catch (error) {
      return resolve([]);
    }
  });
};
