import { request } from '@/plugins/axios';

// 发送验证码
export function sendVerifyCode(params: { phone: string }) {
  return request.get('send_verify_code', {
    params,
    responseType: 'json'
  });
}
