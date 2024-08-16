import React from 'react';
// import Icon from '@components/common/Icon';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// import { Config } from '@config';

import CloseButton from '@components/common/CloseButton';

import { CustomTheme } from '@utils/colors';

// import { State } from '@store/types';
// import { selectActiveOverlay } from '@store/map/selectors';
import { ScrollView } from 'react-native-gesture-handler';

type InfoBottomSheetProps = {
  onClose: () => void;
};

const InfoBottomSheet: React.FC<InfoBottomSheetProps> = ({ onClose }) => {
  const { t } = useTranslation('map');
  const { colors } = useTheme() as CustomTheme;
  // const { layers } = Config.get('map');

  // const timeseriesEnabled = layers.some((layer) => layer.type === 'Timeseries');

  // get selected layer
  // const layerId = useSelector((state: State) => selectActiveOverlay(state));
  // const layer = layers.find((l) => l.id === layerId);

  return (
    <View style={styles.wrapper}>
      <View style={styles.sheetListContainer}>
        <View style={styles.closeButtonContainer}>
          <CloseButton
            onPress={onClose}
            accessibilityLabel={t('infoBottomSheet.closeAccessibilityLabel')}
          />
        </View>

        <View style={styles.sheetTitle}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('infoBottomSheet.mapLayersInfoTitle')}
          </Text>
        </View>
        <ScrollView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sheetListContainer: {
    flex: 1,
    marginTop: -10,
    paddingHorizontal: 20,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sheetTitle: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default InfoBottomSheet;
