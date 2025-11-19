import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { performersAPI } from '../services/api';

export default function BrowseScreen({ navigation, route }) {
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route?.params?.category || '');

  useEffect(() => {
    loadPerformers();
  }, [selectedCategory]);

  const loadPerformers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const response = await performersAPI.getAll(params);
      setPerformers(response.data.results || response.data);
    } catch (error) {
      console.error('Error loading performers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadPerformers();
  };

  const categories = ['All', 'Musicians', 'Dancers', 'Comedians'];

  const renderPerformer = ({ item }) => (
    <TouchableOpacity
      style={styles.performerCard}
      onPress={() => navigation.navigate('PerformerProfile', { id: item.id })}
    >
      <Image
        source={{ uri: item.profile_photo || 'https://via.placeholder.com/150' }}
        style={styles.performerImage}
      />
      <View style={styles.performerInfo}>
        <Text style={styles.performerName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.performerCategory} numberOfLines={1}>
          {item.category} • {item.sub_category}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.rating || '4.5'}</Text>
          <Text style={styles.price}>GH₵{item.exact_price || item.price}</Text>
        </View>
        <Text style={styles.location}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search performers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={loadPerformers}
        />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category || (category === 'All' && !selectedCategory)
                ? styles.categoryChipActive
                : null,
            ]}
            onPress={() => setSelectedCategory(category === 'All' ? '' : category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category || (category === 'All' && !selectedCategory)
                  ? styles.categoryChipTextActive
                  : null,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Performers List */}
      {loading && !refreshing ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading performers...</Text>
        </View>
      ) : (
        <FlatList
          data={performers}
          renderItem={renderPerformer}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No performers found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: colors.gray100,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  categoryFilter: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    color: colors.text,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 8,
  },
  performerCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  performerImage: {
    width: '100%',
    height: 150,
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
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  location: {
    fontSize: 12,
    color: colors.textLight,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});

