export enum messageType {
  SUI_MESSAGE = 'SUI_MESSAGE',
  SUI_MESSAGE_RESPONSE = 'SUI_MESSAGE_RESPONSE'
}

export type IframeData = { target: string; args: any[] };
export type IframeResData = Record<string, any>;

export const sendMessage = (ifream: HTMLIFrameElement, data: IframeResData) => {
  ifream.contentWindow?.postMessage(
    {
      type: messageType.SUI_MESSAGE_RESPONSE,
      data
    },
    '*'
  );
};

export const getMessage = (cb?: (args: IframeData) => void) => {
  window.addEventListener('message', (e) => {
    const { type, data } = e.data;
    if (type === messageType.SUI_MESSAGE) {
      cb && cb(data);
    }
  });
};
