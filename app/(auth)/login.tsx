import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { CustomTextInput } from '../../components/TextInput';

const { width } = Dimensions.get('window');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt with:', email, password);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
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
                  <Ionicons name="fitness" size={32} color={Colors.primary} style={styles.heartIcon} />
                  <Text style={styles.welcomeText}>Welcome Back, Coach</Text>
                </View>
                <Text style={styles.subtitle}>Manage your athletes and training programs</Text>
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

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.loginButtonText}>Login</Text>
                <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1, justifyContent: 'flex-start', width: '100%' },
  header: { marginTop: 110, marginBottom: 30 },
  logoWrapper: { alignItems: 'center', gap: 20 },
  logo: { width: 100, height: 100 },
  titleContainer: { alignItems: 'center', gap: 8 },
  welcomeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#333333', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666666', textAlign: 'center', maxWidth: width * 0.8, lineHeight: 24 },
  heartIcon: { marginRight: 12 },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
  },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  loginButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonIcon: { marginLeft: 8 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', lineHeight: 20 },
}); 