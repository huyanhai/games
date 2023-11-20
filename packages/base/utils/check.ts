import type { StandardWalletAdapterWallet, Wallet } from "@mysten/wallet-standard";

export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet): wallet is StandardWalletAdapterWallet {
  return "standard:connect" in wallet.features && "standard:events" in wallet.features && "sui:signAndExecuteTransactionBlock" in wallet.features;
}

export const checkMoney = (value: string) => value.replace(/\D|^0/g, "");
export const checkMoneyDot = (value: string) => {
  const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,10})?$/;
  return reg.test(value);
};
export const checkNum = (value: string) => {
  const reg = /^[1-9]*$/;
  return reg.test(value);
};

export const formateTime = (time: number) => {
  return time >= 10 ? time : `0${time}`;
};
