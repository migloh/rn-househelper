import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// export enum Routes {
//   LoadingScreen = "LoadingScreen",
//   Welcome = "Welcome",
//   SignupCheck = "SignupCheck",
//   Signup = "Signup",
//   Login = "Login",
//   Home = "Home"
// };

export enum AppRoutes {
  LoadingScreen = "LoadingScreen",
  AuthScreens = "AuthScreens",
  HomeStack = "HomeStack"
};

export enum AuthRoutes {
  Welcome = "Welcome",
  Signup = "Signup",
  Login = "Login"
}

export enum HomeRoutes {
  Home = "Home"
}

// export type RootStackParamList = {
//   [Routes.LoadingScreen]: undefined,
//   [Routes.Welcome]: undefined,
//   [Routes.SignupCheck]: undefined,
//   [Routes.Signup]: undefined,
//   [Routes.Login]: undefined,
//   [Routes.Home]: undefined
// };

export type AppStackParamList = {
  [AppRoutes.LoadingScreen]: undefined,
  [AppRoutes.AuthScreens]: undefined,
  [AppRoutes.HomeStack]: undefined
};

export type AuthStackParamList = {
  [AuthRoutes.Welcome]: undefined,
  [AuthRoutes.Signup]: undefined,
  [AuthRoutes.Login]: undefined
};

export type HomeStackParamList = {
  [HomeRoutes.Home]: undefined
}

// type LoadingScreenRouteProp = RouteProp<RootStackParamList, Routes.LoadingScreen>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, Routes.Welcome>;
// type SignupCheckScreenRouteProp = RouteProp<RootStackParamList, Routes.SignupCheck>;
// type SignupScreenRouteProp = RouteProp<RootStackParamList, Routes.Signup>;
// type LoginScreenRouteProp = RouteProp<RootStackParamList, Routes.Login>;
// type HomeScreenRouteProp = RouteProp<RootStackParamList, Routes.Home>;

type LoadingScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.LoadingScreen>;
type AuthScreensRouteProp = RouteProp<AppStackParamList, AppRoutes.AuthScreens>;
// type HomeScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.Home>;
type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Welcome>;
type SignupScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Signup>;
type LoginScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Login>;
type HomeStackRouteProp = RouteProp<HomeStackParamList, HomeRoutes.Home>

// type LoadingScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.LoadingScreen
// >;
// type WelcomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.Welcome
// >;
// type SignupCheckScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.SignupCheck
// >;
// type SignupScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.Signup
// >;
// type LoginScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.Login
// >;
// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   Routes.Home
// >;

type LoadingScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.LoadingScreen
>;
type AuthScreensNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.AuthScreens
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
// type HomeScreenNavigationProp = StackNavigationProp<
//   AppStackParamList,
//   AppRoutes.Home
// >;
type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParamList,
  HomeRoutes.Home
>;

// export type LoadingScreenProps = {
//   route: LoadingScreenRouteProp;
//   navigation: LoadingScreenNavigationProp;
// };
// export type WelcomeProps = {
//   route: WelcomeScreenRouteProp;
//   navigation: WelcomeScreenNavigationProp;
// };
// export type SignupCheckProps = {
//   route: SignupCheckScreenRouteProp;
//   navigation: SignupCheckScreenNavigationProp;
// };
// export type SignupProps = {
//   route: SignupScreenRouteProp;
//   navigation: SignupScreenNavigationProp;
// };
// export type LoginProps = {
//   route: LoginScreenRouteProp;
//   navigation: LoginScreenNavigationProp;
// };
// export type HomeProps = {
//   route: HomeScreenRouteProp,
//   navigation: HomeScreenNavigationProp
// };

export type LoadingScreenProps = {
  route: LoadingScreenRouteProp;
  navigation: LoadingScreenNavigationProp;
};
export type AuthScreensProps = {
  route: AuthScreensRouteProp;
  navigation: AuthScreensNavigationProp;
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
// export type HomeProps = {
//   route: HomeScreenRouteProp,
//   navigation: HomeScreenNavigationProp
// };
export type HomeStackProps = {
  route: HomeStackRouteProp,
  navigation: HomeStackNavigationProp
};