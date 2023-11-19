export enum messageType {
  SUI_MESSAGE = "SUI_MESSAGE",
  SUI_MESSAGE_RESPONSE = "SUI_MESSAGE_RESPONSE",
  SUI_ADDRESS = "SUI_ADDRESS",
  SUI_ADDRESS_RESPONSE = "SUI_ADDRESS_RESPONSE",
}

export type IframeData = { target: string; args: any[]; typeArguments?: any[] };
export type IframeResData = Record<string, any>;

const messageHandler = (e: any, cb?: (args: IframeData, type: messageType, unityType?: string) => void) => {
  const { type, data, unityType } = e.data;
  if (type === messageType.SUI_ADDRESS) {
    cb && cb(data, type, unityType);
  }
  if (type === messageType.SUI_MESSAGE) {
    cb && cb(data, type, unityType);
  }
};

export const sendMessage = (ifream: HTMLIFrameElement, data: IframeResData, type?: messageType) => {
  ifream.contentWindow?.postMessage(
    {
      type: type || messageType.SUI_MESSAGE_RESPONSE,
      data,
    },
    "*"
  );
};

export const getMessage = (cb?: (args: IframeData, type: messageType, unityType?: string) => void) => {
  // 会出现多次调用的情况
  // window.addEventListener("message", (e: any) => {
  //   messageHandler(e, cb);
  // });
  window.onmessage = (e: any) => {
    messageHandler(e, cb);
  };
};

export const removeMessage = () => {
  window.removeEventListener("message", messageHandler);
};
