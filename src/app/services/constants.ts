export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
 export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
//export const API_BASE_URL: string = `http://${HOST}`;
export const SEED_BASE_URL: string = 'http://82.202.236.172:8080';//`http://${HOST}:8080`;
//export const SEED_BASE_URL: string = `http://${HOST}:8080`;
export const PROVISIONING_BASE_URL: string = 'http://82.202.236.172:8081';//`http://${HOST}:8081`;
//export const PROVISIONING_BASE_URL: string = `http://${HOST}:8081`;
export const AUTH_SERVER_BASE_URL = `http://${HOST}:9999`;
export const AUTH_CONSUMER_BASE_URL = `http://${HOST}:9998`;
export const AUTH_SERVER_URL: string = AUTH_SERVER_BASE_URL + '/auth-server/oauth/authorize';
export const AUTH_CONSUMER_URL: string = AUTH_CONSUMER_BASE_URL + '/oauth2-consumer/authorize';
export const STATES = {
  'registration': '/main/user/add',
  'registration_success' : '/main/user',
  'registrationCompletionByLink' : '/password',
  'registrationCompletionByLink_success' : '/login',
  'registrationCompletionByLink_fail' : '/login',
  'startPasswordRecovery' : '/password-email',
  'startPasswordRecovery_success': '/login',
  'startPasswordRecovery_fail': '/login',
  'passwordResetByLink' : '/password-recovery',
  'passwordResetByLink_success' : '/login',
  'passwordResetByLink_fail' : '/login',
  'fail' : '/login'
};
