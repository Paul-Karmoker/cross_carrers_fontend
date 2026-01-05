const isProd = import.meta.env.MODE === "production";

const config = {
  host: isProd
    ? import.meta.env.VITE_BASE_URL_PROD
    : import.meta.env.VITE_BASE_URL,

  hostAws: isProd
    ? import.meta.env.VITE_AWS_BASE_URL_PROD
    : import.meta.env.VITE_AWS_BASE_URL,

  hostFront: isProd
    ? import.meta.env.VITE_FRONT_BASE_URL_PROD
    : import.meta.env.VITE_FRONT_BASE_URL,

  awsCdnUrl: import.meta.env.VITE_AWS_CDN,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  cryptoKey: import.meta.env.VITE_CRYPTO_KEY,
} as const;

export default config;
