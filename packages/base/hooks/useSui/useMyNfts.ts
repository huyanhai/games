import { useWallet } from "./useWallet";
import type { NftObject } from "../../sdk";
import { Provider } from "../../sdk";
import type { Ref } from "vue";
import { reactive } from "vue";
import { computed } from "vue";
import type { Chain } from "./types";

const nftsMapByAddressAndChain = reactive(new Map<string, NftObject[]>());

export const useNftsOwnedByAddressInSpecificChain = (params?: { address: Ref<string>; chainData: Ref<Chain> }) => {
  const { address, chainData } = params || {};
  const { address: walletAddress, chain } = useWallet();
  const targetAddress = computed(() => (address && address.value ? address.value : walletAddress.value));
  const targetChain = computed(() => (chainData && chainData.value ? chainData.value : chain.value));
  const getOwnedNfts = async () => {
    if (targetAddress.value && targetChain.value.rpcUrl) {
      const provider = new Provider(targetChain.value?.rpcUrl || "");
      const data = await provider.query.getOwnedNfts(targetAddress.value || "");
      nftsMapByAddressAndChain.set(`${targetAddress.value}_${targetChain.value}`, data);
    }
  };
  return {
    getOwnedNfts,
    nftsMapByAddressAndChain,
  };
};
