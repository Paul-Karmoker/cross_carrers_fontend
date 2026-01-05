/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;

  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_URL_PROD: string;

  readonly VITE_AWS_BASE_URL: string;
  readonly VITE_AWS_BASE_URL_PROD: string;

  readonly VITE_FRONT_BASE_URL: string;
  readonly VITE_FRONT_BASE_URL_PROD: string;

  readonly VITE_AWS_CDN: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_CRYPTO_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
