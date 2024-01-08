import { CONTRACT_PACKAGE, MARKET_GLOBAL_ADDRESS, ITEMS_GLOBAL_ADDRESS } from "@/constants";
import { combineJsonArray, bytesArrayToString, useProvider, SuiTxBlock, useWallet, getAbleCoinsForSell, useNftsOwnedByAddressInSpecificChain } from "@game-web/base";
import type { CardItem } from "./types";

import { insertImage, queryImage } from "@/api";
import { useBaseStore } from "@/store";

const { devInspectTransactionBlock, provider } = useProvider();

// 获取市场信息
export const getMarkets = async () => {
  const tx = new SuiTxBlock();
  const baseStore = useBaseStore();
  const ids: string[] = [];
  return new Promise(async (resolve) => {
    try {
      tx.moveCall(`${CONTRACT_PACKAGE}::market::get_game_sales`, [MARKET_GLOBAL_ADDRESS, "0x06"]);
      const { results }: any = await devInspectTransactionBlock(tx.txBlock);
      if (Array.isArray(results) && results[0]) {
        const data = bytesArrayToString(results[0].returnValues[0][0].slice(1));

        if (data) {
          const arr = data
            .split(";")
            .filter(Boolean)
            .map((item) => {
              let [id, name, objectType, num, price, coinType, type, owner, metaId, nftObjectId] = item.split(",");

              if (objectType && !objectType.startsWith("0x")) {
                objectType = `0x${objectType}`;
              }

              if (nftObjectId) {
                if (nftObjectId && !nftObjectId.startsWith("0x")) {
                  nftObjectId = `0x${nftObjectId}`;
                }
                ids.push(nftObjectId);
              }

              return {
                id,
                name,
                objectType,
                num,
                price,
                coinType,
                type,
                owner,
                metaId,
                nftObjectId,
              };
            });
          const imgs = await queryImage({ strings: ids.filter(Boolean) });
          if (Array.isArray(imgs) && imgs.length > 0) {
            imgs.forEach((item) => {
              baseStore.setImgMap(item.obj_id, item.img_url);
            });
          }

          return resolve(arr);
        }
      }

      return resolve([]);
    } catch (error) {
      return resolve([]);
    }
  });
};

// 获取我的出售
export const getMySell = async (address: string) => {
  const tx = new SuiTxBlock();
  return new Promise(async (resolve) => {
    try {
      tx.moveCall(`${CONTRACT_PACKAGE}::market::query_my_onsale`, [MARKET_GLOBAL_ADDRESS, address]);
      const { results }: any = await devInspectTransactionBlock(tx.txBlock);

      if (Array.isArray(results) && results[0]) {
        const data = bytesArrayToString(results[0].returnValues[0][0].slice(1));
        if (data) {
          const arr = data
            .split(";")
            .filter(Boolean)
            .map((item) => {
              let [id, name, objectType, num, price, coinType, type, owner, metaId, nftObjectId] = item.split(",");
              if (nftObjectId && !nftObjectId.startsWith("0x")) {
                nftObjectId = `0x${nftObjectId}`;
              }
              return {
                id,
                name,
                objectType,
                num,
                price,
                coinType,
                type,
                owner,
                metaId,
                nftObjectId,
              };
            });
          return resolve(arr);
        }
      }
      return resolve([]);
    } catch (error) {
      console.log(error);
      return resolve([]);
    }
  });
};

// 获取我的资产
export const getMyTrade = async (address: string, metaId: string) => {
  return new Promise(async (resolve) => {
    try {
      // 查询nft

      let gamefi_array: any = [];

      const { getOwnedNfts, nftsMapByAddressAndChain, addressNftKey } = useNftsOwnedByAddressInSpecificChain();
      await getOwnedNfts();

      const nfts = nftsMapByAddressAndChain.get(addressNftKey.value)?.map((item) => {
        return {
          ...item,
          type: "nft",
          imgUrl: item.url,
        };
      });

      // 查询游戏道具
      if (metaId) {
        const tx = new SuiTxBlock();
        tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::get_items_info`, [metaId, ITEMS_GLOBAL_ADDRESS]);
        const { results }: any = await devInspectTransactionBlock(tx.txBlock);

        const res = results[0].returnValues[0][0];
        res?.shift();

        // "fruit:54,fruit desc;fragment_resurrect:15,holy water element fragment desc;fragment_life:20,holy water element fragment desc;water_element_life:3,life water element desc;water_element_memory:4,memory water element desc;fragment_blood:15,holy water element fragment desc;fragment_holy:5,holy water element fragment desc;water_element_resurrect:1,resurrect water element desc;"
        const asciiString: string = String.fromCharCode(...res);

        asciiString
          .split(";")
          .filter(Boolean)
          .forEach((item) => {
            
            const [name, info] = item.split(":");
            const [num, desc] = info.split(",");
            console.log(item);
            const jsonObject: any = {};
            jsonObject["name"] = name;
            jsonObject["num"] = num;
            jsonObject["description"] = desc;
            jsonObject["type"] = "gamefi";
            gamefi_array.push(jsonObject);
          });
      }

      const result = combineJsonArray(JSON.stringify(gamefi_array), JSON.stringify(nfts));
      resolve(result);
    } catch (error) {
      console.log(error);
      return resolve([]);
    }
  });
};

// 获取交易记录
export const getTransactionRecord = async () => {
  const tx = new SuiTxBlock();
  return new Promise(async (resolve) => {
    try {
      const { data }: any = await provider.value?.queryEvents({ query: { MoveEventType: `${CONTRACT_PACKAGE}::market::TransactionRecord` } });
      const lists = data.map((item: any) => item.parsedJson);
      resolve(lists);
    } catch (error) {
      console.log(error);
      return resolve([]);
    }
  });
};

// 购买游戏道具
export const buyGame = async (address: string, metaId: string, row: CardItem) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      const coins = await getAbleCoinsForSell(row.price, row.coinType, tx, CONTRACT_PACKAGE, address);

      console.log(
        "购买游戏参数",
        [MARKET_GLOBAL_ADDRESS, metaId, Number(row.metaId), row.name, row.num, coins, "0x06"],
        [row.coinType === "SUI" ? "0x2::sui::SUI" : `${CONTRACT_PACKAGE}::shui::SHUI`]
      );
      tx.moveCall(
        `${CONTRACT_PACKAGE}::market::purchase_game_item`,
        [MARKET_GLOBAL_ADDRESS, metaId, Number(row.metaId), row.name, row.num, coins, "0x06"],
        [row.coinType === "SUI" ? "0x2::sui::SUI" : `${CONTRACT_PACKAGE}::shui::SHUI`]
      );
      const digest = await signAndSendTxn(tx);
      console.log(digest);
      return resolve(true);
    } catch (error) {
      console.log(error);
      return resolve(false);
    }
  });
};

// 购买NFT
export const buyNft = async (address: string, metaId: string, row: CardItem) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      const coins = await getAbleCoinsForSell(row.price, row.coinType, tx, CONTRACT_PACKAGE, address);

      console.log(
        "购买NFT参数",
        [MARKET_GLOBAL_ADDRESS, metaId, Number(row.metaId), row.name, row.num, coins, "0x06"],
        [row.coinType === "SUI" ? "0x2::sui::SUI" : `${CONTRACT_PACKAGE}::shui::SHUI`, row.objectType!]
      );

      tx.moveCall(
        `${CONTRACT_PACKAGE}::market::purchase_nft_item`,
        [MARKET_GLOBAL_ADDRESS, metaId, Number(row.metaId), row.name, row.num, coins, "0x06"],
        [row.coinType === "SUI" ? "0x2::sui::SUI" : `${CONTRACT_PACKAGE}::shui::SHUI`, row.objectType!]
      );
      const { digest } = await signAndSendTxn(tx);
      console.log(digest);
      return resolve(true);
    } catch (error) {
      console.log(error);
      return resolve(false);
    }
  });
};

// 下架游戏
export const downGameItem = async (metaId: string, row: CardItem) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      console.log("下架游戏参数", [MARKET_GLOBAL_ADDRESS, metaId, row.name, row.num, Number(row.price), "0x06"]);
      tx.moveCall(`${CONTRACT_PACKAGE}::market::unlist_game_item`, [MARKET_GLOBAL_ADDRESS, metaId, row.name, row.num, Number(row.price), "0x06"]);
      const result = await signAndSendTxn(tx);
      console.log("result", result);
      return resolve(true);
    } catch (error) {
      console.log("error", error);
      return resolve(false);
    }
  });
};

// 下架Nft
export const downNftItem = async (metaId: string, row: CardItem) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      console.log("下架Nft参数", [MARKET_GLOBAL_ADDRESS, metaId, row.name, row.num, Number(row.price), "0x06"], [`${CONTRACT_PACKAGE}::boat_ticket::BoatTicket`]);

      tx.moveCall(`${CONTRACT_PACKAGE}::market::unlist_nft_item`, [MARKET_GLOBAL_ADDRESS, metaId, row.name, row.num, Number(row.price), "0x06"], [row.objectType!]);
      const result = await signAndSendTxn(tx);
      console.log(result);
      return resolve(true);
    } catch (error) {
      console.log("error", error);
      return resolve(false);
    }
  });
};

// 上架游戏
export const upGameItem = async (metaId: string, row: CardItem, form: any) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  return new Promise(async (resolve) => {
    try {
      console.log("上架游戏参数", [MARKET_GLOBAL_ADDRESS, metaId, row.name, Number(form.price) * 1e9, form.num, form.type, "0x06"]);
      tx.moveCall(`${CONTRACT_PACKAGE}::market::list_game_item`, [MARKET_GLOBAL_ADDRESS, metaId, row.name, Number(form.price) * 1e9, form.num, form.type, "0x06"]);
      const result = await signAndSendTxn(tx);
      console.log(result);
      return resolve(true);
    } catch (error) {
      return resolve(false);
    }
  });
};

// 上架NFT
export const upNftItem = async (metaId: string, row: CardItem, form: any) => {
  insertImage({ image_url: row.imgUrl, obj_id: row.objectId! });
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();

  console.log("上架NFT参数", [MARKET_GLOBAL_ADDRESS, metaId, row.name, Number(form.price) * 1e9, form.type, "0x06", row.objectId], [row.objectType as string]);
  return new Promise(async (resolve) => {
    try {
      tx.moveCall(`${CONTRACT_PACKAGE}::market::list_nft_item`, [MARKET_GLOBAL_ADDRESS, metaId, row.name, Number(form.price) * 1e9, form.type, "0x06", row.objectId], [row.objectType as string]);
      const result = await signAndSendTxn(tx);
      console.log(result);
      return resolve(true);
    } catch (error) {
      console.log(error);
      return resolve(false);
    }
  });
};
