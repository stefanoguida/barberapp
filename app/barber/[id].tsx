import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';

interface BarberDetails {
  id: string;
  name: string;
  address: string;
  rating: number;
  phone: string;
  email: string;
  description: string;
  services: { name: string; price: string; duration: string }[];
  workingHours: { [key: string]: string };
  staff: { id: string; name: string; specialties: string[]; avatar?: string }[];
}

export default function BarberDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [barber, setBarber] = useState<BarberDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Loading barber details for ID:', id);
    
    // Mock data - in a real app, this would come from an API
    const mockBarber: BarberDetails = {
      id: id!,
      name: id === '1' ? 'Barbiere Centrale' : id === '2' ? 'Style & Cut' : 'Gentleman Barber',
      address: id === '1' ? 'Via Roma 123, Milano' : id === '2' ? 'Corso Buenos Aires 45, Milano' : 'Via Brera 78, Milano',
      rating: 4.5,
      phone: '+39 02 1234567',
      email: 'info@barbiere.it',
      description: 'Un barbiere tradizionale con oltre 20 anni di esperienza. Offriamo servizi di alta qualità in un ambiente accogliente e professionale.',
      services: [
        { name: 'Taglio Classico', price: '€25', duration: '30 min' },
        { name: 'Taglio + Barba', price: '€35', duration: '45 min' },
        { name: 'Shampoo', price: '€10', duration: '15 min' },
        { name: 'Trattamento Barba', price: '€20', duration: '30 min' }
      ],
      workingHours: {
        'Lunedì': '9:00 - 19:00',
        'Martedì': '9:00 - 19:00',
        'Mercoledì': '9:00 - 19:00',
        'Giovedì': '9:00 - 19:00',
        'Venerdì': '9:00 - 20:00',
        'Sabato': '8:00 - 18:00',
        'Domenica': 'Chiuso'
      },
      staff: [
        { id: '1', name: 'Marco Rossi', specialties: ['Tagli Classici', 'Barba'] },
        { id: '2', name: 'Giuseppe Bianchi', specialties: ['Tagli Moderni', 'Styling'] },
        { id: '3', name: 'Antonio Verdi', specialties: ['Trattamenti', 'Shampoo'] }
      ]
    };

    setTimeout(() => {
      setBarber(mockBarber);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleStaffSelect = (staffId: string) => {
    console.log('Staff selected:', staffId);
    router.push(`/booking/${id}/${staffId}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color={colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color={colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={16} color={colors.textSecondary} />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Image 
          source={require('../../assets/images/final_quest_240x240.png')} 
          style={{ width: 60, height: 60, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text style={commonStyles.text}>Caricamento dettagli barbiere...</Text>
      </View>
    );
  }

  if (!barber) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.text}>Barbiere non trovato</Text>
        <Button
          text="Torna alla Mappa"
          onPress={() => router.push('/map')}
          style={buttonStyles.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Image 
              source={require('../../assets/images/final_quest_240x240.png')} 
              style={{ width: 24, height: 24, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={commonStyles.subtitle}>Dettagli Barbiere</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/bookings')}>
            <Icon name="calendar" size={24} />
          </TouchableOpacity>
        </View>

        {/* Barber Info */}
        <View style={commonStyles.card}>
          <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 12 }]}>
            <Image 
              source={require('../../assets/images/final_quest_240x240__.png')} 
              style={{ width: 60, height: 60, marginRight: 16, borderRadius: 30 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.title}>{barber.name}</Text>
              <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 4 }]}>
                {renderStars(barber.rating)}
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>
                  {barber.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="location" size={16} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>{barber.address}</Text>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="call" size={16} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>{barber.phone}</Text>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <Icon name="mail" size={16} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>{barber.email}</Text>
          </View>
          
          <Text style={commonStyles.textSecondary}>{barber.description}</Text>
        </View>

        {/* Services */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Servizi</Text>
          {barber.services.map((service, index) => (
            <View key={index} style={commonStyles.card}>
              <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                <View>
                  <Text style={commonStyles.text}>{service.name}</Text>
                  <Text style={commonStyles.textSecondary}>{service.duration}</Text>
                </View>
                <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                  {service.price}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Working Hours */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Orari di Apertura</Text>
          <View style={commonStyles.card}>
            {Object.entries(barber.workingHours).map(([day, hours]) => (
              <View key={day} style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>{day}</Text>
                <Text style={[
                  commonStyles.textSecondary,
                  hours === 'Chiuso' && { color: colors.error }
                ]}>
                  {hours}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Staff */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Il Nostro Team</Text>
          {barber.staff.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={commonStyles.card}
              onPress={() => handleStaffSelect(member.id)}
            >
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <Image 
                  source={require('../../assets/images/final_quest_240x240__.png')} 
                  style={{ width: 50, height: 50, marginRight: 12, borderRadius: 25 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.text}>{member.name}</Text>
                  <Text style={commonStyles.textSecondary}>
                    {member.specialties.join(', ')}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Book Button */}
        <View style={[commonStyles.center, { marginTop: 24, marginBottom: 32 }]}>
          <Button
            text="Prenota Subito"
            onPress={() => handleStaffSelect(barber.staff[0].id)}
            style={[buttonStyles.primary, { width: '100%' }]}
          />
        </View>
      </View>
    </ScrollView>
  );
}