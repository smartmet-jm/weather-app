import { PersistConfig } from '@store/types';
import {
  WarningsState,
  WarningsActionTypes,
  FETCH_WARNINGS,
  FETCH_WARNINGS_SUCCESS,
  FETCH_WARNINGS_ERROR,
} from './types';

const INITIAL_STATE: WarningsState = {
  data: {},
  loading: false,
  error: false,
  fetchTimestamp: Date.now(),
};

export default (
  state = INITIAL_STATE,
  action: WarningsActionTypes
): WarningsState => {
  switch (action.type) {
    case FETCH_WARNINGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_WARNINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.id]: action.data,
        },
        fetchTimestamp: action.timestamp,
      };
    }

    case FETCH_WARNINGS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        fetchTimestamp: action.timestamp,
      };
    }

    default: {
      return state;
    }
  }
};

export const warningsPersist: PersistConfig = {
  key: 'warnings',
  whitelist: [],
};
