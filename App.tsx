import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login  from './src/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import appReducer from './context/Reducer';
import Questions from './src/Questions';
import Results from './src/Results';
import { AppContext } from './context/NewContext';


const initContextData = { answers: {} };



const Stack = createNativeStackNavigator();

const App = () => {
    const [appData, dispatchAppData] = useReducer(appReducer, initContextData);
    return (
        <AppContext.Provider value={[appData, dispatchAppData]}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='Login' component={Login}  options={{headerShown:false}}/>
                <Stack.Screen name='Questions' component={Questions} options={{headerLeft: ()=> null,gestureEnabled:false, headerBackVisible:false}}/>
                <Stack.Screen name='Results' component={Results}   options={{headerShown:false,gestureEnabled:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </AppContext.Provider>
    );
}

export default App;