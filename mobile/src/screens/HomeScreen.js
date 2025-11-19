import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { performersAPI } from '../services/api';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [featuredPerformers, setFeaturedPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedPerformers();
  }, []);

  const loadFeaturedPerformers = async () => {
    try {
      const response = await performersAPI.getFeatured();
      setFeaturedPerformers(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error loading performers:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, name: 'Musicians', icon: '🎵', color: colors.primary },
    { id: 2, name: 'Dancers', icon: '💃', color: colors.secondary },
    { id: 3, name: 'Comedians', icon: '😂', color: '#10B981' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Find Perfect Entertainment{'\n'}for Your Celebration
          </Text>
          <Text style={styles.heroSubtitle}>
            Connect with talented musicians, dancers, and comedians in Ghana
          </Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Browse')}
          >
            <Text style={styles.searchButtonText}>Search Performers</Text>
          </TouchableOpacity>
        </View>

        {/* Category Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderColor: category.color }]}
                onPress={() => navigation.navigate('Browse', { category: category.name })}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Performers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Performers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              featuredPerformers.map((performer) => (
                <TouchableOpacity
                  key={performer.id}
                  style={styles.performerCard}
                  onPress={() => navigation.navigate('PerformerProfile', { id: performer.id })}
                >
                  <Image
                    source={{ uri: performer.profile_photo || 'https://via.placeholder.com/200' }}
                    style={styles.performerImage}
                  />
                  <View style={styles.performerInfo}>
                    <Text style={styles.performerName} numberOfLines={1}>
                      {performer.name}
                    </Text>
                    <Text style={styles.performerCategory} numberOfLines={1}>
                      {performer.category}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>⭐ {performer.rating || '4.5'}</Text>
                      <Text style={styles.price}>GH₵{performer.exact_price || performer.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Browse</Text>
              <Text style={styles.stepDescription}>
                Explore talented performers
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Book</Text>
              <Text style={styles.stepDescription}>
                Send booking requests
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Celebrate</Text>
              <Text style={styles.stepDescription}>
                Enjoy your event
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    backgroundColor: colors.primary,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.gray50,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  carousel: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  performerCard: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  performerImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray200,
  },
  performerInfo: {
    padding: 12,
  },
  performerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  performerCategory: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: colors.textLight,
    padding: 20,
  },
});

