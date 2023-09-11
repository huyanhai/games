export type CardItem = {
  post: string;
  title: string;
  price: string;
};

export enum CardType {
  transaction = 'transaction',
  sell = 'sell',
  assets = 'assets'
}
