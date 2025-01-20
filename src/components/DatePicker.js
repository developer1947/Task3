import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const DatePicker = ({
  show,
  onClose,
  onDateSelect,
  minimumDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    {label: 'January', value: 0},
    {label: 'February', value: 1},
    {label: 'March', value: 2},
    {label: 'April', value: 3},
    {label: 'May', value: 4},
    {label: 'June', value: 5},
    {label: 'July', value: 6},
    {label: 'August', value: 7},
    {label: 'September', value: 8},
    {label: 'October', value: 9},
    {label: 'November', value: 10},
    {label: 'December', value: 11},
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = direction => {
    let newMonth = selectedDate.getMonth() + direction;
    let newYear = selectedDate.getFullYear();
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const handleDateSelect = day => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day,
    );
    setSelectedDate(newDate);
  };

  const handleDone = () => {
    const formattedDate = `${selectedDate.getDate()}${getOrdinalSuffix(
      selectedDate.getDate(),
    )} ${months[selectedDate.getMonth()].label} ${selectedDate.getFullYear()}`;
    onDateSelect(formattedDate);
    onClose();
  };

  const getOrdinalSuffix = day => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const renderDaysGrid = () => {
    const startDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    ).getDay();
    const daysInMonth = getDaysInMonth(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
    );
    const totalCells = startDay + daysInMonth;

    const daysArray = [];
    for (let i = 0; i < totalCells; i++) {
      if (i < startDay) {
        daysArray.push(<View key={i} style={styles.dayCell} />);
      } else {
        const day = i - startDay + 1;
        const newDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          day,
        );
        const isSelected = day === selectedDate.getDate();

        daysArray.push(
          <TouchableOpacity
            key={i}
            style={[styles.dayCell, isSelected && styles.selectedDay]}
            onPress={() => handleDateSelect(day)}>
            <Text
              style={[styles.dayText, isSelected && styles.selectedDayText]}>
              {day}
            </Text>
          </TouchableOpacity>,
        );
      }
    }
    return daysArray;
  };

  return (
    <Modal visible={show} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => changeMonth(-1)}
              style={styles.arrow}>
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {months[selectedDate.getMonth()].label}{' '}
              {selectedDate.getFullYear()}
            </Text>
            <TouchableOpacity
              onPress={() => changeMonth(1)}
              style={styles.arrow}>
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dayLabels}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.dayLabelText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>{renderDaysGrid()}</View>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#333',
  },
  dayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  dayLabelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: '14%',
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  dayCell: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#fff',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  doneText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default DatePicker;
