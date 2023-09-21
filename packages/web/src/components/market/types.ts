export type CardItem = {
  img_url: string;
  name: string;
  price: string;
  item_id: string;
  kioskId: string;
  owner: string;
  num: string;
  objectId?: string;
  description?: string;
  kioskcap?: string;
  type: "nft" | "gamefi";
};

export enum CardType {
  all = "all",
  record = "record",
  sell = "sell",
  asset = "asset",
}
