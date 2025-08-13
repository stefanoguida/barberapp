import { View, Text, Image } from 'react-native';
import Icon from './Icon';

export default function ReviewsList({ reviews, rating, reviewsCount }: {
  reviews: any[];
  rating: number;
  reviewsCount: number;
}) {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Reviews</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 36, fontWeight: '900', marginRight: 8 }}>{rating}</Text>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name={i < Math.round(rating) ? "star" : "star-outline"} size={18} color="#111418" />
            ))}
          </View>
          <Text style={{ fontSize: 16 }}>({reviewsCount} reviews)</Text>
        </View>
      </View>
      {reviews.map((review) => (
        <View key={review.id} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image source={{ uri: review.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{review.author}</Text>
              <Text style={{ fontSize: 14, color: '#60758a' }}>{review.date}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name={i < review.rating ? "star" : "star-outline"} size={16} color="#111418" />
            ))}
          </View>
          <Text style={{ fontSize: 16 }}>{review.text}</Text>
        </View>
      ))}
    </View>
  );
}