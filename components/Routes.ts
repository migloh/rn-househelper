import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// tabs

export enum EnumTabs {
  Locations = "Locations",
  Users = "Users",
  Messages = "Messages",
  Profile = "Profile",
  
};

export type BottomTabParamList = {
  [EnumTabs.Locations]: undefined;
  [EnumTabs.Users]: undefined;
  [EnumTabs.Messages]: undefined;
  [EnumTabs.Profile]: undefined
};

// stacks

export enum AppRoutes {
  LoadingScreen = "LoadingScreen",
  AuthScreens = "AuthScreens",
  Home = "Home"
};

export enum AuthRoutes {
  Welcome = "Welcome",
  Signup = "Signup",
  Login = "Login",
  Recovery = "Recovery"
}

export type AppStackParamList = {
  [AppRoutes.LoadingScreen]: undefined,
  [AppRoutes.AuthScreens]: undefined,
  [AppRoutes.Home]: undefined
};

export type AuthStackParamList = {
  [AuthRoutes.Welcome]: undefined,
  [AuthRoutes.Signup]: undefined,
  [AuthRoutes.Login]: undefined,
  [AuthRoutes.Recovery]: undefined
};

type LoadingScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.LoadingScreen>;
type AuthScreensRouteProp = RouteProp<AppStackParamList, AppRoutes.AuthScreens>;
type HomeScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.Home>;
type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Welcome>;
type SignupScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Signup>;
type LoginScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Login>;
type RecoveryScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Recovery>;

type LoadingScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.LoadingScreen
>;
type AuthScreensNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.AuthScreens
>;
type HomeScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.Home
>;
type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  AuthRoutes.Welcome
>;
type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  AuthRoutes.Signup
>;
type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  AuthRoutes.Login
>;
type RecoveryScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  AuthRoutes.Recovery
>;

export type LoadingScreenProps = {
  route: LoadingScreenRouteProp;
  navigation: LoadingScreenNavigationProp;
};
export type AuthScreensProps = {
  route: AuthScreensRouteProp;
  navigation: AuthScreensNavigationProp;
};
export type HomeProps = {
  route: HomeScreenRouteProp,
  navigation: HomeScreenNavigationProp
};
export type WelcomeProps = {
  route: WelcomeScreenRouteProp;
  navigation: WelcomeScreenNavigationProp;
};
export type SignupProps = {
  route: SignupScreenRouteProp;
  navigation: SignupScreenNavigationProp;
};
export type LoginProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};
export type RecoveryProps = {
  route: RecoveryScreenRouteProp;
  navigation: RecoveryScreenNavigationProps;
}