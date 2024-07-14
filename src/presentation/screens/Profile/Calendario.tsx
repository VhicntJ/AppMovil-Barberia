import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, TextInput } from 'react-native';
import { Agenda, AgendaSchedule, LocaleConfig } from 'react-native-calendars';
import { Layout , Button} from '@ui-kitten/components';

// Configurar los días y meses en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
    'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

type AgendaItem = {
  name: string;
  height: number;
  day: string;
  color?: string; // Add the optional 'color' property
};

interface BlockedDates {
  [key: string]: { blocked: boolean };
}

interface BlockedTimes {
  [key: string]: { [key: string]: boolean };
}

const AgendaScreen: React.FC = () => {
  const [items, setItems] = useState<AgendaSchedule>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayMonth, setSelectedDayMonth] = useState('');
  const [selectedHour, setSelectedHour] = useState('');

  const [blockedDates, setBlockedDates] = useState<BlockedDates>({
    '2024-07-10': { blocked: true },
    '2024-07-11': { blocked: true },
  });
  
  const [blockedTimes, setBlockedTimes] = useState<BlockedTimes>({
    '2024-07-09': { '12:00': true, '14:00': true },
  });

  const loadItems = (day: any) => {
    const newItems: AgendaSchedule = {};
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!newItems[strTime]) {
        newItems[strTime] = [];
        if (!blockedDates[strTime]) {
          for (let j = 0; j < 3; j++) {
            const hour = `${(8 + j * 2).toString().padStart(2, '0')}:00`;
            if (!blockedTimes[strTime] || !blockedTimes[strTime][hour]) {
              newItems[strTime].push({
                name: `Agendado para ${strTime} a las ${hour}`,
                height: 50,
                day: strTime,
              });
            }
          }
        } else {
          // Si está bloqueado, agregar evento rojo "Día bloqueado"
          newItems[strTime].push({
            name: 'Día bloqueado',
            height: 50,
            day: strTime,
            
            // Removed color property to match AgendaEntry type
          });
        }
      }
    }
    setItems(newItems);
  };

  const renderItem = (item: AgendaItem) => (
    <TouchableOpacity style={[styles.item, { height: item.height }]}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const handleBlockDate = () => {
    const [day, month] = selectedDayMonth.split('-');
    const year = '2024';
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    if (formattedDate) {
      setBlockedDates((prevBlockedDates) => ({
        ...prevBlockedDates,
        [formattedDate]: { blocked: true },
      }));
    }
    if (formattedDate && selectedHour) {
      setBlockedTimes((prevBlockedTimes) => ({
        ...prevBlockedTimes,
        [formattedDate]: {
          ...(prevBlockedTimes[formattedDate] || {}),
          [selectedHour]: true,
        },
      }));
    }
    setModalVisible(false);
  };

  return (
    <Layout style={styles.container}>
      
      <Button
        style={styles.payButton}
        onPress={() => setModalVisible(true)} >Bloquear Fecha/Hora</Button>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2024-07-09'}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Seleccionar Día y Mes para Bloquear</Text>
          <TextInput
            placeholder="DD-MM"
            style={styles.input}
            value={selectedDayMonth}
            onChangeText={setSelectedDayMonth}
          />
          <TextInput
            placeholder="HH:MM"
            style={styles.input}
            value={selectedHour}
            onChangeText={setSelectedHour}
          /> 
          <Button style={styles.payButton2} onPress={handleBlockDate}>Bloquear</Button>
          <Button style={styles.payButton3} onPress={() => setModalVisible(false)}>Cancelar</Button>
         

        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
    payButton: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#421B36',
    borderColor: '#421B36',
    width: 300,
    alignSelf: "center",
  },
  payButton2: {
  marginTop: 10,
  marginRight: 10,
  backgroundColor: '#421B36',
  borderColor: '#421B36',
  width: 100,
  alignSelf: "center",
},
payButton3: {
marginTop: 10,
marginRight: 10,
backgroundColor: '#ff4646',
borderColor: '#ff4646',
width: 100,
alignSelf: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});

export default AgendaScreen;
