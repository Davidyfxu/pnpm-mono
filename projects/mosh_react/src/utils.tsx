import CryptoJS from 'crypto-js'
const APPID = "e9e6f1fb";
const API_SECRET = "ZmY4ZDZhOTYyZGE0MGIxYTQzM2E2MTlj";
const API_KEY = "6a3df7af42e13f352f02425bfc7a1b88";

let total_res = ''
function getWebsocketUrl():Promise<string> {
  return new Promise((resolve) => {
    const apiKey = API_KEY;
    const apiSecret = API_SECRET;
    const host = location.host;
    const date = new Date().toGMTString();
    const algorithm = "hmac-sha256";
    const headers = "host date request-line";
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
    const url = `wss://spark-api.xf-yun.com/v1.1/chat?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

class TTSRecorder {
  private readonly appId: string;
  private status: string;
  private ttsWS: any;
  private playTimeout: any;
  constructor({ appId = APPID } = {}) {
    this.appId = appId;
    this.status = "init";
  }

  // 修改状态
  setStatus(status:string) {
    // this.onWillStatusChange && this.onWillStatusChange(this.status, status);
    this.status = status;
  }

  // 连接websocket
  async connectWebSocket(inputV:any,func:any) {
    let url = await getWebsocketUrl();
    let ttsWS = new WebSocket(url)
    this.ttsWS = ttsWS;
    ttsWS.onopen = (e) => {
      this.webSocketSend(inputV);
    };
    ttsWS.onmessage = (e) => {
      this.result(e.data,func);
    };
    ttsWS.onerror = (e) => {
      clearTimeout(this.playTimeout);
      this.setStatus("error");
      alert("WebSocket报错，请f12查看详情");
      console.error(`详情查看：${encodeURI(url.replace("wss:", "https:"))}`);
    };
    ttsWS.onclose = (e) => {
      console.log(e);
    };
  }

  // websocket发送数据
  webSocketSend(inputV:any) {
    const params = {
      header: {
        app_id: this.appId,
        uid: "fd3f47e4-d",
      },
      parameter: {
        chat: {
          domain: "general",
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: [
            {
              role: "user",
              content: "中国第一个皇帝是谁？",
            },
            {
              role: "assistant",
              content: "秦始皇",
            },
            {
              role: "user",
              content: "秦始皇修的长城吗",
            },
            {
              role: "assistant",
              content: "是的",
            },
            {
              role: "user",
              content: inputV,
            },
          ],
        },
      },
    };
    this.ttsWS.send(JSON.stringify(params));
  }

  start(inputV:any,func:any) {
    total_res = ""; // 请空回答历
    this.connectWebSocket(inputV,func);
  }

  // websocket接收数据的处理
  result(resultData:any,func:any) {
    const {payload,header} = JSON.parse(resultData);
    total_res = total_res+((payload?.choices?.text||[]).map(t=>t?.content).join(""))
    console.log(total_res)

    func(total_res)
    // console.log(resultData)
    // 提问失败
    if (header.code !== 0) {
      console.error(`${header.code}:${header.message}`);
      return;
    }
    if (header.code === 0 && header.status === 2) {
      this.ttsWS.close();
    }
  }
}

// ======================开始调用=============================
// var vConsole = new VConsole();
export const bigModel = new TTSRecorder();
