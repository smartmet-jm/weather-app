import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import SettingsReducer, { settingsPersist } from './settings/reducer';
import ForecastReducer from './forecast/reducer';
import ObservationReducer, { observationPersist } from './observation/reducer';
import MapReducer from './map/reducer';
import LocationReducer, { locationPersist } from './location/reducer';
import { PersistConfig } from './types';
import NavigationReducer, { navigationPersist } from './navigation/reducer';

const persistReducerConfig = (config: PersistConfig) => ({
  ...config,
  storage: AsyncStorage,
});

export default combineReducers({
  settings: persistReducer(
    persistReducerConfig(settingsPersist),
    SettingsReducer
  ),
  forecast: ForecastReducer,
  observation: persistReducer(
    persistReducerConfig(observationPersist),
    ObservationReducer
  ),
  location: persistReducer(
    persistReducerConfig(locationPersist),
    LocationReducer
  ),
  map: MapReducer,
  navigation: persistReducer(
    persistReducerConfig(navigationPersist),
    NavigationReducer
  ),
});
