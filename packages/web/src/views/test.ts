import {
  Ed25519Keypair,
  JsonRpcProvider,
  RawSigner,
  TransactionBlock,
  testnetConnection,
  fromB64,
  PRIVATE_KEY_SIZE,
  normalizeSuiObjectId
} from '@mysten/sui.js';

import { type IframeData, sendMessage } from '@game-web/base';

const sigin = (param: { sBase64?: string; provider: JsonRpcProvider }) => {
  const { sBase64, provider } = param;
  const raw = fromB64(
    sBase64 || 'AIH+KaXFiMO4rvInzYrVmejyjWxEU/2gMC1tdJZWWwTE='
  );
  if (raw[0] !== 0 || raw.length !== PRIVATE_KEY_SIZE + 1) {
    throw new Error('invalid key');
  }
  const keypair = Ed25519Keypair.fromSecretKey(raw.slice(1));

  const signer = new RawSigner(keypair, provider);
  return signer;
};

export const useSui = (ifream: HTMLIFrameElement) => {
  const provider = new JsonRpcProvider(testnetConnection);
  const signer = sigin({ provider });
  const tx = new TransactionBlock();

  const send = async (data: IframeData) => {
    try {
      tx.moveCall({
        target: data.target as any,
        arguments: data.args.map((item: any) =>
          tx.object(normalizeSuiObjectId(item))
        )
      });
      const result = await signer.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
          showInput: false,
          showEvents: false,
          showObjectChanges: false,
          showBalanceChanges: false
        }
      });
      sendMessage(ifream, result);
    } catch (err: any) {
      sendMessage(ifream, err);
    }
  };

  return { send };
};
