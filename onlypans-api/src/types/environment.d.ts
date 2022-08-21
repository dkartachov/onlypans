export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      PORT: number;
      DB_URL: string;
      AUTH_URL: string;
    }
  }
}