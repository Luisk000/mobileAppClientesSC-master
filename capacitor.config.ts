/// <reference types="@capacitor/local-notifications" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'clientesMobileSc',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    },
    LocalNotificationSchema: {
      title: "teste",
      body: "teste body",
      schedule: {
        repeats: true,
        every: "minute",
        on: { second: 1 }
      }
    }
  }
};

export default config;
