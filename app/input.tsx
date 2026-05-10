import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const DOWN_PAYMENT_OPTIONS = [5, 10, 15, 20, 25, 30, 35];
const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];

export default function Input() {
  const [carPrice, setCarPrice] = useState('');
  const [downPaymentPercent, setDownPaymentPercent] = useState(5);
  const [termMonths, setTermMonths] = useState(24);
  const [interestRate, setInterestRate] = useState("");
  let monthlyPayment = 0;

  const HandleCalculateButton = () =>{
   if (!carPrice || !interestRate) {
    if (Platform.OS === 'web') {
      window.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      Alert.alert("แจ้งเตือน","กรุณากรอกข้อมูลให้ครบถ้วน");
    }
    return;
   } 

   const carPriceNum = parseFloat(carPrice);
   const interestRateNum = parseFloat(interestRate);
   const downPaymentAmount = (carPriceNum * downPaymentPercent) / 100;
   const carPriceLoan = carPriceNum - downPaymentAmount;
   const totalInterest = (carPriceNum * interestRateNum / 100) * (termMonths / 12);
   monthlyPayment = (carPriceLoan + totalInterest) / termMonths

   router.push({
    pathname: '/result',
    params: {
      carPrice: carPrice,
      downPaymentPercent: downPaymentPercent,
      downPaymentAmount: downPaymentAmount,
      carPriceLoan: carPriceLoan,
      totalInterest: totalInterest,
      termMonths: termMonths,
      monthlyPayment: monthlyPayment,
    },
   })

  }

  return (
    <View style={styles.container}>
      {/* Blue curved header with car icon */}
      <View style={styles.headerContainer}>
        <View style={styles.headerCurve} />
        <Image
          source={require('@/assets/images/carbgicon.png')}
          style={styles.carIcon}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>คำนวณค่างวดรถ</Text>

        {/* Car Price Input */}
        <Text style={styles.label}>ราคารถ (บาท)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="เช่น 850000"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
            value={carPrice}
            onChangeText={setCarPrice}
          />
        </View>

        {/* Down Payment Percentage */}
        <Text style={styles.label}>เลือกเงินดาวน์ (%)</Text>
        <View style={styles.chipsRow}>
          {DOWN_PAYMENT_OPTIONS.map((pct) => (
            <TouchableOpacity
              key={pct}
              onPress={() => setDownPaymentPercent(pct)}
              style={[
                styles.chip,
                downPaymentPercent === pct && styles.chipSelected,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  downPaymentPercent === pct && styles.chipTextSelected,
                ]}
              >
                {pct}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loan Term */}
        <Text style={styles.label}>ระยะเวลาผ่อน (งวด)</Text>
        <View style={styles.chipsRow}>
          {TERM_OPTIONS.map((term) => (
            <TouchableOpacity
              key={term}
              style={[
                styles.chip,
                termMonths === term && styles.chipSelected,
              ]}
              onPress={() => setTermMonths(term)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  termMonths === term && styles.chipTextSelected,
                ]}
              >
                {term}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interest Rate Input */}
        <Text style={styles.label}>ดอกเบี้ย (% ต่อปี)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="เช่น 2.59"
            placeholderTextColor="#B0B0B0"
            keyboardType="decimal-pad"
            value={interestRate}
            onChangeText={setInterestRate}
          />
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
          onPress={() => HandleCalculateButton()}
          style={styles.calculateButton}
          activeOpacity={0.85}
        >
          <Text style={styles.calculateButtonText}>คำนวณค่างวด</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // ── Header ──
  headerContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerCurve: {
    position: 'absolute',
    top: -60,
    width: width * 1.4,
    height: 260,
    backgroundColor: '#3478F6',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  carIcon: {
    width: 180,
    height: 140,
    marginTop: 10,
  },
  // ── Scroll ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  // ── Title ──
  title: {
    fontSize: 24,
    fontFamily: 'Krub_700Bold',
    color: '#1A1A2E',
    marginBottom: 20,
  },
  // ── Labels ──
  label: {
    fontSize: 15,
    fontFamily: 'Krub_700Bold',
    color: '#1A1A2E',
    marginBottom: 8,
    marginTop: 12,
  },
  // ── Text Inputs ──
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Krub_400Regular',
    color: '#333',
    height: 48,
  },
  // ── Chips ──
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  chip: {
    minWidth: 60,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: '#1A1A2E',
    borderColor: '#1A1A2E',
  },
  chipText: {
    fontSize: 15,
    fontFamily: 'Krub_400Regular',
    color: '#555',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontFamily: 'Krub_700Bold',
  },
  // ── Button ──
  calculateButton: {
    marginTop: 48,
    backgroundColor: '#3478F6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#3478F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calculateButtonText: {
    fontSize: 18,
    fontFamily: 'Krub_700Bold',
    color: '#FFFFFF',
  },
});