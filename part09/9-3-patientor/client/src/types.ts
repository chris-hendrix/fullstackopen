export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export type Discharge = { date: Date, criteria: string };
export type SickLeave = { startDate: Date, endDate: Date };

export interface Entry {
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge?: Discharge;
  employerName?: string;
  sickLeave?: SickLeave;
  healthCheckRating?: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[]
}

