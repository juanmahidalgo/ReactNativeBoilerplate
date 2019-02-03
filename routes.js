/* eslint-disable react/prop-types */
import React from 'react';
import {
	createStackNavigator,
	createAppContainer,
	TabBarBottom,
	NavigationActions,
	createBottomTabNavigator,
} from 'react-navigation';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

// import { NotificationIcon } from 'components';
import { colors } from 'config';
import { t } from 'utils';

// Auth
import {
	// SplashScreen,
	// LoginScreen,
	// WelcomeScreen,
	// AuthProfileScreen,
	// EventsScreen,
	// PrivacyPolicyScreen,
	// UserOptionsScreen,
	// LanguageSettingsScreen,
} from 'auth';

import { HomeScreen } from './src/home/screens';

// import {
// 	ProfileScreen,
// 	RepositoryListScreen,
// 	StarredRepositoryListScreen,
// 	FollowerListScreen,
// 	FollowingListScreen,
// } from 'user';
// import { SearchScreen } from 'search';
// import { NotificationsScreen } from 'notifications';

const sharedRoutes = {
	// Profile: {
	// 	screen: ProfileScreen,
	// 	navigationOptions: {
	// 		header: null,
	// 	},
	// },
	// AuthProfile: {
	// 	screen: AuthProfileScreen,
	// 	navigationOptions: {
	// 		header: null,
	// 	},
	// },
	// PrivacyPolicy: {
	// 	screen: PrivacyPolicyScreen,
	// 	navigationOptions: ({ navigation }) => ({
	// 		title: navigation.state.params.title,
	// 	}),
	// },
	// UserOptions: {
	// 	screen: UserOptionsScreen,
	// 	navigationOptions: ({ navigation }) => ({
	// 		title: navigation.state.params.title,
	// 	}),
	// },
	// LanguageSettings: {
	// 	screen: LanguageSettingsScreen,
	// 	navigationOptions: ({ navigation }) => ({
	// 		title: navigation.state.params.title,
	// 	}),
	// },
};

const HomeStackNavigator = createStackNavigator(
	{
		Home: { screen: HomeScreen },
	}
);

// const MyProfileStackNavigator = createStackNavigator(
// 	{
// 		MyProfile: {
// 			screen: AuthProfileScreen,
// 			navigationOptions: {
// 				header: null,
// 			},
// 		},
// 		...sharedRoutes,
// 	},
// 	{
// 		headerMode: 'screen',
// 	}
// );

// const NotificationsStackNavigator = createStackNavigator(
// 	{
// 		Notifications: {
// 			screen: NotificationsScreen,
// 			navigationOptions: {
// 				header: null,
// 			},
// 		},
// 		...sharedRoutes,
// 	},
// 	{
// 		headerMode: 'screen',
// 	}
// );

// const SearchStackNavigator = createStackNavigator(
// 	{
// 		Search: {
// 			screen: SearchScreen,
// 			navigationOptions: {
// 				header: null,
// 			},
// 		},
// 		...sharedRoutes,
// 	},
// 	{
// 		headerMode: 'screen',
// 	}
// );

export const MainTabNavigator = createAppContainer(createBottomTabNavigator(
	{
		Home: {
			screen: HomeStackNavigator,
			navigationOptions: {
				tabBarLabel: 'Feed',
				tabBarIcon: ({ tintColor }) => <Icon name="th-list" size={20} color={tintColor} />,
			},
		},
		// Home: {
		// 	screen: HomeStackNavigator,
		// 	navigationOptions: {
		// 		tabBarIcon: ({ tintColor }) => (
		// 			<Icon
		// 				containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
		// 				color={tintColor}
		// 				name="home"
		// 				size={33}
		// 			/>
		// 		),
		// 	},
		// },
		// Notifications: {
		// 	screen: NotificationsStackNavigator,
		// 	navigationOptions: {
		// 		tabBarIcon: ({ tintColor }) => (
		// 			<NotificationIcon iconColor={tintColor} />
		// 		),
		// 	},
		// },
		// Search: {
		// 	screen: SearchStackNavigator,
		// 	navigationOptions: {
		// 		tabBarIcon: ({ tintColor }) => (
		// 			<Icon
		// 				containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
		// 				color={tintColor}
		// 				name="search"
		// 				size={33}
		// 			/>
		// 		),
		// 	},
		// },
		// MyProfile: {
		// 	screen: MyProfileStackNavigator,
		// 	navigationOptions: {
		// 		tabBarIcon: ({ tintColor }) => (
		// 			<Icon
		// 				containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
		// 				color={tintColor}
		// 				name="person"
		// 				size={33}
		// 			/>
		// 		),
		// 	},
		// },
	},
	// {
	// 	lazy: true,
	// 	tabBarPosition: 'bottom',
	// 	tabBarOptions: {
	// 		showLabel: false,
	// 		activeTintColor: colors.primaryDark,
	// 		inactiveTintColor: colors.grey,
	// 		style: {
	// 			backgroundColor: colors.alabaster,
	// 		},
	// 	},
	// 	tabBarComponent: ({ jumpToIndex, ...props }) => (
	// 		<TabBarBottom
	// 			{...props}
	// 			jumpToIndex={index => {
	// 				const { dispatch, state } = props.navigation;

	// 				if (state.index === index && state.routes[index].routes.length > 1) {
	// 					const stackRouteName = [
	// 						'Events',
	// 						'Notifications',
	// 						'Search',
	// 						'MyProfile',
	// 					][index];

	// 					dispatch(
	// 						NavigationActions.reset({
	// 							index: 0,
	// 							actions: [
	// 								NavigationActions.navigate({ routeName: stackRouteName }),
	// 							],
	// 						})
	// 					);
	// 				} else {
	// 					jumpToIndex(index);
	// 				}
	// 			}}
	// 		/>
	// 	),
	// }
));

const noHeader = {
	header: null,
};

export const Routing = createStackNavigator(
	{
		// Splash: {
		// 	screen: SplashScreen,
		// 	navigationOptions: { ...noHeader },
		// },
		// Login: {
		// 	screen: LoginScreen,
		// 	navigationOptions: { ...noHeader },
		// },
		// Welcome: {
		// 	screen: WelcomeScreen,
		// 	navigationOptions: { ...noHeader },
		// 	path: 'welcome',
		// },
		Main: {
			screen: MainTabNavigator,
			navigationOptions: { ...noHeader },
		},
	},
	{
		headerMode: 'screen',
		URIPrefix: 'myapp://',
		cardStyle: {
			backgroundColor: 'transparent',
		},
	}
);
