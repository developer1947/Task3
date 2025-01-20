import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {MyStatusBar} from '../components/MyStatusBar';
import {BLACK, GRAY, WHITE} from '../constants/color';
import {BACK, DOWN, SEARCH} from '../constants/imagepath';
import {HEIGHT, WIDTH} from '../constants/config';
import DatePicker from '../components/DatePicker';

const About = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Day');
  const [selectedDate, setSelectedDate] = useState('26th December 2024');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const data = [
    {id: '1', name: 'Ravi Kumar', type: 'Scaling', time: '9:00 - 10:00'},
    {
      id: '2',
      name: 'Pawan Sathe',
      type: 'Tele-Consultation',
      time: '10:00 - 11:30',
    },
    {id: '3', name: 'Samaira Jain', type: 'Scaling', time: '12:00 - 13:00'},
    {id: '4', name: 'Lunch Break', type: '', time: '13:00 - 14:00'},
    {id: '5', name: 'Akash Gupta', type: 'Scaling', time: '14:00 - 15:00'},
    {
      id: '6',
      name: 'Priyanka Gupta',
      type: 'Tele-Consultation',
      time: '15:00 - 16:30',
    },
    {id: '7', name: 'Neel Maskar', type: 'Scaling', time: '17:00 - 18:00'},
    {id: '8', name: 'Gargi Kamat', type: 'Scaling', time: '18:00 - 19:00'},
  ];
  const renderItem = ({item}) => {
    return (
      <View
        style={{height: HEIGHT * 0.1, width: WIDTH * 1, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            paddingHorizontal: '5%',
            height: HEIGHT * 0.07,
            backgroundColor: '#FDFDFD',
          }}>
          <View
            style={{width: '20%', alignItems: 'flex-end', paddingRight: '5%'}}>
            <Text
              style={{
                fontSize: 15,
                color: item.type ? BLACK : GRAY,
                fontWeight: '700',
              }}>
              {item.time.split(' - ')[0]}
            </Text>
          </View>

          <View
            style={{
              width: '75%',
              paddingLeft: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '50%'}}>
              {item.type ? (
                <>
                  <Text
                    style={{fontSize: 14, fontWeight: 'bold', color: BLACK}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 12, color: 'orange'}}>
                    ID: RSVA00426
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>
                    {item.name || 'Lunch Break'}
                  </Text>
                  <Text style={{fontSize: 12, color: GRAY}}>{item.time}</Text>
                </>
              )}
            </View>

            {item.type ? (
              <View style={{width: '50%', alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: BLACK,
                    marginBottom: '2%',
                  }}>
                  {item.type}
                </Text>
                <Text style={{fontSize: 12, color: GRAY}}>{item.time}</Text>
              </View>
            ) : (
              <View style={{width: '50%'}} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: WHITE}}>
      <MyStatusBar
        backgroundColor={WHITE}
        barStyle="dark-content"
        translucent={false}
      />
      <View
        style={{
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '80%',
            width: '95%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: '60%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={BACK} style={{height: 20, width: 20}} />
          </TouchableOpacity>
          <View
            style={{
              height: '60%',
              width: '60%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 17, fontWeight: '800', color: BLACK}}>
              Appointments
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={SEARCH} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: '10%',
          width: '80%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={{
            height: '65%',
            width: '70%',
            borderWidth: 1,
            borderColor: 'blue',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 13, fontWeight: '900', color: BLACK}}>
              {selectedDate}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={{
              height: '100%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={DOWN} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        </TouchableOpacity>
        <DatePicker
          show={isDatePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          onDateSelect={handleDateSelect}
        />
      </View>

      <View
        style={{
          height: '10%',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.tabContainer}>
          {['Day (9)', 'Week (63)', 'Month (250)'].map((item, index) => {
            const tabName = item.split(' ')[0];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(tabName)}
                style={styles.tab}>
                <Text
                  style={
                    activeTab === tabName
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.indicatorContainer}>
          <View
            style={[
              styles.indicator,
              {
                transform: [
                  {
                    translateX:
                      activeTab === 'Day'
                        ? 0
                        : activeTab === 'Week'
                        ? 100
                        : 200,
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <View style={{height: '72%', width: '100%'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeText: {
    color: BLACK,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: GRAY,
  },
  indicatorContainer: {
    position: 'relative',
    height: 2,
    backgroundColor: 'lightgray',
    marginTop: '5%',
    width: '90%',
  },
  indicator: {
    position: 'absolute',
    width: 100,
    height: 4,
    backgroundColor: 'blue',
    bottom: '3%',
    borderRadius: 5,
  },
});
export default About;
