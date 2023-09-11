import { ref } from 'vue';
import { Provider } from '../../sdk/common/index';
import { useWallet } from './useWallet';
import type { TransactionBlock } from '@mysten/sui.js';

const provider = ref();
const userAddress = ref();

export const useProvider = () => {
  const checkProvider = () => {
    if (!provider.value) {
      const { chain, address } = useWallet();
      const providerInstance = new Provider(chain.value.rpcUrl);
      userAddress.value = address.value;
      provider.value = providerInstance.query.provider;
    }
  };
  const devInspectTransactionBlock = async (tx: TransactionBlock) => {
    checkProvider();

    return provider.value.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: tx.blockData.sender || userAddress.value
    });
  };

  return {
    provider,
    devInspectTransactionBlock
  };
};
