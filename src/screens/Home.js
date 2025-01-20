import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import {BACK, SEARCH, Tooth} from '../constants/imagepath';
import {MyStatusBar} from '../components/MyStatusBar';
import {BLACK, WHITE} from '../constants/color';
import {HEIGHT, WIDTH} from '../constants/config';

const Home = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState({
    number: null,
    type: null,
  });
  const [toothProblems, setToothProblems] = useState({
    firstProblem: '',
    secondProblem: '',
    concern: '',
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const screenWidth = Dimensions.get('window').width;
  const centerX = screenWidth / 2;
  const centerY = 250;

  const calculateCoordinates = (radiusX, radiusY, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    const x = centerX + radiusX * Math.cos(angleInRadians);
    const y = centerY - radiusY * Math.sin(angleInRadians);
    return {x, y};
  };

  const renderTeeth = isUpper => {
    const radiusX = 155;
    const radiusY = 225;
    const startAngle = isUpper ? 180 : 0;
    const teeth = [];

    for (let i = 0; i < 16; i++) {
      const angle = startAngle + i * (360 / 32);
      const {x, y} = calculateCoordinates(radiusX, radiusY, angle);
      const labelCoordinates = calculateCoordinates(
        radiusX - 25,
        radiusY - 25,
        angle,
      );
      const toothNumber = isUpper ? i + 1 : 17 + i;
      const side = isUpper
        ? toothNumber <= 8
          ? 'Upper Left'
          : 'Upper Right'
        : toothNumber <= 24
        ? 'Lower Left'
        : 'Lower Right';

      const toothType = `${side} Teeth`;
      const isSelected = selectedTooth.number === toothNumber;

      teeth.push(
        <TouchableOpacity
          onPress={() => {
            setSelectedTooth({number: toothNumber, type: toothType});
            setShowModal(true);
          }}
          key={`tooth-${isUpper ? 'upper' : 'lower'}-${i}`}
          style={[styles.tooth, {top: y - 10, left: x - 10}]}>
          <Image
            source={Tooth}
            style={{
              height: 25,
              width: 25,
              tintColor: isSelected ? 'lightblue' : BLACK,
            }}
          />
        </TouchableOpacity>,
      );

      teeth.push(
        <Text
          key={`label-${isUpper ? 'upper' : 'lower'}-${i}`}
          style={[
            styles.toothLabel,
            {top: labelCoordinates.y - 1, left: labelCoordinates.x - 1},
          ]}>
          {toothNumber}
        </Text>,
      );
    }

    return teeth;
  };

  return (
    <>
      <View style={styles.container}>
        <MyStatusBar
          backgroundColor={WHITE}
          barStyle="dark-content"
          translucent={false}
        />
        <View
          style={{
            height: '12%',
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
              paddingBottom: '5%',
            }}>
            <TouchableOpacity
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
                Medical Record
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
            height: '78%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.chartContainer}>
            <Text
              style={[
                styles.textLabel,
                {top: centerY - 140, left: centerX - 40},
              ]}>
              Upper teeth
            </Text>
            {renderTeeth(true)}

            <View style={styles.plusContainer}>
              <View style={styles.horizontalBar} />

              <View style={styles.verticalBar} />
            </View>

            <Text
              style={[
                styles.textLabel,
                {top: centerY + 120, left: centerX - 40},
              ]}>
              Lower teeth
            </Text>
            {renderTeeth(false)}
          </View>
        </View>
        <View
          style={{
            height: '10%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '80%',
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Text
                allowFontScaling={false}
                style={{fontSize: 14, fontWeight: '600'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '80%',
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                height: '85%',
                width: '43%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'blue',
                borderRadius: 30,
              }}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 14, fontWeight: '600', color: 'blue'}}>
                Previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('About');
              }}
              style={{
                height: '85%',
                width: '43%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'blue',
                borderRadius: 30,
              }}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <Pressable
          onPress={() => setShowModal(false)}
          style={{
            height: HEIGHT * 1,
            width: WIDTH * 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-end',
              }}
              keyboardShouldPersistTaps="handled">
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: 'white',
                  elevation: 10,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                  marginBottom: keyboardVisible ? '90%' : '30%',
                }}>
                <View
                  style={{
                    height: '5%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 3,
                      width: '20%',
                      backgroundColor: 'lightgrey',
                    }}></View>
                </View>
                <View
                  style={{
                    height: '12%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: '90%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: '80%',
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        borderRadius: 20,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{fontSize: 15, color: WHITE, fontWeight: '700'}}>
                        {selectedTooth.number}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: '90%',
                      width: '75%',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{fontSize: 15, color: BLACK, fontWeight: '900'}}>
                      {selectedTooth.type}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: '36%',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: '45%',
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="Enter the first problem (e.g., Cavity)"
                      placeholderTextColor={BLACK}
                      value={toothProblems.firstProblem}
                      onChangeText={text =>
                        setToothProblems(prev => ({
                          ...prev,
                          firstProblem: text,
                        }))
                      }
                      style={{
                        height: 50,
                        width: '100%',
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      height: '45%',
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="2nd Problem"
                      placeholderTextColor={BLACK}
                      value={toothProblems.secondProblem}
                      onChangeText={text =>
                        setToothProblems(prev => ({
                          ...prev,
                          secondProblem: text,
                        }))
                      }
                      style={{
                        height: 50,
                        width: '100%',
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: '10%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 15,
                      color: BLACK,
                      left: '6%',
                      fontWeight: '900',
                    }}>
                    Notes
                    <Text
                      style={{
                        color: 'lightgrey',
                        fontSize: 14,
                        fontWeight: '100',
                      }}>
                      (Optional)
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    height: '37%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    placeholder="Type the concern here..."
                    placeholderTextColor="pink"
                    value={toothProblems.concern}
                    onChangeText={text =>
                      setToothProblems(prev => ({...prev, concern: text}))
                    }
                    style={{
                      height: 120,
                      width: '90%',
                      fontSize: 18,
                      borderColor: '#FBE6EC',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      backgroundColor: '#FBE6EC',
                    }}
                    multiline={true}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  chartContainer: {
    position: 'relative',
    height: 500,
    width: '100%',
    right: '2%',
  },
  tooth: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toothLabel: {
    position: 'absolute',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
  },
  textLabel: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  plusContainer: {
    position: 'absolute',
    top: 185,
    left: WIDTH / 2 - 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalBar: {
    position: 'absolute',
    height: 2,
    width: 180,
    backgroundColor: 'lightgrey',
  },
  verticalBar: {
    position: 'absolute',
    height: 180,
    width: 2,
    backgroundColor: 'lightgrey',
  },
});

export default Home;
