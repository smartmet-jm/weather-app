/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CloseButton from '@components/common/CloseButton';
import {
  CustomTheme,
  GRAYISH_BLUE,
  CAP_WARNING_NEUTRAL,
  CAP_WARNING_YELLOW,
  CAP_WARNING_ORANGE,
  CAP_WARNING_RED,
  CAP_WARNING_GREEN,
} from '@utils/colors';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CapSeverityBar from './CapSeverityBar';
import TypeColorRow from '../TypeColorRow';
import WarningSymbol from '../WarningsSymbol';

const CapWarningsLegend = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const severityColors = [
    CAP_WARNING_NEUTRAL,
    CAP_WARNING_GREEN,
    CAP_WARNING_YELLOW,
    CAP_WARNING_ORANGE,
    CAP_WARNING_RED,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <CloseButton onPress={onClose} accessibilityLabel="Sulje" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1} accessible={false}>
          <View style={[styles.contentContainer, styles.borderBottom]}>
            <Text style={[styles.headingText, { color: colors.primaryText }]}>
              {t('warnings:capInfo:dailyTitle')}
            </Text>
            <View style={[styles.contentContainer]}>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[0, 0, 0, 0]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:severities:0')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[1, 1, 1, 1]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:severities:1')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[2, 2, 2, 2]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:severities:2')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[3, 3, 3, 3]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:severities:3')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[4, 4, 4, 4]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:severities:4')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <Text style={{ color: colors.hourListText }}>
                  {t('warnings:capInfo:example')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[0, 0, 2, 2]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:example1Text')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <CapSeverityBar severities={[2, 2, 3, 4]} />
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:example2Text')}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer, styles.borderBottom]}>
            <Text style={[styles.headingText, { color: colors.primaryText }]}>
              {t('warnings:capInfo:warningExplanations')}
            </Text>
            <View style={[styles.contentContainer]}>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Tropical Storm Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.tropicalStorm')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Hurricane Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.hurricane')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Heavy Rainfall Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.heavyRainfall')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Heavy Rainfall Warning"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.veryHeavyRainfall')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Thunderstorm Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.thunderstorms')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Landslide Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.landslides')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Flood Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.flooding')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Flash Flood Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.flashFloods')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Severe"
                    type="Large Wave Warning for Small Craft"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.largeWaves')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Extreme"
                    type="Large Wave Warning for Small Craft"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.veryLargeWaves')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Strong Wind Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.strongWind')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Severe"
                    type="Strong Wind Warning"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.veryStrongWind')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Extreme"
                    type="Strong Wind Warning"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.stormForceWind')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Storm Surge Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.stormSurge')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Poor Visibility"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.poorVisibility')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Falling Temperatures Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.coolTemperatures')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Heat Watch"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.veryHotTemperatures')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="High Humidity Advisory"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.highHumidity')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Bush Fire Watch"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.bushFireSevere')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Bush Fire Warning"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.bushFireExtreme')}
                </Text>
              </View>
              <View style={styles.legendRow}>
                <View>
                  <WarningSymbol
                    severity="Moderate"
                    type="Drought Alert"
                    size={32}
                  />
                </View>
                <Text
                  style={[
                    styles.severityBarLegendText,
                    { color: colors.hourListText },
                  ]}>
                  {t('warnings:capInfo:warnings.drySpellDrought')}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer, styles.borderBottom]}>
            <Text style={[styles.headingText, { color: colors.primaryText }]}>
              {t('warnings:capInfo:warningColorsExplanation')}
            </Text>
            <View style={[styles.contentContainer]}>
              <View style={[styles.legendRow]}>
                <TypeColorRow severity={0} severityColors={severityColors} />
              </View>
              <View>
                <TypeColorRow severity={1} severityColors={severityColors} />
              </View>
              <View>
                <TypeColorRow severity={2} severityColors={severityColors} />
              </View>
              <View>
                <TypeColorRow severity={3} severityColors={severityColors} />
              </View>
              <View>
                <TypeColorRow severity={4} severityColors={severityColors} />
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer, styles.borderBottom]}>
            <Text style={[styles.headingText, { color: colors.primaryText }]}>
              {t('warnings:capInfo:timezone')}
            </Text>
            <View style={[styles.contentContainer]}>
              <Text style={{ color: colors.hourListText }}>
                {t('warnings:capInfo:timezoneText')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 24,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: GRAYISH_BLUE,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: GRAYISH_BLUE,
    borderBottomWidth: 1,
    marginTop: -20,
  },
  legendRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headingText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginVertical: 25,
  },
  severityBarLegendText: {
    marginLeft: 14,
    flexWrap: 'wrap',
  },
});

export default CapWarningsLegend;
