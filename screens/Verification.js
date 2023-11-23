import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from "react-native-animatable"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar'
import { FONTS, COLORS, SIZES } from '../constants'
import Button from "../components/Button"
import OTPTextInput from 'react-native-otp-textinput'
import { firebaseConfig } from '../config';
import firebse from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


const Verification = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const { phoneNumber } = route.params;
  const [phone, setPhone] = useState(phoneNumber);
  const recaptchaVerifier = useRef(null);

  console.log(phoneNumber);

  const sendVerification = async () => {
    
    const phoneProvider = new firebse.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(sendVerification);
    setPhone('');

  }
  const confirmCode = () => {
    const credential = firebse.auth.PhoneAuthProvider.credential(verificationId, code);
    firebse.auth().signInWithCredential(credential)
      .then(() => {
        setCode('');
      })
      .catch((error) => {
        alert(error);
      })
    Alert.alert('Login Succesful. Welcome')
    }
    useEffect(() => {
      sendVerification();
    }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig} />
      <LinearGradient
        colors={["rgba(230, 81, 0, 1)", "rgba(230, 81, 0, .8)"]}
        style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Verification</Text>
          <Text style={styles.subHeaderTitle}>Please verify your OTP code.</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Code</Text>
            <OTPTextInput
              textInputStyle={styles.OTPStyle}
              inputCount={6}
              tintColor={COLORS.primary}
              handleCellTextChange={setCode}
            />

            <Button
              title="VERIFY"
              isLoading={isLoading}
              onPress={ () => {
                try {
                   confirmCode();
                  navigation.navigate('Home');
                } catch (error) {
                  console.error('Verification error:', error);
                }
              }}
            />
          </KeyboardAwareScrollView>
        </Animatable.View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white
  },
  subHeaderTitle: {
    ...FONTS.body4,
    color: COLORS.white,
    marginVertical: SIZES.padding,
    textAlign: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30
  },
  inputHeader: {
    textTransform: 'uppercase',
    ...FONTS.body4,
    marginVertical: 4
  },
  OTPStyle: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 10,
    height: 58,
    width: 58,
    borderBottomWidth: 1,
  },
})
export default Verification