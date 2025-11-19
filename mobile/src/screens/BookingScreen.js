import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { bookingsAPI } from '../services/api';

export default function BookingScreen({ navigation, route }) {
  const { performerId } = route.params || {};
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    email: '',
    event_type: '',
    event_date: '',
    event_location: '',
    event_duration: '',
    budget: '',
    additional_details: '',
    performer: performerId,
  });
  const [loading, setLoading] = useState(false);

  const eventTypes = ['Birthday', 'Wedding', 'Anniversary', 'Corporate', 'Other'];

  const handleSubmit = async () => {
    // Validation
    if (!formData.customer_name || !formData.phone_number || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.event_type || !formData.event_date || !formData.event_location) {
      Alert.alert('Error', 'Please fill in event details');
      return;
    }

    try {
      setLoading(true);
      await bookingsAPI.create(formData);
      Alert.alert(
        'Success',
        'Booking request submitted! GigGH team will contact you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Your Name *"
            value={formData.customer_name}
            onChangeText={(text) => setFormData({ ...formData, customer_name: text })}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            value={formData.phone_number}
            onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Event Type (Birthday, Wedding, etc.) *"
            value={formData.event_type}
            onChangeText={(text) => setFormData({ ...formData, event_type: text })}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Event Date (YYYY-MM-DD) *"
            value={formData.event_date}
            onChangeText={(text) => setFormData({ ...formData, event_date: text })}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Event Location *"
            value={formData.event_location}
            onChangeText={(text) => setFormData({ ...formData, event_location: text })}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Duration (hours)"
            value={formData.event_duration}
            onChangeText={(text) => setFormData({ ...formData, event_duration: text })}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Budget (GH₵)"
            value={formData.budget}
            onChangeText={(text) => setFormData({ ...formData, budget: text })}
            keyboardType="numeric"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Additional Details"
            value={formData.additional_details}
            onChangeText={(text) => setFormData({ ...formData, additional_details: text })}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.note}>
            * GigGH team will contact you within 24 hours to confirm booking and payment
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  note: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

