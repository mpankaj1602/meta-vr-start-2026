import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// WebXR needs a secure context. localhost counts, but a Quest headset loading
// the dev server over the LAN does not, so `--mode quest` serves HTTPS with a
// self-signed cert and listens on the network.
export default defineConfig(({ mode }) => {
  const quest = mode === 'quest';
  return {
    plugins: quest ? [basicSsl()] : [],
    server: {
      host: quest,
      port: 5173,
    },
    build: {
      target: 'es2022',
    },
  };
});
