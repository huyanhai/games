import type { CardType } from "@/components/market/types";

export type QueryPage = {
  page: number;
  pageSize: number;
};

export type QueryMarket = {
  type: "gamefi" | "nft";
  use?: CardType | undefined;
  wallet_addr?: string;
  address?: string;
};
