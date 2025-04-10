import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions, ScrollView, Linking, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { CustomTextInput } from '../../components/TextInput';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt with:', email, password);
    router.replace('/(tabs)/home');
  };

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.whiteBackground}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.header}>
                  <View style={styles.logoWrapper}>
                    <Image 
                      source={require('../../assets/images/kahunas-initial.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                    <View style={styles.titleContainer}>
                      <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome Back, Coach</Text>
                      </View>
                      <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Manage your athletes and training programs</Text>
                        <Ionicons name="fitness" size={32} color={Colors.primary} style={styles.heartIcon} />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.formContainer}>
                  <CustomTextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail-outline"
                    autoFocus={true}
                  />

                  <CustomTextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    showPasswordToggle
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    icon="lock-closed-outline"
                  />

                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <View style={styles.termsContainer}>
                    <TouchableOpacity 
                      style={styles.termsCheckbox}
                      onPress={() => setTermsAccepted(prev => !prev)}
                      activeOpacity={0.7}
                    >
                      <Ionicons 
                        name={termsAccepted ? "checkbox" : "square-outline"} 
                        size={20} 
                        color={termsAccepted ? Colors.primary : "#94a3b8"} 
                      />
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                      I accept the{' '}
                      <Text 
                        style={styles.termsLink}
                        onPress={() => Linking.openURL('https://kahunas.io/terms-conditions')}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={[styles.loginButton, !termsAccepted && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={!termsAccepted}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.loginButtonText}>Login</Text>
                      <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  safeArea: { 
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: height,
  },
  header: { marginTop: 110, marginBottom: 30 },
  logoWrapper: { alignItems: 'center', gap: 20 },
  logo: { width: 100, height: 100 },
  titleContainer: { alignItems: 'center', gap: 8 },
  welcomeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#333333', textAlign: 'center' },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: { fontSize: 16, color: '#666666', textAlign: 'center', maxWidth: width * 0.8, lineHeight: 24 },
  heartIcon: { marginLeft: 8 },
  formContainer: {
    backgroundColor: '#F5F5F5',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
    minHeight: height * 0.55,
  },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsCheckbox: {
    marginRight: 8,
  },
  termsText: {
    color: '#666666',
    fontSize: 14,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  loginButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonIcon: { marginLeft: 8 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', lineHeight: 20 },
  loginButtonDisabled: {
    opacity: 0.5,
  },
}); 