import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Icon from './Icon';

import { State } from '../store/types';
import {
  selectCurrentLocation,
  selectIsGeolocation,
} from '../store/general/selectors';

const mapStateToProps = (state: State) => ({
  currentLocation: selectCurrentLocation(state),
  isGeolocation: selectIsGeolocation(state),
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type CommonHeaderProps = PropsFromRedux & {};

const CommonHeaderTitle: React.FC<CommonHeaderProps> = ({
  currentLocation,
  isGeolocation,
}) => {
  const { colors } = useTheme();
  const title = (): string => {
    if (currentLocation) {
      return currentLocation.area &&
        currentLocation.area !== currentLocation.name
        ? `${currentLocation.name}, ${currentLocation.area}`
        : currentLocation.name;
    }
    return 'Helsinki';
  };

  return (
    <View style={styles.container}>
      {isGeolocation && (
        <Icon name="map-marker" style={{ color: colors.text }} height={12} />
      )}
      <Text style={[styles.title, { color: colors.text }]}>{title()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        justifyContent: 'center',
      },
    }),
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default connector(CommonHeaderTitle);
