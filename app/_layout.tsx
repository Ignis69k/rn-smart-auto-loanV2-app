import { Krub_400Regular, Krub_700Bold, useFonts } from "@expo-google-fonts/krub";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [floaded] = useFonts({
    Krub_400Regular,
    Krub_700Bold
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  useEffect(() => {
    async function hide() {
      if (floaded) {
        await SplashScreen.hideAsync()
      }
    }
    hide()
  }, [floaded])
  
  if (!floaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
    </Stack>
  );
}