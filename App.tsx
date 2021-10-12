import 'react-native-gesture-handler';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxThunk from 'redux-thunk';

import './i18n';
import { Appearance } from 'react-native';
import { ConfigProvider } from '@config';
import reducers from './src/store';
import TabNavigator from './src/navigators/TabNavigator';

const App: React.FC = () => {
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  const persistor = persistStore(store);

  const initialColorScheme = Appearance.getColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <TabNavigator initialColorScheme={initialColorScheme} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
