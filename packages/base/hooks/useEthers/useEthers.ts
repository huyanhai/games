import { ethers } from 'ethers';
import { computed, ref } from 'vue';

export function useEthers() {
  let Provider;
  const signer = ref<ethers.JsonRpcSigner>();
  const login = async () => {
    try {
      Provider = await new ethers.BrowserProvider(window.ethereum);
      // 登录
      signer.value = await Provider.getSigner();
      console.log('用户的地址', signer.value.address);

      // 获取合约，参数：contractAddress、contractABI、signer
      const abi = [
        'function decimals() view returns (string)',
        'function symbol() view returns (string)',
        'function balanceOf(address addr) view returns (uint)'
      ];

      // 构造合约
      const Contract = new ethers.Contract(
        'dai.tokens.ethers.eth',
        abi,
        signer.value
      );
      console.log('Contract', Contract);

      // 调用合约上的方法
      const symbol = await Contract.symbol();
      const balanceOf = await Contract.balanceOf(signer.value.address);
      console.log('Contract', symbol);
      console.log('Contract', balanceOf);
    } catch (err) {
      console.log(err);
    }
  };

  function isMetamask(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof window.ethereum !== 'undefined') {
        resolve('MetaMask is installed!');
      } else {
        reject('MetaMask is uninstalled!');
      }
    });
  }

  const address = computed(() => signer.value?.address);

  return {
    login,
    isMetamask,
    signer,
    address
  };
}
