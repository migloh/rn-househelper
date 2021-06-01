import React, { useState, useEffect, createContext, useContext, useReducer, Dispatch, useMemo } from 'react';
import LoadingScreen from './components/LoadingScreen';
import AuthScreens from './components/AuthScreens';
import Welcome from './components/Welcome';
import SignupCheck from './components/SignupCheck';
import Signup from './components/Signup';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, AppStackParamList, HomeRoutes } from './components/Routes';
import Home from './components/Home';
import HomeStack from './components/HomeStack';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';


type GlobalContext = {
  signIn: () => void,
  signOut: () => void
}

export const AuthContext = React.createContext<Partial<GlobalContext>>({});


const Stack = createStackNavigator<AppStackParamList>();

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

  const globalContext = useMemo(
    () => ({
      signIn: () => dispatch({type: 'SIGN_IN', token: auth().currentUser?.uid}),
      signOut: () => dispatch({type: 'SIGN_OUT'})
    }),
    [state, dispatch]
  );

  useEffect(() => SplashScreen.hide());
  return (
    <AuthContext.Provider 
      value={globalContext}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {
            state.isLoading ? (
              <Stack.Screen name={AppRoutes.LoadingScreen} component={LoadingScreen} />
            ) : state.userToken == null
            ? (
              <Stack.Screen
                name={AppRoutes.AuthScreens} 
                component={AuthScreens} 
                options={{
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push'
                }} 
              />
            ) 
            : (
              <Stack.Screen name={AppRoutes.HomeStack} component={HomeStack} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};