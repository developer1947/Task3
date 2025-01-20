import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Home from "../screens/Home";
import About from "../screens/About";



const Stack=createStackNavigator();
export default HomeStackNavigation=()=>{
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/> 
        <Stack.Screen options={{headerShown:false}} name="About" component={About}/> 

    </Stack.Navigator>  
  )
}