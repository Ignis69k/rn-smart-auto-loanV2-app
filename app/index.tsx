import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/input");
    }, 2000);
    return () => clearTimeout(timer)
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/carloan512.png")} style={styles.imgLogo} />
      <Text style={styles.txtitle}>Smart Auto Loan</Text>
      <Text style={[styles.subtitle, { marginVertical: 5 }]}>วางแผนออกรถอย่างชาญฉลาด</Text>
      <ActivityIndicator style={{ top: 20 }} size="large" color="#ffffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b1cc4ff",
  },
  imgLogo:{
    width:200,
    height:200,
  },
  txtitle:{
    color:"#fff",
    fontSize:24,
    fontFamily:"Krub_400Regular",
  },
  subtitle:{
    color:"#ffffff8c",
    fontSize:16,
    fontFamily:"Krub_400Regular",
  }
});