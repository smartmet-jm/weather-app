import { knownWarningTypes, severityList } from './constants';

export const FETCH_WARNINGS = 'FETCH_WARNINGS';
export const FETCH_WARNINGS_SUCCESS = 'FETCH_WARNINGS_SUCCESS';
export const FETCH_WARNINGS_ERROR = 'FETCH_WARNINGS_ERROR';

interface FetchWarnings {
  type: typeof FETCH_WARNINGS;
}

interface FetchWarningsSuccess {
  type: typeof FETCH_WARNINGS_SUCCESS;
  data: WarningsData;
  id: number;
  timestamp: number;
}

interface FetchWarningsError {
  type: typeof FETCH_WARNINGS_ERROR;
  error: Error;
  timestamp: number;
}

export type WarningsActionTypes =
  | FetchWarnings
  | FetchWarningsSuccess
  | FetchWarningsError;

export type WarningType = typeof knownWarningTypes[number];

export type Severity = Exclude<typeof severityList[number], ''>;

export interface Warning {
  type: WarningType;
  language: string;
  duration: {
    startTime: string;
    endTime: string;
  };
  severity: Severity;
  description: string;
}

export interface CapWarning {
  identifier: string;
  sender: string;
  sent: Date;
  status: string;
  msgType: string;
  scope: string;
  info: {
    language: string;
    category: string;
    event: string;
    urgency: string;
    severity: Severity;
    certainty: string;
    effective: Date;
    onset: Date;
    expires: Date;
    senderName: string;
    description: string;
    web: string;
    area: {
      areaDesc: string;
      polygon: string;
    };
  };
}

export interface LocationWarnings {
  [id: number]: WarningsData;
}

export interface WarningsData {
  warnings: Warning[];
  updated: string;
  error: number;
}

export interface Error {
  code: number;
  message: string;
}

export interface WarningsState {
  data: LocationWarnings;
  loading: boolean;
  error: boolean | Error | string;
  fetchTimestamp: number;
  fetchSuccessTime: number;
}
