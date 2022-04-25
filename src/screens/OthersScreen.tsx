import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Icon from '@components/common/Icon';
import AccessibleTouchableOpacity from '@components/common/AccessibleTouchableOpacity';
import { OthersStackParamList } from '@navigators/types';

interface Props {
  navigation: StackNavigationProp<OthersStackParamList, 'StackOthers'>;
}

const OthersScreen: React.FC<Props> = ({ navigation }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('navigation');
  const { colors, dark } = useTheme();

  const handleSocialPress = async (appUrl: string, fallback: string) => {
    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      Linking.openURL(appUrl).catch(() => {});
    } else {
      Linking.openURL(fallback);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View
            style={[
              styles.withBorderBottom,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('Settings')}
              testID="navigation_settings"
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t('settings')}`}>
              <View style={styles.row}>
                <Text style={[styles.text, { color: colors.text }]}>{`${t(
                  'settings'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>

          <View
            style={[
              styles.withBorderBottom,
              { borderBottomColor: colors.border },
            ]}>
            <View style={styles.row}>
              <Text
                accessibilityRole="header"
                style={[styles.text, { color: colors.text }]}>{`${t(
                'about'
              )}`}</Text>
            </View>
          </View>
          <View
            style={[
              styles.withBorderBottom,
              styles.withMarginLeft,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('About')}
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t('general')}`}>
              <View style={styles.row}>
                <Text
                  style={[styles.textRegular, { color: colors.text }]}>{`${t(
                  'general'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>
          <View
            style={[
              styles.withBorderBottom,
              styles.withMarginLeft,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('TermsAndConditions')}
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t(
                'termsAndConditions'
              )}`}>
              <View style={styles.row}>
                <Text
                  style={[styles.textRegular, { color: colors.text }]}>{`${t(
                  'termsAndConditions'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>

          <View
            style={[
              styles.withBorderBottom,
              styles.withMarginLeft,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('About')}
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t('dataPrivacy')}`}>
              <View style={styles.row}>
                <Text
                  style={[styles.textRegular, { color: colors.text }]}>{`${t(
                  'dataPrivacy'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>
          <View
            style={[
              styles.withBorderBottom,
              styles.withMarginLeft,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('About')}
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t('accessibility')}`}>
              <View style={styles.row}>
                <Text
                  style={[styles.textRegular, { color: colors.text }]}>{`${t(
                  'accessibility'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>

          <View
            style={[
              styles.withBorderBottom,
              { borderBottomColor: colors.border },
            ]}>
            <AccessibleTouchableOpacity
              delayPressIn={100}
              onPress={() => navigation.navigate('GiveFeedback')}
              accessibilityRole="menuitem"
              accessibilityHint={`${t('navigateTo')} ${t('feedback')}`}>
              <View style={styles.row}>
                <Text style={[styles.text, { color: colors.text }]}>{`${t(
                  'feedback'
                )}`}</Text>
                <Icon
                  name="arrow-forward"
                  width={22}
                  height={22}
                  style={{ color: colors.text }}
                />
              </View>
            </AccessibleTouchableOpacity>
          </View>
        </View>

        <View style={styles.withPaddingHorizontal}>
          <Icon
            name={`logo-fmi-${language}`}
            style={[styles.withMarginBottom, { color: colors.text }]}
          />
          <View style={styles.textWrapper}>
            <Text style={[styles.text, { color: colors.text }]}>
              {t('about:followUs')}
            </Text>
          </View>
          <View style={styles.socialRow}>
            <AccessibleTouchableOpacity
              accessibilityLabel="Twitter"
              accessibilityRole="link"
              accessibilityHint={`${t('open')} Twitter`}
              onPress={() =>
                handleSocialPress(
                  'twitter://user?screen_name=meteorologit',
                  'https://twitter.com/meteorologit'
                )
              }
              style={styles.withMarginRight}>
              <Icon
                name={dark ? 'social-twitter-dark' : 'social-twitter-light'}
                style={{ color: colors.text }}
              />
            </AccessibleTouchableOpacity>
            <AccessibleTouchableOpacity
              accessibilityLabel="Instagram"
              accessibilityRole="link"
              accessibilityHint={`${t('open')} Instagram`}
              onPress={() =>
                handleSocialPress(
                  'instagram://user?username=ilmatieteenlaitos',
                  'https://www.instagram.com/ilmatieteenlaitos/'
                )
              }
              style={styles.withMarginRight}>
              <Icon
                name={dark ? 'social-instagram-dark' : 'social-instagram-light'}
                style={{ color: colors.text }}
              />
            </AccessibleTouchableOpacity>
            <AccessibleTouchableOpacity
              accessibilityLabel="YouTube"
              accessibilityRole="link"
              accessibilityHint={`${t('open')} YouTube`}
              onPress={() =>
                handleSocialPress(
                  'youtube://ilmatieteenlaitos',
                  'https://www.youtube.com/user/ilmatieteenlaitos'
                )
              }
              style={styles.withMarginRight}>
              <Icon
                name={dark ? 'social-youtube-dark' : 'social-youtube-light'}
                style={{ color: colors.text }}
              />
            </AccessibleTouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 12,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  textRegular: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    minHeight: 44,
    width: '100%',
  },
  withBorderBottom: {
    borderBottomWidth: 1,
  },
  socialRow: {
    flexDirection: 'row',
  },
  withMarginRight: {
    marginRight: 12,
  },
  textWrapper: {
    minHeight: 48,
    justifyContent: 'center',
  },
  withMarginBottom: {
    marginBottom: 24,
  },
  withPaddingHorizontal: {
    paddingHorizontal: 12,
  },
  withMarginLeft: {
    marginLeft: 20,
  },
});

export default OthersScreen;
