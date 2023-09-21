export enum messageType {
  SUI_MESSAGE = "SUI_MESSAGE",
  SUI_MESSAGE_RESPONSE = "SUI_MESSAGE_RESPONSE",
  SUI_ADDRESS = "SUI_ADDRESS",
  SUI_ADDRESS_RESPONSE = "SUI_ADDRESS_RESPONSE",
}

export type IframeData = { target: string; args: any[] };
export type IframeResData = Record<string, any>;

export const sendMessage = (ifream: HTMLIFrameElement, data: IframeResData, type?: messageType) => {
  ifream.contentWindow?.postMessage(
    {
      type: type || messageType.SUI_MESSAGE_RESPONSE,
      data,
    },
    "*"
  );
};

export const getMessage = (cb?: (args: IframeData, type: messageType) => void) => {
  window.addEventListener("message", (e) => {
    const { type, data } = e.data;
    if (type === messageType.SUI_ADDRESS) {
      cb && cb(data, type);
    }
    if (type === messageType.SUI_MESSAGE) {
      cb && cb(data, type);
    }
  });
};
