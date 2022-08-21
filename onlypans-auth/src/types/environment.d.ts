export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ONLYPANS_DB_URL: string;
    }
  }
}