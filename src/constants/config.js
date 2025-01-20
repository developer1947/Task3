import { useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    ToastAndroid,
    Platform,
    Alert
} from 'react-native';
import { Dimensions } from "react-native";


// Dimension Configuration
//----> Use HEIGHT & WIDTH for dynamic height & width throughout your code.
export const { width: WIDTH, height: HEIGHT, } = Dimensions.get('screen');

//Statusbar Configuration
//---> Use MyStatusBar for cross platform
export const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={{ height: StatusBar.currentHeight, backgroundColor }}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);


export const Toaster = (msg) => {
    if (Platform.OS == "ios") {
      Alert.alert(msg);
    } else {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };



//Styles configuration
export const STYLES = StyleSheet.create({
    //---> Use STYLES.elevation for cross platform elevation
    elevation: {
        shadowColor: '#1C1C1C',
        shadowOffset: { width: 2, height: 1.5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export let mod = false;