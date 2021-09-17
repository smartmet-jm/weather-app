import React, { useState, useEffect } from 'react';
import {
  AppState,
  Appearance,
  Platform,
  AppStateStatus,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import type { NavigationState } from '@react-navigation/routers';

import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';

import PlaceholderScreen from '@screens/PlaceHolderScreen';
import OthersScreen from '@screens/OthersScreen';
import MapScreen from '@screens/MapScreen';
import WeatherScreen from '@screens/WeatherScreen';
import SymbolsScreen from '@screens/SymbolsScreen';
import SettingsScreen from '@screens/SettingsScreen';
import SearchScreen from '@screens/SearchScreen';
import AboutScreen from '@screens/AboutScreen';

import Icon from '@components/common/Icon';
import HeaderButton from '@components/common/HeaderButton';

import { State } from '@store/types';
import { selectTheme } from '@store/settings/selectors';
import { setCurrentLocation as setCurrentLocationAction } from '@store/location/actions';
import CommonHeaderTitle from '@components/common/CommonHeaderTitle';

import { getGeolocation } from '@utils/helpers';
import { selectInitialTab } from '@store/navigation/selectors';
import { setNavigationTab as setNavigationTabAction } from '@store/navigation/actions';
import { NavigationTabValues, NavigationTab } from '@store/navigation/types';
import { lightTheme, darkTheme } from './themes';
import {
  TabParamList,
  OthersStackParamList,
  MapStackParamList,
  WeatherStackParamList,
} from './types';

const mapStateToProps = (state: State) => ({
  initialTab: selectInitialTab(state),
  theme: selectTheme(state),
});

const mapDispatchToProps = {
  setCurrentLocation: setCurrentLocationAction,
  setNavigationTab: setNavigationTabAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  initialColorScheme?: string | null;
};

const Tab = createBottomTabNavigator<TabParamList>();
const MapStack = createStackNavigator();
const WeatherStack = createStackNavigator();
const OthersStack = createStackNavigator<OthersStackParamList>();
const WarningsStack = createStackNavigator();

const Navigator: React.FC<Props> = ({
  setCurrentLocation,
  setNavigationTab,
  initialColorScheme,
  theme,
  initialTab,
}) => {
  const { t, ready } = useTranslation(['navigation', 'placeholder'], {
    useSuspense: false,
  });

  const isDark = (): boolean =>
    theme === 'dark' ||
    // (theme === 'automatic' && initialColorScheme === 'dark');
    (theme === 'automatic' &&
      (initialColorScheme === 'dark' ||
        Appearance.getColorScheme() === 'dark'));

  const [useDarkTheme, setUseDarkTheme] = useState<boolean>(isDark());

  console.log(
    'TabNavigator rendering',
    initialColorScheme,
    theme,
    useDarkTheme
  );

  // hide splash screen only when theme is known to avoid weird behavior
  useEffect(() => {
    if (theme && !!ready) {
      SplashScreen.hide();
    }
  }, [theme, ready]);

  useEffect(() => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    Permissions.request(permission).then((result) => {
      if (result === Permissions.RESULTS.GRANTED) {
        console.log('location granted');
      }
    });
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === 'active' && theme === 'automatic') {
      // getColorScheme() returns 'light' on iOS debug mode
      if (Appearance.getColorScheme() === 'dark') {
        setUseDarkTheme(true);
      } else {
        setUseDarkTheme(false);
      }
    }
  };

  const navigationTabChanged = (state: NavigationState | undefined) => {
    const navigationTab = state?.routeNames[state?.index] as NavigationTab;
    if (Number.isInteger(NavigationTabValues[navigationTab])) {
      setNavigationTab(navigationTab);
    }
  };

  useEffect(() => {
    const dark = isDark();
    if (dark !== useDarkTheme) {
      setUseDarkTheme(dark);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const WarningsScreen = () => (
    <PlaceholderScreen text={`${t('placeholder:warnings')}`} testIndex={2} />
  );

  const NotificationsScreen = () => (
    <PlaceholderScreen
      text={`${t('placeholder:notifications')}`}
      testIndex={6}
    />
  );

  const CommonHeaderOptions = ({
    navigation,
  }: {
    navigation: StackNavigationProp<MapStackParamList | WeatherStackParamList>;
  }) => ({
    headerTitle: () => <CommonHeaderTitle />,

    headerStyle: {
      shadowColor: 'transparent',
    },
    headerRight: () => (
      <HeaderButton
        title="Haku"
        accessibilityLabel="Press to search"
        icon="search"
        onPress={() => navigation.navigate('Search')}
        right
      />
    ),
    headerLeft: () => (
      <HeaderButton
        title="Paikanna"
        accessibilityLabel="Press to locate"
        icon="locate"
        onPress={() => getGeolocation(setCurrentLocation, t)}
      />
    ),
  });

  const MapStackScreen = () => (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={MapScreen}
        options={CommonHeaderOptions}
      />
      <MapStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: { shadowColor: 'transparent' },
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
    </MapStack.Navigator>
  );

  const WeatherStackScreen = () => (
    <WeatherStack.Navigator>
      <WeatherStack.Screen
        name="Weather"
        component={WeatherScreen}
        options={CommonHeaderOptions}
      />
      <WeatherStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: { shadowColor: 'transparent' },
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
    </WeatherStack.Navigator>
  );

  const WarningsStackScreen = () => (
    <WarningsStack.Navigator>
      <WarningsStack.Screen
        name="Warnings"
        component={WarningsScreen}
        options={{ headerShown: false }}
      />
    </WarningsStack.Navigator>
  );

  const OthersStackScreen = () => (
    <OthersStack.Navigator initialRouteName="Others">
      <OthersStack.Screen
        name="Others"
        component={OthersScreen}
        options={{ headerTitle: `${t('navigation:others')}` }}
      />
      <OthersStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: `${t('navigation:about')}`,
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: `${t('navigation:settings')}`,
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: `${t('navigation:notifications')}`,
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name="Symbols"
        component={SymbolsScreen}
        options={{
          headerTitle: `${t('navigation:symbols')}`,
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="arrow-back"
              style={{ color: tintColor }}
              width={26}
              height={26}
            />
          ),
        }}
      />
    </OthersStack.Navigator>
  );

  // TODO: this is never shown as SplashScreen is visible with the condition
  // however, this prevents unnecessary child component rendering
  if (!ready || !theme) {
    return null;
  }

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar
          backgroundColor={
            useDarkTheme
              ? darkTheme.colors.headerBackground
              : lightTheme.colors.headerBackground
          }
          barStyle={useDarkTheme ? 'light-content' : 'dark-content'}
        />
      )}
      <NavigationContainer
        onStateChange={navigationTabChanged}
        theme={useDarkTheme ? darkTheme : lightTheme}>
        <Tab.Navigator
          initialRouteName={initialTab}
          tabBarOptions={{
            labelStyle: styles.tabText,
          }}>
          <Tab.Screen
            name="Map"
            component={MapStackScreen}
            options={{
              tabBarTestID: 'navigation_map',
              tabBarLabel: `${t('navigation:map')}`,
              tabBarIcon: ({ color, size }) => (
                <Icon name="map" style={{ color }} width={size} height={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Weather"
            component={WeatherStackScreen}
            options={{
              tabBarTestID: 'navigation_weather',
              tabBarLabel: `${t('navigation:weather')}`,
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="weather"
                  style={{ color }}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Warnings"
            component={WarningsStackScreen}
            options={{
              tabBarTestID: 'navigation_warnings',
              tabBarLabel: `${t('navigation:warnings')}`,
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="warnings"
                  style={{ color }}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Others"
            component={OthersStackScreen}
            options={{
              tabBarTestID: 'navigation_others',
              tabBarLabel: `${t('navigation:others')}`,
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="menu"
                  style={{ color }}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});

export default connector(Navigator);
