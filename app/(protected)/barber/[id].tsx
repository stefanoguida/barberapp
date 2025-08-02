import { Text, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';

const mockReviews = [
  {
    id: '1',
    author: 'Marco Rossi',
    date: '2 weeks ago',
    rating: 5,
    text: "Best haircut I've had in years! The barber was skilled and attentive to detail. Highly recommend.",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbp_7TS2AvS3Its9jH5fmMMY89T0u7zA1PU5YDSH1ex-gQ2NN1AKxrcELDa_25FfXFlEsKmqPtcWrFq1Q0YXtkwjOO70kGWrjDuzRFuNqTwXxkG1d8Vf_NX87MdecRBbC-ouV3EFskj7U1lNgLkkzAZ9rjEuX2yTCnYdbVfZOGp5kIw_Y8D1Ux8gtJCE_LCLak2srywPcVyv0fLJTbkHNkBLjk-_bWmpjyCdFMZWAcdC7Qdhu2wxqt8JJBWFH9Ugu_zwIfgc0TS78',
  },
  {
    id: '2',
    author: 'Giulia Bianchi',
    date: '1 month ago',
    rating: 4,
    text: 'Great experience overall. The staff was friendly and the atmosphere was relaxing. My haircut was good, but could have been a bit more precise.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb-Tr3tErK82h1ywLlMnk9934QEhZiq8u4r-Pxyt1PTXs9bVCkOmgRtz1Y3gygfbI4dkKXKVlhfIonFys420UHv6Smk0rJT0Tk91nuTbhWUslJ5txwj0pt5hkk4BuUoFQgVafHL_6ggcfl4bA1h2NX-npOG_POjf9ZCPwzGoNJVcu7XMNqJhcGgNITTIfR1j-8j0Vm7iICWt_1mlfRiXJdpDxFjbk978ZooksMoif_W3P5vsZaG4fQgMoeLesaSZuSLNfE3wZ4VTk',
  },
];

export default function BarberDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Mock data, in a real app this would be fetched from an API
  const barber = {
    id: '1',
    name: 'The Sharp Edge',
    address: '123 Main Street, Anytown',
    openingTime: 'Open until 7 PM',
    services: ['Haircut', 'Beard Trim', 'Hot Towel Shave'],
    rating: 4.8,
    reviewsCount: 125,
    reviews: mockReviews,
    staff: [
      { id: '1', name: 'Luca', role: 'Senior Barber', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5YwfgeCjVmZPDZy2cRQL1K1l9EzRD3NgaaJe3XIgYyAZFru3lzWaxftK2HwM-8-CxyMWOMAspGis4WIeyXUJi3InfoeZgsyEHOxSlJI2lWlK_fn-ANJkXw6XuAW4vhM1itx-EklXKCKdkQUOYWkY5CAZr7JbH-gA4n8Cex30uCf-SESojTbI8dbBjWBwT2ncw41z26-uOgmwt16Ha0Srvc_IpAaCpKOGeNeBSg8dIktgD8N1ECSkoToHop7-zOzmEVQG7x9h5clo' },
      { id: '2', name: 'Matteo', role: 'Barber', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD02do0HS0vZQlwgkSfoVrzaYcqj_JQw2HhbJiDzjQDl642GQVDXVXNr7jOVbFq0DTF1WdwyRQaQkGiKzJsJgtu_Prgt9dhNkImXTVpEmEz1vP-4ileR6g2VYcrk1zcCociUVnXzK0VIc1V81OlBssMH1KiLB1smbU0LxoPMhx6Ed_-n1AMt4OgQspjkopI8tnBFBhtq-yVzPQDzBiza2A61kEe6NmhkfRpofr2kJB7_pnLVdDqPNugDh9ntFzBIE5YmQv3JUywY28' },
      { id: '3', name: 'Davide', role: 'Barber', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxruvKP8XhKwds8ZCNK7O8O6yodCzS7qTGH-YWnfMtmj37k0XIHPJUhEe8uGgl0pnxdPgqlbfsAQZS2hWZxE4n1UnW7h3vBedW-wvpZP8u0XR4reUylDw26U1BcmllgFbPhFllpA8N9XabOh2-MLGaT9W4QbjeNmPJzaQVK_L2izb-ry3yNIlhCh4sMVzFUPOWvnNTdueXmcBF36cZthtPQtlZFieGdHZWjYFFdwWL4FE0rsXNQO-fxK9pZ0KvFxyiSqWLkMBuY6E' },
    ],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-rbZOXyL1lMOqktrNJUObpb1KHo7zxClcgXI5irjojrElb7h4csAttUGbq5jb5bfXt_CNqY1O1tSORIDIsaMjXWDMqyYJY2jR35bv73FyP3ZIZ94uuzY9KKqaYbct8eu8bDAsJEHM-YTLHhFkRD998OxtfsZ8fh8OZw8kRF6tcMs9SGfSDAmY9-9TuTTbjDbhK6GrpztFFEXvHQ7CPm94gvId1jRj3IiH96DccFjEfJggeta0mmbde5FOM9plURj_RFJ68iFDhOI',
  };

  const handleBookNow = () => {
    if (selectedService && selectedTime) {
      router.push({
        pathname: `/booking/${id}/${barber.staff[0].id}`,
        params: { service: selectedService, time: selectedTime, date: new Date().toISOString().split('T')[0] },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <ImageBackground
          source={{ uri: barber.coverImage }}
          style={{ height: 250, justifyContent: 'flex-end' }}
          resizeMode="cover"
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>{barber.name}</Text>
          </View>
        </ImageBackground>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>{barber.address}</Text>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>{barber.openingTime}</Text>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Services</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {barber.services.map((service) => (
              <TouchableOpacity
                key={service}
                style={{
                  backgroundColor: selectedService === service ? '#0c7ff2' : '#f0f2f5',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
                onPress={() => setSelectedService(service)}
              >
                <Text style={{ fontSize: 14, fontWeight: '500', color: selectedService === service ? 'white' : 'black' }}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedService && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Available Times</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'].map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={{
                      backgroundColor: selectedTime === time ? '#0c7ff2' : '#f0f2f5',
                      borderRadius: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '500', color: selectedTime === time ? 'white' : 'black' }}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Reviews</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 36, fontWeight: '900', marginRight: 8 }}>{barber.rating}</Text>
            <View>
              <View style={{ flexDirection: 'row' }}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name={i < Math.round(barber.rating) ? "star" : "star-outline"} size={18} color="#111418" />
                ))}
              </View>
              <Text style={{ fontSize: 16 }}>({barber.reviewsCount} reviews)</Text>
            </View>
          </View>

          {barber.reviews.map((review) => (
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

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Barbers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {barber.staff.map((staff) => (
              <View key={staff.id} style={{ alignItems: 'center', marginRight: 16 }}>
                <Image source={{ uri: staff.avatar }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }} />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{staff.name}</Text>
                <Text style={{ fontSize: 14, color: '#60758a' }}>{staff.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#f0f2f5' }}>
        <Button
          text="Book Now"
          onPress={handleBookNow}
          disabled={!selectedService || !selectedTime}
        />
      </View>
    </View>
  );
}