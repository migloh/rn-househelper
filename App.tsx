import React, { useState, useEffect, createContext, useContext, useReducer, Dispatch, useMemo, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import AuthScreens from './components/AuthScreens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, AppStackParamList } from './components/Routes';
import Home from './components/Home';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from './components/context'

type PrevStateType = {
  isLoading: boolean,
  isSignout: boolean,
  userToken: string | null | undefined
};

type ActionType = {type: 'RESTORE_USER', token: string|null|undefined}
| {type: 'SIGN_IN', token: string | null|undefined}
| {type: 'SIGN_OUT'};

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: PrevStateType, action: ActionType) => {
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
        userToken = auth().currentUser?.uid;
      } catch (e) {
        console.log(JSON.stringify(e));
      }
      dispatch({ type: 'RESTORE_USER', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const handleSignIn = useCallback(
    () => dispatch({type: 'SIGN_IN', token: auth().currentUser?.uid}),
    [state]
  );
  const handleSignOut = useCallback(
    () => dispatch({type: 'SIGN_OUT'}),
    [state]
  );

  const globalContext = useMemo(
    () => ({
      signIn:  handleSignIn,
      signOut: handleSignOut
    }),
    [handleSignIn, handleSignOut]
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
              <Stack.Screen name={AppRoutes.Home} component={Home} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};