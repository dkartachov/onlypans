export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_URL: string;
      API_SECRET: string;
    }
  }
}