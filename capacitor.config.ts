import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.groupd.oet',
  appName: 'OET App',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    Geolocation: {
      alwaysPermission: true
    },
  },
};

export default config;

