import { request } from "@/plugins/axios";
import type { QueryPage, QueryMarket } from "./index.d";
// 发送验证码
export function sendVerifyCode(params: { phone: string }) {
  return request.get("send_verify_code", {
    params,
    responseType: "json",
  });
}

// 注册
export function registerMeta(params: { phone: string; email: string; wallet_addr: string; code: string; name?: string }) {
  return request.get("register_meta", {
    params,
    responseType: "json",
  });
}

// 邀请注册
export function inviteRegisterMeta(params: { phone: string; email: string; wallet_addr: string; code: string; name?: string; invite_register_meta: string }) {
  return request.get("invite_register_meta", {
    params,
    responseType: "json",
  });
}

// 获取信息
export function metaStatus(params: { wallet_addr: string; phone?: string }) {
  return request.get("query_meta_status", {
    params,
    responseType: "json",
  });
}

// 获取信息
export function queryOpenseaNft() {
  return request.get("query_opensea_nft_left", {
    responseType: "json",
  });
}

// 获取空投数
export function queryAirdrop() {
  return request.get("query_shui_info", {
    responseType: "json",
  });
}

// 查询是否可以领取空投
export function checkAirDrop(params: { wallet_addr: string }) {
  return request.get("query_airdrop_status", {
    responseType: "json",
    params,
  });
}

// 查询Market
export function queryMarketItems(params: QueryMarket) {
  return request.get("query_market_info", {
    responseType: "json",
    params,
  });
}

// 查询Nft
export function queryNftItems(params: { wallet_addr: string }) {
  return request.get("query_my_nfts", {
    responseType: "json",
    params,
  });
}

// 小金库
export function queryMarketProfit(params: { wallet_addr: string }) {
  return request.get("query_my_market_profit", {
    responseType: "json",
    params,
  });
}

// ip查询
export function getIps(params: QueryPage) {
  const origin = import.meta.env.MODE === "development" ? "https://shui.one" : location.origin;

  const url = `${origin}:3000/shui/query_agent`;
  return request.get(url, {
    responseType: "json",
    params,
  });
}

// ip记录
export function genIp() {
  const origin = import.meta.env.MODE === "development" ? "https://shui.one" : location.origin;

  const url = `${origin}:3000/shui`;
  return request.get(url, {
    responseType: "json",
  });
}

export function insertImage(data: { obj_id: string; image_url: string }) {
  return request.post(
    "insert_image_url_by_obj_id",
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
