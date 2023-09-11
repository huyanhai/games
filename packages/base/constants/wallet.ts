import type { IDefaultWallet } from '../hooks/useSui/types';

export function defineWallet(params: IDefaultWallet) {
  return Object.freeze(params);
}

export enum FeatureName {
  STANDARD__CONNECT = 'standard:connect',
  STANDARD__DISCONNECT = 'standard:disconnect',
  STANDARD__EVENTS = 'standard:events',
  SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = 'sui:signAndExecuteTransactionBlock',
  SUI__SIGN_TRANSACTION_BLOCK = 'sui:signTransactionBlock',
  SUI__SIGN_MESSAGE = 'sui:signMessage'
}

export enum PresetWallet {
  SUI_WALLET = 'Sui Wallet',
  SUIET_WALLET = 'Suiet',
  ETHOS_WALLET = 'Ethos Wallet',
  SURF_WALLET = 'Surf Wallet',
  GLASS_WALLET = 'GlassWallet',
  MORPHIS_WALLET = 'Morphis Wallet',
  MARTIAN_WALLET = 'Martian Sui Wallet',
  ONEKEY_WALLET = 'OneKey Wallet',
  SPACECY_WALLET = 'Spacecy Sui Wallet',
  NIGHTLY_WALLET = 'Nightly Wallet',
  ELLI_WALLET = 'Elli'
}
export const SuiWallet = defineWallet({
  name: PresetWallet.SUI_WALLET,
  label: 'Sui Wallet',
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEUAAAD////////9/f39/f3+/v7x+Pz///95wfGj1PXI5fgEMJeQAAAAB3RSTlMAECNgmNr40ET05wAAAOBJREFUeNplUksOgjAQbYw38LdloQdw5VZJDGuNiWtXdGvUFjlAtT2AVC4AekrLvKKYvoTMm5fpfGGswWCdit2cfTFNZYO49YfSYwW/t2+FS0TCTH6x/Q/wISPZwcYJSVc4uxdg1wI2Yn0QbmCXbAKin7AHtiCbq6wicvI5syK/+azowlZSoxNGc4l7IWswhqKlagtD4Kl9CAWBAmspbGHwhJK+HDMlkiaIcJ9BWWqMu64yhcbGVMU5nKoc/XC2fGs/HMbPra78+MGCwhUGSw7OEB4qOKU7Nrki/p2/8zt8ABpiv63tyiOHAAAAAElFTkSuQmCC',
  downloadUrl: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil'
  }
});

export const AllDefaultWallets = [SuiWallet];
