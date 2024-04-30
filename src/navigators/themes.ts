import {
  PRIMARY_BLUE,
  SECONDARY_BLUE,
  GRAYISH_BLUE,
  LIGHT_BLUE,
  WHITE,
  GRAY_8,
  GRAY_7,
  GRAY_6,
  GRAY_6_95,
  GRAY_5,
  GRAY_4,
  GRAY_3,
  GRAY_2,
  GRAY_1,
  BLACK,
  SHADOW_DARK,
  SHADOW_LIGHT,
  CHART_BLUE,
  GRAY_1_OPACITY,
  RAIN_1,
  RAIN_2,
  RAIN_3,
  RAIN_4,
  RAIN_5,
  RAIN_6,
  RAIN_7,
  RAIN_8,
  TRANSPARENT,
} from '@utils/colors';

export const lightTheme = {
  dark: false,
  colors: {
    primary: SECONDARY_BLUE,
    background: WHITE,
    card: WHITE,
    text: PRIMARY_BLUE,
    notification: WHITE,
    primaryText: PRIMARY_BLUE,
    secondaryText: GRAY_3,
    border: GRAYISH_BLUE,
    inputBackground: LIGHT_BLUE,
    inputButtonBackground: WHITE,
    mapButtonBackground: WHITE,
    relocateButtonBackground: SECONDARY_BLUE,
    mapButtonBorder: GRAYISH_BLUE,
    headerBackground: WHITE,
    timeStepBackground: LIGHT_BLUE,
    shadow: SHADOW_LIGHT,
    screenBackground: LIGHT_BLUE,
    cardHeader: PRIMARY_BLUE,
    cardShadow: GRAYISH_BLUE,
    warningsIconFill: PRIMARY_BLUE,
    selectedDayBackground: LIGHT_BLUE,
    chartPrimaryLine: PRIMARY_BLUE,
    chartSecondaryLine: SECONDARY_BLUE,
    chartGrid: GRAY_8,
    chartGridDay: GRAY_4,
    hourListText: GRAY_4,
    secondaryBorder: GRAY_1,
    tabBarInactive: PRIMARY_BLUE,
    tabBarActive: SECONDARY_BLUE,
    timeSliderObservationText: GRAY_3,
    timeSliderTick: GRAY_2,
    listTint: GRAY_1_OPACITY,
    rain: {
      0: TRANSPARENT,
      1: RAIN_1,
      2: RAIN_2,
      3: RAIN_3,
      4: RAIN_4,
      5: RAIN_5,
      6: RAIN_6,
      7: RAIN_7,
      8: RAIN_8,
    },
    accordionContentBackground: 'rgb(246,249,253)',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: WHITE,
    background: GRAY_6,
    card: GRAY_7,
    text: WHITE,
    notification: WHITE,
    primaryText: WHITE,
    secondaryText: GRAY_1,
    border: GRAY_3,
    inputBackground: GRAY_4,
    inputButtonBackground: GRAY_5,
    mapButtonBackground: GRAY_6_95,
    relocateButtonBackground: GRAY_6,
    mapButtonBorder: GRAY_7,
    headerBackground: GRAY_6,
    timeStepBackground: GRAY_6,
    shadow: SHADOW_DARK,
    screenBackground: GRAY_7,
    cardHeader: GRAY_3,
    cardShadow: BLACK,
    warningsIconFill: BLACK,
    selectedDayBackground: GRAY_4,
    chartPrimaryLine: CHART_BLUE,
    chartSecondaryLine: GRAYISH_BLUE, // TODO: needs design
    chartGrid: GRAY_3,
    chartGridDay: WHITE,
    hourListText: WHITE,
    secondaryBorder: GRAY_1,
    tabBarInactive: GRAY_1,
    tabBarActive: WHITE,
    timeSliderObservationText: GRAY_1,
    timeSliderTick: GRAY_1,
    listTint: GRAY_1_OPACITY,
    rain: {
      0: TRANSPARENT,
      1: RAIN_1,
      2: RAIN_2,
      3: RAIN_3,
      4: RAIN_4,
      5: RAIN_5,
      6: RAIN_6,
      7: RAIN_7,
      8: RAIN_8,
    },
    accordionContentBackground: 'rgb(246,249,253)',
  },
};
