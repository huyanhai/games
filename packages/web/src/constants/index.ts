const { VITE_APP_BASE_API } = import.meta.env;

export const CONTRACT_PACKAGE =
  window.config.VITE_SHUI_PACKAGE_ID || window.config.SHUI_PACKAGE_ID;
export const SWAP_GLOBAL_ADDRESS =
  window.config.VITE_SWAP_GLOBAL_ADDRESS || window.config.SWAP_GLOBAL_ADDRESS;
export const SWAP_RULE_INFO_ADDRESS =
  window.config.VITE_SWAP_RULE_INFO_ADDRESS ||
  window.config.SWAP_RULE_INFO_ADDRESS;
export const AIRDROP_GLOBAL_ADDRESS =
  window.config.VITE_AIRDROP_GLOBAL_ADDRESS ||
  window.config.AIRDROP_GLOBAL_ADDRESS;

export const BOAT_GLOBAL_ADDRESS = window.config.BOAT_GLOBAL_ADDRESS;

export const APP_BASE_API = VITE_APP_BASE_API;
