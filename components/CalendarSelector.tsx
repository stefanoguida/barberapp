import { View, TouchableOpacity, Text } from 'react-native';
import Icon from './Icon';

export default function CalendarSelector({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  // --- Helpers ---
  const changeMonthSafe = (offset: number) => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      const day = d.getDate();
      d.setDate(1); // evita rollover (es. 31 -> 30/28)
      d.setMonth(d.getMonth() + offset);
      const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, lastDay));
      return d;
    });
  };

  const goToToday = () => setSelectedDate(new Date());

  // --- Calcolo della griglia ---
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth(); // 0-based

  // primo del mese visualizzato
  const firstOfMonth = new Date(year, month, 1);
  // offset per avere settimana che inizia di LUN (0=Lun, ... 6=Dom)
  const mondayIndex = (firstOfMonth.getDay() + 6) % 7; // getDay(): 0=Dom

  // startDate = lunedì della prima settimana mostrata
  const startDate = new Date(firstOfMonth);
  startDate.setDate(1 - mondayIndex);

  // 6x7 = 42 celle
  const days: Date[] = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

  const monthLabel = selectedDate.toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 16,
        }}
      >
        <TouchableOpacity onPress={() => changeMonthSafe(-1)} style={{ padding: 8 }}>
          <Icon name="chevron-back" size={24} color="#0c7ff2" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
          {monthLabel}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => changeMonthSafe(1)} style={{ padding: 8 }}>
            <Icon name="chevron-forward" size={24} color="#0c7ff2" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToToday}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: '#f0f2f5',
              borderRadius: 8,
              marginLeft: 4,
            }}
          >
            <Text style={{ color: '#0c7ff2', fontWeight: 'bold' }}>Oggi</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Giorni della settimana */}
      <View style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((label) => (
            <Text key={label} style={{ width: 36, textAlign: 'center', color: '#60758a', fontWeight: 'bold' }}>
              {label}
            </Text>
          ))}
        </View>

        {/* 6 righe fisse */}
        {Array.from({ length: 6 }).map((_, weekIndex) => (
          <View key={weekIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((date, i) => {
              const inCurrentMonth = date.getMonth() === month; // robusto anche tra anni
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isWeekend = date.getDay() === 0 || date.getDay() === 1; // Dom o Sab

              const bg = isSelected ? '#0c7ff2' : !inCurrentMonth || isWeekend ? '#d1d5db' : '#f0f2f5';
              const fg = isSelected ? 'white' : !inCurrentMonth || isWeekend ? '#374151' : 'black';

              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setSelectedDate(new Date(date))}
                >
                  <Text style={{ color: fg, fontWeight: 'bold' }}>{date.getDate()}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
