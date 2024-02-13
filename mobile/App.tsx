import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Routes } from "@routes/index";

import { AuthContextProvider } from "@contexts/AuthContext";
import OneSignal, { NotificationReceivedEvent } from "react-native-onesignal";
import { THEME } from "./src/theme";

import { Loading } from "@components/Loading";
import { useEffect } from "react";

OneSignal.setAppId(process.env.EXPO_PUBLIC_ONE_SIGNAL);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        console.log(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log("notification: ", notification);
        const data = notification.additionalData;
        console.log("additionalData: ", data);
        notificationReceivedEvent.complete(notification);
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
