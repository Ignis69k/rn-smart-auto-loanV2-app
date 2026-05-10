import { router , useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const carkey = require("@/assets/images/carkey.png");

export default function Result() {
    const params = useLocalSearchParams();
    const carPrice = parseFloat(params.carPrice as string || "0");
    const downPaymentAmount = parseFloat(params.downPaymentAmount as string || "0");
    const carPriceLoan = parseFloat(params.carPriceLoan as string || "0");
    const termMonths = parseFloat(params.termMonths as string || "0");
    const monthlyPayment = parseFloat(params.monthlyPayment as string || "0");

    const formatNumber = (num: number) => {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={carkey} style={styles.icon} />
                <Text style={styles.headerTitle}>สรุปยอดผ่อนชำระ</Text>
            </View>

            {/* Card แสดงยอดผ่อนต่อเดือน (Highlight) */}
            <View style={styles.highlightCard}>
                <Text style={styles.highlightLabel}>ผ่อนเริ่มต้นเพียง</Text>
                <Text style={styles.highlightValue}>{formatNumber(monthlyPayment)}</Text>
                <Text style={styles.highlightUnit}>บาท / {termMonths} เดือน </Text>
            </View>

            {/* Detail List */}
            <View style={styles.detailContainer}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}> ราคารถยนต์</Text>
                    <Text style={[styles.rowValue]}>{formatNumber(carPrice)} บาท</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}> เงินดาวน์</Text>
                    <Text style={[styles.rowValue]}>{formatNumber(downPaymentAmount)} บาท</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}> ยอดจัด</Text>
                    <Text style={[styles.rowValue]}>{formatNumber(carPriceLoan)} บาท</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.homeBtn} onPress={() => router.back()}>
                <Text style={styles.btnText}>คำนวณใหม่</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1E293B", padding: 20 },
    header: { alignItems: "center", marginTop: 40, marginBottom: 20 },
    icon: { width: 80, height: 80, marginBottom: 10 },
    headerTitle: { fontFamily: "Krub_700Bold", fontSize: 24, color: "#FFF" },

    highlightCard: {
        backgroundColor: "#2563EB",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        elevation: 5,
    },
    highlightLabel: {
        fontFamily: "Krub_400Regular",
        color: "#BFDBFE",
        fontSize: 16,
    },
    highlightValue: {
        fontFamily: "Krub_700Bold",
        color: "#FFF",
        fontSize: 48,
        marginVertical: 5,
    },
    highlightUnit: {
        fontFamily: "Krub_400Regular",
        color: "#FFF",
        fontSize: 14,
    },

    detailContainer: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    rowLabel: { fontFamily: "Krub_400Regular", color: "#64748B", fontSize: 16 },
    rowValue: { fontFamily: "Krub_600SemiBold", fontSize: 18 },
    divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 10 },
    note: {
        fontFamily: "Krub_400Regular",
        color: "#94A3B8",
        fontSize: 12,
        textAlign: "center",
    },

    homeBtn: {
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
    },
    btnText: { fontFamily: "Krub_600SemiBold", color: "#FFF", fontSize: 16 },
});