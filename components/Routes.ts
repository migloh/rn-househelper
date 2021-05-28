import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum Routes {
  Welcome = "Welcome",
  SignupCheck = "SignupCheck",
  Signup = "Signup",
  Login = "Login",
  Home = "Home"
}

export type RootStackParamList = {
  [Routes.Welcome]: undefined,
  [Routes.SignupCheck]: undefined,
  [Routes.Signup]: undefined,
  [Routes.Login]: undefined,
  [Routes.Home]: undefined
};

type WelcomeScreenRouteProp = RouteProp<RootStackParamList, Routes.Welcome>;
type SignupCheckScreenRouteProp = RouteProp<RootStackParamList, Routes.SignupCheck>;
type SignupScreenRouteProp = RouteProp<RootStackParamList, Routes.Signup>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, Routes.Login>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, Routes.Home>;

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.Welcome
>;
type SignupCheckScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.SignupCheck
>;
type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.Signup
>;
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.Login
>;
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.Home
>;

export type WelcomeProps = {
  route: WelcomeScreenRouteProp;
  navigation: WelcomeScreenNavigationProp;
};
export type SignupCheckProps = {
  route: SignupCheckScreenRouteProp;
  navigation: SignupCheckScreenNavigationProp;
};
export type SignupProps = {
  route: SignupScreenRouteProp;
  navigation: SignupScreenNavigationProp;
};
export type LoginProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};
export type HomeProps = {
  route: HomeScreenRouteProp,
  navigation: HomeScreenNavigationProp
};