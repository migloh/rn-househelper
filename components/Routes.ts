import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// tabs

export enum EnumTabs {
  LocationsStack = "LocationsStack",
  UserStack = "UserStack",
  Messages = "Messages",
  Profile = "Profile",
  
};

export enum AdminTabs {
  UserStack = "UserStack",
  Profile = "Profile"
};

export type BottomTabParamList = {
  [EnumTabs.LocationsStack]: undefined;
  [EnumTabs.UserStack]: undefined;
  [EnumTabs.Messages]: undefined;
  [EnumTabs.Profile]: undefined
};

export type AdminTabParamList = {
  [AdminTabs.UserStack]: undefined;
  [AdminTabs.Profile]: undefined
};

// stacks

export enum AppRoutes {
  LoadingScreen = "LoadingScreen",
  AuthScreens = "AuthScreens",
  AuthedAdmin = "AuthedAdmin",
  Home = "Home",
};

export enum AuthRoutes {
  Welcome = "Welcome",
  Signup = "Signup",
  Login = "Login",
  Recovery = "Recovery"
};

export enum UserRoute {
  UsersList = "UsersList",
  UserDetail = "UserDetail",
  Inbox = "Inbox"
};

export enum LocationsRoute {
  Locations = "UsersList",
  UserDetail = "UserDetail",
};

export enum BoxRoute {
  Tabs = "Tabs",
  Inbox = "Inbox"
};

export enum AdminRoute {
  AvailableUsers = "AvailableUsers",
  AvailableUserDetail = "AvailableUserDetail"
};

export type AppStackParamList = {
  [AppRoutes.LoadingScreen]: undefined,
  [AppRoutes.AuthScreens]: undefined,
  [AppRoutes.AuthedAdmin]: undefined,
  [AppRoutes.Home]: undefined,
};

export type AuthStackParamList = {
  [AuthRoutes.Welcome]: undefined,
  [AuthRoutes.Signup]: undefined,
  [AuthRoutes.Login]: undefined,
  [AuthRoutes.Recovery]: undefined
};

export type UserStackParamList = {
  [UserRoute.UsersList]: undefined,
  [UserRoute.UserDetail]: FirebaseFirestoreTypes.DocumentData,
};

export type LocationsStackParamList = {
  [LocationsRoute.Locations]: undefined,
  [LocationsRoute.UserDetail]: FirebaseFirestoreTypes.DocumentData,
};

export type AdminStackParamList = {
  [AdminRoute.AvailableUsers]: undefined,
  [AdminRoute.AvailableUserDetail]: FirebaseFirestoreTypes.DocumentData
};

type LoadingScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.LoadingScreen>;
type AuthScreensRouteProp = RouteProp<AppStackParamList, AppRoutes.AuthScreens>;
type HomeScreenRouteProp = RouteProp<AppStackParamList, AppRoutes.Home>;
type AuthedAdminRouteProps = RouteProp<AppStackParamList, AppRoutes.AuthedAdmin>;

type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Welcome>;
type SignupScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Signup>;
type LoginScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Login>;
type RecoveryScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.Recovery>;

type UsersListScreenRouteProp = RouteProp<UserStackParamList, UserRoute.UsersList>;
type UserDetailScreenRouteProp = RouteProp<UserStackParamList, UserRoute.UserDetail>;

type LocationsScreenRouteProp = RouteProp<LocationsStackParamList, LocationsRoute.Locations>;
type LocationsDetailScreenRouteProp = RouteProp<LocationsStackParamList, LocationsRoute.UserDetail>;

type AvailableUsersScreenRouteProp = RouteProp<AdminStackParamList, AdminRoute.AvailableUsers>;
type AvailableUserDetailScreenRouteProp = RouteProp<AdminStackParamList, AdminRoute.AvailableUserDetail>;

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
type AuthedAdminNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes.AuthedAdmin
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

type UsersListScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  UserRoute.UsersList
>;
type UserDetailScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  UserRoute.UserDetail
>;

type LocationsScreenNavigationProp = StackNavigationProp<
  LocationsStackParamList,
  LocationsRoute.Locations
>;
type LocationsDetailScreenNavigationProp = StackNavigationProp<
  LocationsStackParamList,
  LocationsRoute.UserDetail
>;

type AvailableUsersScreenNavigationProp = StackNavigationProp<
  AdminStackParamList,
  AdminRoute.AvailableUsers
>;
type AvailableUserDetailScreenNavigationProp = StackNavigationProp<
  AdminStackParamList,
  AdminRoute.AvailableUserDetail
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
export type AuthedAdminProps = {
  route: AuthedAdminRouteProps,
  navigation: AuthedAdminNavigationProp
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
};

export type UsersListProps = {
  route: UsersListScreenRouteProp;
  navigation: UsersListScreenNavigationProp;
};
export type UserDetailProps = {
  route: UserDetailScreenRouteProp;
  navigation: UserDetailScreenNavigationProp;
};

export type LocationsProps = {
  route: LocationsScreenRouteProp;
  navigation: LocationsScreenNavigationProp;
};
export type LocationsDetailProps = {
  route: LocationsDetailScreenRouteProp;
  navigation: LocationsDetailScreenNavigationProp;
};

export type AvailableUsersProps = {
  route: AvailableUsersScreenRouteProp;
  navigation: AvailableUsersScreenNavigationProp
};

export type AvailableUserDetailProps = {
  route: AvailableUserDetailScreenRouteProp;
  navigation: AvailableUserDetailScreenNavigationProp
};