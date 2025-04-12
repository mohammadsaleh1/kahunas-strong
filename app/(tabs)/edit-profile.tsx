import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { CustomTextInput } from '../../components/TextInput';
import { Colors } from '@/constants/Colors';

interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  phone: string;
}

export default function EditProfile() {
  const [formData, setFormData] = useState<FormData>({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Fitness Enthusiast',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900'
  });

  const [image, setImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="camera" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <CustomTextInput
                label="First Name"
                value={formData.firstName}
                onChangeText={(text: string) => setFormData({ ...formData, firstName: text })}
                placeholder="First name"
                icon="person-outline"
                style={styles.input}
              />
            </View>

            <View style={styles.halfWidth}>
              <CustomTextInput
                label="Last Name"
                value={formData.lastName}
                onChangeText={(text: string) => setFormData({ ...formData, lastName: text })}
                placeholder="Last name"
                icon="person-outline"
                style={styles.input}
              />
            </View>
          </View>

          <CustomTextInput
            label="Bio"
            value={formData.bio}
            onChangeText={(text: string) => setFormData({ ...formData, bio: text })}
            placeholder="Write something about yourself"
            icon="information-circle-outline"
            style={styles.input}
          />

          <CustomTextInput
            label="Email"
            value={formData.email}
            onChangeText={(text: string) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            style={styles.input}
          />

          <CustomTextInput
            label="Phone"
            value={formData.phone}
            onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            icon="call-outline"
            style={styles.input}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputSection: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
}); 