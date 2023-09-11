import { APP_BASE_API } from '@/constants';
import { createAxios } from '@game-web/base';

const base_url = APP_BASE_API;

const { request, setupAxios } = createAxios(base_url);

export { request, setupAxios };
