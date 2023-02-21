import { Config } from '@config';
import { useTheme } from '@react-navigation/native';
import { CapWarning, Severity } from '@store/warnings/types';
import {
  CAP_WARNING_ORANGE,
  CAP_WARNING_RED,
  CAP_WARNING_YELLOW,
  CustomTheme,
  GRAY_8,
} from '@utils/colors';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Map, { Polygon } from 'react-native-maps';
import darkMapStyle from '@utils/dark_map_style.json';
import DaySelectorList from './DaySelectorList';
import WarningTypeFiltersList from './WarningTypeFiltersList';

const INITIAL_REGION = {
  latitude: 17.99702,
  longitude: -77.25,
  latitudeDelta: 1,
  longitudeDelta: 2.5,
};

const SEVERITY_COLORS: { [key: string]: string } = {
  Extreme: CAP_WARNING_RED,
  Severe: CAP_WARNING_ORANGE,
  Moderate: CAP_WARNING_YELLOW,
};

const SEVERITIES: Severity[] = ['Moderate', 'Severe', 'Extreme'];

const MapView = ({
  dates,
  capData,
}: {
  dates: { time: number; weekday: string; date: string }[];
  capData?: CapWarning[];
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<
    { severity: Severity; event: string }[]
  >([]);

  const date = useMemo(
    () => moment(dates[selectedDay].time),
    [selectedDay, dates]
  );

  useEffect(() => setSelectedFilters([]), [date]);

  const applicableWarnings = useMemo(() => {
    const warnings = capData?.filter((warning) =>
      date.isBetween(moment(warning.info.onset), moment(warning.info.expires))
    );

    warnings?.sort((warning) => SEVERITIES.indexOf(warning.info.severity));
    return warnings;
  }, [capData, date]);

  const mapRef = useRef() as React.MutableRefObject<Map>;
  const { dark } = useTheme() as CustomTheme;
  const capViewSettings = Config.get('warnings')?.capViewSettings;

  const darkGoogleMapsStyle =
    dark && Platform.OS === 'android' ? darkMapStyle : [];

  const polygonArray =
    applicableWarnings
      ?.map((warning) => ({
        identifier: warning.identifier,
        event: warning.info.event,
        severity: warning?.info?.severity,
        polygons: [warning?.info.area.polygon].flat().map((polygon, index) => ({
          key: `${warning.identifier}-${index}`,
          latLng: polygon
            ?.split(' ')
            .map((coordinates) =>
              coordinates.split(',').map((coordinate) => Number(coordinate))
            )
            .map((pair) => ({
              latitude: pair[0],
              longitude: pair[1],
            })),
        })),
      }))
      .flat() || [];

  const handleWarningTypePress = (warning: CapWarning) => {
    const { severity, event } = warning.info;

    if (
      selectedFilters.find(
        (selectedFilter) =>
          selectedFilter?.severity === severity &&
          selectedFilter.event === event
      )
    ) {
      setSelectedFilters((filters) =>
        filters.filter(
          (filter) => filter.event !== event || filter.severity !== severity
        )
      );
    } else {
      setSelectedFilters((filters) => [...filters, { severity, event }]);
    }
  };

  return (
    <View
      style={
        (styles.mapContainer, { height: capViewSettings?.mapHeight ?? 400 })
      }>
      <Map
        style={styles.map}
        accessibilityElementsHidden
        ref={mapRef}
        testID="map"
        userInterfaceStyle={dark ? 'dark' : 'light'}
        customMapStyle={darkGoogleMapsStyle}
        initialRegion={INITIAL_REGION}
        rotateEnabled={false}
        toolbarEnabled={false}
        onRegionChangeComplete={() => {}}
        onPress={() => {}}
        moveOnMarkerPress={false}
        scrollEnabled
        zoomEnabled={false}>
        {polygonArray?.length > 0 &&
          polygonArray
            .filter(
              ({ event, severity }) =>
                !selectedFilters.find(
                  (filter) =>
                    filter.event === event && filter.severity === severity
                )
            )
            .map(({ severity, polygons }) =>
              polygons.map((polygon) => (
                <Polygon
                  coordinates={polygon.latLng}
                  key={polygon.key}
                  fillColor={SEVERITY_COLORS[severity]}
                  zIndex={SEVERITIES.indexOf(severity)}
                />
              ))
            )}
      </Map>
      <DaySelectorList
        dates={dates}
        activeDay={selectedDay}
        onDayChange={(index) => setSelectedDay(index)}
      />
      <WarningTypeFiltersList
        warnings={applicableWarnings}
        onWarningTypePress={handleWarningTypePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: GRAY_8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: -30,
    marginTop: -30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapView;
