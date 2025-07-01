interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_VAPID_PUBLIC_KEY: string;
  // add other env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
