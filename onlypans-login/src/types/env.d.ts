export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SECRET: string;
      API_URL: string;
    }
  }
}