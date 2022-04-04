import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import AccessibleTouchableOpacity from '@components/common/AccessibleTouchableOpacity';
import Icon from '@components/common/Icon';

const FeedbackScreen: React.FC = () => {
  const { t } = useTranslation('feedback');
  const { colors } = useTheme();

  const mailToUrl =
    'mailto:mobiili@fmi.fi?subject=Ilmatieteen laitoksen sää palaute';

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            styles.withMarginBottom,
            { color: colors.text },
          ]}>
          {t('title')}
        </Text>
        <Text
          style={[
            styles.text,
            styles.withMarginBottom,
            { color: colors.text },
          ]}>
          {t('body1')}
        </Text>
        <Text
          style={[
            styles.text,
            styles.withLargeMarginBottom,
            { color: colors.text },
          ]}>
          {t('body2')}
        </Text>

        <AccessibleTouchableOpacity onPress={() => Linking.openURL(mailToUrl)}>
          <View
            style={[styles.sendFeedbackButton, { borderColor: colors.text }]}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('sendFeedback')}
            </Text>
            <Icon
              name="open-in-new"
              style={[styles.withMarginLeft, { color: colors.text }]}
            />
          </View>
        </AccessibleTouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  withMarginBottom: {
    marginBottom: 16,
  },
  withLargeMarginBottom: {
    marginBottom: 40,
  },
  sendFeedbackButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderRadius: 24,
  },
  withMarginLeft: {
    marginLeft: 8,
  },
});

export default FeedbackScreen;
