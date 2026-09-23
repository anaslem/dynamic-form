import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44300/',
  redirectUri: baseUrl,
  clientId: 'AbpDemo_App',
  responseType: 'code',
  scope: 'offline_access AbpDemo',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'AbpDemo',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44300',
      rootNamespace: 'AbpDemo',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
