export const formatMoney = (money: number) => {
  return new Intl.NumberFormat().format(money);
};

export const bytesToU64 = (bytes: Uint8Array): number => {
  const dataView = new DataView(bytes.buffer);
  const intValue = dataView.getInt32(0, true);
  return intValue;
};
