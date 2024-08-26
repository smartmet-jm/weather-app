import reducer from '../../src/store/settings/reducer';
import * as types from '../../src/store/settings/types';

describe('settings reducer', () => {
  it('should handle UPDATE_UNITS', () => {
    const units = {
      temperature: {
        unitId: 1,
        unitAbb: 'C',
        unit: 'celsius',
        unitPrecision: 0,
      },
      precipitation: {
        unitId: 1,
        unitAbb: 'mm',
        unit: 'millimeter',
        unitPrecision: 1,
      },
    };
    expect(
      reducer(
        { units, theme: 'automatic', clockType: 24 },
        {
          type: types.UPDATE_UNITS,
          units: {
            ...units,
            temperature: {
              unitId: 2,
              unitAbb: 'F',
              unit: 'fahrenheit',
              unitPrecision: 0,
            },
          },
        }
      )
    ).toEqual({
      theme: 'automatic',
      units: {
        ...units,
        temperature: {
          unitId: 2,
          unitAbb: 'F',
          unit: 'fahrenheit',
          unitPrecision: 0,
        },
      },
      clockType: 24,
    });
  });

  it('should handle UPDATE_THEME', () => {
    expect(
      reducer(undefined, { type: types.UPDATE_THEME, theme: 'light' })
    ).toEqual({
      theme: 'light',
      clockType: undefined,
      units: {
        precipitation: {
          unit: 'millimeter',
          unitAbb: 'mm',
          unitId: 1,
          unitPrecision: 1,
        },
        pressure: {
          unit: 'hehtopascal',
          unitAbb: 'hPa',
          unitId: 1,
          unitPrecision: 0,
        },
        temperature: {
          unit: 'celsius',
          unitAbb: 'C',
          unitId: 1,
          unitPrecision: 0,
        },
        wind: {
          unit: 'meters per second',
          unitAbb: 'm/s',
          unitId: 1,
          unitPrecision: 0,
        },
      },
    });
  });

  it('should handle UPDATE_CLOCK_TYPE', () => {
    expect(
      reducer(undefined, { type: types.UPDATE_CLOCK_TYPE, clockType: 24 })
    ).toEqual({
      theme: undefined,
      clockType: 24,
      units: {
        precipitation: {
          unit: 'millimeter',
          unitAbb: 'mm',
          unitId: 1,
          unitPrecision: 1,
        },
        pressure: {
          unit: 'hehtopascal',
          unitAbb: 'hPa',
          unitId: 1,
          unitPrecision: 0,
        },
        temperature: {
          unit: 'celsius',
          unitAbb: 'C',
          unitId: 1,
          unitPrecision: 0,
        },
        wind: {
          unit: 'meters per second',
          unitAbb: 'm/s',
          unitId: 1,
          unitPrecision: 0,
        },
      },
    });
  });
});
