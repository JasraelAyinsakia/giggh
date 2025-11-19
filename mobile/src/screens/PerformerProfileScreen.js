import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { performersAPI, reviewsAPI } from '../services/api';

const { width } = Dimensions.get('window');

export default function PerformerProfileScreen({ navigation, route }) {
  const { id } = route.params;
  const [performer, setPerformer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformer();
    loadReviews();
  }, [id]);

  const loadPerformer = async () => {
    try {
      const response = await performersAPI.getById(id);
      setPerformer(response.data);
    } catch (error) {
      console.error('Error loading performer:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewsAPI.getAll({ performer_id: id });
      setReviews(response.data.results || response.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  if (loading || !performer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Image
          source={{ uri: performer.profile_photo || 'https://via.placeholder.com/400' }}
          style={styles.profileImage}
        />

        <View style={styles.content}>
          {/* Name and Category */}
          <Text style={styles.name}>{performer.name}</Text>
          <Text style={styles.category}>
            {performer.category} • {performer.sub_category}
          </Text>

          {/* Rating and Price */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Rating</Text>
              <Text style={styles.statValue}>⭐ {performer.rating || '4.5'}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Price</Text>
              <Text style={styles.statValue}>GH₵{performer.exact_price || performer.price}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Experience</Text>
              <Text style={styles.statValue}>{performer.years_experience || 5} years</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>📍 Location</Text>
            <Text style={styles.infoValue}>{performer.location}</Text>
          </View>

          {/* Bio */}
          {performer.bio && (
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>About</Text>
              <Text style={styles.infoValue}>{performer.bio}</Text>
            </View>
          )}

          {/* Videos Section */}
          {performer.videos && performer.videos.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Performance Videos</Text>
              {performer.videos.map((video, index) => (
                <View key={index} style={styles.videoPlaceholder}>
                  <Text style={styles.videoText}>Video {index + 1}</Text>
                  <Text style={styles.videoUrl}>{video}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Reviews Section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>
              Reviews ({reviews.length})
            </Text>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>{review.customer_name || 'Anonymous'}</Text>
                    <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
                  </View>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                  <Text style={styles.reviewDate}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noReviews}>No reviews yet</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Book Now Button (Sticky) */}
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { performerId: id })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
  },
  profileImage: {
    width: width,
    height: width * 0.75,
    backgroundColor: colors.gray200,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  videoPlaceholder: {
    backgroundColor: colors.gray100,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  videoText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  videoUrl: {
    fontSize: 12,
    color: colors.textLight,
  },
  reviewCard: {
    backgroundColor: colors.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  reviewRating: {
    fontSize: 14,
    color: colors.text,
  },
  reviewText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  noReviews: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  bookButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

