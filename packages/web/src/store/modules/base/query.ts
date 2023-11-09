import { AIRDROP_GLOBAL_ADDRESS, CONTRACT_PACKAGE, META_INFO_GLOBAL_ADDRESS, SWAP_GLOBAL_ADDRESS } from "@/constants";
import { bytesArrayToHex, bytesArrayToU64Str, useProvider, SuiTxBlock } from "@game-web/base";

const { devInspectTransactionBlock, provider } = useProvider();

// 通过钱包地址查询信息
export const queryMetaByAddress = async (address: string): Promise<any> => {
  const tx = new SuiTxBlock();
  try {
    tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::query_meta_by_address`, [META_INFO_GLOBAL_ADDRESS, address]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);

    if (Array.isArray(results) && results[0]) {
      const info = new Uint8Array(results[0].returnValues[0][0]);
      // 长mateId
      // 查询详情信息
      const { data }: any = await provider.value?.getObject({
        id: `0x${bytesArrayToHex(info)}`,
        options: {
          showType: true,
          showDisplay: true,
          showContent: true,
          showOwner: true,
        },
      });

      if (data?.content?.fields) {
        return data?.content?.fields;
      }
    }
  } catch (error) {
    return {};
  }
};

export const queryAirdropPhase = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::airdrop::get_phase_by_time`, [AIRDROP_GLOBAL_ADDRESS, "0x06"]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const queryParticipatorNum = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::airdrop::get_participator_num`, [AIRDROP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const totalClaimAmount = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::airdrop::get_total_claim_amount`, [AIRDROP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const culmulateRemainAmount = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::airdrop::get_culmulate_remain_amount`, ["0x06", AIRDROP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const dailyRemainAmount = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::airdrop::get_daily_remain_amount`, ["0x6", AIRDROP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const swapedSui = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::swap::get_swaped_sui`, [SWAP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};

export const swapedShui = async (): Promise<any> => {
  try {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::swap::get_swaped_shui`, [SWAP_GLOBAL_ADDRESS]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    const data = bytesArrayToU64Str(results[0].returnValues[0][0]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve("0");
  }
};
