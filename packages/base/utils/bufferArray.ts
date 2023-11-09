export const bytesArrayToHex = (u8Array: Uint8Array): string => {
  let hexString = "";
  for (let i = 0; i < u8Array.length; i++) {
    const hex = u8Array[i].toString(16).padStart(2, "0");
    hexString += hex;
  }
  return hexString;
};

export const bytesArrayToU64Str = (input: Uint8Array): any => {
  // bigInt 数据后面有一个n
  // 11n => 11
  return new BigUint64Array(new Uint8Array(input).buffer)[0].toString();
};
