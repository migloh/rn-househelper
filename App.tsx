import React, { useState, useEffect, createContext, useContext, useReducer, Dispatch } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Welcome from './components/Welcome';
import SignupCheck from './components/SignupCheck';
import Signup from './components/Signup';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes, RootStackParamList } from './components/Routes';
import Home from './components/Home';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';


type GlobalContext = {
  globalState: any,
  globalDispatch: Dispatch<any>
}

export const AuthContext = React.createContext<Partial<GlobalContext>>({});


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    { 
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = () => {
      let userToken = null;
      try {
        userToken = auth().currentUser;
      } catch (e) {
        console.log(JSON.stringify(e));
      }
      dispatch({ type: 'RESTORE_USER', token: userToken });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => SplashScreen.hide());
  return (
    <AuthContext.Provider 
      value={{
        globalState: state,
        globalDispatch: dispatch
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {
            state.isLoading ? (
              <Stack.Screen name={Routes.LoadingScreen} component={LoadingScreen} />
            ) : state.userToken == null
            ? (
              <>
                <Stack.Screen 
                  name={Routes.Welcome} 
                  component={Welcome} 
                  options={{
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push'
                  }}  
                />
                <Stack.Screen name={Routes.SignupCheck} component={SignupCheck} />
                <Stack.Screen name={Routes.Signup} component={Signup} />
                <Stack.Screen name={Routes.Login} component={Login} />
              </>
            ) 
            : (
              <>
                <Stack.Screen name={Routes.Home} component={Home} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};