import { Location } from '@store/location/types';
import { ForecastParameters } from '@store/forecast/types';
import { ObservationParameters } from '@store/observation/types';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type BaseTimes = {
  timeStep: number;
  observation?: number;
  forecast?: number;
};

type BoundingBox = {
  minx: number;
  miny: number;
  maxx: number;
  maxy: number;
};

export type WMSSource = {
  source: string;
  layer: string;
  type: 'observation' | 'forecast';
  boundingBox?: BoundingBox;
  customParameters?: {
    [name: string]: string | number;
  };
};

export type TimeseriesSource = {
  source: string;
  type: 'observation' | 'forecast';
  parameters: string[];
  producer?: string;
  keyword: string | string[];
};

type Times = RequireAtLeastOne<BaseTimes, 'forecast' | 'observation'>;

export interface MapLayer {
  id: string | number;
  type: 'WMS' | 'GeoJSON' | 'Timeseries';
  name: { [lang: string]: string };
  legend: string;
  sources: WMSSource[] | TimeseriesSource[];
  times: Times;
}

interface Observation {
  updateInterval: number;
  numberOfStations: number;
  producer: string | { default: string; [name: string]: string };
  timePeriod: number;
  parameters: (keyof ObservationParameters)[];
}

interface ObservationEnabled extends Observation {
  enabled: true;
}

interface ObservationDisabled extends Partial<Observation> {
  enabled: false;
}

interface Warnings {
  apiUrl: {
    [country: string]: string;
  };
  updateInterval: number;
  webViewUrl?: string;
}

interface WarningsEnabled extends Warnings {
  enabled: true;
}

interface WarningsDisabled extends Partial<Warnings> {
  enabled: false;
}

interface DynamicConfig {
  readonly apiUrl: string;
  interval: number;
}

interface DynamicConfigEnabled extends DynamicConfig {
  enabled: true;
}

interface DynamicConfigDisabled extends Partial<DynamicConfig> {
  enabled: false;
}

export interface ConfigType {
  dynamicConfig: DynamicConfigEnabled | DynamicConfigDisabled;
  location: {
    default: Location;
    apiUrl: string;
    keyword: string;
    maxRecent: number;
    maxFavorite: number;
  };
  map: {
    latitudeDelta: number;
    updateInterval: number;
    sources: { [name: string]: string };
    layers: MapLayer[];
  };
  weather: {
    apiUrl: string;
    forecast: {
      updateInterval: number;
      timePeriod: number | 'data';
      data: {
        producer?: string;
        parameters: (keyof ForecastParameters)[];
      }[];
      defaultParameters: (keyof ForecastParameters)[];
    };
    observation: ObservationEnabled | ObservationDisabled;
  };
  warnings: WarningsEnabled | WarningsDisabled;
  settings: {
    languages: string[];
    units: {
      [type: string]: string[];
    };
  };
}
