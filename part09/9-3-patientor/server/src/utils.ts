import { v1 as uuid } from 'uuid';
import { Patient, Gender, Entry, Diagnosis, HealthCheckRating, Discharge, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) throw new Error('Incorrect or missing comment');
  return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return new Date(date);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodes = (param: any): param is Array<Diagnosis["code"]> => {
  if (!Array.isArray(param)) return false;
  if (!param.every((code: unknown) => isString(code))) return false;
  return true;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes) return [];
  if (!isDiagnosisCodes(diagnosisCodes)) throw new Error("Incorrect diagnosis codes format");
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ( !isHealthCheckRating(rating)) throw new Error("Incorrect or missing health check rating");
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!param) return false;
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  if (!Object.keys(param).includes('date') || Object.keys(param).includes('criteria')) return false;
  if (!isDate(param.date)) return false;
  if (!isString(param.date)) return false;
  /* eslint-enable @typescript-eslint/no-unsafe-argument */
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) throw new Error("Incorrect or missing discharge data");
  const date = parseDate(discharge.date);
  const criteria = parseString(discharge.criteria);
  return { date, criteria };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (!sickLeave) return false;
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  if (!Object.keys(sickLeave).includes('startDate') || Object.keys(sickLeave).includes('endDate')) return false;
  if (!isDate(sickLeave.startDate)) return false;
  if (!isString(sickLeave.endDate)) return false;
  /* eslint-enable @typescript-eslint/no-unsafe-argument */
  return true;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!isSickLeave(sickLeave)) throw new Error("Incorrect or missing sick leave data");
  const startDate = parseDate(sickLeave.startDate);
  const endDate = parseDate(sickLeave.endDate);
  return { startDate, endDate };
};

type PatientFields = { id: unknown, name: unknown, dateOfBirth: unknown, 
  ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const createPatient = (
    {id, name, dateOfBirth, ssn, gender, occupation}: PatientFields
  ): Patient => {
  const patient: Patient = {
    id: id ? parseString(id) : uuid(),
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };
  return patient;
};

type EntryFields = { id: unknown, type: unknown, description : unknown, date: unknown, specialist: unknown, 
  diagnosisCodes?: unknown, healthCheckRating?: unknown, discharge?: unknown, employerName?: unknown, sickLeave?: unknown };

  export const createEntry = ({ id, type, description, date, specialist, diagnosisCodes, 
    healthCheckRating, discharge, employerName, sickLeave}: EntryFields): Entry | undefined | void => {
    const baseEntry = {
      id: id ? parseString(id) : uuid(),
      description: parseString(description),
      date: parseDate(date),
      specialist: parseString(specialist),
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
  
    switch (type) {
      case "Hospital":
        return {
          ...baseEntry,
          type: type,
          discharge: parseDischarge(discharge),
        };
      case "HealthCheck":
        return {
          ...baseEntry,
          type: type,
          healthCheckRating: parseHealthCheckRating(
            healthCheckRating
          ),
        };
      case "OccupationalHealthcare":
        return {
          ...baseEntry,
          type: type,
          employerName: parseString(employerName),
          sickLeave: parseSickLeave(sickLeave),
        };
    }
  };

export default createPatient;