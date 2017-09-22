export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const SEED_BASE_URL: string = `http://${HOST}:8080`;
export const AUTH_SERVER_BASE_URL = `http://${HOST}:9999`;
export const AUTH_CONSUMER_BASE_URL = `http://${HOST}:9998`;
export const AUTH_SERVER_URL: string = AUTH_SERVER_BASE_URL + '/auth-server/oauth/authorize';
export const AUTH_CONSUMER_URL: string = AUTH_CONSUMER_BASE_URL + '/oauth2-consumer/authorize';
export const STATES = {
  'start_registration': '/main/user/edit',
  'request_data' : '/password'
};
